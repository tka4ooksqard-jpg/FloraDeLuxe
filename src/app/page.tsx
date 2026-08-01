import { JsonLd } from "@/components/seo/json-ld";
import { CategoriesSection } from "@/components/sections/categories-section";
import { ContactSection } from "@/components/sections/contact-section";
import { DeliveryDays } from "@/components/sections/delivery-days";
import { FaqSection } from "@/components/sections/faq-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { Hero } from "@/components/sections/hero";
import { HowToOrder } from "@/components/sections/how-to-order";
import { IntroSection } from "@/components/sections/intro-section";
import { LeadForm } from "@/components/sections/lead-form";
import { QuickNav } from "@/components/sections/quick-nav";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { StorageSection } from "@/components/sections/storage-section";
import { SuppliersSection } from "@/components/sections/suppliers-section";
import { TermsSection } from "@/components/sections/terms-section";
import { breadcrumbSchema } from "@/lib/seo";

export default function HomePage() {
  return (
    <div className="relative">
      {/* One grain texture for the whole scroll — never per-section. */}
      <div aria-hidden="true" className="page-grain pointer-events-none fixed inset-0 z-[25]" />

      <Hero />
      <QuickNav />
      <IntroSection />
      <DeliveryDays />
      <CategoriesSection />
      <SuppliersSection />
      <StorageSection />
      <GallerySection />
      <TermsSection />
      <HowToOrder />
      <ReviewsSection />
      <FaqSection />
      <LeadForm />
      <ContactSection />

      <JsonLd data={breadcrumbSchema([{ name: "Головна", path: "/" }])} />
    </div>
  );
}
