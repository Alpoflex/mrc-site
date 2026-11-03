"use client";

import { useEffect, useRef, useState } from "react";

// Masaüstü özel imleç: fareyi birebir takip eden kırmızı nokta + arkasından
// yumuşakça süzülen halka. data-cursor="Etiket" taşıyan öğelerde halka kırmızı
// daireye dönüşüp etiketi gösterir; bağlantı/butonlarda büyür.
// Yazı alanlarında sistemin yazı imleci korunur.
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [mode, setMode] = useState("idle"); // idle | link | label | text

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    let x = -100, y = -100, rx = -100, ry = -100, raf = 0, shown = false;

    const move = (e) => {
      x = e.clientX; y = e.clientY;
      const dot = dotRef.current, ring = ringRef.current;
      if (!dot || !ring) return;
      // Nokta gecikmesiz: kullanılabilirlik için tıklama noktasıyla birebir
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (!shown) { shown = true; rx = x; ry = y; dot.style.opacity = "1"; ring.style.opacity = "1"; }
      const t = e.target;
      if (t.closest?.("input, textarea, select, [contenteditable='true']")) { setMode("text"); setLabel(""); return; }
      const el = t.closest?.("[data-cursor], a, button, [role='button'], summary, label");
      if (el && el.dataset && el.dataset.cursor) { setMode("label"); setLabel(el.dataset.cursor); }
      else if (el) { setMode("link"); setLabel(""); }
      else { setMode("idle"); setLabel(""); }
    };
    const hide = () => {
      shown = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const down = () => ringRef.current?.classList.add("is-down");
    const up = () => ringRef.current?.classList.remove("is-down");
    const tick = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div ref={ringRef} className={`cur-ring is-${mode}`} aria-hidden="true">
        <span className="cur-txt">{label}</span>
      </div>
      <div ref={dotRef} className={`cur-dot is-${mode}`} aria-hidden="true" />
      <style jsx>{`
        .cur-ring, .cur-dot { position: fixed; left: 0; top: 0; z-index: 400; pointer-events: none; opacity: 0; border-radius: 50%; will-change: transform; }
        .cur-dot { width: 8px; height: 8px; background: var(--accent); box-shadow: 0 0 0 2px rgba(255,255,255,0.85); transition: width .2s ease, height .2s ease, opacity .25s ease; }
        .cur-ring {
          width: 42px; height: 42px; border: 2px solid rgba(211,45,39,0.75);
          display: flex; align-items: center; justify-content: center;
          transition: width .35s cubic-bezier(.2,.75,.2,1), height .35s cubic-bezier(.2,.75,.2,1), background-color .3s ease, border-color .3s ease, opacity .3s ease;
        }
        .cur-ring.is-link { width: 64px; height: 64px; border-color: var(--accent); background: rgba(211,45,39,0.12); }
        .cur-dot.is-link { width: 4px; height: 4px; }
        .cur-ring.is-label { width: 96px; height: 96px; background: var(--accent); border-color: var(--accent); box-shadow: 0 10px 30px rgba(211,45,39,0.35); }
        .cur-dot.is-label { width: 0; height: 0; }
        .cur-ring.is-text, .cur-dot.is-text { opacity: 0 !important; }
        .cur-ring.is-down { width: 34px; height: 34px; }
        .cur-ring.is-label.is-down { width: 86px; height: 86px; }
        .cur-txt { font-family: var(--font-display); font-size: 13.5px; font-weight: 700; letter-spacing: 0.04em; color: #fff; opacity: 0; transform: scale(.6); transition: opacity .2s ease, transform .3s cubic-bezier(.2,.75,.2,1); white-space: nowrap; }
        .cur-ring.is-label .cur-txt { opacity: 1; transform: none; }
      `}</style>
    </>
  );
}
