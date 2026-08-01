import { contactConfig, formatUah, commerceConfig } from "@/lib/contact-config";
import { ctaLabels, telegramIntents } from "@/lib/content/navigation";

export type FaqAction = {
  readonly label: string;
  readonly href: string;
  readonly external: boolean;
};

export type FaqItem = {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly action?: FaqAction;
};

export const faqItems: readonly FaqItem[] = [
  {
    id: "payment",
    question: "Які є способи оплати?",
    answer: "Доступні способи оплати уточнює менеджер під час підтвердження замовлення.",
  },
  {
    id: "minimum",
    question: "Яка мінімальна сума замовлення?",
    answer: `Мінімальна сума оптового замовлення — ${formatUah(commerceConfig.minimumOrder)}.`,
  },
  {
    id: "packs",
    question: "Чи можна купити квіти штучно?",
    answer:
      "Ні. Усі квіти відпускаються пачками або пучками без можливості поділу — як зазначено в офіційному прайсі.",
  },
  {
    id: "delivery",
    question: "Чи є доставка?",
    answer:
      "Так, доступна доставка по Києву. Маршрут і час погоджуються з менеджером. Також можливий самовивіз.",
  },
  {
    id: "free-delivery",
    question: "Коли доставка безкоштовна?",
    answer: `Безкоштовна доставка по Києву передбачена для замовлень від ${formatUah(
      commerceConfig.freeDeliveryFrom,
    )}.`,
  },
  {
    id: "location",
    question: "Де ви знаходитесь?",
    answer: `${contactConfig.legalName}, ${contactConfig.address}.`,
    action: { label: ctaLabels.maps, href: contactConfig.mapsUrl, external: true },
  },
  {
    id: "dispatch",
    question: "Як швидко відбувається відправка після замовлення?",
    answer:
      "Відправка або підготовка до самовивозу відбувається після підтвердження наявності, оплати та узгодження з менеджером.",
  },
  {
    id: "price-list",
    question: "Як отримати актуальний прайс?",
    answer:
      "Актуальний прайс публікується в Telegram-каналі опту. Також можна написати менеджеру через кнопку нижче.",
    action: {
      label: ctaLabels.price,
      href: `${contactConfig.telegramUrl}?text=${encodeURIComponent(telegramIntents.price)}`,
      external: true,
    },
  },
];
