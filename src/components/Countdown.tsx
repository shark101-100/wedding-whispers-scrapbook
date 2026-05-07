import { useEffect, useRef, useState } from "react";

const TARGET = new Date("2026-07-05T15:30:00+04:00").getTime();

function getParts(now: number) {
  const diff = Math.max(0, TARGET - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function FlipDigit({ value }: { value: number }) {
  const text = String(value).padStart(2, "0");
  const [display, setDisplay] = useState(text);
  const [anim, setAnim] = useState(false);
  const prev = useRef(text);

  useEffect(() => {
    if (prev.current === text) return;
    prev.current = text;
    setAnim(true);
    const t1 = setTimeout(() => setDisplay(text), 180);
    const t2 = setTimeout(() => setAnim(false), 520);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [text]);

  return (
    <span className="relative inline-block overflow-hidden" style={{ minWidth: "1.6em" }}>
      <span
        className={`font-script text-4xl sm:text-5xl text-burgundy leading-none tabular-nums inline-block transition-all duration-500 ease-out ${
          anim ? "ink-write" : ""
        }`}
        style={{ transform: "rotate(-2deg)" }}
      >
        {display}
      </span>
    </span>
  );
}

export function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [t, setT] = useState(() => getParts(TARGET)); // zero on server

  useEffect(() => {
    setMounted(true);
    setT(getParts(Date.now()));
    const id = setInterval(() => setT(getParts(Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  const items: Array<[number, string]> = [
    [t.days, "дней"],
    [t.hours, "часов"],
    [t.minutes, "минут"],
    [t.seconds, "секунд"],
  ];

  return (
    <div className="text-center" suppressHydrationWarning>
      <p className="font-hand text-2xl sm:text-xl text-forest">до встречи осталось</p>
      <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3" suppressHydrationWarning>
        {items.map(([value, label]) => (
          <div key={label} className="flex flex-col items-center">
            {mounted ? (
              <FlipDigit value={value} />
            ) : (
              <span className="font-script text-4xl sm:text-5xl text-burgundy leading-none tabular-nums opacity-0">
                00
              </span>
            )}
            <span className="mt-2 font-marker text-[0.6rem] sm:text-xs uppercase tracking-wider text-ink/70">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
