"use client";

import { ExternalLink, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cardSurface } from "@/components/common/card";
import { Button } from "@/components/ui/button";
import { contactConfig } from "@/lib/contact-config";
import { ctaLabels } from "@/lib/content/navigation";
import { cn } from "@/lib/utils";

/**
 * Interactive Google Maps embed for the contacts page.
 *
 * The iframe is only mounted when the block nears the viewport so Maps does not
 * contend with LCP on the contacts route.
 */
export function ContactMap() {
  const shellRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const node = shellRef.current;
    if (!node || shouldLoad) return;

    if (typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(() => setShouldLoad(true), 0);
      return () => window.clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div
      ref={shellRef}
      className={cn(
        cardSurface,
        "relative h-[22.5rem] overflow-hidden p-0 sm:h-[23.75rem] lg:h-full lg:min-h-0",
      )}
    >
      {/* Skeleton — visible until the iframe reports load. */}
      <div
        aria-hidden="true"
        className={cn(
          "skeleton-shimmer absolute inset-0 transition-opacity duration-500 ease-[var(--ease-soft)]",
          loaded ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      />

      {shouldLoad ? (
        <iframe
          title={`Карта: ${contactConfig.legalName}, ${contactConfig.address}`}
          src={contactConfig.mapsEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          onLoad={() => setLoaded(true)}
          className={cn(
            "absolute inset-0 size-full border-0 transition-opacity duration-700 ease-[var(--ease-soft)]",
            loaded ? "opacity-100" : "opacity-0",
          )}
        />
      ) : null}

      {/* Glass address chip — bottom-left, above the map chrome. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
        <div
          className={cn(
            "pointer-events-auto w-full max-w-[min(16.5rem,calc(100%-0.25rem))] rounded-[var(--radius-tile)] border border-porcelain/45",
            "bg-porcelain/78 p-3.5 shadow-soft backdrop-blur-xl sm:p-4",
            "supports-[backdrop-filter]:bg-porcelain/62",
          )}
        >
          <p className="text-ink flex items-start gap-2 font-display text-[1.0625rem] leading-tight break-words sm:text-[1.125rem]">
            <MapPin
              className="mt-0.5 size-4 shrink-0 text-brass"
              aria-hidden="true"
              strokeWidth={1.5}
            />
            <span className="min-w-0">{contactConfig.legalName}</span>
          </p>
          <p className="type-caption text-muted mt-2 pl-6 break-words">
            {contactConfig.street}
            <br />
            {contactConfig.city}
          </p>

          <Button
            asChild
            size="sm"
            variant="primary"
            className="mt-3.5 w-full hover:-translate-y-0.5 hover:shadow-lift"
          >
            <a href={contactConfig.mapsUrl} target="_blank" rel="noopener noreferrer">
              {ctaLabels.maps}
              <ExternalLink aria-hidden="true" />
              <span className="sr-only"> (відкриється в новій вкладці)</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
