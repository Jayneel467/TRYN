function optional(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

function optionalWithDefault(name: string, defaultValue: string): string {
  return optional(name) ?? defaultValue;
}

function optionalInt(name: string): number | undefined {
  const value = optional(name);
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export const env = {
  web3formsAccessKey: optional("WEB3FORMS_ACCESS_KEY"),
  smtpHost: optional("SMTP_HOST"),
  smtpPort: optionalInt("SMTP_PORT"),
  smtpUser: optional("SMTP_USER"),
  smtpPass: optional("SMTP_PASS"),
  resendApiKey: optional("RESEND_API_KEY"),
  contactToEmail: optionalWithDefault("CONTACT_TO_EMAIL", "support@tryn.studio"),
  contactFromEmail: optionalWithDefault(
    "CONTACT_FROM_EMAIL",
    "TRYN Studios <hello@tryn.studio>"
  ),
  newsletterAudienceId: optional("RESEND_AUDIENCE_ID"),
  siteUrl: optional("NEXT_PUBLIC_SITE_URL"),
  whatsappUrl: optional("NEXT_PUBLIC_WHATSAPP_URL"),
  calEmbedUrl: optional("NEXT_PUBLIC_CAL_EMBED_URL"),
} as const;

export function isEmailConfigured(): boolean {
  return Boolean(
    env.web3formsAccessKey ||
      (env.smtpHost && env.smtpUser && env.smtpPass) ||
      (env.resendApiKey && env.contactToEmail && env.contactFromEmail)
  );
}
