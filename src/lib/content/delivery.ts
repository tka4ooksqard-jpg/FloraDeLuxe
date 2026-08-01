export type DeliveryDay = {
  readonly id: "mon" | "tue" | "fri";
  readonly name: string;
  /** Two-letter marker used in the week strip. */
  readonly short: string;
  /** Position of the day inside a Mon–Sun week, 1-indexed. */
  readonly weekIndex: number;
  readonly description: string;
  readonly focus: readonly string[];
};

/** Days confirmed by the client. Everything else in the week is a gap. */
export const deliveryDays: readonly DeliveryDay[] = [
  {
    id: "mon",
    name: "Понеділок",
    short: "Пн",
    weekIndex: 1,
    description: "Поповнення основного асортименту та сезонних позицій.",
    focus: ["Базовий асортимент", "Сезонні позиції"],
  },
  {
    id: "tue",
    name: "Вівторок",
    short: "Вт",
    weekIndex: 2,
    description: "Нова партія імпортних і локальних квітів.",
    focus: ["Імпорт", "Локальні квіти"],
  },
  {
    id: "fri",
    name: "П’ятниця",
    short: "Пт",
    weekIndex: 5,
    description: "Поставка перед вихідними та підготовка до подій.",
    focus: ["Вихідні", "Підготовка до подій"],
  },
];

/** Full Mon–Sun strip so the calendar shows the rhythm, not just three words. */
export const weekStrip: readonly { readonly short: string; readonly index: number }[] = [
  { short: "Пн", index: 1 },
  { short: "Вт", index: 2 },
  { short: "Ср", index: 3 },
  { short: "Чт", index: 4 },
  { short: "Пт", index: 5 },
  { short: "Сб", index: 6 },
  { short: "Нд", index: 7 },
];

export const deliveryDisclaimer =
  "Точний склад партії та час приймання уточнюйте в Telegram. Дні поставок — з оптового брифу; у відкритому прайсі окремо не продубльовані.";
