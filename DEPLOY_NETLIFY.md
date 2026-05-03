# Деплой на Netlify (SSR)

Lovable-превью продолжает работать как раньше (Cloudflare через `vite.config.ts`).
Для Netlify используется отдельный конфиг — `vite.config.netlify.ts`.

## 1. Подключите проект к GitHub
В Lovable: **GitHub → Connect to GitHub** и запушьте репо.

## 2. Установите Netlify-адаптер
Локально (или через Lovable-чат) выполните:
```
bun add -d @tanstack/start-adapter-netlify
```

## 3. Добавьте в `package.json` скрипт
```json
"build:netlify": "vite build --config vite.config.netlify.ts"
```

## 4. На Netlify
1. **New site → Import from Git → выберите репо**.
2. Build command и publish dir подхватятся из `netlify.toml`.
3. В **Site settings → Environment variables** добавьте:
   - `VITE_SUPABASE_URL` = `https://krtbtybinjixvxkeqstx.supabase.co`
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = `eyJhbGciOi...` (anon key из `.env`)
   - `VITE_SUPABASE_PROJECT_ID` = `krtbtybinjixvxkeqstx`
   - `SUPABASE_URL` = то же, что и VITE_SUPABASE_URL
   - `SUPABASE_PUBLISHABLE_KEY` = то же, что и VITE_SUPABASE_PUBLISHABLE_KEY
   - `SUPABASE_SERVICE_ROLE_KEY` = service role key (взять в Lovable Cloud → Backend → API)
4. **Deploy site**.

## 5. Проверка
После деплоя откройте `https://<your-site>.netlify.app`, отправьте RSVP — запись должна появиться в БД.

## Важно
- Не удаляйте `vite.config.ts` и `wrangler.jsonc` — они нужны для Lovable-превью.
- Если что-то сломается на Netlify, смотрите логи в **Deploys → конкретный деплой → Deploy log** и **Functions log**.
