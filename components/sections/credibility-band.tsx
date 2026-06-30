import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { clientDeliveries, featuredClientCaseStudy } from "@/lib/case-studies";
import { siteConfig } from "@/lib/site-config";

const deliveryCount = clientDeliveries.length;

const proofLinks = [
  {
    label: "Flagship build",
    title: siteConfig.parentCompany.name,
    detail: "AI travel platform in active development ahead of public launch.",
    href: "/work/itinero-travels",
    link: "Read the build story",
  },
  {
    label: "Client deliveries",
    title: `${deliveryCount}+ shipped`,
    detail: "Chatbots, generative AI, and analytics across healthcare, hospitality, edtech, and more.",
    href: "/work#client-deliveries",
    link: "View client work",
  },
  {
    label: "Recent delivery",
    title: featuredClientCaseStudy.title,
    detail: featuredClientCaseStudy.summary,
    href: `/work/${featuredClientCaseStudy.slug}`,
    link: "Open case study",
  },
] as const;

export function CredibilityBand() {
  return (
    <section
      className="credibility-band section-padding-frame section-navy"
      aria-labelledby="credibility-heading"
    >
      <div className="container-wide">
        <FadeIn>
          <div className="mb-5 h-0.5 w-10 bg-saffron lg:mb-6" aria-hidden="true" />
          <SectionHeading
            id="credibility-heading"
            chapter="01"
            eyebrow="Active builds"
            title={`Itinero in pre-launch. ${deliveryCount}+ client systems delivered.`}
            subtitle="TRYN engineers the group flagship and ships production AI. Each link below opens work you can inspect."
            dark
            frame
            className="mb-0 max-w-3xl"
          />
        </FadeIn>

        <FadeIn delay={0.1} className="mt-8 lg:mt-9">
          <div className="credibility-ledger credibility-ledger-frame grid gap-px border-y border-[var(--section-navy-border)] bg-[var(--section-navy-border)] sm:grid-cols-3">
            {proofLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="credibility-ledger-cell group block bg-[var(--section-navy-bg)] transition-colors hover:bg-white/[0.03]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] section-navy-muted">
                  {item.label}
                </p>
                <p className="mt-3 text-lg font-semibold tracking-[-0.02em] text-[var(--section-navy-fg)]">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed section-navy-muted sm:line-clamp-2">{item.detail}</p>
                <p className="mt-4 text-sm font-medium text-saffron transition-colors group-hover:text-saffron-hover">
                  {item.link}
                </p>
              </Link>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.12} className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm section-navy-muted">
          <span>
            Pre-launch site{" "}
            <a
              href={siteConfig.parentCompany.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-editorial text-saffron hover:text-saffron-hover"
            >
              itinero.company
            </a>
          </span>
          <span className="hidden h-3 w-px bg-[var(--section-navy-border)] sm:block" aria-hidden="true" />
          <span>
            Full portfolio{" "}
            <Link href="/work" className="link-editorial text-saffron">
              view all work
            </Link>
          </span>
        </FadeIn>
      </div>
    </section>
  );
}
