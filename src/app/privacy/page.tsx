import { PageHero } from "@/components/common/page-hero";
import { Reveal } from "@/components/common/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { privacyIntro, privacySections } from "@/lib/content/privacy";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Політика конфіденційності",
  description:
    "Як Flora de Luxe Kyiv OPT збирає та використовує персональні дані, надані через форму заявки на оптову співпрацю.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        intro={privacyIntro}
        crumbs={[{ name: "Політика конфіденційності", path: "/privacy" }]}
      />

      <section aria-labelledby="privacy-content-title" className="bg-porcelain">
        <div className="container-page section-y">
          <h2 id="privacy-content-title" className="sr-only">
            Текст політики конфіденційності
          </h2>

          <div className="max-w-3xl">
            {privacySections.map((section, index) => (
              <Reveal key={section.id} delay={Math.min(index, 4) * 60}>
                <section
                  aria-labelledby={`privacy-${section.id}`}
                  className="border-line not-last:mb-10 not-last:border-b not-last:pb-10"
                >
                  <h3 id={`privacy-${section.id}`} className="text-ink text-2xl leading-snug">
                    {section.title}
                  </h3>

                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="text-muted mt-4 text-[1.0625rem] leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets ? (
                    <ul className="mt-4 space-y-2">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="text-muted before:bg-bordeaux/60 relative pl-5 text-[1.0625rem] leading-relaxed before:absolute before:top-[0.7em] before:left-0 before:size-1.5 before:rounded-full"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Головна", path: "/" },
          { name: "Політика конфіденційності", path: "/privacy" },
        ])}
      />
    </>
  );
}
