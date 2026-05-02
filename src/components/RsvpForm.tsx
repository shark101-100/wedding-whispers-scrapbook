import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import rings from "@/assets/rings.png";

const schema = z.object({
  guest_name: z
    .string()
    .trim()
    .min(2, "Укажите имя")
    .max(100, "Слишком длинное имя"),
  attending: z.boolean(),
  guests_count: z.number().int().min(1).max(10),
  message: z.string().trim().max(500, "Не больше 500 символов").optional(),
});

export function RsvpForm() {
  const [attending, setAttending] = useState<boolean | null>(null);
  const [name, setName] = useState("");
  const [count, setCount] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (attending === null) {
      toast.error("Выберите вариант ответа");
      return;
    }

    const parsed = schema.safeParse({
      guest_name: name,
      attending,
      guests_count: attending ? count : 0,
      message: message || undefined,
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Проверьте поля");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("rsvps").insert({
      guest_name: parsed.data.guest_name,
      attending: parsed.data.attending,
      guests_count: parsed.data.guests_count,
      message: parsed.data.message ?? null,
    });
    setLoading(false);

    if (error) {
      toast.error("Не удалось отправить. Попробуйте ещё раз");
      return;
    }

    setDone(true);
    toast.success("Спасибо! Ответ записан ♡");
  }

  if (done) {
    return (
      <div className="text-center py-6">
        <img
          src={rings}
          alt=""
          width={512}
          height={512}
          loading="lazy"
          className="mx-auto w-20 opacity-85 animate-sketch-in animate-float"
        />
        <p
          className="mt-3 font-script text-3xl text-burgundy animate-paper-in"
          style={{ animationDelay: "150ms" }}
        >
          спасибо!
        </p>
        <p
          className="mt-2 font-hand text-xl text-forest animate-paper-in"
          style={{ animationDelay: "300ms" }}
        >
          {attending
            ? "ждём встречи с вами ♡"
            : "будем скучать — обнимаем"}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 text-left">
      <div>
        <label className="font-hand text-lg text-forest block mb-1">
          ваше имя
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          placeholder="Анна и Пётр"
          className="w-full bg-transparent border-0 border-b-2 border-dashed border-ink/40 focus:border-burgundy focus:outline-none py-2 font-serif-display text-lg text-ink placeholder:text-ink/30 transition-colors"
          required
        />
      </div>

      <div>
        <p className="font-hand text-lg text-forest mb-2">придёте?</p>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setAttending(true)}
            className={`py-3 border-2 font-hand text-xl rounded-sm tilt-hover ${
              attending === true
                ? "bg-burgundy text-primary-foreground border-burgundy animate-stamp"
                : "border-burgundy text-burgundy hover:bg-burgundy/5"
            }`}
          >
            буду ♡
          </button>
          <button
            type="button"
            onClick={() => setAttending(false)}
            className={`py-3 border-2 border-dashed font-hand text-xl rounded-sm tilt-hover-r ${
              attending === false
                ? "bg-forest text-accent-foreground border-forest animate-stamp"
                : "border-forest text-forest hover:bg-forest/5"
            }`}
          >
            не смогу
          </button>
        </div>
      </div>

      {attending === true && (
        <div className="animate-paper-in">
          <label className="font-hand text-lg text-forest block mb-2">
            сколько вас будет?
          </label>
          <div className="flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => setCount((c) => Math.max(1, c - 1))}
              className="h-10 w-10 rounded-full border-2 border-burgundy font-hand text-2xl text-burgundy leading-none transition-transform active:scale-90 hover:-rotate-3"
              aria-label="меньше"
            >
              −
            </button>
            <span
              key={count}
              className="font-script text-4xl text-burgundy w-12 text-center animate-pop inline-block"
            >
              {count}
            </span>
            <button
              type="button"
              onClick={() => setCount((c) => Math.min(10, c + 1))}
              className="h-10 w-10 rounded-full border-2 border-burgundy font-hand text-2xl text-burgundy leading-none transition-transform active:scale-90 hover:rotate-3"
              aria-label="больше"
            >
              +
            </button>
          </div>
        </div>
      )}

      <div>
        <label className="font-hand text-lg text-forest block mb-1">
          пара слов <span className="text-ink/40 text-sm">(не обязательно)</span>
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
          rows={3}
          placeholder="пожелания, аллергии, что угодно…"
          className="w-full bg-transparent border-2 border-dashed border-ink/30 focus:border-burgundy focus:outline-none p-3 font-serif-display text-ink placeholder:text-ink/30 resize-none rounded-sm"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="block w-full rounded-sm border-2 border-burgundy bg-burgundy py-3 font-hand text-xl text-primary-foreground transition hover:bg-burgundy/90 disabled:opacity-60"
      >
        {loading ? "отправляем…" : "отправить ответ"}
      </button>
    </form>
  );
}
