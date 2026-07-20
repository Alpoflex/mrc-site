"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { services } from "../data/site";

// Kategori kısayolları — /projeler sayfasına ilgili filtreyle gider
const catChips = services
  .filter((s) => s.gallery.length > 0 || (s.videos && s.videos.length > 0))
  .map((s) => ({
    key: s.slug,
    label: s.title,
    count: s.gallery.length + (s.videos ? s.videos.length : 0),
  }));
const videoCount = services.reduce((n, s) => n + (s.videos ? s.videos.length : 0), 0);

// Ana sayfa vitrini — seçme işler. Büyük karo sessiz döngüde canlı oynar,
// tüm karolar lightbox'ta açılır.
const items = [
  { type: "livevideo", src: "/videos/lazer-video-01.mp4", poster: "/videos/lazer-video-01.jpg", label: "Fiber lazer kesim" },
  { type: "image", src: "/images/celik/celik-04.jpeg", label: "Çelik Konstrüksiyon" },
  { type: "image", src: "/images/abkant/abkant-12.jpeg", label: "Abkant Büküm" },
  { type: "image", src: "/images/lazer/lazer-01.jpeg", label: "Lazer Kesim" },
  { type: "image", src: "/images/insaat/insaat-17.jpeg", label: "İnşaat & Taahhüt" },
  { type: "image", src: "/images/lazer/lazer-10.jpeg", label: "Lazer Kesim" },
  { type: "image", src: "/images/celik/celik-02.jpeg", label: "Çelik Konstrüksiyon" },
  { type: "video", src: "/videos/abkant-video-01.mp4", poster: "/videos/abkant-video-01.jpg", label: "Abkant Büküm" },
  { type: "image", src: "/images/insaat/insaat-06.jpeg", label: "İnşaat & Taahhüt" },
];

export default function HomeShowcase() {
  const [lb, setLb] = useState(null);
  const touchX = useRef(null);
  const liveRef = useRef(null);
  const lbCloseRef = useRef(null);

  // Canlı karo görünür olduğunda oynat, ekran dışına çıkınca durdur.
  // Hareket azaltma tercihi olan kullanıcıda hiç otomatik oynatma.
  useEffect(() => {
    const v = liveRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 }
    );
    obs.observe(v);
    const resume = () => {
      if (document.visibilityState === "visible") v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", resume);
    return () => { obs.disconnect(); document.removeEventListener("visibilitychange", resume); };
  }, []);

  const close = useCallback(() => setLb(null), []);
  const next = useCallback(() => setLb((s) => (s == null ? null : (s + 1) % items.length)), []);
  const prev = useCallback(() => setLb((s) => (s == null ? null : (s - 1 + items.length) % items.length)), []);

  useEffect(() => {
    if (lb == null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    lbCloseRef.current?.focus();
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lb, close, next, prev]);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) (dx < 0 ? next() : prev());
  };

  return (
    <div>
      <div className="sc-grid">
        {items.map((it, i) => (
          <button key={it.src} className={`sc-cell ${i === 0 ? "sc-feat" : ""}`} onClick={() => setLb(i)} aria-label={it.label}>
            {it.type === "livevideo" ? (
              <video
                ref={liveRef}
                className="sc-live"
                src={it.src}
                poster={it.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                tabIndex={-1}
              />
            ) : (
              <Image
                src={it.type === "video" ? it.poster : it.src}
                alt={it.label}
                fill
                sizes="(max-width:700px) 50vw, 25vw"
                className="sc-img"
              />
            )}
            {it.type === "video" && <span className="sc-play">▶</span>}
            {it.type === "livevideo" && <span className="sc-liveband"><span className="sc-dot" />CANLI ÜRETİM</span>}
            <span className="sc-label">{it.label}</span>
          </button>
        ))}
      </div>

      <div className="sc-chips">
        {catChips.map((c) => (
          <Link key={c.key} href={`/projeler/?k=${c.key}`} className="sc-chip">
            {c.label} <span className="sc-chip-n">{c.count}</span>
          </Link>
        ))}
        <Link href="/projeler/?k=videos" className="sc-chip">
          Videolar <span className="sc-chip-n">{videoCount}</span>
        </Link>
      </div>

      <div className="sc-cta">
        <Link href="/projeler" className="btn btn-light">Tüm çalışmaları inceleyin →</Link>
      </div>

      {lb != null && items[lb] && (
        <div className="lb" role="dialog" aria-modal="true" aria-label="Proje galerisi görüntüleyici" onClick={close} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <button ref={lbCloseRef} className="lb-x" onClick={close} aria-label="Kapat">✕</button>
          <button className="lb-nav lb-p" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Önceki">‹</button>
          <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
            {items[lb].type === "image" ? (
              <Image src={items[lb].src} alt={items[lb].label} width={1200} height={900} className="lb-img" />
            ) : (
              <video
                key={items[lb].src}
                src={items[lb].src}
                poster={items[lb].poster}
                className="lb-video"
                controls
                autoPlay
                playsInline
              />
            )}
            <div className="lb-cap">{items[lb].label} · {lb + 1} / {items.length}</div>
          </div>
          <button className="lb-nav lb-n" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Sonraki">›</button>
        </div>
      )}

      <style jsx>{`
        .sc-grid { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 1fr; gap: 14px; }
        .sc-cell { position: relative; aspect-ratio: 1/1; border: none; padding: 0; cursor: pointer; overflow: hidden; border-radius: 6px; background: rgba(255,255,255,0.05); }
        .sc-cell.sc-feat { grid-column: span 2; grid-row: span 2; }
        :global(.sc-img) { object-fit: cover; transition: transform .5s ease; }
        .sc-cell:hover :global(.sc-img) { transform: scale(1.06); }
        .sc-live { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .sc-play { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 52px; height: 52px; border-radius: 50%; background: var(--accent); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 18px; padding-left: 4px; box-shadow: 0 6px 20px rgba(0,0,0,0.35); transition: transform .25s ease; }
        .sc-cell:hover .sc-play { transform: translate(-50%,-50%) scale(1.12); }
        .sc-liveband { position: absolute; top: 14px; left: 14px; display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-display); font-size: 11px; font-weight: 700; letter-spacing: 0.14em; color: #fff; background: rgba(15,20,28,0.72); backdrop-filter: blur(4px); padding: 7px 12px; border-radius: 100px; }
        .sc-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: scPulse 1.4s ease-in-out infinite; }
        @keyframes scPulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: .45; transform: scale(0.8); } }
        .sc-label { position: absolute; left: 12px; bottom: 12px; font-family: var(--font-display); font-size: 12px; font-weight: 600; color: #fff; background: rgba(15,20,28,0.75); backdrop-filter: blur(4px); padding: 5px 11px; border-radius: 3px; opacity: 0; transform: translateY(6px); transition: all .25s ease; }
        .sc-cell:hover .sc-label { opacity: 1; transform: none; }
        .sc-cell.sc-feat .sc-label { opacity: 1; transform: none; }
        .sc-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 30px; }
        .sc-chips :global(.sc-chip) { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-display); font-size: 13.5px; font-weight: 600; color: #cfd6df; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); padding: 12px 18px; border-radius: 100px; transition: all .2s ease; }
        .sc-chips :global(.sc-chip:hover) { color: #fff; border-color: var(--accent); background: rgba(211,45,39,0.15); }
        .sc-chip-n { font-size: 11.5px; font-weight: 700; color: #fff; background: var(--accent); border-radius: 100px; padding: 2px 8px; }
        .sc-cta { display: flex; justify-content: center; margin-top: 24px; }
        .lb { position: fixed; inset: 0; z-index: 200; background: rgba(15,20,28,0.95); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 24px; }
        .lb-stage { position: relative; max-width: 92vw; max-height: 88vh; }
        :global(.lb-img) { max-width: 92vw; max-height: 88vh; width: auto; height: auto; object-fit: contain; border-radius: 4px; }
        .lb-video { max-width: 92vw; max-height: 82vh; width: auto; height: auto; border-radius: 4px; display: block; background: #000; }
        .lb-cap { position: absolute; bottom: -34px; left: 50%; transform: translateX(-50%); font-family: var(--font-display); font-size: 14px; color: #aeb9c7; white-space: nowrap; }
        .lb-x { position: absolute; top: 20px; right: 24px; background: none; border: none; color: #fff; font-size: 26px; cursor: pointer; opacity: .85; z-index: 2; }
        .lb-nav { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2); color: #fff; width: 50px; height: 50px; border-radius: 50%; font-size: 28px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .2s; z-index: 2; }
        .lb-nav:hover { background: var(--accent); border-color: var(--accent); }
        .lb-p { left: 20px; } .lb-n { right: 20px; }
        @media (max-width: 700px) {
          .sc-grid { grid-template-columns: repeat(2, 1fr); }
          .sc-play { width: 44px; height: 44px; font-size: 15px; }
          .lb-nav { width: 42px; height: 42px; font-size: 22px; } .lb-p { left: 8px; } .lb-n { right: 8px; }
        }
        @media (hover: none) {
          .sc-label { opacity: 1; transform: none; }
        }
        .sc-cell:focus-visible .sc-label { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) {
          .sc-dot { animation: none; }
        }
      `}</style>
    </div>
  );
}
