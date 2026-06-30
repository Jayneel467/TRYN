import type { Metadata } from "next";
import { FadeIn } from "@/components/shared/fade-in";
import { PageHero } from "@/components/shared/page-hero";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" lead="Last updated: June 2026" />

      <section className="section-padding section-muted pb-20">
        <div className="container-wide max-w-3xl">
          <FadeIn>
            <div className="space-y-6 body-copy text-muted">
              <p>
                {siteConfig.name} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your
                privacy. This policy describes how we collect, use, and protect your
                information when you visit our website or submit forms.
              </p>
              <h2 className="section-title text-foreground">Information we collect</h2>
              <p>
                We collect information you provide directly, such as name, email, company
                name, and pitch deck files when you submit our contact or founders
                program forms.
              </p>
              <h2 className="section-title text-foreground">How we use your information</h2>
              <p>
                We use your information to respond to inquiries, evaluate founders program
                applications, and improve our services. We do not sell your personal data.
              </p>
              <h2 className="section-title text-foreground">Contact</h2>
              <p>
                Questions about this policy? Email{" "}
                <a href={`mailto:${siteConfig.contact.email}`} className="link-editorial">
                  {siteConfig.contact.email}
                </a>
                .
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
