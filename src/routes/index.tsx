import { createFileRoute } from "@tanstack/react-router";
import florals from "@/assets/florals.png";
import glasses from "@/assets/glasses.png";
import bouquet from "@/assets/bouquet.png";
import rings from "@/assets/rings.png";
import rose from "@/assets/rose.png";
import heart from "@/assets/heart.png";
import { RsvpForm } from "@/components/RsvpForm";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  component: Invitation,
  head: () => ({
    meta: [
      { title: "Анна & Михаил — приглашение на свадьбу" },
      {
        name: "description",
        content:
          "С любовью приглашаем вас разделить с нами день нашей свадьбы — 14 сентября 2026 года.",
      },
      { property: "og:title", content: "Анна & Михаил — наша свадьба" },
      {
        property: "og:description",
        content: "14 сентября 2026 — будем счастливы видеть вас рядом.",
      },
    ],
  }),
});

function PolaroidNote({
  children,
  rotate = "-2deg",
  className = "",
}: {
  children: React.ReactNode;
  rotate?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative bg-card px-6 py-7 shadow-[0_8px_24px_-12px_oklch(0_0_0/0.18)] ${className}`}
      style={{ transform: `rotate(${rotate})` }}
    >
      <span className="tape -top-2 left-1/2 -translate-x-1/2" />
      {children}
    </div>
  );
}

function Invitation() {
  return (
    <main className="min-h-screen overflow-hidden">
      <div className="mx-auto w-full max-w-md px-5 pb-24 pt-10 sm:max-w-lg sm:px-8">

        {/* Header */}
        <header className="relative text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-forest">
            — с радостью приглашаем —
          </p>

          <div className="relative mt-6">
            <img
              src={florals}
              alt=""
              width={768}
              height={1024}
              className="mx-auto w-44 opacity-80 deco-rotate-left"
            />
            <h1 className="mt-3 text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-burgundy">
              Анна
              <span className="block py-1 text-2xl font-semibold text-forest">&</span>
              Михаил
            </h1>
            <div className="mx-auto mt-4 h-3 w-40 ink-line" />
          </div>

          <p className="mx-auto mt-6 max-w-xs text-base font-normal leading-relaxed text-ink/80">
            наконец-то решились<br />
            и зовём вас праздновать<br />
            самый важный день
          </p>
        </header>

        {/* Date card */}
        <section className="relative mt-14">
          <PolaroidNote rotate="-1.5deg">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-forest">
              сохраните дату
            </p>
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="text-center">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-ink/60">пн</p>
                <p className="text-3xl font-extrabold text-burgundy">14</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-ink leading-none">сентября</p>
                <p className="mt-1 text-base font-extrabold text-forest">2026</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-ink/60">в</p>
                <p className="text-3xl font-extrabold text-burgundy">16:00</p>
              </div>
            </div>
          </PolaroidNote>
          <img
            src={heart}
            alt=""
            width={512}
            height={512}
            loading="lazy"
            className="absolute -bottom-6 -right-2 w-16 rotate-12 opacity-70"
          />
        </section>

        {/* Story */}
        <section className="relative mt-20 text-center">
          <img
            src={rose}
            alt=""
            width={512}
            height={640}
            loading="lazy"
            className="mx-auto w-24 opacity-80 deco-rotate-right"
          />
          <h2 className="mt-3 text-2xl font-extrabold uppercase tracking-tight text-burgundy">
            наша история
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-[0.95rem] font-normal leading-relaxed text-ink/85">
            Семь лет, тысяча чашек кофе, два переезда и один маленький рыжий кот спустя —
            мы поняли, что хотим праздновать всё это вместе. Всегда.
          </p>
          <p className="mt-4 text-base font-semibold text-forest">
            …и хотим, чтобы вы были рядом ♡
          </p>
        </section>

        {/* Schedule */}
        <section className="relative mt-20">
          <h2 className="text-center text-2xl font-extrabold uppercase tracking-tight text-burgundy">
            программа дня
          </h2>
          <div className="mx-auto mt-2 h-3 w-32 ink-line" />

          <ul className="mt-8 space-y-6">
            {[
              { time: "16:00", title: "церемония", note: "в саду, под старой яблоней" },
              { time: "17:00", title: "фуршет & фото", note: "шампанское и объятия" },
              { time: "19:00", title: "ужин", note: "длинный стол при свечах" },
              { time: "21:00", title: "танцы до утра", note: "обещаем медляки" },
            ].map((item) => (
              <li key={item.time} className="relative flex items-start gap-5">
                <div className="shrink-0">
                  <p className="text-xl font-extrabold leading-none text-burgundy">
                    {item.time}
                  </p>
                </div>
                <div className="border-l-2 border-dashed border-forest/40 pl-4">
                  <p className="text-base font-semibold uppercase tracking-wide leading-tight text-forest">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm font-normal text-ink/70">
                    {item.note}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <img
            src={glasses}
            alt=""
            width={512}
            height={512}
            loading="lazy"
            className="mx-auto mt-10 w-28 opacity-85"
          />
        </section>

        {/* Place */}
        <section className="relative mt-16">
          <PolaroidNote rotate="1.8deg">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-forest">
              место встречи
            </p>
            <p className="mt-3 text-center text-xl font-extrabold uppercase tracking-tight text-burgundy">
              усадьба «Старый сад»
            </p>
            <p className="mt-2 text-center text-sm font-normal text-ink/80">
              Подмосковье, дер. Орлово,<br />ул. Липовая аллея, 7
            </p>
            <a
              href="https://maps.google.com/?q=Подмосковье+Орлово+Липовая+аллея+7"
              target="_blank"
              rel="noreferrer"
              className="mt-4 block text-center text-sm font-semibold uppercase tracking-wider text-burgundy underline decoration-burgundy/40 underline-offset-4"
            >
              открыть на карте →
            </a>
          </PolaroidNote>
        </section>

        {/* Dress code */}
        <section className="relative mt-20 text-center">
          <img
            src={bouquet}
            alt=""
            width={512}
            height={640}
            loading="lazy"
            className="mx-auto w-28 opacity-85 deco-rotate-left"
          />
          <h2 className="mt-3 text-2xl font-extrabold uppercase tracking-tight text-burgundy">
            дресс-код
          </h2>
          <p className="mt-3 text-base font-semibold uppercase tracking-wider text-forest">
            бордо · олива · бежевый
          </p>
          <p className="mx-auto mt-3 max-w-xs text-sm font-normal text-ink/75">
            никакой строгости — только уют, мягкие ткани и улыбки
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            {["#6b2535", "#4a5d3a", "#c9b48a"].map((c) => (
              <span
                key={c}
                className="h-9 w-9 rounded-full border border-border/60 shadow-inner"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </section>

        {/* RSVP */}
        <section className="relative mt-20">
          <PolaroidNote rotate="-1.2deg">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold uppercase tracking-tight text-burgundy">
                подтвердите участие
              </h2>
              <p className="mt-2 text-sm font-normal text-ink/80">
                ответьте, пожалуйста, до{" "}
                <span className="font-extrabold text-burgundy">1 августа</span>
              </p>
            </div>
            <div className="mt-6">
              <RsvpForm />
            </div>
          </PolaroidNote>
        </section>

        {/* Footer */}
        <footer className="relative mt-20 text-center">
          <img
            src={heart}
            alt=""
            width={512}
            height={512}
            loading="lazy"
            className="mx-auto w-14 opacity-70 -rotate-12"
          />
          <p className="mt-2 text-xl font-extrabold uppercase tracking-tight text-burgundy">
            до встречи
          </p>
          <p className="text-base font-semibold text-forest">А. & М.</p>
          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/50">
            14 · 09 · 2026
          </p>
        </footer>
      </div>
      <Toaster position="top-center" />
    </main>
  );
}
