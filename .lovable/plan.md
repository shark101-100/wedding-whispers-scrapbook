## Исправление шрифтов на iOS

### Причина
В `src/styles.css` `@import url('...fonts.googleapis.com...')` идёт после `@import "tailwindcss"`. По спецификации CSS `@import` должны быть первыми — иначе игнорируются. iOS Safari соблюдает это строго, поэтому Marck Script и Caveat не подгружаются и рендерится системный курсив.

### Изменения

**1. `src/routes/__root.tsx`** — добавить в массив `links`:
```ts
{ rel: "preconnect", href: "https://fonts.googleapis.com" },
{ rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
{
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Marck+Script&display=swap",
},
```

**2. `src/styles.css`** — удалить строку 5:
```css
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Marck+Script&display=swap');
```
