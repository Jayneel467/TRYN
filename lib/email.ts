import { env } from "@/lib/env";

export type EmailAttachment = {
  filename: string;
  content: Buffer;
};

export type SendEmailOptions = {
  subject: string;
  text: string;
  replyTo?: string;
  fromName?: string;
  attachments?: EmailAttachment[];
};

export type EmailProvider = "web3forms" | "smtp" | "resend";

export type SendEmailResult =
  | { ok: true; provider: EmailProvider }
  | { ok: false; error: string };

const WEB3FORMS_MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;

function attachmentBytes(attachments?: EmailAttachment[]): number {
  return attachments?.reduce((sum, file) => sum + file.content.length, 0) ?? 0;
}

function isWeb3FormsConfigured(): boolean {
  return Boolean(env.web3formsAccessKey);
}

function isSmtpConfigured(): boolean {
  return Boolean(env.smtpHost && env.smtpUser && env.smtpPass);
}

function isResendConfigured(): boolean {
  return Boolean(env.resendApiKey && env.contactToEmail && env.contactFromEmail);
}

async function sendViaWeb3Forms(options: SendEmailOptions): Promise<SendEmailResult | null> {
  if (!isWeb3FormsConfigured()) return null;

  if (attachmentBytes(options.attachments) > WEB3FORMS_MAX_ATTACHMENT_BYTES) {
    return null;
  }

  const body: Record<string, unknown> = {
    access_key: env.web3formsAccessKey,
    subject: options.subject,
    from_name: options.fromName ?? "TRYN Studios",
    message: options.text,
  };

  if (options.replyTo) {
    body.email = options.replyTo;
  }

  if (options.attachments?.length) {
    body.attachments = options.attachments.map((file) => ({
      name: file.filename,
      data: file.content.toString("base64"),
    }));
  }

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as { success?: boolean; message?: string };
  if (!res.ok || !data.success) {
    return { ok: false, error: data.message ?? `Web3Forms HTTP ${res.status}` };
  }

  return { ok: true, provider: "web3forms" };
}

async function sendViaSmtp(options: SendEmailOptions): Promise<SendEmailResult | null> {
  if (!isSmtpConfigured()) return null;

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host: env.smtpHost,
    port: env.smtpPort ?? 587,
    secure: env.smtpPort === 465,
    auth: {
      user: env.smtpUser,
      pass: env.smtpPass,
    },
  });

  await transporter.sendMail({
    from: env.contactFromEmail,
    to: env.contactToEmail,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
    attachments: options.attachments?.map((file) => ({
      filename: file.filename,
      content: file.content,
    })),
  });

  return { ok: true, provider: "smtp" };
}

async function sendViaResend(options: SendEmailOptions): Promise<SendEmailResult | null> {
  if (!isResendConfigured()) return null;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.contactFromEmail,
      to: [env.contactToEmail],
      reply_to: options.replyTo,
      subject: options.subject,
      text: options.text,
      attachments: options.attachments?.map((file) => ({
        filename: file.filename,
        content: file.content.toString("base64"),
      })),
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    return { ok: false, error: `Resend: ${detail}` };
  }

  return { ok: true, provider: "resend" };
}

export async function sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  const providers = [sendViaWeb3Forms, sendViaSmtp, sendViaResend];
  const errors: string[] = [];

  for (const provider of providers) {
    const result = await provider(options);
    if (!result) continue;
    if (result.ok) return result;
    errors.push(result.error);
  }

  if (!isWeb3FormsConfigured() && !isSmtpConfigured() && !isResendConfigured()) {
    return { ok: false, error: "No email provider configured" };
  }

  return { ok: false, error: errors.join("; ") || "All email providers failed" };
}
