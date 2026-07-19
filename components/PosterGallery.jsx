"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { posters } from "../data/site";

export default function PosterGallery() {
  const [lb, setLb] = useState(null);

  const close = useCallback(() => setLb(null), []);

  useEffect(() => {
    if (lb == null) return;
    const onKey = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lb, close]);

  return (
    <div className="posters">
      {posters.map((p, i) => (
        <button key={p.src} className="poster" onClick={() => setLb(i)} aria-label={p.alt}>
          <Image src={p.src} alt={p.alt} width={p.w} height={p.h} className="poster-img" />
          <span className="poster-zoom">Büyüt ＋</span>
        </button>
      ))}

      {lb != null && posters[lb] && (
        <div className="lb" onClick={close}>
          <button className="lb-x" onClick={close} aria-label="Kapat">✕</button>
          <Image src={posters[lb].src} alt={posters[lb].alt} width={posters[lb].w} height={posters[lb].h} className="lb-img" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <style jsx>{`
        .posters { display: grid; grid-template-columns: repeat(2, minmax(0, 420px)); gap: clamp(20px, 3vw, 36px); justify-content: center; align-items: start; }
        .poster { position: relative; border: 1px solid var(--line); background: var(--bg); padding: 0; cursor: zoom-in; border-radius: 8px; overflow: hidden; box-shadow: 0 16px 44px rgba(22,32,46,0.14); transition: transform .3s ease, box-shadow .3s ease; }
        .poster:hover { transform: translateY(-6px); box-shadow: 0 26px 60px rgba(22,32,46,0.2); }
        :global(.poster-img) { display: block; width: 100%; height: auto; }
        .poster-zoom { position: absolute; right: 14px; bottom: 14px; font-family: var(--font-display); font-size: 13px; font-weight: 600; color: #fff; background: rgba(22,32,46,0.82); backdrop-filter: blur(4px); padding: 7px 14px; border-radius: 100px; opacity: 0; transform: translateY(6px); transition: all .25s ease; }
        .poster:hover .poster-zoom { opacity: 1; transform: none; }
        .lb { position: fixed; inset: 0; z-index: 200; background: rgba(15,20,28,0.95); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 24px; cursor: zoom-out; }
        :global(.lb-img) { max-width: 92vw; max-height: 90vh; width: auto; height: auto; object-fit: contain; border-radius: 6px; cursor: default; }
        .lb-x { position: absolute; top: 20px; right: 24px; background: none; border: none; color: #fff; font-size: 26px; cursor: pointer; opacity: .85; z-index: 2; }
        .lb-x:hover { opacity: 1; }
        @media (max-width: 700px) {
          .posters { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
