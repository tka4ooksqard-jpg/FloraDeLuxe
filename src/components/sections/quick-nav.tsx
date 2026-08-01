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
    <section aria-label={title ?? "Швидкий перехід"} className={cn("bg-cream/50", className)}>
      <div className="container-page py-12 md:py-16">
        {title ? (
          <Reveal className="mb-10">
            {eyebrow ? (
              <span className="text-bordeaux text-[0.6875rem] font-semibold tracking-[0.22em] uppercase">
                {eyebrow}
              </span>
            ) : null}
            <h2 className="mt-4 text-[clamp(1.6rem,1.2rem+1.4vw,2.25rem)] leading-tight">
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
