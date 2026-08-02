import { PageHero } from "@/components/common/page-hero";
import { ContactSection } from "@/components/sections/contact-section";
import { TelegramOrderCta } from "@/components/sections/telegram-order-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { contactsPage } from "@/lib/content/pages";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Контакти",
  description:
    "Контакти оптового напрямку Flora de Luxe Kyiv OPT: адреса у Києві, Telegram для оптових замовлень, телефон і маршрут на Google Maps.",
  path: "/contacts",
});

export default function ContactsPage() {
  return (
    <>
      <PageHero intro={contactsPage.intro} crumbs={[{ name: "Контакти", path: "/contacts" }]} />

      <ContactSection withHeading={false} />
      <TelegramOrderCta />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Головна", path: "/" },
          { name: "Контакти", path: "/contacts" },
        ])}
      />
    </>
  );
}
