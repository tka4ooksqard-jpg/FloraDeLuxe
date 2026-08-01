import { IconCardGrid } from "@/components/common/icon-card-grid";
import { SectionHeading } from "@/components/common/section-heading";
import { advantages } from "@/lib/content/home";

export function AdvantagesSection() {
  return (
    <section id="advantages" aria-labelledby="advantages-title" className="bg-cream/50">
      <div className="container-page section-y">
        <SectionHeading
          id="advantages-title"
          eyebrow="Переваги"
          title="Чому оптові клієнти повертаються"
          description="Не гучні обіцянки, а робочі умови з прайсу: графік поставок, пачки, доставка по Києву та зрозумілий мінімум замовлення."
        />

        <IconCardGrid items={advantages} className="mt-12 sm:grid-cols-2 lg:grid-cols-3" interactive />
      </div>
    </section>
  );
}
