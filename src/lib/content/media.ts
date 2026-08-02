export type SiteImage = {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
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
