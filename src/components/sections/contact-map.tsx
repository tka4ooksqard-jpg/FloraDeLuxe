"use client";

import { ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";

import { cardSurface } from "@/components/common/card";
import { Button } from "@/components/ui/button";
import { contactConfig } from "@/lib/contact-config";
import { ctaLabels } from "@/lib/content/navigation";
import { cn } from "@/lib/utils";

/**
 * Interactive Google Maps embed for the contacts page.
 *
 * The iframe fills the card; a glass address chip sits on top so the block
 * still reads as a designed surface rather than a raw embed.
 */
export function ContactMap() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
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

      {/* Glass address chip — bottom-left, above the map chrome. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
        <div
          className={cn(
            "pointer-events-auto max-w-[16.5rem] rounded-[var(--radius-tile)] border border-porcelain/45",
            "bg-porcelain/78 p-4 shadow-soft backdrop-blur-xl",
            "supports-[backdrop-filter]:bg-porcelain/62",
          )}
        >
          <p className="text-ink flex items-start gap-2 font-display text-[1.125rem] leading-tight">
            <MapPin
              className="mt-0.5 size-4 shrink-0 text-brass"
              aria-hidden="true"
              strokeWidth={1.5}
            />
            <span>{contactConfig.legalName}</span>
          </p>
          <p className="type-caption text-muted mt-2 pl-6">
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
