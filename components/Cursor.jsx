"use client";

import { useEffect, useRef, useState } from "react";

// Masaüstünde imleci yumuşakça takip eden halka. data-cursor="Etiket" taşıyan
// öğelerin üzerinde büyüyüp etiketi gösterir; bağlantı/butonlarda hafifçe büyür.
// Tarayıcının kendi imleci gizlenmez (erişilebilirlik).
export default function Cursor() {
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [mode, setMode] = useState("idle"); // idle | link | label

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    let x = -100, y = -100, cx = -100, cy = -100, raf = 0, visible = false;
    const ring = ringRef.current;

    const move = (e) => {
      x = e.clientX; y = e.clientY;
      if (!visible) { visible = true; cx = x; cy = y; ring.style.opacity = "1"; }
      const el = e.target.closest?.("[data-cursor], a, button");
      if (el && el.dataset && el.dataset.cursor) { setMode("label"); setLabel(el.dataset.cursor); }
      else if (el) { setMode("link"); setLabel(""); }
      else { setMode("idle"); setLabel(""); }
    };
    const leave = () => { visible = false; ring.style.opacity = "0"; };
    const tick = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      ring.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  if (!enabled) return null;
  return (
    <div ref={ringRef} className={`cur is-${mode}`} aria-hidden="true">
      <span className="cur-txt">{label}</span>
      <style jsx>{`
        .cur {
          position: fixed; left: 0; top: 0; z-index: 300; pointer-events: none; opacity: 0;
          width: 34px; height: 34px; border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.9); mix-blend-mode: difference;
          display: flex; align-items: center; justify-content: center;
          transition: width .3s cubic-bezier(.2,.75,.2,1), height .3s cubic-bezier(.2,.75,.2,1), background-color .3s ease, border-color .3s ease, opacity .3s ease;
        }
        .cur.is-link { width: 54px; height: 54px; background: rgba(255,255,255,0.12); }
        .cur.is-label { width: 92px; height: 92px; mix-blend-mode: normal; background: var(--accent); border-color: var(--accent); }
        .cur-txt { font-family: var(--font-display); font-size: 13px; font-weight: 700; letter-spacing: 0.04em; color: #fff; opacity: 0; transition: opacity .2s ease; white-space: nowrap; }
        .cur.is-label .cur-txt { opacity: 1; }
      `}</style>
    </div>
  );
}
