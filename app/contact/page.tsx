import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { CalEmbed } from "@/components/shared/cal-embed";
import { FadeIn } from "@/components/shared/fade-in";
import { PageHero } from "@/components/shared/page-hero";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { testimonialStats } from "@/lib/testimonials";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Hire TRYN Studios for a dedicated product engineering team. AI development, SaaS builds, and venture studio partnerships for founders and companies.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="TRYN Studios · Contact"
        title="Hire TRYN"
        lead="Tell us about your project and we'll get back to you within 24 hours."
      />

      <section className="section-padding section-muted">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
            <FadeIn>
              <div className="form-trust-panel">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Why founders reach out
                </p>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-1">
                  {testimonialStats.map((stat) => (
                    <div key={stat.label}>
                      <p className="stat-value text-xl">{stat.value}</p>
                      <p className="stat-label">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 space-y-4 border-t border-border pt-8 text-sm text-muted">
                  <p>
                    <span className="font-medium text-foreground">Email: </span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="transition-colors hover:text-saffron"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Response: </span>
                    {siteConfig.contact.phoneNote}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Location: </span>
                    {siteConfig.contact.location}
                  </p>
                  {siteConfig.contact.whatsapp && (
                    <p>
                      <span className="font-medium text-foreground">WhatsApp: </span>
                      <a
                        href={siteConfig.contact.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-saffron"
                      >
                        Message on WhatsApp
                      </a>
                    </p>
                  )}
                </div>
                <CalEmbed className="mt-8" />
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="zone-panel p-6 sm:p-8">
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
