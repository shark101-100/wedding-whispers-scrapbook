import { CSSProperties, ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

type Variant = "paper" | "sketch" | "fade";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  variant?: Variant;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "li" | "ul";
  style?: CSSProperties;
}

export function Reveal({
  children,
  delay = 0,
  variant = "paper",
  className = "",
  as: Tag = "div",
  style,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <Tag
      ref={ref as never}
      className={`reveal reveal-${variant} ${inView ? "is-visible" : ""} ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms`, animationDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
