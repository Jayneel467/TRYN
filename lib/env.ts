function optional(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

export const env = {
  resendApiKey: optional("RESEND_API_KEY"),
  contactToEmail: optional("CONTACT_TO_EMAIL"),
  contactFromEmail: optional("CONTACT_FROM_EMAIL"),
  newsletterAudienceId: optional("RESEND_AUDIENCE_ID"),
  siteUrl: optional("NEXT_PUBLIC_SITE_URL"),
  whatsappUrl: optional("NEXT_PUBLIC_WHATSAPP_URL"),
  calEmbedUrl: optional("NEXT_PUBLIC_CAL_EMBED_URL"),
} as const;

export function isEmailConfigured(): boolean {
  return Boolean(env.resendApiKey && env.contactToEmail && env.contactFromEmail);
}
