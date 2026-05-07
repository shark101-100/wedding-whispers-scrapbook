import { useEffect, useState } from "react";

const TARGET = new Date("2026-07-05T15:30:00+04:00").getTime();

function getParts() {
  const diff = Math.max(0, TARGET - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function Countdown() {
  const [t, setT] = useState(getParts);

  useEffect(() => {
    const id = setInterval(() => setT(getParts()), 1000);
    return () => clearInterval(id);
  }, []);

  const items: Array<[number, string]> = [
    [t.days, "дней"],
    [t.hours, "часов"],
    [t.minutes, "минут"],
    [t.seconds, "секунд"],
  ];

  return (
    <div className="text-center">
      <p className="font-hand text-2xl sm:text-xl text-forest">до встречи осталось</p>
      <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
        {items.map(([value, label]) => (
          <div key={label} className="flex flex-col items-center">
            <span className="font-script text-4xl sm:text-5xl text-burgundy leading-none tabular-nums">
              {String(value).padStart(2, "0")}
            </span>
            <span className="mt-2 font-marker text-[0.6rem] sm:text-xs uppercase tracking-wider text-ink/70">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
