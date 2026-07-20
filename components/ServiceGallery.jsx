"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

// gallery: görsel yolu dizisi, videos: [{src, poster}] — grid'de ilk görselden
// hemen sonra videolar gelir, lightbox hepsinde gezinir.
export default function ServiceGallery({ title, gallery, videos = [] }) {
  const items = [
    ...(gallery.length > 0 ? [{ type: "image", src: gallery[0] }] : []),
    ...videos.map((v) => ({ type: "video", ...v })),
    ...gallery.slice(1).map((src) => ({ type: "image", src })),
  ];

  const [lb, setLb] = useState(null);
  const touchX = useRef(null);
  const lbCloseRef = useRef(null);

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
    lbCloseRef.current?.focus();
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lb, close, next, prev]);

  return (
    <div className="gal">
      {items.map((it, i) => (
        <button
          key={it.src}
          className={`cell ${i === 0 ? "feat" : ""}`}
          onClick={() => setLb(i)}
          aria-label={it.type === "video" ? `${title} video` : `${title} görsel ${i + 1}`}
        >
          <Image
            src={it.type === "video" ? it.poster : it.src}
            alt={`${title} ${i + 1}`}
            fill
            sizes="(max-width:700px) 50vw, 25vw"
            className="cell-img"
          />
          {it.type === "video" ? (
            <span className="cell-play"><span className="play-tri">▶</span><span className="play-txt">Video</span></span>
          ) : (
            <span className="cell-zoom">＋</span>
          )}
        </button>
      ))}

      {lb != null && items[lb] && (
        <div
          className="lb"
          role="dialog"
          aria-modal="true"
          aria-label="Galeri görüntüleyici"
          onClick={close}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchX.current == null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 40) (dx < 0 ? next() : prev());
          }}
        >
          <button ref={lbCloseRef} className="lb-x" onClick={close} aria-label="Kapat">✕</button>
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
              <Image src={items[lb].src} alt={`Görsel ${lb + 1}`} width={1200} height={900} className="lb-img" />
            )}
            <div className="lb-count">{lb + 1} / {items.length}</div>
          </div>
          <button className="lb-nav lb-n" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Sonraki">›</button>
        </div>
      )}

      <style jsx>{`
        .gal { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 1fr; gap: 12px; }
        .cell { position: relative; aspect-ratio: 1/1; border: none; padding: 0; cursor: pointer; overflow: hidden; border-radius: 4px; background: var(--bg-soft); }
        .cell.feat { grid-column: span 2; grid-row: span 2; }
        :global(.cell-img) { object-fit: cover; transition: transform .4s ease; }
        .cell:hover :global(.cell-img) { transform: scale(1.06); }
        .cell-zoom { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(22,32,46,0); color: transparent; font-size: 26px; transition: all .25s ease; }
        .cell:hover .cell-zoom { background: rgba(22,32,46,0.4); color: #fff; }
        .cell-play { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; background: rgba(15,20,28,0.35); transition: background .25s ease; }
        .cell:hover .cell-play { background: rgba(15,20,28,0.5); }
        .play-tri { width: 52px; height: 52px; border-radius: 50%; background: var(--accent); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 18px; padding-left: 4px; box-shadow: 0 6px 20px rgba(0,0,0,0.35); transition: transform .25s ease; }
        .cell:hover .play-tri { transform: scale(1.1); }
        .play-txt { font-family: var(--font-display); font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #fff; text-shadow: 0 1px 6px rgba(0,0,0,0.5); }
        .lb { position: fixed; inset: 0; z-index: 200; background: rgba(15,20,28,0.95); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 24px; }
        .lb-stage { position: relative; max-width: 92vw; max-height: 88vh; }
        :global(.lb-img) { max-width: 92vw; max-height: 88vh; width: auto; height: auto; object-fit: contain; border-radius: 4px; }
        .lb-video { max-width: 92vw; max-height: 82vh; width: auto; height: auto; border-radius: 4px; display: block; background: #000; }
        .lb-count { position: absolute; bottom: -34px; left: 50%; transform: translateX(-50%); font-family: var(--font-display); font-size: 14px; color: #aeb9c7; }
        .lb-x { position: absolute; top: 20px; right: 24px; background: none; border: none; color: #fff; font-size: 26px; cursor: pointer; opacity: .85; z-index: 2; }
        .lb-x:hover { opacity: 1; }
        .lb-nav { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2); color: #fff; width: 50px; height: 50px; border-radius: 50%; font-size: 28px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .2s; z-index: 2; }
        .lb-nav:hover { background: var(--accent); border-color: var(--accent); }
        .lb-p { left: 20px; } .lb-n { right: 20px; }
        @media (max-width: 700px) {
          .gal { grid-template-columns: repeat(2, 1fr); }
          .play-tri { width: 42px; height: 42px; font-size: 15px; }
          .lb-nav { width: 42px; height: 42px; font-size: 22px; } .lb-p { left: 8px; } .lb-n { right: 8px; }
        }
      `}</style>
    </div>
  );
}
