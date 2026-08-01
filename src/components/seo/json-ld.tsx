import type { JsonLdObject } from "@/lib/seo";

/**
 * Serialises structured data. `<` is escaped so a stray value can never close
 * the script element early.
 */
export function JsonLd({ data }: { data: JsonLdObject | readonly JsonLdObject[] }) {
  const payload = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // Structured data is generated from typed content, never from user input.
      dangerouslySetInnerHTML={{ __html: payload }}
    />
  );
}
