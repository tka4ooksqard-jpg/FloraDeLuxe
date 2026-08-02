import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Reveal } from "@/components/common/reveal";
import type { PageIntro } from "@/lib/content/pages";

export type Crumb = { readonly name: string; readonly path: string };

/**
 * Shared header for inner pages: visible breadcrumbs, the single `h1` for the
 * route, and an optional CTA row.
 */
export function PageHero({
  intro,
  crumbs,
  children,
}: {
  intro: PageIntro;
  crumbs: readonly Crumb[];
  children?: ReactNode;
}) {
  const trail = [{ name: "Головна", path: "/" }, ...crumbs];

  return (
    <section className="border-line relative overflow-hidden border-b bg-cream/35">
      <div aria-hidden="true" className="surface-glow absolute inset-0" />
      <div aria-hidden="true" className="surface-grain absolute inset-0" />

      <div className="container-page relative pt-10 pb-14 sm:pt-12 sm:pb-20 md:pt-16 md:pb-28">
        <nav aria-label="Хлібні крихти">
          <ol className="text-muted flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm font-medium">
            {trail.map((crumb, index) => {
              const isLast = index === trail.length - 1;
              return (
                <li key={crumb.path} className="flex min-w-0 items-center gap-1.5">
                  {index > 0 ? (
                    <ChevronRight className="size-3.5 shrink-0 opacity-60" aria-hidden="true" />
                  ) : null}
                  {isLast ? (
                    <span
                      aria-current="page"
                      className="text-graphite inline-flex min-h-11 items-center font-medium break-words"
                    >
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.path}
                      className="hover:text-bordeaux inline-flex min-h-11 items-center transition-colors duration-300"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <Reveal className="mt-7 max-w-3xl sm:mt-9">
          <p className="type-eyebrow text-bordeaux">{intro.eyebrow}</p>
          <h1 className="mt-5 text-[clamp(2rem,1.2rem+3.2vw,4.25rem)] leading-[1.06] text-balance">
            {intro.title}
          </h1>
          <p className="text-muted mt-5 max-w-2xl text-base leading-[1.75] font-medium sm:mt-6 md:text-[1.0625rem]">
            {intro.description}
          </p>
        </Reveal>

        {children ? (
          <Reveal
            delay={120}
            className="mt-8 sm:mt-10 [&_a]:max-sm:w-full [&_button]:max-sm:w-full"
          >
            {children}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
