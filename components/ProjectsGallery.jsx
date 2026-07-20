"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import { services } from "../data/site";

// Galerisi olan hizmetlerden proje havuzu oluştur (görsel + video)
const hasMedia = (s) => s.gallery.length > 0 || (s.videos && s.videos.length > 0);

const categories = [
  { key: "all", label: "Tümü" },
  ...services.filter(hasMedia).map((s) => ({ key: s.slug, label: s.title })),
  { key: "videos", label: "Videolar" },
];

const allItems = services.filter(hasMedia).flatMap((s) => [
  ...s.gallery.slice(0, 1).map((src) => ({ type: "image", src, cat: s.slug, catLabel: s.title })),
  ...(s.videos || []).map((v) => ({ type: "video", ...v, cat: s.slug, catLabel: s.title })),
  ...s.gallery.slice(1).map((src) => ({ type: "image", src, cat: s.slug, catLabel: s.title })),
]);

export default function ProjectsGallery() {
  const [filter, setFilter] = useState("all");
  const [lb, setLb] = useState(null);
  const touchX = useRef(null);

  const items = useMemo(() => {
    if (filter === "all") return allItems;
    if (filter === "videos") return allItems.filter((i) => i.type === "video");
    return allItems.filter((i) => i.cat === filter);
  }, [filter]);

  const close = useCallback(() => setLb(null), []);
  const next = useCallback(() => setLb((s) => (s == null ? null : (s + 1) % items.length)), [items.length]);
  const prev = useCallback(() => setLb((s) => (s == null ? null : (s - 1 + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (lb == null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lb, close, next, prev]);

  return (
    <div>
      <div className="filters">
        {categories.map((c) => (
          <button key={c.key} className={`fbtn ${filter === c.key ? "active" : ""}`} onClick={() => { setFilter(c.key); setLb(null); }}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="pgrid">
        {items.map((it, i) => (
          <button key={it.src + i} className="pcell" onClick={() => setLb(i)} aria-label={`${it.catLabel} ${it.type === "video" ? "video" : "görsel"}`}>
            <Image src={it.type === "video" ? it.poster : it.src} alt={it.catLabel} fill sizes="(max-width:700px) 50vw, 33vw" className="pimg" />
            {it.type === "video" && (
              <span className="pplay"><span className="pplay-tri">▶</span></span>
            )}
            <span className="pcat">{it.catLabel}{it.type === "video" ? " · Video" : ""}</span>
          </button>
        ))}
      </div>

      {lb != null && items[lb] && (
        <div
          className="lb"
          onClick={close}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchX.current == null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 40) (dx < 0 ? next() : prev());
          }}
        >
          <button className="lb-x" onClick={close} aria-label="Kapat">✕</button>
          <button className="lb-nav lb-p" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Önceki">‹</button>
          <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
            {items[lb].type === "video" ? (
              <video
                key={items[lb].src}
                src={items[lb].src}
                poster={items[lb].poster}
                className="lb-video"
                controls
                autoPlay
                playsInline
              />
            ) : (
              <Image src={items[lb].src} alt={items[lb].catLabel} width={1200} height={900} className="lb-img" />
            )}
            <div className="lb-cap">{items[lb].catLabel} · {lb + 1} / {items.length}</div>
          </div>
          <button className="lb-nav lb-n" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Sonraki">›</button>
        </div>
      )}

      <style jsx>{`
        .filters { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 32px; }
        .fbtn { font-family: var(--font-display); font-weight: 600; font-size: 14px; padding: 10px 20px; border-radius: 100px; border: 1px solid var(--line-strong); background: var(--bg); color: var(--ink-2); cursor: pointer; transition: all .2s; }
        .fbtn:hover { border-color: var(--ink); color: var(--ink); }
        .fbtn.active { background: var(--ink); color: #fff; border-color: var(--ink); }
        .pgrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .pcell { position: relative; aspect-ratio: 4/3; border: none; padding: 0; cursor: pointer; overflow: hidden; border-radius: 6px; background: var(--bg-soft); }
        :global(.pimg) { object-fit: cover; transition: transform .45s ease; }
        .pcell:hover :global(.pimg) { transform: scale(1.06); }
        .pplay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(15,20,28,0.3); transition: background .25s ease; }
        .pcell:hover .pplay { background: rgba(15,20,28,0.45); }
        .pplay-tri { width: 56px; height: 56px; border-radius: 50%; background: var(--accent); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 20px; padding-left: 4px; box-shadow: 0 6px 20px rgba(0,0,0,0.35); transition: transform .25s ease; }
        .pcell:hover .pplay-tri { transform: scale(1.1); }
        .pcat { position: absolute; left: 12px; bottom: 12px; font-family: var(--font-display); font-size: 12px; font-weight: 600; color: #fff; background: rgba(22,32,46,0.8); backdrop-filter: blur(4px); padding: 5px 11px; border-radius: 3px; opacity: 0; transform: translateY(6px); transition: all .25s ease; }
        .pcell:hover .pcat { opacity: 1; transform: none; }
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
          .pgrid { grid-template-columns: repeat(2, 1fr); }
          .pplay-tri { width: 46px; height: 46px; font-size: 16px; }
          .lb-nav { width: 42px; height: 42px; font-size: 22px; } .lb-p { left: 8px; } .lb-n { right: 8px; }
        }
      `}</style>
    </div>
  );
}
