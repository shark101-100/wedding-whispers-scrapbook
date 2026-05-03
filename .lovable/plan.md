# Проблема

Форма пишет в Supabase напрямую из браузера на `krtbtybinjixvxkeqstx.supabase.co`. У ряда провайдеров (РФ/Беларусь и т.п.) домен `*.supabase.co` блокируется или отдаёт таймаут — поэтому без VPN запрос не уходит. Сам сайт открывается, потому что HTML отдаёт ваш VPS, а вот fetch к Supabase идёт мимо VPS, напрямую с устройства пользователя.

# Решение: проксировать Supabase через ваш VPS

Поскольку VPS у вас доступен из РФ (сайт же открывается), пустим обращения к Supabase через него. Браузер будет ходить на ваш домен, а VPS уже наружу — на Supabase.

Делаем это **только в ветке VPS**, чтобы не сломать Lovable preview (там должен оставаться прямой URL).

## Шаги

### 1. nginx: добавить location-прокси

В конфиге сайта на VPS (тот же, что отдаёт Node SSR), добавить:

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

После — `nginx -t && systemctl reload nginx`.

Теперь `https://ваш-домен/sb/rest/v1/rsvps` равнозначно `https://krtbtybinjixvxkeqstx.supabase.co/rest/v1/rsvps`.

### 2. В ветке VPS переопределить URL Supabase

В `.env` на VPS заменить:

```
VITE_SUPABASE_URL="https://ваш-домен/sb"
SUPABASE_URL="https://krtbtybinjixvxkeqstx.supabase.co"
```

- `VITE_SUPABASE_URL` (клиент, браузер) → ходит на ваш домен → nginx → Supabase.
- `SUPABASE_URL` (сервер, SSR/Node) → может ходить напрямую, у VPS блокировок нет.

Никаких изменений в `client.ts` не требуется — он уже читает `VITE_SUPABASE_URL`.

После правки `.env` пересобрать: `npm run build && pm2 restart all`.

### 3. Проверка

- Открыть сайт без VPN.
- В DevTools → Network отправить форму. Запрос должен уйти на `ваш-домен/sb/rest/v1/rsvps` со статусом 201.
- Если 401/403 — проверьте, что `VITE_SUPABASE_PUBLISHABLE_KEY` остался прежним.

## Важно

- **Только ветка VPS.** В `main` (Lovable) `.env` не трогаем — там Supabase должен оставаться прямой.
- При мерже `main → VPS` следите за `.env`: восстанавливайте свой `VITE_SUPABASE_URL` с `/sb`. Можно положить «эталонный» `.env.vps` в репо рядом и копировать его в `.env` после мержа.
- Realtime (websockets) тоже заработает через тот же `/sb/`, конфиг nginx выше уже включает `Upgrade`/`Connection` заголовки.
- HTTPS на вашем домене обязателен (Let's Encrypt / certbot), иначе Supabase-клиент в браузере не пойдёт по http.

## Альтернативы (если не хотите проксировать)

1. **Cloudflare перед Supabase** — добавить CNAME-домен через Custom Domain в Supabase (платная фича Pro-плана).
2. **Свой бэкенд-эндпоинт** — server function на VPS принимает форму и сама пишет в Supabase service role ключом. Больше кода, но полностью убирает Supabase из браузера.

Если подтвердите план — внесу правки в ветке VPS: обновлю инструкцию деплоя и подготовлю шаблон nginx-конфига и `.env.vps`.
