## Увеличение размеров текста для мобильных

Цель: повысить читаемость на мобильных. На десктопе (`sm:`) оставить текущие размеры через `sm:`-overrides, чтобы не ломать вёрстку.

### Изменения в `src/routes/index.tsx`

| Элемент | Было | Стало (mobile → sm:) |
|---|---|---|
| Заголовок «— с радостью приглашаем —» | `text-2xl` | `text-3xl sm:text-2xl` |
| Имена «Виктория & Егор» | `text-[2.6rem]` | `text-[3.2rem] sm:text-[2.6rem]` |
| «&» между именами | `text-3xl` | `text-4xl sm:text-3xl` |
| «Зовём вас праздновать…» | `text-xl` | `text-2xl sm:text-xl` |
| «сохраните дату» | `text-lg` | `text-xl sm:text-lg` |
| Дата дни «вс / в» | `text-sm` | `text-base sm:text-sm` |
| Дата числа «5 / 15:30» | `text-3xl` | `text-4xl sm:text-3xl` |
| «июля» | `text-2xl` | `text-3xl sm:text-2xl` |
| «2026» | `text-xl` | `text-2xl sm:text-xl` |
| «наша история» | `text-3xl` | `text-4xl sm:text-3xl` |
| Текст истории | `text-[1.05rem]` | `text-[1.18rem] sm:text-[1.05rem]` |
| «…и хотим, чтобы вы были рядом ♡» | `text-xl` | `text-2xl sm:text-xl` |
| «Тайминг» | `text-4xl` | `text-5xl sm:text-4xl` |
| Тайминг подписи (title) | `text-base` | `text-lg sm:text-base` |
| Тайминг note | `text-xs sm:text-sm` | `text-sm sm:text-sm` |
| «место встречи» | `text-xl` | `text-2xl sm:text-xl` |
| «гостиница Ариадна» | `text-2xl` | `text-3xl sm:text-2xl` |
| Адрес | (default) | `text-lg sm:text-base` |
| «открыть на карте →» | `text-lg` | `text-xl sm:text-lg` |
| «дресс-код» | `text-3xl` | `text-4xl sm:text-3xl` |
| Описание дресс-кода | (default) | `text-lg sm:text-base` |
| «бордо · олива · бежевый» | `text-xl` | `text-2xl sm:text-xl` |
| «подтвердите участие» | `text-3xl` | `text-4xl sm:text-3xl` |
| «ответьте, пожалуйста…» | (default) | `text-lg sm:text-base` |
| Footer «до встречи» | `text-2xl` | `text-3xl sm:text-2xl` |
| Footer «В. & Е.» | `text-xl` | `text-2xl sm:text-xl` |

Размеры тайминга `text-5xl` для времени остаются — они уже крупные.

### Также — `src/components/RsvpForm.tsx`
Просмотреть и пропорционально увеличить размеры подписей/инпутов для мобильных (label/input → `text-base sm:text-sm` и т.п.).

После внесения изменений — визуальная проверка на мобильном вьюпорте (375px).
