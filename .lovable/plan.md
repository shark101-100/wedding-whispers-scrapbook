## Цель

Уйти от рукописных шрифтов (Marck Script, Caveat) — они плохо читаются, особенно на мобильных и в длинных русских текстах. Заменить на элегантные печатные шрифты с хорошей кириллицей, сохранив тёплый «свадебно-винтажный» характер.

## Новые шрифты (Google Fonts)

- **Cormorant Garamond** (400, 500, 600, italic) — элегантный сериф для имён, заголовков и крупных акцентов. Заменяет `Marck Script`.
- **Lora** (400, 500, 600, italic) — мягкий читаемый сериф для подписей и коротких акцентов. Заменяет `Caveat`.
- **Inter** (400, 500) — чистый sans для основного текста, абзацев истории, адресов, форм.

Все три отлично поддерживают кириллицу.

## Изменения в `src/routes/__root.tsx`

Заменить ссылку на Google Fonts:

```
https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500&display=swap
```

## Изменения в `src/styles.css`

В `:root`:
- `--font-script: 'Cormorant Garamond', ui-serif, Georgia, serif;` (было Marck Script)
- `--font-hand: 'Lora', ui-serif, Georgia, serif;` (было Caveat)
- `--font-marker: 'Inter', system-ui, sans-serif;` — uppercase акценты (мелкие подписи)
- `--font-serif: 'Inter', system-ui, sans-serif;` — основной текст

В `@layer utilities`:
- `.font-script` — `font-weight: 500; letter-spacing: 0.01em;` (элегантный сериф)
- `.font-hand` — `font-weight: 500; font-style: italic;` (мягкий курсив для акцентов)
- `.font-marker` — `font-weight: 500; letter-spacing: 0.18em;` (uppercase подписи)
- `.font-serif-display` — `font-family: var(--font-serif); font-weight: 400;`

## Что меняется визуально

| Класс | Было | Стало |
|---|---|---|
| `font-script` (имена, крупные цифры, заголовки) | рукописный Marck Script | элегантный сериф Cormorant Garamond |
| `font-hand` («&», подписи, акценты) | рукописный Caveat | курсивный Lora italic |
| `font-marker` (мелкие uppercase подписи) | Caveat | Inter uppercase |
| `font-serif-display` (абзацы) | системный сериф | Inter sans |

## В `src/routes/index.tsx`

Структуру не трогаем — все классы (`font-script`, `font-hand`, `font-marker`, `font-serif-display`) остаются, меняется только то, какие шрифты под ними. Это даёт согласованную замену в одной точке.

## В `src/components/RsvpForm.tsx`

Проверить — формы будут автоматически использовать новый Inter (через `font-serif`). Дополнительных правок, скорее всего, не нужно.

## Результат

Сайт сохранит «винтажно-свадебный» характер за счёт изящного серифа Cormorant в именах и заголовках, но весь информационный текст станет в разы читаемее. Курсивный Lora добавит мягкости в местах, где раньше был рукописный Caveat — без потери теплоты.