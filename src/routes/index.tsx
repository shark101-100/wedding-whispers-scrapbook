import { createFileRoute } from "@tanstack/react-router";
import florals from "@/assets/florals.png";
import glasses from "@/assets/glasses.png";
import bouquet from "@/assets/bouquet.png";
import rings from "@/assets/rings.png";
import rose from "@/assets/rose.png";
import heart from "@/assets/heart.png";
import cake from "@/assets/cake.png";
import disco from "@/assets/disco.png";
import eat from "@/assets/eat.png";
import rings2 from "@/assets/rings-2.png";
import glasses2 from "@/assets/glasses-2.png";
import { RsvpForm } from "@/components/RsvpForm";
import { Toaster } from "@/components/ui/sonner";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  component: Invitation,
  head: () => ({
    meta: [
      { title: "Виктория & Егор — приглашение на свадьбу" },
      {
        name: "description",
        content: "С любовью приглашаем вас разделить с нами день нашей свадьбы — 5 июля 2026 года.",
      },
      { property: "og:title", content: "Виктория & Егор — наша свадьба" },
      {
        property: "og:description",
        content: "5 июля 2026 — будем счастливы видеть вас рядом.",
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
          <p
            className="font-hand text-2xl text-forest tracking-wide animate-paper-in"
            style={{ animationDelay: "0ms" }}
          >
            — с радостью приглашаем —
          </p>

          <div className="relative mt-6">
            {/* <img
              src={florals}
              alt=""
              width={768}
              height={1024}
              className="mx-auto w-44 opacity-80 deco-rotate-left animate-sketch-in"
              style={{ animationDelay: "150ms" }}
            /> */}
            <h1
              className="font-script text-[2.6rem] leading-[1.1] text-burgundy mt-2 animate-paper-in"
              style={{ animationDelay: "300ms" }}
            >
              Виктория
              <span className="block font-hand text-3xl text-forest -my-1">&</span>
              Егор
            </h1>
            <div
              className="mx-auto mt-3 h-3 w-40 ink-line animate-ink-draw"
              style={{ animationDelay: "650ms" }}
            />
          </div>

          <p
            className="mt-6 font-hand text-xl text-ink/80 leading-snug animate-paper-in"
            style={{ animationDelay: "450ms" }}
          >
            Зовём вас праздновать
            <br />
            самый важный день
          </p>
        </header>

        {/* Date card */}
        <Reveal as="section" className="relative mt-14" variant="paper">
          <PolaroidNote rotate="-1.5deg">
            <p className="font-hand text-center text-lg text-forest">сохраните дату</p>
            <div className="mt-3 flex items-center justify-center gap-4">
              <div className="text-center">
                <p className="font-marker text-sm uppercase tracking-widest text-ink/60">вс</p>
                <p className="font-script text-3xl text-burgundy">5</p>
              </div>
              <div className="h-14 w-px bg-border" />
              <div className="text-center">
                <p className="font-script text-2xl text-ink leading-none">июля</p>
                <p className="font-hand text-xl text-forest">2026</p>
              </div>
              <div className="h-14 w-px bg-border" />
              <div className="text-center">
                <p className="font-marker text-sm uppercase tracking-widest text-ink/60">в</p>
                <p className="font-script text-3xl text-burgundy">15:30</p>
              </div>
            </div>
          </PolaroidNote>
          <img
            src={heart}
            alt=""
            width={512}
            height={512}
            loading="lazy"
            className="absolute -bottom-6 -right-2 w-16 rotate-12 opacity-70 animate-float"
          />
        </Reveal>

        {/* Story */}
        <Reveal as="section" className="relative mt-20 text-center" variant="paper">
          <img
            src={rose}
            alt=""
            width={512}
            height={640}
            loading="lazy"
            className="mx-auto w-24 opacity-80 deco-rotate-right animate-float-slow"
          />
          <h2 className="mt-3 font-script text-3xl text-burgundy">наша история</h2>
          <p className="mx-auto mt-4 max-w-sm font-serif-display text-[1.05rem] leading-relaxed text-ink/85">
            Семь лет, тысяча чашек кофе, два переезда и один маленький рыжий кот спустя — мы поняли,
            мы поняли, что хотим праздновать всё это вместе. Всегда.
          </p>
          <p className="mt-4 font-hand text-xl text-forest">…и хотим, чтобы вы были рядом ♡</p>
        </Reveal>

        {/* Schedule — «Тайминг» */}
        <section className="relative mt-20">
          <Reveal variant="paper">
            <h2 className="text-center font-script text-4xl text-forest">Тайминг</h2>
          </Reveal>

          <ul className="mt-10 space-y-14">
            {[
              { time: "15:30", title: "сбор гостей", note: "", image: "", side: "left" as const },
              { time: "16:00", title: "церемония", note: "", image: "", side: "right" as const },
              {
                time: "17:00",
                title: "праздничный ужин",
                note: "",
                image: "",
                side: "left" as const,
              },
              { time: "22:00", title: "торт", note: "", image: "", side: "right" as const },
              {
                time: "23:00",
                title: "завершение вечера",
                note: "",
                image: "",
                side: "left" as const,
              },
            ].map((item, i) => (
              <Reveal key={item.time} as="li" variant="paper" delay={i * 100} className="relative">
                <div className="relative flex items-stretch gap-3">
                  {/* Левая иллюстрация */}
                  <div className="w-20 sm:w-24 shrink-0 flex items-center justify-center">
                    {item.side === "left" && (
                      <div
                        className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden"
                        style={{ transform: `rotate(${i % 2 === 0 ? "-4deg" : "-2deg"})` }}
                      >
                        {item.image ? (
                          <img
                            src={cake}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center border border-dashed border-burgundy/30 font-marker text-[0.6rem] uppercase tracking-wider text-burgundy/40">
                            фото
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Центральный блок: подпись · время · описание */}
                  <div className="flex-1 text-center">
                    <p className="font-hand text-base text-forest">{item.title}</p>
                    <p className="font-script text-5xl sm:text-6xl text-burgundy leading-none mt-2">
                      {item.time}
                    </p>
                    <p className="mt-2 font-serif-display text-xs sm:text-sm text-ink/75 italic">
                      {item.note}
                    </p>
                  </div>

                  {/* Правая иллюстрация */}
                  <div className="w-20 sm:w-24 shrink-0 flex items-center justify-center">
                    {item.side === "right" && (
                      <div
                        className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden"
                        style={{ transform: `rotate(${i % 2 === 0 ? "4deg" : "2deg"})` }}
                      >
                        {item.image ? (
                          <img
                            src={eat}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center border border-dashed border-burgundy/30 font-marker text-[0.6rem] uppercase tracking-wider text-burgundy/40">
                            фото
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* Place */}
        <Reveal as="section" className="relative mt-16" variant="paper">
          <PolaroidNote rotate="1.8deg">
            <p className="text-center font-hand text-xl text-forest">место встречи</p>
            <p className="mt-3 text-center font-script text-2xl text-burgundy">
              гостиница «Ариадна»
            </p>
            <p className="mt-2 text-center font-serif-display text-ink/80">
              Самара, пос. Волжский,
              <br />
              Жилгородок, 45В.
            </p>
            <a
              href="https://yandex.com/maps/-/CPS34Y8I"
              target="_blank"
              rel="noreferrer"
              className="ink-link mt-4 mx-auto block w-fit text-center font-hand text-lg text-burgundy"
            >
              открыть на карте →
            </a>
          </PolaroidNote>
        </Reveal>

        {/* Dress code */}
        <Reveal as="section" className="relative mt-20 text-center" variant="paper">
          <img
            src={bouquet}
            alt=""
            width={512}
            height={640}
            loading="lazy"
            className="mx-auto w-28 opacity-85 deco-rotate-left animate-float-slow"
          />
          <h2 className="mt-3 font-script text-3xl text-burgundy">дресс-код</h2>
          <p className="mt-3 font-hand text-xl text-forest">бордо · олива · бежевый</p>
          <p className="mx-auto mt-3 max-w-xs font-serif-display italic text-ink/75">
            никакой строгости — только уют, мягкие ткани и улыбки
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            {["#6b2535", "#4a5d3a", "#c9b48a"].map((c, i) => (
              <span
                key={c}
                className="h-9 w-9 rounded-full border border-border/60 shadow-inner animate-pop"
                style={{ backgroundColor: c, animationDelay: `${i * 120}ms` }}
              />
            ))}
          </div>
        </Reveal>

        {/* RSVP */}
        <Reveal as="section" className="relative mt-20" variant="paper">
          <PolaroidNote rotate="-1.2deg">
            <div className="text-center">
              <h2 className="font-script text-3xl text-burgundy">подтвердите участие</h2>
              <p className="mt-2 font-serif-display text-ink/80">
                ответьте, пожалуйста, до <span className="font-hand text-burgundy">1 августа</span>
              </p>
            </div>
            <div className="mt-6">
              <RsvpForm />
            </div>
          </PolaroidNote>
        </Reveal>

        {/* Footer */}
        <Reveal as="footer" className="relative mt-20 text-center" variant="fade">
          <img
            src={heart}
            alt=""
            width={512}
            height={512}
            loading="lazy"
            className="mx-auto w-14 opacity-70 -rotate-12 animate-float"
          />
          <p className="mt-2 font-script text-2xl text-burgundy">до встречи</p>
          <p className="font-hand text-xl text-forest">А. & М.</p>
          <p className="mt-6 font-marker text-xs uppercase tracking-[0.3em] text-ink/50">
            14 · 09 · 2026
          </p>
        </Reveal>
      </div>
      <Toaster position="top-center" />
    </main>
  );
}
