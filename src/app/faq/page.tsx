import { PageHero } from "@/components/common/page-hero";
import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";
import { TermsSection } from "@/components/sections/terms-section";
import { JsonLd } from "@/components/seo/json-ld";
import { faqItems } from "@/lib/content/faq";
import { faqPage } from "@/lib/content/pages";
import { breadcrumbSchema, buildMetadata, faqSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQ",
  description:
    "Відповіді на часті запитання про оптову співпрацю: мінімальне замовлення, доставка, оплата, прайс і адреса Flora de Luxe Kyiv OPT.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHero intro={faqPage.intro} crumbs={[{ name: "FAQ", path: "/faq" }]} />

      <FaqSection
        eyebrow="Запитання та відповіді"
        title="Умови, оплата та доставка"
        description="Якщо потрібної відповіді немає — напишіть менеджеру, він відповість у Telegram."
      />

      <TermsSection />
      <ContactSection />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Головна", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
          faqSchema(faqItems),
        ]}
      />
    </>
  );
}
