"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Masaüstünde akışkan (tereyağı gibi) kaydırma. Dokunmatik cihazlarda ve
// hareket azaltma tercihinde tarayıcının kendi kaydırması kullanılır.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 1 });
    window.__lenis = lenis;

    let id = requestAnimationFrame(function raf(t) {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    });

    // Lightbox veya mobil menü body kaydırmasını kilitlediğinde akışı da durdur
    const sync = () => (document.body.style.overflow === "hidden" ? lenis.stop() : lenis.start());
    const mo = new MutationObserver(sync);
    mo.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    return () => {
      cancelAnimationFrame(id);
      mo.disconnect();
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return null;
}
