import { jsonError, jsonSuccess, parseJsonBody } from "@/lib/api-utils";
import { env, isEmailConfigured } from "@/lib/env";
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
    return jsonSuccess({ queued: false, message: "Received (email delivery pending configuration)" });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.contactFromEmail,
        to: [env.contactToEmail],
        reply_to: parsed.data.email,
        subject: `Contact: ${parsed.data.company} — ${parsed.data.projectType}`,
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
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[Contact] Resend error:", detail);
      return jsonError("Failed to send message", 502);
    }

    return jsonSuccess({ queued: true });
  } catch (error) {
    console.error("[Contact] Unexpected error:", error);
    return jsonError("Submission failed", 500);
  }
}
