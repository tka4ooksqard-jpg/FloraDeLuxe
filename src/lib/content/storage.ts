import type { IconName } from "@/lib/content/icons";

export type StorageCard = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: IconName;
};

/**
 * Logistics and handling points grounded in the published OPT price sheet.
 * Exact cold-chain temperatures are not published, so no figures are stated.
 */
export const storageCards: readonly StorageCard[] = [
  {
    id: "packs",
    title: "Пачки та пучки",
    description: "Квіти відпускаються пачками або пучками — без поділу на штуки.",
    icon: "package",
  },
  {
    id: "logistics",
    title: "Доставка по Києву",
    description: "Доставка по місту; безкоштовно від суми, зазначеної в прайсі.",
    icon: "truck",
  },
  {
    id: "storage",
    title: "Підготовка партії",
    description: "Сортуємо та готуємо продукцію до оптової видачі.",
    icon: "warehouse",
  },
  {
    id: "picking",
    title: "Комплектація замовлення",
    description: "Готуємо замовлення після підтвердження наявності та оплати.",
    icon: "package",
  },
];

export const storageAdvantages: readonly string[] = [
  "Відпуск пачками / пучками без поділу",
  "Мінімальне замовлення 2 200 грн",
  "Безкоштовна доставка по Києву від 5 000 грн",
  "Актуальний прайс у Telegram",
  "Регулярні дні поставок",
  "Підтвердження наявності менеджером",
];
