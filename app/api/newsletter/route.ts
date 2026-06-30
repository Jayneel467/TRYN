import { z } from "zod";
import { jsonError, jsonSuccess, parseJsonBody } from "@/lib/api-utils";
import { env } from "@/lib/env";

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

  if (!env.resendApiKey || !env.newsletterAudienceId) {
    console.info("[Newsletter — not configured]", parsed.data.email);
    return jsonSuccess({ subscribed: false, message: "Received (audience sync pending configuration)" });
  }

  try {
    const res = await fetch(
      `https://api.resend.com/audiences/${env.newsletterAudienceId}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: parsed.data.email,
          unsubscribed: false,
        }),
      }
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error("[Newsletter] Resend error:", detail);
      return jsonError("Failed to subscribe", 502);
    }

    return jsonSuccess({ subscribed: true });
  } catch (error) {
    console.error("[Newsletter] Unexpected error:", error);
    return jsonError("Failed to subscribe", 500);
  }
}
