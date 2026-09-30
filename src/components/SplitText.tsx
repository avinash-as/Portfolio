"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  index?: number;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: string;
  from?: object;
  to?: object;
  threshold?: number;
  rootMargin?: string;
  textAlign?: string;
  onLetterAnimationComplete?: () => void;
}

export default function SplitText({
  text,
  index = 1,
  className = "",
  delay = 150,
  duration = 1.8,
  ease = "elastic.out(1,0.3)",
  splitType = "words",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "left",
  onLetterAnimationComplete,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (!isVisible) return;

    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll(".split-word");

    const tl = gsap.timeline({
      onComplete: onLetterAnimationComplete,
    });

    tl.fromTo(
      words,
      from,
      {
        ...to,
        duration,
        ease,
        stagger: { each: delay / 1000 },
      }
    );
  }, [isVisible, delay, duration, ease, from, to, onLetterAnimationComplete]);

  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ textAlign: textAlign as any }}
    >
      {words.map((word, i) => (
        <span
          key={`${index}-${i}`}
          className="split-word inline-block"
          style={{ marginRight: "0.25em" }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
