# Зображення / Images

Більшість слотів заповнені **реальними фото** з публічного Telegram-каналу
опту [`@floradeluxekyiv_opt`](https://t.me/floradeluxekyiv_opt)
(скрипт `scripts/import-opt-media.mjs`).

## Замінено реальними фото OPT

| Файл | Джерело / зміст |
| --- | --- |
| `hero/wholesale-hall.webp` | Оптові пачки троянд |
| `categories/roses.webp` | Троянди в пачках |
| `categories/chrysanthemums.webp` | Оптова пачка (dedicated хризантема-пост не знайдено в недавній стрічці — reuse) |
| `categories/exotic.webp` | Акцентна / екзотична позиція |
| `categories/greenery.webp` | Декоративна зелень |
| `categories/seasonal.webp` | Танацетум Голландія |
| `suppliers/netherlands.webp` | Танацетум / голландський напрямок |
| `suppliers/ecuador.webp` | Преміальна троянда (серія «Е») |
| `suppliers/ukraine.webp` | Оптові пачки |
| `suppliers/armenia.webp` | Кущові / спрей-троянди |
| `about/hall.webp`, `about/craft.webp` | Оптові пачки з каналу |
| `warehouse/*.webp` | Продуктові кадри з каналу (не інтер’єр складу) |
| `og/cover.webp` | Обкладинка з оптового кадру |

## Ще очікує матеріал

- `public/videos/warehouse/walkthrough.mp4` — відео зі складу

## Порядок оновлення

1. Додайте або перезапустіть `node scripts/import-opt-media.mjs`.
2. Оновіть `alt` у `src/lib/content/*.ts`.
3. Для Hero — перегенеруйте `blurDataURL` (див. `src/lib/content/media.ts`).
