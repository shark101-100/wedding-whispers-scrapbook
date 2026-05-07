import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  guest_name: z.string().trim().min(1).max(100),
  attending: z.boolean(),
  guests_count: z.number().int().min(0).max(10),
  message: z.string().trim().max(500).optional().nullable(),
});

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export const notifyRsvp = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      console.error("Telegram secrets are not configured");
      return { ok: false, error: "telegram_not_configured" };
    }

    const name = escapeHtml(data.guest_name);
    const lines: string[] = [];
    if (data.attending) {
      lines.push("🎉 <b>Новый RSVP</b>");
      lines.push(`Имя: <b>${name}</b>`);
      lines.push(`Статус: ✅ придёт`);
      lines.push(`Гостей: <b>${data.guests_count}</b>`);
    } else {
      lines.push("💌 <b>Новый RSVP</b>");
      lines.push(`Имя: <b>${name}</b>`);
      lines.push(`Статус: ❌ не сможет`);
    }
    if (data.message) {
      lines.push(`Сообщение: «${escapeHtml(data.message)}»`);
    }

    try {
      const proxyUrl = process.env.TELEGRAM_PROXY_URL;
      let fetchImpl: typeof fetch = fetch;
      let dispatcher: unknown = undefined;
      if (proxyUrl) {
        const undici = await import("undici");
        fetchImpl = undici.fetch as unknown as typeof fetch;
        if (/^socks/i.test(proxyUrl)) {
          const { SocksProxyAgent } = await import("socks-proxy-agent");
          // socks-proxy-agent совместим с undici как Dispatcher через wrapper:
          // используем undici.Agent с connect через socks
          const { socksDispatcher } = await import("fetch-socks");
          // Парсим URL: socks5://user:pass@host:port
          const u = new URL(proxyUrl);
          dispatcher = socksDispatcher({
            type: 5,
            host: u.hostname,
            port: Number(u.port) || 1080,
            userId: decodeURIComponent(u.username) || undefined,
            password: decodeURIComponent(u.password) || undefined,
          });
          // SocksProxyAgent импортирован для совместимости, но не используется
          void SocksProxyAgent;
        } else {
          dispatcher = new undici.ProxyAgent(proxyUrl);
        }
      }

      const res = await fetchImpl(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: lines.join("\n"),
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
        ...(dispatcher ? { dispatcher } : {}),
      } as RequestInit);
      if (!res.ok) {
        const body = await res.text();
        console.error(`Telegram sendMessage failed [${res.status}]: ${body}`);
        return { ok: false, error: `telegram_${res.status}` };
      }
      return { ok: true };
    } catch (e) {
      console.error("Telegram sendMessage threw:", e);
      return { ok: false, error: "telegram_exception" };
    }
  });
