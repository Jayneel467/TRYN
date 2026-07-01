import { jsonError, jsonSuccess, parseJsonBody } from "@/lib/api-utils";
import { sendEmail } from "@/lib/email";
import { isEmailConfigured } from "@/lib/env";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await parseJsonBody<unknown>(request);
  if (!body) {
    return jsonError("Invalid JSON body", 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError("Invalid form data", 400, parsed.error.flatten());
  }

  if (!isEmailConfigured()) {
    console.info("[Contact Submission — email not configured]", parsed.data);
    return jsonSuccess({
      queued: false,
      message: "Received (add WEB3FORMS_ACCESS_KEY to enable delivery)",
    });
  }

  try {
    const result = await sendEmail({
      subject: `Contact: ${parsed.data.company} — ${parsed.data.projectType}`,
      replyTo: parsed.data.email,
      fromName: parsed.data.name,
      text: [
        `Name: ${parsed.data.name}`,
        `Email: ${parsed.data.email}`,
        `Company: ${parsed.data.company}`,
        `Role: ${parsed.data.role}`,
        `Project type: ${parsed.data.projectType}`,
        `Budget: ${parsed.data.budget ?? "Not specified"}`,
        "",
        parsed.data.message,
      ].join("\n"),
    });

    if (!result.ok) {
      console.error("[Contact] Email error:", result.error, "provider attempted from server route");
      return jsonError("Failed to send message", 502);
    }

    return jsonSuccess({ queued: true });
  } catch (error) {
    console.error("[Contact] Unexpected error:", error);
    return jsonError("Submission failed", 500);
  }
}
