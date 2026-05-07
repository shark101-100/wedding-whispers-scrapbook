import { useEffect, useRef, useState } from "react";

export function HeartDraw({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const initialY = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - initialY) > 2) {
        setStarted(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
        className={started ? "animate-draw-heart" : undefined}
        style={started ? undefined : { strokeDasharray: 340, strokeDashoffset: 340 }}
        d="M50 80 C 30 68, 9 54, 13 33 C 16 18, 33 11, 44 22 C 47 25, 49 29, 50 33 C 51 29, 53 25, 56 22 C 67 11, 84 18, 87 33 C 91 54, 70 68, 50 80 Z"
      />
    </svg>
  );
}
