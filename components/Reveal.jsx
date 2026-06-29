"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, delay = 0, as = "div", className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setShown(true), delay);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  const Tag = as;
  return (
    <Tag ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`}>
      {children}
    </Tag>
  );
}
