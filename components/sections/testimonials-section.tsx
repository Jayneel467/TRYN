import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { FeaturedQuote } from "@/components/shared/featured-spotlight";
import { MotionPressable } from "@/components/shared/motion-pressable";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/stagger";
import { Button } from "@/components/ui/button";
import { testimonialStats, testimonials } from "@/lib/testimonials";

const homepageTestimonials = testimonials.filter((t) => t.id !== "itinero");
const primaryQuote = homepageTestimonials[0];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="section-padding section-surface"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-wide">
        <FadeIn>
          <p className="section-chapter">08</p>
          <SectionHeading
            id="testimonials-heading"
            eyebrow="Testimonials"
            title="What founders say"
            subtitle="Long-term partnerships built on delivery, transparency, and shared ownership."
          />
        </FadeIn>

        <FadeIn delay={0.06}>
          <div className="mb-10 grid grid-cols-3 gap-6 border-y border-border py-8 sm:gap-8 sm:py-10">
            {testimonialStats.map((stat) => (
              <div key={stat.label}>
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {primaryQuote && (
          <FadeIn delay={0.08}>
            <FeaturedQuote
              quote={primaryQuote.quote}
              author={primaryQuote.author}
              role={primaryQuote.role}
              company={primaryQuote.company}
            />
          </FadeIn>
        )}

        {homepageTestimonials.length > 1 && (
          <Stagger className="mt-8 grid gap-6" stagger={0.1}>
            {homepageTestimonials.slice(1).map((t) => (
              <StaggerItem key={t.id}>
                <FeaturedQuote
                  quote={t.quote}
                  author={t.author}
                  role={t.role}
                  company={t.company}
                />
              </StaggerItem>
            ))}
          </Stagger>
        )}

        <FadeIn className="mt-10" delay={0.08}>
          <MotionPressable>
            <Button variant="outline" asChild>
              <Link href="/testimonials">Read all testimonials</Link>
            </Button>
          </MotionPressable>
        </FadeIn>
      </div>
    </section>
  );
}
