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

      <div className="container-page relative pt-10 pb-16 md:pt-14 md:pb-24">
        <nav aria-label="Хлібні крихти">
          <ol className="text-muted flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.8125rem]">
            {trail.map((crumb, index) => {
              const isLast = index === trail.length - 1;
              return (
                <li key={crumb.path} className="flex items-center gap-1.5">
                  {index > 0 ? (
                    <ChevronRight className="size-3.5 opacity-50" aria-hidden="true" />
                  ) : null}
                  {isLast ? (
                    <span
                      aria-current="page"
                      className="text-graphite inline-flex min-h-8 items-center"
                    >
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.path}
                      className="hover:text-bordeaux inline-flex min-h-8 items-center transition-colors duration-300"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <Reveal className="mt-9 max-w-3xl">
          <p className="text-bordeaux text-[0.6875rem] font-semibold tracking-[0.22em] uppercase">
            {intro.eyebrow}
          </p>
          <h1 className="mt-5 text-[clamp(2.2rem,1.35rem+3.4vw,4.25rem)] leading-[1.04]">
            {intro.title}
          </h1>
          <p className="text-muted mt-6 max-w-2xl text-[1.0625rem] leading-relaxed md:text-[1.125rem]">
            {intro.description}
          </p>
        </Reveal>

        {children ? (
          <Reveal delay={120} className="mt-10">
            {children}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
