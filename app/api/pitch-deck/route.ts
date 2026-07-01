import { jsonError, jsonSuccess } from "@/lib/api-utils";
import { sendEmail } from "@/lib/email";
import { isEmailConfigured } from "@/lib/env";
import { pitchDeckSchema } from "@/lib/validations";

const MAX_FILE_SIZE = 25 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
]);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const pitchDeck = formData.get("pitchDeck");

    const parsed = pitchDeckSchema.safeParse({
      founderName: formData.get("founderName"),
      email: formData.get("email"),
      companyName: formData.get("companyName"),
      website: formData.get("website") || "",
      stage: formData.get("stage"),
      description: formData.get("description"),
    });

    if (!parsed.success) {
      return jsonError("Invalid form data", 400, parsed.error.flatten());
    }

    if (!(pitchDeck instanceof File) || pitchDeck.size === 0) {
      return jsonError("Pitch deck file is required", 400);
    }

    if (!ALLOWED_TYPES.has(pitchDeck.type)) {
      return jsonError("Invalid file type. Upload PDF or PowerPoint.", 400);
    }

    if (pitchDeck.size > MAX_FILE_SIZE) {
      return jsonError("File exceeds 25MB limit", 400);
    }

    const submission = {
      ...parsed.data,
      fileName: pitchDeck.name,
      fileSize: pitchDeck.size,
    };

    if (!isEmailConfigured()) {
      console.info("[Pitch Deck — email not configured]", submission);
      return jsonSuccess({
        queued: false,
        message: "Received (add WEB3FORMS_ACCESS_KEY to enable delivery)",
      });
    }

    const buffer = Buffer.from(await pitchDeck.arrayBuffer());

    const result = await sendEmail({
      subject: `Founders Program: ${parsed.data.companyName} (${parsed.data.stage})`,
      replyTo: parsed.data.email,
      fromName: parsed.data.founderName,
      text: [
        `Founder: ${parsed.data.founderName}`,
        `Email: ${parsed.data.email}`,
        `Company: ${parsed.data.companyName}`,
        `Website: ${parsed.data.website || "N/A"}`,
        `Stage: ${parsed.data.stage}`,
        "",
        parsed.data.description,
        "",
        `Attachment: ${pitchDeck.name} (${pitchDeck.size} bytes)`,
      ].join("\n"),
      attachments: [{ filename: pitchDeck.name, content: buffer }],
    });

    if (!result.ok) {
      console.error("[Pitch Deck] Email error:", result.error);
      return jsonError("Failed to submit application", 502);
    }

    return jsonSuccess({ queued: true });
  } catch (error) {
    console.error("[Pitch Deck] Unexpected error:", error);
    return jsonError("Submission failed", 500);
  }
}
