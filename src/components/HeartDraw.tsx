import { useEffect, useRef } from "react";

export function HeartDraw({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    // If browser supports scroll-driven animations natively, CSS handles it.
    if (CSS.supports("animation-timeline: view()")) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // 0 when element bottom enters viewport top, 1 when element top reaches 40% of viewport
      const start = vh; // distance from viewport top when starting
      const end = vh * 0.4;
      const pos = rect.top;
      let p = (start - pos) / (start - end);
      p = Math.max(0, Math.min(1, p));
      el.style.setProperty("--heart-progress", String(p));
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
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
