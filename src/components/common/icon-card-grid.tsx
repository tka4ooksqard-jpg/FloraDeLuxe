import { cardSurface } from "@/components/common/card";
import { Icon } from "@/components/common/icon";
import { Reveal } from "@/components/common/reveal";
import type { IconName } from "@/lib/content/icons";
import { cn } from "@/lib/utils";

export type IconCardItem = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon?: IconName;
};

/**
 * The site's recurring "icon, heading, one paragraph" tile. Advantages, supply
 * stages, storage conditions and company principles all render through this so
 * the card weight stays identical across pages.
 */
export function IconCardGrid({
  items,
  ordered = false,
  numbered = false,
  interactive = false,
  className,
  stagger = 90,
}: {
  items: readonly IconCardItem[];
  /** Renders an `ol` — use it when the order carries meaning. */
  ordered?: boolean;
  /** Shows the position as a large 01…09 marker. */
  numbered?: boolean;
  /** Adds the hover lift used where the grid is the focal point of a section. */
  interactive?: boolean;
  className?: string;
  stagger?: number;
}) {
  const List = ordered ? "ol" : "ul";

  return (
    <List className={cn("grid gap-4 sm:gap-5 md:grid-cols-3", className)}>
      {items.map((item, index) => (
        <li key={item.id}>
          <Reveal delay={Math.min(index, 4) * stagger} className="h-full">
            <article
              className={cn(
                cardSurface,
                "flex h-full flex-col p-6 sm:p-7",
                interactive && "hover:border-line-strong hover:shadow-lift group",
              )}
            >
              {item.icon || numbered ? (
                <div className="flex items-center justify-between gap-4">
                  {item.icon ? (
                    <span
                      className={cn(
                        "border-line bg-cream/60 text-bordeaux grid size-11 place-items-center rounded-full border",
                        interactive &&
                          "group-hover:bg-bordeaux group-hover:text-porcelain transition-colors duration-500 group-hover:border-transparent",
                      )}
                    >
                      <Icon name={item.icon} className="size-5" />
                    </span>
                  ) : null}

                  {numbered ? (
                    <span className="text-line-strong font-display ml-auto text-3xl leading-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  ) : null}
                </div>
              ) : null}

              <h3 className="text-ink mt-5 text-xl leading-snug">{item.title}</h3>
              <p className="text-muted mt-2.5 text-[0.9375rem] leading-relaxed">
                {item.description}
              </p>
            </article>
          </Reveal>
        </li>
      ))}
    </List>
  );
}
