import { createFileRoute } from "@tanstack/react-router";
import florals from "@/assets/florals.png";
import glasses from "@/assets/glasses.png";
import bouquet from "@/assets/bouquet.png";
import rings from "@/assets/rings.png";
import rose from "@/assets/rose.png";
import heart from "@/assets/heart.png";
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
          {/* <p
            className="font-hand text-3xl sm:text-2xl text-forest tracking-wide animate-paper-in"
            style={{ animationDelay: "0ms" }}
          >
            — с радостью приглашаем —
          </p> */}

          <div className="relative mt-15">
            {/* <img
              src={florals}
              alt=""
              width={768}
              height={1024}
              className="mx-auto w-44 opacity-80 deco-rotate-left animate-sketch-in"
              style={{ animationDelay: "150ms" }}
            /> */}
            <h1
              className="font-script text-[3.2rem] sm:text-[2.6rem] leading-[1.1] text-burgundy mt-2 animate-paper-in"
              style={{ animationDelay: "300ms" }}
            >
              Виктория
              <span className="block font-hand text-4xl sm:text-3xl text-forest -my-1">&</span>
              Егор
            </h1>
            <div className="mx-auto mt-3 h-3 w-40 ink-line animate-ink-draw" style={{ animationDelay: "650ms" }} />
          </div>

          <div
            className="mt-6 font-hand text-lg sm:text-xl font-serif-display text-ink/80 leading-snug animate-paper-in space-y-3"
            style={{ animationDelay: "450ms" }}
          >
            <p>
              Дорогие родные и друзья! <br /> 
              Один день в этом году станет для нас особенно важным, и мы хотим провести его в
              кругу близких! <br /> 
              С большим удовольствием приглашаем вас на нашу свадьбу, которая состоится:
            </p>
          </div>
        </header>

        {/* Date */}
        <Reveal as="section" className="relative mt-14" variant="paper">
          <div className="flex items-baseline justify-between px-2">
            <p className="font-hand text-4xl sm:text-4xl text-burgundy">июль</p>
            <p className="font-hand text-4xl sm:text-3xl text-burgundy">2026</p>
          </div>
          <div className="mt-2 h-0.5 w-full bg-ink/60" />
          <div className="grid grid-cols-3 text-center divide-x-2 divide-ink/60">
            <div className="flex flex-col px-1 pt-4 sm:px-2">
              <p className="font-marker text-[0.6rem] sm:text-xs uppercase tracking-wider text-ink/70 break-words">суббота</p>
              <div className="my-3 h-0.5 w-full bg-ink/50" />
              <div className="relative flex h-32 sm:h-36 items-center justify-center">
                <p className="font-script text-7xl sm:text-7xl text-ink/80">4</p>
              </div>
            </div>
            <div className="flex flex-col px-1 pt-4 sm:px-2">
              <p className="font-marker text-[0.6rem] sm:text-xs uppercase tracking-wider text-burgundy break-words">воскресенье</p>
              <div className="my-3 h-0.5 w-full bg-ink/50" />
              <div className="relative flex h-32 sm:h-36 items-center justify-center">
                <svg
                  viewBox="0 0 100 90"
                  className="h-32 w-32 sm:h-36 sm:w-36 text-burgundy"
                  style={{ transform: "translateY(-8px) rotate(-4deg)" }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    className="animate-draw-heart"
                    d="M50 80 C 30 68, 9 54, 13 33 C 16 18, 33 11, 44 22 C 47 25, 49 29, 50 33 C 51 29, 53 25, 56 22 C 67 11, 84 18, 87 33 C 91 54, 70 68, 50 80 Z"
                  />
                </svg>
                <p className="absolute font-script text-6xl sm:text-6xl text-burgundy">5</p>
              </div>
            </div>
            <div className="flex flex-col px-1 pt-4 sm:px-2">
              <p className="font-marker text-[0.6rem] sm:text-xs uppercase tracking-wider text-ink/70 break-words">понедельник</p>
              <div className="my-3 h-0.5 w-full bg-ink/50" />
              <div className="relative flex h-32 sm:h-36 items-center justify-center">
                <p className="font-script text-7xl sm:text-7xl text-ink/80">6</p>
              </div>
            </div>
          </div>
          
          
          <img
            src={heart}
            alt=""
            width={512}
            height={512}
            loading="lazy"
            className="absolute -bottom-10 -right-2 w-16 rotate-12 opacity-70 animate-float"
          />
        </Reveal>

        {/* Story */}
        {/* <Reveal as="section" className="relative mt-20 text-center" variant="paper">
          <h2 className="font-script text-4xl sm:text-3xl text-burgundy">наша история</h2>
          <p className="mx-auto mt-4 max-w-sm font-serif-display text-[1.18rem] sm:text-[1.05rem] leading-relaxed text-ink/85">
            Семь лет, тысяча чашек кофе, два переезда и один маленький рыжий кот спустя — мы поняли, мы поняли, что
            хотим праздновать всё это вместе. Всегда.
          </p>
          <p className="mt-4 font-hand text-2xl sm:text-xl text-forest">…и хотим, чтобы вы были рядом ♡</p>
        </Reveal> */}

        {/* Schedule — «Тайминг» */}
        <section className="relative mt-30">
          <Reveal variant="paper">
            <h2 className="text-center font-script text-5xl sm:text-4xl text-forest">Тайминг</h2>
          </Reveal>

          <ul className="mt-12 space-y-20">
            {[
              {
                time: "15:30",
                title: "сбор гостей",
                note: "",
                image: "/images/glasses-2.png",
                side: "left" as const,
              },
              {
                time: "16:00",
                title: "церемония",
                note: "",
                image: "images/rings-2.png",
                side: "right" as const,
              },
              {
                time: "17:00",
                title: "праздничный ужин",
                note: "",
                image: "/images/eat.png",
                side: "left" as const,
              },
              {
                time: "22:00",
                title: "торт",
                note: "",
                image: "/images/cake.png",
                side: "right" as const,
              },
              {
                time: "23:00",
                title: "завершение вечера",
                note: "",
                image: "/images/disco.png",
                side: "left" as const,
              },
            ].map((item, i) => (
              <Reveal key={item.time} as="li" variant="paper" delay={i * 100} className="relative">
                <div className="relative flex items-stretch gap-1 sm:gap-8">
                  {/* Левая иллюстрация */}
                  <div className="w-28 sm:w-32 shrink-0 flex items-center justify-center">
                    {item.side === "left" && (
                      <div
                        className="relative h-28 w-28 sm:h-32 sm:w-32 overflow-hidden"
                        style={{ transform: `rotate(${i % 2 === 0 ? "-4deg" : "-2deg"})` }}
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            decoding="async"
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
                    <p className="font-hand text-lg sm:text-base text-forest">{item.title}</p>
                    <p className="font-script text-5xl sm:text-6xl text-burgundy leading-none mt-2">{item.time}</p>
                    <p className="mt-2 font-serif-display text-sm text-ink/75 italic">{item.note}</p>
                  </div>

                  {/* Правая иллюстрация */}
                  <div className="w-28 sm:w-32 shrink-0 flex items-center justify-center">
                    {item.side === "right" && (
                      <div
                        className="relative h-28 w-28 sm:h-32 sm:w-32 overflow-hidden"
                        style={{ transform: `rotate(${i % 2 === 0 ? "4deg" : "2deg"})` }}
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            decoding="async"
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
            <p className="text-center font-hand text-2xl sm:text-xl text-forest">место встречи</p>
            <p className="mt-3 text-center font-script text-3xl sm:text-2xl text-burgundy">гостиница «Ариадна»</p>
            <p className="mt-2 text-center font-serif-display text-lg sm:text-base text-ink/80">
              Самара, пос. Волжский,
              <br />
              Жилгородок, 45В.
            </p>
            <a
              href="https://yandex.com/maps/-/CPS34Y8I"
              target="_blank"
              rel="noreferrer"
              className="ink-link mt-4 mx-auto block w-fit font-hand text-xl sm:text-lg text-burgundy text-justify"
            >
              открыть на карте →
            </a>
          </PolaroidNote>
        </Reveal>

        {/* Организационные моменты */}
        <section className="relative mt-20">
          <Reveal variant="paper">
            <h2 className="text-center font-script text-5xl sm:text-4xl text-burgundy">организационные моменты</h2>
            <p className="mx-auto mt-5 max-w-sm text-center font-serif-display text-[1.18rem] sm:text-[1.05rem] leading-relaxed text-ink/85">
              Чтобы создать по-настоящему расслабленную и праздничную атмосферу для всех гостей, мы решили провести наш
              вечер в формате только для взрослых.
            </p>
          </Reveal>

          <div className="mt-12 space-y-14">
            <Reveal variant="paper" delay={100} className="text-center">
              <p className="font-script text-3xl sm:text-2xl text-forest">трансфер</p>
              <p className="mx-auto mt-3 max-w-sm font-serif-display text-[1.18rem] sm:text-[1.05rem] leading-relaxed text-ink/85">
                Наша площадка находится недалеко от города, куда легко добраться на такси, автобусе или личном авто. Мы
                решили не привязывать вас к общему расписанию, чтобы вы могли приехать в удобное для вас время.
              </p>
            </Reveal>

            <Reveal variant="paper" delay={200} className="text-center">
              <p className="font-script text-3xl sm:text-2xl text-forest">дресс-код</p>
              <p className="mx-auto mt-3 max-w-sm font-serif-display text-[1.18rem] sm:text-[1.05rem] leading-relaxed text-ink/85">
                Мы за ваш комфорт, поэтому можете выбрать любой наряд! Но если ваша душа просит эстетики, присмотритесь
                к этим цветам — они идеально впишутся в наш праздник.
              </p>
              <p className="mt-4 font-hand text-2xl sm:text-xl text-forest">шоколадный · олива · бежевый · серый · кремовый</p>
              <div className="mt-4 flex items-center justify-center gap-3">
                {["#4a2c1a", "#4a5d3a", "#c9b48a", "#9a9a92", "#f5efe4"].map((c, i) => (
                  <span
                    key={c}
                    className="h-9 w-9 rounded-full border border-border/60 shadow-inner animate-pop"
                    style={{ backgroundColor: c, animationDelay: `${i * 120}ms` }}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* RSVP */}
        <Reveal as="section" className="relative mt-20" variant="paper">
          <PolaroidNote rotate="-1.2deg">
            <div className="text-center">
              <h2 className="font-script text-4xl sm:text-3xl text-burgundy">подтвердите участие</h2>
              <p className="mt-2 font-serif-display text-lg sm:text-base text-ink/80">
                ответьте, пожалуйста, до <span className="font-hand text-burgundy">1 июля</span>
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
          <p className="mt-2 font-script text-3xl sm:text-2xl text-burgundy">до встречи</p>
          <p className="font-hand text-2xl sm:text-xl text-forest">В. & Е.</p>
          <p className="mt-6 font-marker text-xs uppercase tracking-[0.3em] text-ink/50">05 · 07 · 2026</p>
        </Reveal>
      </div>
      <Toaster position="top-center" />
    </main>
  );
}
