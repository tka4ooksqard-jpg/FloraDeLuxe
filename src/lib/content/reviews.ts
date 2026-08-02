import type { SiteImage } from "@/lib/content/media";

export type Review = {
  readonly id: string;
  readonly business: string;
  readonly clientType: string;
  readonly city: string;
  readonly text: string;
  /** Optional photo of the client's retail point, added by the client later. */
  readonly image?: SiteImage;
};

/**
 * Confirmed client testimonials only.
 * While empty, ReviewsSection renders nothing on public pages.
 * Do not add unverified or illustrative quotes.
 */
export const reviews: readonly Review[] = [];
