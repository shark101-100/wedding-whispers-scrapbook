import { useEffect, useRef } from "react";

export function HeartDraw({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    let raf = 0;
    let hasScrolled = false;
    let lastProgress = 0;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // Адаптивный диапазон: на мобильных шире (плавнее), на десктопе короче
      const isMobile = vh < 800;
      // start: когда верх элемента на этой доле viewport (1 = у нижнего края)
      const startFrac = isMobile ? 0.95 : 0.85;
      // end: когда верх элемента поднимется до этой доли (центрировано/выше)
      const endFrac = isMobile ? 0.25 : 0.35;

      const startY = vh * startFrac;
      const endY = vh * endFrac;
      const top = rect.top;

      let p = (startY - top) / (startY - endY);
      p = Math.max(0, Math.min(1, p));
      // лёгкий ease-in-out для более плавных границ
      p = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      return p;
    };

    const apply = (p: number) => {
      lastProgress = p;
      el.style.setProperty("--heart-progress", String(p));
    };

    const onScroll = () => {
      if (!hasScrolled) {
        hasScrolled = true;
      }
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        apply(compute());
      });
    };

    const onResize = () => {
      if (!hasScrolled) return;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        apply(compute());
      });
    };

    // Старт: всегда 0 — анимация только после скролла, даже если сердце уже видно
    apply(0);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
      void lastProgress;
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 90"
      className={className}
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
  );
}
