"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { services } from "../data/site";

// Masaüstünde solda sabit duran büyük görsel, sağdaki hizmet blokları
// ekranın ortasına geldikçe değişir. Mobilde her blok kendi görseliyle akar.
export default function ServicesScrolly() {
  const [active, setActive] = useState(0);
  const blocksRef = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.i));
        });
      },
      { rootMargin: "-48% 0px -48% 0px" }
    );
    blocksRef.current.forEach((b) => b && obs.observe(b));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="ss">
      <div className="ss-stage" aria-hidden="true">
        <div className="ss-frame">
          {services.map((s, i) => (
            <div key={s.slug} className={`ss-slide ${i === active ? "on" : ""}`}>
              {s.cover ? (
                <Image src={s.cover} alt="" fill sizes="(max-width:960px) 0px, 45vw" className="ss-img" />
              ) : (
                <div className="ss-conf">
                  <svg viewBox="0 0 64 64" fill="none" width="64" height="64"><rect x="14" y="28" width="36" height="26" rx="3" stroke="currentColor" strokeWidth="3" /><path d="M22 28v-6a10 10 0 0 1 20 0v6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /><circle cx="32" cy="40" r="3.5" fill="currentColor" /></svg>
                  <span>GİZLİLİK SÖZLEŞMESİ</span>
                </div>
              )}
            </div>
          ))}
          <div className="ss-frame-shade" />
          <div className="ss-counter">
            <span className="ss-cur">{services[active].n}</span>
            <span className="ss-tot">/ {String(services.length).padStart(2, "0")}</span>
          </div>
          <div className="ss-dots">
            {services.map((s, i) => <span key={s.slug} className={i === active ? "on" : ""} />)}
          </div>
        </div>
      </div>

      <div className="ss-list">
        {services.map((s, i) => (
          <article
            key={s.slug}
            ref={(el) => (blocksRef.current[i] = el)}
            data-i={i}
            className={`ss-block ${i === active ? "on" : ""}`}
          >
            <div className="ss-mobile-img">
              {s.cover ? (
                <Image src={s.cover} alt={s.title} fill sizes="(max-width:960px) 100vw, 0px" className="ss-img" />
              ) : (
                <div className="ss-conf"><span>GİZLİLİK SÖZLEŞMESİ</span></div>
              )}
            </div>
            <span className="ss-n">{s.n}</span>
            <h3 className="ss-title">{s.title}</h3>
            <p className="ss-desc">{s.longDesc}</p>
            <ul className="ss-feats">
              {s.features.slice(0, 3).map((f) => <li key={f}>{f}</li>)}
            </ul>
            <Link href={`/hizmetler/${s.slug}`} className="ss-link" data-cursor="İncele">
              Detaylı incele <span className="ss-arrow">→</span>
            </Link>
          </article>
        ))}
      </div>

      <style jsx>{`
        .ss { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(40px, 6vw, 96px); align-items: start; }
        .ss-stage { position: sticky; top: calc(var(--header-h) + 38px + 24px); height: calc(100vh - var(--header-h) - 38px - 48px); max-height: 720px; }
        .ss-frame { position: relative; height: 100%; border-radius: 12px; overflow: hidden; background: var(--steel-2); box-shadow: 0 30px 70px rgba(22,32,46,0.18); }
        .ss-slide { position: absolute; inset: 0; opacity: 0; transform: scale(1.08); transition: opacity .7s ease, transform 1.2s cubic-bezier(.2,.75,.2,1); }
        .ss-slide.on { opacity: 1; transform: scale(1); }
        .ss-slide :global(.ss-img), .ss-mobile-img :global(.ss-img) { object-fit: cover; }
        .ss-conf { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; color: #ff7a6b; background: radial-gradient(circle at 50% 45%, #2b3a4d, #141c27); font-family: var(--font-display); font-size: 12px; font-weight: 700; letter-spacing: 0.18em; }
        .ss-frame-shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(10,15,22,0.25) 0%, transparent 30%, transparent 70%, rgba(10,15,22,0.55) 100%); pointer-events: none; }
        .ss-counter { position: absolute; left: 24px; bottom: 20px; font-family: var(--font-display); color: #fff; }
        .ss-cur { font-size: 56px; font-weight: 800; letter-spacing: -0.03em; line-height: 1; }
        .ss-tot { font-size: 16px; font-weight: 600; color: rgba(255,255,255,0.65); margin-left: 6px; }
        .ss-dots { position: absolute; right: 22px; bottom: 28px; display: flex; flex-direction: column; gap: 8px; }
        .ss-dots span { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.4); transition: all .3s ease; }
        .ss-dots span.on { height: 22px; border-radius: 3px; background: var(--accent); }
        .ss-list { display: flex; flex-direction: column; }
        .ss-block { min-height: 72vh; display: flex; flex-direction: column; justify-content: center; padding: 40px 0; border-top: 1px solid var(--line); opacity: 0.35; transition: opacity .5s ease; }
        .ss-block:first-child { border-top: none; }
        .ss-block.on { opacity: 1; }
        .ss-mobile-img { display: none; }
        .ss-n { font-family: var(--font-display); font-size: 14px; font-weight: 800; color: var(--accent); letter-spacing: 0.14em; }
        .ss-title { font-family: var(--font-display); font-size: clamp(30px, 3.4vw, 46px); font-weight: 800; letter-spacing: -0.03em; line-height: 1.05; color: var(--ink); margin: 12px 0 16px; }
        .ss-desc { font-size: 16px; line-height: 1.7; color: var(--ink-2); max-width: 520px; }
        .ss-feats { list-style: none; margin: 20px 0 26px; display: flex; flex-direction: column; gap: 10px; }
        .ss-feats li { position: relative; padding-left: 26px; font-size: 15px; color: var(--ink); }
        .ss-feats li::before { content: ""; position: absolute; left: 0; top: 9px; width: 14px; height: 2px; background: var(--accent); }
        .ss-block :global(.ss-link) { align-self: flex-start; font-family: var(--font-display); font-weight: 700; font-size: 15px; color: var(--ink); border-bottom: 2px solid var(--accent); padding-bottom: 4px; }
        .ss-arrow { display: inline-block; transition: transform .25s ease; }
        .ss-block :global(.ss-link:hover) .ss-arrow { transform: translateX(5px); }
        @media (max-width: 960px) {
          .ss { grid-template-columns: 1fr; gap: 0; }
          .ss-stage { display: none; }
          .ss-block { min-height: 0; opacity: 1; padding: 36px 0; }
          .ss-mobile-img { display: block; position: relative; aspect-ratio: 4/3; border-radius: 10px; overflow: hidden; margin-bottom: 22px; background: var(--steel-2); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ss-slide { transition: opacity .2s ease; transform: none; }
          .ss-slide.on { transform: none; }
        }
      `}</style>
    </div>
  );
}
