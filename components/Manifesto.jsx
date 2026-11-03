"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// Kaydırdıkça kelime kelime aydınlanan büyük açılış cümlesi.
// "*" ile işaretli kelimeler marka kırmızısıyla vurgulanır.
const TEXT =
  "Çelik konstrüksiyondan hassas lazer kesime, projelerinizi Kırıkkale'deki atölyemizde üretiyor ve sahada *sağlam *yapılara dönüştürüyoruz.";

export default function Manifesto() {
  const ref = useRef(null);
  const words = TEXT.split(" ").map((w) => ({ hot: w.startsWith("*"), text: w.replace("*", "") }));

  useEffect(() => {
    const root = ref.current;
    const spans = [...root.querySelectorAll(".mf-w")];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => (s.style.opacity = "1"));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = root.getBoundingClientRect();
      const vh = window.innerHeight;
      // Bölüm ekranın %85'inden girip %35'ine gelene kadar tüm kelimeler aydınlanır
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.5 + r.height * 0.6)));
      const lit = p * spans.length;
      spans.forEach((s, i) => {
        s.style.opacity = String(0.13 + 0.87 * Math.min(1, Math.max(0, lit - i)));
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
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
    <section className="mf">
      <div className="container">
        <div className="eyebrow">Biz Kimiz</div>
        <p ref={ref} className="mf-text">
          {words.map((w, i) => (
            <span key={i} className={`mf-w ${w.hot ? "mf-hot" : ""}`}>{w.text}{i < words.length - 1 ? " " : ""}</span>
          ))}
        </p>
        <div className="mf-foot">
          <Link href="/hakkimizda" className="mf-link" data-cursor="Keşfet">
            Hikâyemizi okuyun <span className="mf-arrow">→</span>
          </Link>
          <span className="mf-loc">Kırıkkale · Hacılar</span>
        </div>
      </div>
      <style jsx>{`
        .mf { padding: clamp(80px, 12vw, 160px) 0; background: var(--bg); }
        .mf-text { font-family: var(--font-display); font-weight: 700; font-size: clamp(30px, 4.5vw, 62px); line-height: 1.14; letter-spacing: -0.03em; color: var(--ink); max-width: 1100px; margin-top: 8px; }
        .mf-w { opacity: 0.13; transition: opacity .2s linear; }
        .mf-hot { color: var(--accent); }
        .mf-foot { display: flex; align-items: center; gap: 28px; margin-top: clamp(32px, 4vw, 48px); flex-wrap: wrap; }
        .mf-foot :global(.mf-link) { font-family: var(--font-display); font-weight: 700; font-size: 16px; color: var(--ink); border-bottom: 2px solid var(--accent); padding-bottom: 4px; }
        .mf-arrow { display: inline-block; transition: transform .25s ease; }
        .mf-foot :global(.mf-link:hover) .mf-arrow { transform: translateX(5px); }
        .mf-loc { font-size: 14px; color: var(--ink-2); letter-spacing: 0.04em; }
      `}</style>
    </section>
  );
}
