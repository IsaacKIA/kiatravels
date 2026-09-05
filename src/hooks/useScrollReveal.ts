"use client";

import { useEffect, useRef } from "react";

/**
 * useScrollReveal — attaches IntersectionObserver to a container ref.
 * All children with class `reveal`, `reveal-left`, `reveal-right`, or `reveal-scale`
 * will get the `is-visible` class added when they enter the viewport.
 *
 * @param threshold - 0..1, default 0.12
 */
export function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const revealClasses = ["reveal", "reveal-left", "reveal-right", "reveal-scale"];
    const targets = Array.from(
      node.querySelectorAll(revealClasses.map((c) => `.${c}`).join(", "))
    ) as HTMLElement[];

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

/**
 * useCountUp — animates a number from 0 to `target` when element is visible.
 */
export function useCountUp(target: number, duration = 1800) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const observed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !observed.current) {
          observed.current = true;
          observer.disconnect();

          const start = performance.now();
          const isDecimal = String(target).includes(".");

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = eased * target;
            el.textContent = isDecimal
              ? value.toFixed(1)
              : Math.round(value).toString();
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return ref;
}
