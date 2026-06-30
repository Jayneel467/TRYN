import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { FooterNewsletter } from "@/components/layout/footer-newsletter";
import { FooterSocial } from "@/components/layout/footer-social";
import { footerLinkGroups, siteConfig } from "@/lib/site-config";

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm leading-snug section-navy-muted transition-colors hover:text-[var(--section-navy-fg)]"
    >
      {label}
    </Link>
  );
}

function FooterNavGroup({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h3 className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] section-navy-muted opacity-75">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <FooterLink href={link.href} label={link.label} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-navy footer-inset">
      <div className="container-wide site-gutter py-14 lg:py-16">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-x-8 xl:gap-x-10">
          <div className="flex flex-col items-start gap-4 lg:col-span-3">
            <Logo
              variant="full"
              colorScheme="dark"
              className="w-fit [&_.logo-image]:max-w-[10.5rem] sm:[&_.logo-image]:max-w-[11.5rem]"
            />
            <p className="max-w-xs text-sm leading-relaxed section-navy-muted">{siteConfig.tagline}</p>
            <div className="space-y-1.5">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-sm font-medium section-navy-muted transition-colors hover:text-saffron"
              >
                {siteConfig.contact.email}
              </a>
              <p className="text-xs leading-relaxed section-navy-muted opacity-70">
                {siteConfig.contact.phoneNote}
              </p>
            </div>
            <FooterSocial className="pt-0.5" />
          </div>

          <nav
            className="grid gap-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:col-span-6 lg:gap-x-8"
            aria-label="Footer navigation"
          >
            {footerLinkGroups.map((group) => (
              <FooterNavGroup key={group.title} title={group.title} links={group.links} />
            ))}
          </nav>

          <div className="lg:col-span-3 lg:col-start-10">
            <FooterNewsletter />
          </div>
        </div>

        <div className="footer-bottom-bar mt-12 border-t pt-6 lg:mt-14 lg:pt-7">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row sm:gap-4">
            <p className="text-center text-xs leading-relaxed section-navy-muted opacity-70 sm:text-left">
              © {year} TRYN Studios. A product engineering sub-brand of{" "}
              {siteConfig.parentCompany.legalName}. All rights reserved.
            </p>
            <p className="text-center text-xs section-navy-muted opacity-60 sm:text-right">
              {siteConfig.contact.location}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
