## Цель
После успешной отправки RSVP-формы автоматически отправлять уведомление в общий Telegram-чат через бота.

## Подход
Используем **прямой Telegram Bot API** (не Lovable connector), чтобы решение работало и в Lovable Cloud, и при деплое на VPS. Вызов делается с сервера (TanStack server function), чтобы токен бота не утекал в браузер.

## Шаги реализации

### 1. Подготовка (от пользователя)
- Создать бота через **@BotFather** → получить `BOT_TOKEN`.
- Добавить бота в нужный групповой чат, дать ему право отправлять сообщения.
- Узнать `chat_id` группы (через `https://api.telegram.org/bot<TOKEN>/getUpdates` после любого сообщения в группе — обычно начинается с `-100...`).

### 2. Секреты
Добавить через secrets tool:
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

### 3. Server function
Создать `src/lib/telegram.functions.ts`:
- `createServerFn({ method: "POST" })`
- `inputValidator` через zod: `guest_name`, `attending`, `guests_count`, `message?` с лимитами длины.
- `handler`: читает `process.env.TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID`, форматирует сообщение (HTML-escape для имени и текста гостя), делает `fetch` на `https://api.telegram.org/bot<TOKEN>/sendMessage` с `parse_mode: "HTML"`.
- Ошибки логируются на сервер, но НЕ ломают пользовательский UX (RSVP уже сохранён в БД).

Пример формата сообщения:
```
🎉 Новый RSVP
Имя: Анна
Статус: ✅ придёт
Гостей: 2
Сообщение: «увидимся!»
```
Для отказа:
```
💌 Новый RSVP
Имя: Пётр
Статус: ❌ не сможет
```

### 4. Интеграция в форму
В `src/components/RsvpForm.tsx` после успешного `supabase.from("rsvps").insert(...)`:
- Вызвать server function через `useServerFn(notifyRsvp)` (импорт через статический import из `.functions.ts`).
- Обернуть в `try/catch` с тихим логом — если Telegram упал, пользователь всё равно увидит экран благодарности.

### 5. Проверка
- Отправить тестовый RSVP из preview → убедиться, что сообщение пришло в группу.
- Проверить SSR-логи через `stack_modern--server-function-logs` при ошибках.

## Что НЕ меняется
- Схема БД, RLS, верстка формы, экран "спасибо", Countdown — всё остаётся как есть.

## Риски / нюансы
- `TELEGRAM_CHAT_ID` для супергрупп — отрицательное число с префиксом `-100`. Передавать как строку.
- Нужно экранировать `<`, `>`, `&` в пользовательских строках перед `parse_mode: HTML`.
- При деплое на VPS секреты те же `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` — переносятся в `.env` сервера, код не меняется.
