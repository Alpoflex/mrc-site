"use client";

import { useEffect, useState, useRef } from "react";

// Sayfa üstünde ince kırmızı okuma-ilerleme çubuğu + belirli kaydırmadan sonra
// görünen "yukarı çık" butonu.
export default function ScrollExtras() {
  const [showTop, setShowTop] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const se = document.scrollingElement;
        const max = se.scrollHeight - se.clientHeight;
        const p = max > 0 ? se.scrollTop / max : 0;
        if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
        setShowTop(se.scrollTop > 700);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={barRef} className="sprog" aria-hidden="true" />
      <button
        className={`totop ${showTop ? "show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Sayfanın başına dön"
      >
        ↑
      </button>
      <style jsx>{`
        .sprog { position: fixed; top: 0; left: 0; right: 0; height: 3px; background: var(--accent); transform-origin: 0 50%; transform: scaleX(0); z-index: 120; pointer-events: none; }
        .totop {
          position: fixed; left: 22px; bottom: 22px; z-index: 90;
          width: 46px; height: 46px; border-radius: 50%;
          background: var(--steel-2); color: #fff; border: 1px solid rgba(255,255,255,0.15);
          font-size: 19px; cursor: pointer; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 24px rgba(15,20,28,0.25);
          opacity: 0; visibility: hidden; transform: translateY(10px);
          transition: opacity .3s ease, transform .3s ease, visibility .3s ease, background .2s ease;
        }
        .totop.show { opacity: 1; visibility: visible; transform: none; }
        .totop:hover { background: var(--accent); }
        @media (max-width: 700px) {
          .totop { left: 14px; bottom: 14px; width: 42px; height: 42px; }
        }
      `}</style>
    </>
  );
}
