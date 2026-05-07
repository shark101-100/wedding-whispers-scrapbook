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
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: lines.join("\n"),
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      });
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
