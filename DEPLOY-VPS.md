# Деплой и эксплуатация на VPS

## Проблема: форма не работает без VPN

Браузер ходит в Supabase напрямую на `*.supabase.co`. У части провайдеров (РФ/Беларусь) этот домен блокируется.
Сайт открывается, потому что HTML отдаёт VPS, а fetch к Supabase идёт мимо — напрямую с устройства.

## Решение: проксировать Supabase через VPS

VPS у вас доступен из РФ — пустим запросы к Supabase через него.
**Важно:** делается только в ветке `VPS`. В `main` (Lovable) ничего не трогаем.

### 1. nginx — добавить прокси

В конфиг сайта (тот же, что отдаёт Node SSR), внутри `server { ... }`:

```nginx
location /sb/ {
    proxy_pass https://krtbtybinjixvxkeqstx.supabase.co/;
    proxy_set_header Host krtbtybinjixvxkeqstx.supabase.co;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_ssl_server_name on;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 60s;
}
```

Применить:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

После этого `https://ваш-домен/sb/rest/v1/rsvps` ≡ `https://krtbtybinjixvxkeqstx.supabase.co/rest/v1/rsvps`.

### 2. .env на VPS

См. шаблон `.env.vps.example`. Ключевое:

```
VITE_SUPABASE_URL="https://ваш-домен/sb"
SUPABASE_URL="https://krtbtybinjixvxkeqstx.supabase.co"
```

- `VITE_*` уходит в браузер → ходит на ваш домен → nginx → Supabase.
- `SUPABASE_*` остаётся серверным → может ходить напрямую (у VPS блокировок нет).

Никаких правок в `src/integrations/supabase/client.ts` не нужно — он читает `VITE_SUPABASE_URL`.

### 3. Пересобрать и перезапустить

```bash
npm ci
npm run build
pm2 restart all
```

### 4. Проверка

Открыть сайт **без VPN**, отправить форму. В DevTools → Network запрос
должен уйти на `ваш-домен/sb/rest/v1/rsvps` со статусом 201.

---

## Синхронизация с веткой main

```bash
git checkout VPS
git fetch origin
git merge origin/main
```

При мерже следить за:

- `.env` — должен сохранять `VITE_SUPABASE_URL=https://ваш-домен/sb`.
  Удобно держать отдельно `.env.vps` и копировать его поверх:
  `cp .env.vps .env`.
- `vite.config.ts` — сохранить плагин `nitro()`.
- `package.json` — сохранить скрипт `start` и зависимости `nitro`/`pm2`.

Затем:

```bash
npm ci
npm run build
pm2 restart all
```

## Альтернативы

1. **Custom Domain в Supabase** (Pro-план) — Supabase отдаст вам CNAME на свой
   домен, блокировок нет. Без прокси.
2. **Свой бэкенд-эндпоинт** — server function на VPS принимает форму и пишет в
   Supabase service-role ключом. Полностью убирает Supabase из браузера, но
   требует переписывать код формы.
