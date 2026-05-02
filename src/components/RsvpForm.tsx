import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import rings from "@/assets/rings.png";
import heart from "@/assets/heart.png";
import florals from "@/assets/florals.png";
import rose from "@/assets/rose.png";

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

  const doneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (done && doneRef.current) {
      doneRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [done]);

  if (done) {
    const isYes = attending === true;
    const firstName = name.trim().split(/\s+/)[0] || "друг";

    return (
      <div ref={doneRef} className="relative -mx-2 sm:-mx-4 py-4">
        {/* floating sketch decorations */}
        <img
          src={florals}
          alt=""
          width={768}
          height={1024}
          aria-hidden
          className="pointer-events-none absolute -top-6 -left-4 w-24 opacity-60 -rotate-[14deg] animate-float-slow"
        />
        <img
          src={rose}
          alt=""
          width={512}
          height={640}
          aria-hidden
          className="pointer-events-none absolute -bottom-4 -right-3 w-20 opacity-60 rotate-[10deg] animate-float"
        />

        {/* main card — like a postage envelope */}
        <div
          className="relative mx-auto max-w-sm bg-card px-6 pt-10 pb-7 shadow-[0_10px_30px_-14px_oklch(0_0_0/0.22)] animate-paper-in"
          style={{ transform: "rotate(-1.4deg)" }}
        >
          <span className="tape -top-3 left-1/2 -translate-x-1/2" />

          {/* "stamp" corner */}
          <div
            className="absolute -top-4 -right-3 h-16 w-14 border-2 border-dashed border-burgundy/70 bg-background flex flex-col items-center justify-center text-center rotate-[8deg] shadow-sm"
            style={{ animationDelay: "350ms" }}
          >
            <span className="font-marker text-[0.55rem] uppercase tracking-widest text-burgundy/80 leading-none">
              почта
            </span>
            <img
              src={heart}
              alt=""
              width={512}
              height={512}
              aria-hidden
              className="w-7 mt-1 opacity-80"
            />
            <span className="font-marker text-[0.55rem] tracking-widest text-burgundy/80 leading-none mt-1">
              А·М
            </span>
          </div>

          {/* rings illustration */}
          <img
            src={rings}
            alt=""
            width={512}
            height={512}
            loading="lazy"
            className="mx-auto w-24 opacity-90 animate-sketch-in animate-float"
          />

          {/* hand-drawn divider */}
          <div
            className="mx-auto mt-3 h-3 w-32 ink-line animate-ink-draw"
            style={{ animationDelay: "300ms" }}
          />

          <p
            className="mt-4 text-center font-script text-4xl text-burgundy animate-paper-in"
            style={{ animationDelay: "150ms" }}
          >
            спасибо!
          </p>

          <p
            className="mt-3 text-center font-hand text-xl text-forest animate-paper-in"
            style={{ animationDelay: "280ms" }}
          >
            {firstName}, ответ записан
          </p>

          <p
            className="mx-auto mt-3 max-w-[18rem] text-center font-serif-display text-ink/80 leading-relaxed animate-paper-in"
            style={{ animationDelay: "420ms" }}
          >
            {isYes
              ? "будем считать дни до встречи — приготовьте удобную обувь и хорошее настроение"
              : "очень жаль, что не сможете быть рядом — обнимаем крепко и сохраним для вас кусочек торта в сердце"}
          </p>

          {/* mini "ticket" stub for guests going */}
          {isYes && (
            <div
              className="relative mx-auto mt-6 max-w-[18rem] border-2 border-dashed border-forest/50 bg-background/60 px-4 py-3 animate-paper-in"
              style={{ transform: "rotate(0.8deg)", animationDelay: "550ms" }}
            >
              <p className="font-marker text-[0.65rem] uppercase tracking-[0.25em] text-forest/70 text-center">
                ваш билет в наш день
              </p>
              <div className="mt-2 flex items-center justify-around text-center">
                <div>
                  <p className="font-marker text-[0.6rem] uppercase tracking-widest text-ink/55">
                    гостей
                  </p>
                  <p className="font-script text-2xl text-burgundy leading-none mt-0.5">
                    {count}
                  </p>
                </div>
                <span className="h-8 w-px border-l border-dashed border-forest/40" />
                <div>
                  <p className="font-marker text-[0.6rem] uppercase tracking-widest text-ink/55">
                    дата
                  </p>
                  <p className="font-script text-2xl text-burgundy leading-none mt-0.5">
                    14·09
                  </p>
                </div>
                <span className="h-8 w-px border-l border-dashed border-forest/40" />
                <div>
                  <p className="font-marker text-[0.6rem] uppercase tracking-widest text-ink/55">
                    в
                  </p>
                  <p className="font-script text-2xl text-burgundy leading-none mt-0.5">
                    16:00
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* signature */}
          <div
            className="mt-6 text-center animate-paper-in"
            style={{ animationDelay: "700ms" }}
          >
            <p className="font-script text-2xl text-burgundy leading-none">
              до встречи
            </p>
            <p className="mt-1 font-hand text-lg text-forest">
              А. & М. ♡
            </p>
          </div>
        </div>

        {/* small "sticky note" below */}
        <div
          className="relative mx-auto mt-6 max-w-[16rem] bg-beige/70 px-4 py-3 text-center shadow-[0_6px_18px_-12px_oklch(0_0_0/0.25)] animate-paper-in"
          style={{ transform: "rotate(2.4deg)", animationDelay: "850ms" }}
        >
          <span className="tape -top-2 left-1/2 -translate-x-1/2" style={{ width: 50, height: 16 }} />
          <p className="font-hand text-base text-ink/80 leading-snug">
            если планы изменятся —<br />
            <button
              type="button"
              onClick={() => {
                setDone(false);
              }}
              className="ink-link font-hand text-burgundy"
            >
              изменить ответ
            </button>
          </p>
        </div>
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
        className="wiggle-hover block w-full rounded-sm border-2 border-burgundy bg-burgundy py-3 font-hand text-xl text-primary-foreground hover:bg-burgundy/90 disabled:opacity-60 active:scale-[0.98]"
      >
        {loading ? "отправляем…" : "отправить ответ"}
      </button>
    </form>
  );
}
