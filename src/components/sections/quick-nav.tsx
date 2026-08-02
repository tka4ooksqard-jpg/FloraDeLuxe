import { NavCardGrid } from "@/components/common/nav-card-grid";
import { Reveal } from "@/components/common/reveal";
import { quickLinks } from "@/lib/content/home";
import { type NavCard, relatedRoutes, routeCards, type AppRoute } from "@/lib/content/navigation";
import { cn } from "@/lib/utils";

/**
 * Cross-page navigation strip. On inner pages it closes the page with a set of
 * onward routes instead of a dead end; `links` defaults to the home page trio.
 */
export function QuickNav({
  links = quickLinks,
  eyebrow,
  title,
  className,
}: {
  links?: readonly NavCard[];
  eyebrow?: string;
  title?: string;
  className?: string;
}) {
  return (
    <section
      aria-label={title ?? "Швидкий перехід"}
      className={cn(
        "section-canvas-light relative",
        !title && "bridge-motion",
        className,
      )}
    >
      <div
        className={cn(
          "relative",
          /* Home bridge: tight under Hero. Inner pages keep fuller closing rhythm. */
          title
            ? "container-page py-20 md:py-24"
            : "container-hero pt-7 pb-3 md:pt-9 md:pb-4",
        )}
      >
        {title ? (
          <Reveal className="mb-10">
            {eyebrow ? (
              <span className="text-brass-ink mb-5 flex items-center gap-3.5 text-[0.75rem] font-medium tracking-[0.2em] uppercase">
                <span aria-hidden="true" className="h-px w-8 shrink-0 bg-brass-ink/55" />
                {eyebrow}
              </span>
            ) : null}
            <h2 className="font-display text-[clamp(1.75rem,1.25rem+1.6vw,2.5rem)] leading-[1.08] font-normal tracking-[-0.02em] text-ink">
              {title}
            </h2>
          </Reveal>
        ) : null}

        <NavCardGrid links={links} />
      </div>
    </section>
  );
}

/** Page-closing navigation, driven by the related-routes registry. */
export function RelatedPages({ current }: { current: AppRoute }) {
  return (
    <QuickNav
      eyebrow="Далі"
      title="Що подивитися ще"
      links={routeCards(relatedRoutes[current])}
    />
  );
}
