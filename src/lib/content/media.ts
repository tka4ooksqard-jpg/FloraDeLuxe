export type SiteImage = {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  /**
   * True while the shipped file is brand-toned abstract artwork rather than a
   * real Flora de Luxe photograph. Replace the file and flip this flag once
   * the client provides the final asset — see `public/images/README.md`.
   */
  readonly isPlaceholder: boolean;
  /**
   * Base64 LQIP for `next/image` `placeholder="blur"`. Only worth carrying for
   * images that load above the fold. Regenerate after replacing the file:
   *
   * ```
   * node -e "require('sharp')('public/<path>').resize(10).webp({quality:28})
   *   .toBuffer().then(b=>console.log('data:image/webp;base64,'+b.toString('base64')))"
   * ```
   */
  readonly blurDataURL?: string;
};

/** Media that has not been delivered yet and is rendered as a labelled slot. */
export type PendingMedia = {
  readonly kind: "image" | "video";
  /** Path the final asset is expected at. Surfaced in the UI while pending. */
  readonly expectedPath: string;
  readonly title: string;
  readonly caption: string;
};
