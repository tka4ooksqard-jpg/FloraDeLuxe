# Flora de Luxe Kyiv OPT

Сайт оптового напрямку квіткової компанії Flora de Luxe у Києві. B2B-продукт для
квіткових магазинів, флористів, декораторів, весільних агенцій та HoReCa.

Next.js App Router · React 19 · TypeScript · Tailwind CSS v4 · Radix UI · pnpm

## Запуск

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Скрипти

| Команда | Призначення |
| --- | --- |
| `pnpm dev` | Локальний сервер розробки |
| `pnpm build` | Production-збірка |
| `pnpm start` | Запуск production-збірки |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm placeholders` | Перегенерація тимчасової графіки в `public/images` |
| `pnpm qa` | Прогін браузерного аудиту по всіх сторінках і брейкпоінтах |

`pnpm qa` очікує запущений `pnpm dev` і встановлений Chrome. Скрипт перевіряє
горизонтальний скрол, розміри тач-таргетів, биті зображення, кількість `h1`,
а також мобільне меню, акордеон, діалог галереї та форму заявки.

## Структура

```
public/
  images/            тимчасова брендова графіка + README зі списком потрібних фото
  videos/warehouse/  місце для відео зі складу
scripts/
  generate-placeholders.mjs   генератор тимчасової графіки
  qa.mjs                      браузерний аудит
src/
  app/               маршрути, metadata, sitemap, robots, manifest, іконки, OG
  components/
    common/          Reveal, SectionHeading, CTA, картки, PageHero, Icon
    layout/          Header, Footer, BrandMark
    sections/        секції сторінок
    seo/             JSON-LD
    ui/              Button, Accordion, Dialog, Sheet, поля форми
  lib/
    site-config.ts     назва, URL, SEO-дефолти, локаль, прапорець `isDemo`
    contact-config.ts  адреса, Telegram, телефон, комерційні умови
    content/           увесь текстовий контент, типізований
    validation/        Zod-схема форми
    actions/           Server Action форми
    seo.ts             metadata-хелпери та схеми JSON-LD
```

Увесь текст живе в `src/lib/content` — у JSX немає жодного «зашитого» рядка
контенту. Telegram-URL визначено рівно один раз, у `contact-config.ts`.

## Що треба зробити перед публікацією

Повний чеклист для власника: `docs/CLIENT-APPROVAL-CHECKLIST.md`.  
Медіа: `docs/MEDIA-APPROVAL-CHECKLIST.md`.

1. **Підтвердити контакти, адресу, графік і комерційні цифри** з власником.
2. **Замінити згенеровані фото/відео** на матеріали компанії. Див. також
   `public/images/README.md`.
3. **Замінити демонстраційні відгуки** в `src/lib/content/reviews.ts`
   і виставити `reviewsAreDemo = false`.
4. **Підключити доставку заявок** у `deliverLead()` (`src/lib/actions/submit-lead.ts`).
   Поки `siteConfig.isDemo = true`, форма лише перевіряє дані і показує
   тестове повідомлення — без збереження й зовнішньої відправки.
5. **Вимкнути демо-режим:** `siteConfig.isDemo = false` (після пунктів 3–4) —
   прибирає позначку в підвалі та вмикає «живий» success-шлях форми.
6. **Задати домен:** змінна оточення `NEXT_PUBLIC_SITE_URL` (canonical,
   sitemap, robots, JSON-LD). Без неї використовується запасний URL з
   `site-config.ts`.

## Локалізація

Сайт одномовний (українська). Локаль винесена в `siteConfig.locale` /
`LOCALES`, а весь текст — у `src/lib/content`, тож додати `[locale]`-сегмент
можна без переписування компонентів.
