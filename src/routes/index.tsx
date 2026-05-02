import { createFileRoute } from "@tanstack/react-router";
import florals from "@/assets/florals.png";
import glasses from "@/assets/glasses.png";
import bouquet from "@/assets/bouquet.png";
import rings from "@/assets/rings.png";
import rose from "@/assets/rose.png";
import heart from "@/assets/heart.png";

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

        {/* Header sketch */}
        <header className="relative text-center">
          <p className="font-hand text-2xl text-forest tracking-wide">
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
            <h1 className="font-script text-[2.6rem] leading-[1.1] text-burgundy mt-2">
              Анна
              <span className="block font-hand text-3xl text-forest -my-1">&</span>
              Михаил
            </h1>
            <div className="mx-auto mt-3 h-3 w-40 ink-line" />
          </div>

          <p className="mt-6 font-hand text-xl text-ink/80 leading-snug">
            наконец-то решились<br />
            и зовём вас праздновать<br />
            самый важный день
          </p>
        </header>

        {/* Date card */}
        <section className="relative mt-14">
          <PolaroidNote rotate="-1.5deg">
            <p className="font-hand text-center text-lg text-forest">сохраните дату</p>
            <div className="mt-3 flex items-center justify-center gap-4">
              <div className="text-center">
                <p className="font-marker text-sm uppercase tracking-widest text-ink/60">пн</p>
                <p className="font-script text-3xl text-burgundy">14</p>
              </div>
              <div className="h-14 w-px bg-border" />
              <div className="text-center">
                <p className="font-script text-2xl text-ink leading-none">сентября</p>
                <p className="font-hand text-xl text-forest">2026</p>
              </div>
              <div className="h-14 w-px bg-border" />
              <div className="text-center">
                <p className="font-marker text-sm uppercase tracking-widest text-ink/60">в</p>
                <p className="font-script text-3xl text-burgundy">16:00</p>
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
          <h2 className="mt-3 font-script text-3xl text-burgundy">наша история</h2>
          <p className="mx-auto mt-4 max-w-sm font-serif-display text-[1.05rem] leading-relaxed text-ink/85">
            Семь лет, тысяча чашек кофе, два переезда и один маленький рыжий кот спустя —
            мы поняли, что хотим праздновать всё это вместе. Всегда.
          </p>
          <p className="mt-4 font-hand text-xl text-forest">
            …и хотим, чтобы вы были рядом ♡
          </p>
        </section>

        {/* Schedule */}
        <section className="relative mt-20">
          <h2 className="text-center font-script text-3xl text-burgundy">программа дня</h2>
          <div className="mx-auto mt-2 h-3 w-32 ink-line" />

          <ul className="mt-8 space-y-7">
            {[
              { time: "16:00", title: "церемония", note: "в саду, под старой яблоней" },
              { time: "17:00", title: "фуршет & фото", note: "шампанское и объятия" },
              { time: "19:00", title: "ужин", note: "длинный стол при свечах" },
              { time: "21:00", title: "танцы до утра", note: "обещаем медляки" },
            ].map((item, i) => (
              <li
                key={item.time}
                className="relative flex items-start gap-5"
                style={{ transform: `rotate(${i % 2 === 0 ? "-0.6deg" : "0.7deg"})` }}
              >
                <div className="shrink-0">
                  <p className="font-script text-2xl text-burgundy leading-none">
                    {item.time}
                  </p>
                </div>
                <div className="mt-1 border-l-2 border-dashed border-forest/40 pl-4">
                  <p className="font-hand text-2xl text-forest leading-none">
                    {item.title}
                  </p>
                  <p className="mt-1 font-serif-display italic text-ink/70">
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
            <p className="text-center font-hand text-xl text-forest">место встречи</p>
            <p className="mt-3 text-center font-script text-2xl text-burgundy">
              усадьба «Старый сад»
            </p>
            <p className="mt-2 text-center font-serif-display text-ink/80">
              Подмосковье, дер. Орлово,<br />ул. Липовая аллея, 7
            </p>
            <a
              href="https://maps.google.com/?q=Подмосковье+Орлово+Липовая+аллея+7"
              target="_blank"
              rel="noreferrer"
              className="mt-4 block text-center font-hand text-lg text-burgundy underline decoration-burgundy/40 underline-offset-4"
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
          <h2 className="mt-3 font-script text-3xl text-burgundy">дресс-код</h2>
          <p className="mt-3 font-hand text-xl text-forest">бордо · олива · бежевый</p>
          <p className="mx-auto mt-3 max-w-xs font-serif-display italic text-ink/75">
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
          <PolaroidNote rotate="-1.2deg" className="text-center">
            <img
              src={rings}
              alt=""
              width={512}
              height={512}
              loading="lazy"
              className="mx-auto w-20 opacity-85"
            />
            <h2 className="mt-1 font-script text-3xl text-burgundy">подтвердите участие</h2>
            <p className="mt-2 font-serif-display text-ink/80">
              напишите нам до{" "}
              <span className="font-hand text-burgundy">1 августа</span>
            </p>

            <div className="mt-5 space-y-3">
              <a
                href="https://t.me/anna"
                className="block w-full rounded-sm border-2 border-burgundy bg-transparent py-3 font-hand text-xl text-burgundy transition hover:bg-burgundy hover:text-primary-foreground"
              >
                написать Анне
              </a>
              <a
                href="tel:+79991234567"
                className="block w-full rounded-sm border-2 border-dashed border-forest py-3 font-hand text-xl text-forest transition hover:bg-forest hover:text-accent-foreground"
              >
                позвонить Михаилу
              </a>
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
          <p className="mt-2 font-script text-2xl text-burgundy">до встречи</p>
          <p className="font-hand text-xl text-forest">А. & М.</p>
          <p className="mt-6 font-marker text-xs uppercase tracking-[0.3em] text-ink/50">
            14 · 09 · 2026
          </p>
        </footer>
      </div>
    </main>
  );
}
