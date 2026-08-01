export type Review = {
  readonly id: string;
  /** Generic business descriptor — no invented company names or people. */
  readonly business: string;
  readonly city: string;
  readonly clientType: string;
  readonly text: string;
  /** Optional photo of the client's retail point, added by the client later. */
  readonly photo: null;
};

/**
 * DEMONSTRATION CONTENT.
 *
 * These entries describe typical wholesale scenarios and are labelled as
 * demo in the UI. They carry no real names, no company logos, no star
 * ratings and no Google review data, and they are deliberately excluded from
 * structured data so search engines never treat them as genuine reviews.
 * Replace the array with confirmed testimonials before production.
 */
export const reviewsAreDemo = true;

export const reviews: readonly Review[] = [
  {
    id: "demo-1",
    business: "Квітковий магазин",
    city: "Київ",
    clientType: "Роздрібний магазин",
    text: "Регулярні дні поставок дозволяють планувати закупівлю наперед і не тримати зайвих залишків на вітрині.",
    photo: null,
  },
  {
    id: "demo-2",
    business: "Студія флористики",
    city: "Київ",
    clientType: "Флорист",
    text: "Зручно узгоджувати позиції в Telegram: наявність підтверджують до оплати, тож не доводиться переробляти замовлення.",
    photo: null,
  },
  {
    id: "demo-3",
    business: "Декор-агенція",
    city: "Київ",
    clientType: "Декоратор",
    text: "Для оформлення заходів важливий обсяг і стабільна якість зелені — саме це закривають п’ятничні поставки.",
    photo: null,
  },
  {
    id: "demo-4",
    business: "Весільна агенція",
    city: "Київська область",
    clientType: "Весільне агентство",
    text: "Заздалегідь погоджуємо палітру та кількість, а перед подією отримуємо підтвердження щодо кожної позиції.",
    photo: null,
  },
  {
    id: "demo-5",
    business: "Ресторан",
    city: "Київ",
    clientType: "HoReCa",
    text: "Щотижневе оформлення залу потребує передбачуваності — графік поставок і доставка по місту це забезпечують.",
    photo: null,
  },
  {
    id: "demo-6",
    business: "Мережа квіткових точок",
    city: "Київ",
    clientType: "Мережевий клієнт",
    text: "Кілька поставок на тиждень дають змогу тримати свіжий асортимент одразу на кількох точках.",
    photo: null,
  },
];

export const reviewsDisclaimer =
  "Демонстраційні відгуки. Вони описують типові сценарії співпраці та будуть замінені реальними відгуками клієнтів.";
