import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/stagger";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { homepageFaqItems } from "@/lib/faq";

export function FaqSection() {
  return (
    <section className="section-padding section-surface" aria-labelledby="faq-heading">
      <div className="container-wide">
        <FadeIn>
          <SectionHeading
            id="faq-heading"
            eyebrow="FAQ"
            title="Questions about the studio model"
            subtitle="How we partner, what we build, and what working with TRYN looks like."
          />
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="zone-panel overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              <Stagger stagger={0.05}>
                {homepageFaqItems.map((item, i) => (
                  <StaggerItem key={item.question}>
                    <AccordionItem
                      value={`item-${i}`}
                      className="border-border px-6 transition-colors duration-200 data-[state=open]:bg-foreground/[0.02] last:border-b-0 sm:px-8"
                    >
                      <AccordionTrigger className="text-left text-foreground hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted">{item.answer}</AccordionContent>
                    </AccordionItem>
                  </StaggerItem>
                ))}
              </Stagger>
            </Accordion>
          </div>
        </FadeIn>
        <FadeIn className="mt-8" delay={0.1}>
          <p className="text-sm text-muted">
            More questions?{" "}
            <Link href="/contact" className="link-editorial">
              Talk to the studio
            </Link>
            .
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
