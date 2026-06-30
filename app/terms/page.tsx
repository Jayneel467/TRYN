import type { Metadata } from "next";
import { FadeIn } from "@/components/shared/fade-in";
import { PageHero } from "@/components/shared/page-hero";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description: `Terms of Service for ${siteConfig.name}`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        lead="Last updated: June 2026"
      />

      <section className="section-padding section-muted">
        <div className="container-wide max-w-3xl">
          <FadeIn>
            <div className="zone-panel space-y-8 p-6 sm:p-10">
              <p className="body-lead text-muted">
                By accessing and using the {siteConfig.name} website, you agree to these
                Terms of Service. If you do not agree, please do not use our website.
              </p>

              <div>
                <h2 className="text-xl font-semibold text-foreground">Use of website</h2>
                <p className="mt-3 body-copy">
                  This website is provided for informational purposes. Content does not
                  constitute a binding offer or guarantee of services or founders program
                  acceptance.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">Founders Program</h2>
                <p className="mt-3 body-copy">
                  Submission to the TRYN Founders Program does not guarantee acceptance,
                  partnership, or investment. All decisions are at the sole discretion of
                  TRYN Studios.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">Intellectual property</h2>
                <p className="mt-3 body-copy">
                  All content on this website, including logos, text, and design, is the
                  property of {siteConfig.name} and protected by applicable laws.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">Contact</h2>
                <p className="mt-3 body-copy">
                  Questions about these terms? Email{" "}
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-saffron hover:underline">
                    {siteConfig.contact.email}
                  </a>
                  .
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
