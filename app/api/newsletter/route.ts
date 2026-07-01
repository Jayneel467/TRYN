import { z } from "zod";
import { jsonError, jsonSuccess, parseJsonBody } from "@/lib/api-utils";
import { sendEmail } from "@/lib/email";
import { isEmailConfigured } from "@/lib/env";

const schema = z.object({ email: z.string().email() });

export async function POST(request: Request) {
  const body = await parseJsonBody<unknown>(request);
  if (!body) {
    return jsonError("Invalid JSON body", 400);
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return jsonError("Invalid email", 400);
  }

  if (!isEmailConfigured()) {
    console.info("[Newsletter — email not configured]", parsed.data.email);
    return jsonSuccess({
      subscribed: false,
      message: "Received (add WEB3FORMS_ACCESS_KEY to enable signup notifications)",
    });
  }

  try {
    const result = await sendEmail({
      subject: `Newsletter signup: ${parsed.data.email}`,
      replyTo: parsed.data.email,
      text: [
        "New newsletter subscription request.",
        "",
        `Email: ${parsed.data.email}`,
        `Time: ${new Date().toISOString()}`,
      ].join("\n"),
    });

    if (!result.ok) {
      console.error("[Newsletter] Email error:", result.error);
      return jsonError("Failed to subscribe", 502);
    }

    return jsonSuccess({ subscribed: true });
  } catch (error) {
    console.error("[Newsletter] Unexpected error:", error);
    return jsonError("Failed to subscribe", 500);
  }
}
