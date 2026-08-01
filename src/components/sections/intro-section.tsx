import { InternalCta } from "@/components/common/cta";
import { Reveal } from "@/components/common/reveal";
import { aboutBrief } from "@/lib/content/home";

/** Home page "who we are" block. The full story lives on `/about`. */
export function IntroSection() {
  return (
    <section aria-labelledby="intro-title" className="relative bg-porcelain">
      <div aria-hidden="true" className="surface-glow absolute inset-0 opacity-60" />
      <div className="container-page relative py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16">
          <Reveal>
            <p className="text-bordeaux text-[0.6875rem] font-semibold tracking-[0.24em] uppercase">
              {aboutBrief.eyebrow}
            </p>
            <h2
              id="intro-title"
              className="mt-5 text-[clamp(1.85rem,1.15rem+2.4vw,3.15rem)] leading-[1.1]"
            >
              {aboutBrief.title}
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="text-muted text-[1.0625rem] leading-relaxed md:text-[1.125rem]">
              {aboutBrief.lead}
            </p>
            <InternalCta
              href="/about"
              label="Про компанію"
              variant="outline"
              className="mt-7"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
