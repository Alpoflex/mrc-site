"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { services } from "../data/site";

// Ana sayfa projeler şeridi. Masaüstünde bölüm ekrana sabitlenir ve aşağı
// kaydırdıkça kartlar yatay akar; mobilde parmakla kaydırılan yatay şerit olur.
const items = [
  { type: "livevideo", src: "/videos/lazer-video-01.mp4", poster: "/videos/lazer-video-01.jpg", r: 0.56, label: "Fiber lazer kesim", cat: "Lazer Kesim" },
  { type: "image", src: "/images/celik/celik-04.jpeg", r: 0.75, label: "Fabrika binası", cat: "Çelik Konstrüksiyon" },
  { type: "image", src: "/images/abkant/abkant-12.jpeg", r: 0.75, label: "Abkant pres atölyesi", cat: "Abkant Büküm" },
  { type: "image", src: "/images/lazer/lazer-01.jpeg", r: 1, label: "Desenli korkuluk", cat: "Lazer Kesim" },
  { type: "image", src: "/images/celik/celik-07.jpeg", r: 1.33, label: "Çelik iskelet montajı", cat: "Çelik Konstrüksiyon" },
  { type: "video", src: "/videos/abkant-video-01.mp4", poster: "/videos/abkant-video-01.jpg", r: 0.56, label: "Hassas büküm", cat: "Abkant Büküm" },
  { type: "image", src: "/images/insaat/insaat-17.jpeg", r: 0.75, label: "Villa projesi", cat: "İnşaat & Taahhüt" },
  { type: "image", src: "/images/lazer/lazer-10.jpeg", r: 0.75, label: "Delikli sac kesimi", cat: "Lazer Kesim" },
  { type: "image", src: "/images/insaat/insaat-08.jpeg", r: 1, label: "Konut sitesi", cat: "İnşaat & Taahhüt" },
  { type: "image", src: "/images/celik/celik-02.jpeg", r: 0.56, label: "Panel cephe uygulaması", cat: "Çelik Konstrüksiyon" },
];

const chips = services
  .filter((s) => s.gallery.length > 0 || (s.videos && s.videos.length > 0))
  .map((s) => ({ key: s.slug, label: s.title, count: s.gallery.length + (s.videos ? s.videos.length : 0) }));

export default function ProjectsRail() {
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const liveRef = useRef(null);
  const lbCloseRef = useRef(null);
  const touchX = useRef(null);
  const [pinned, setPinned] = useState(false);
  const [lb, setLb] = useState(null);
  const countRef = useRef(null);
  const barRef = useRef(null);

  // Masaüstü: dikey kaydırmayı yatay harekete çevir
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    let raf = 0, dist = 0;
    const measure = () => {
      const track = trackRef.current, outer = outerRef.current;
      if (!track || !outer) return;
      if (!mq.matches) { setPinned(false); outer.style.height = ""; track.style.transform = ""; return; }
      setPinned(true);
      track.parentElement.scrollLeft = 0;
      dist = Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
      outer.style.height = `${window.innerHeight + dist}px`;
      update();
    };
    const update = () => {
      raf = 0;
      if (!mq.matches) return;
      const outer = outerRef.current, track = trackRef.current;
      const r = outer.getBoundingClientRect();
      const total = outer.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      track.style.transform = `translate3d(${-p * dist}px, 0, 0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.max(0.04, p)})`;
      if (countRef.current) countRef.current.textContent = String(Math.min(items.length, Math.floor(p * items.length) + 1)).padStart(2, "0");
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    mq.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", measure);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Canlı video yalnızca görünürken oynasın
  useEffect(() => {
    const v = liveRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { v.pause(); return; }
    const obs = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.2 });
    obs.observe(v);
    return () => obs.disconnect();
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

  return (
    <section className="pr section-dark" aria-label="Projelerimiz">
      <div ref={outerRef} className="pr-outer">
        <div className={`pr-sticky ${pinned ? "is-pinned" : ""}`}>
          <div className="container pr-head">
            <div>
              <div className="eyebrow" style={{ color: "#ff7a6b" }}>Projelerimiz</div>
              <h2 className="h2">İşçiliğimizi kendi gözlerinizle görün</h2>
            </div>
            <div className="pr-meta">
              <span className="pr-count"><span ref={countRef}>01</span><em>/ {items.length}</em></span>
              <span className="pr-bar"><span ref={barRef} style={{ transform: "scaleX(0.04)" }} /></span>
              <span className="pr-hint">{pinned ? "Kaydırarak keşfedin" : "Kaydırın →"}</span>
            </div>
          </div>

          <div className="pr-viewport">
            <div ref={trackRef} className="pr-track">
              {items.map((it, i) => (
                <button
                  key={it.src}
                  className="pr-card"
                  style={{ aspectRatio: String(it.r) }}
                  onClick={() => setLb(i)}
                  aria-label={`${it.label} — ${it.cat}`}
                  data-cursor={it.type === "image" ? "Büyüt" : "Oynat"}
                >
                  {it.type === "livevideo" ? (
                    <video ref={liveRef} className="pr-media" src={it.src} poster={it.poster} muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} />
                  ) : (
                    <Image src={it.type === "video" ? it.poster : it.src} alt={`${it.label} — MRC Makine Sanayi`} fill sizes="(max-width:900px) 70vw, 40vw" className="pr-img" />
                  )}
                  {it.type === "livevideo" && <span className="pr-live"><span className="pr-dot" />CANLI ÜRETİM</span>}
                  {it.type === "video" && <span className="pr-play">▶</span>}
                  <span className="pr-cap">
                    <span className="pr-n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="pr-l">{it.label}</span>
                    <span className="pr-c">{it.cat}</span>
                  </span>
                </button>
              ))}

              <div className="pr-end">
                <div className="pr-end-t">Daha fazlası<br />Projeler sayfasında</div>
                <div className="pr-chips">
                  {chips.map((c) => (
                    <Link key={c.key} href={`/projeler/?k=${c.key}`} className="pr-chip">{c.label} <span>{c.count}</span></Link>
                  ))}
                </div>
                <Link href="/projeler" className="btn btn-primary" data-cursor="Tümü">Tüm çalışmalar →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox gövdeye taşınır: bölümün katman bağlamında header'ın altında kalmasın */}
      {lb != null && items[lb] && createPortal(
        <div className="lb" role="dialog" aria-modal="true" aria-label="Proje görüntüleyici" onClick={close}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchX.current == null) return;
            const dx = e.changedTouches[0].clientX - touchX.current; touchX.current = null;
            if (Math.abs(dx) > 40) (dx < 0 ? next() : prev());
          }}>
          <button ref={lbCloseRef} className="lb-x" onClick={close} aria-label="Kapat">✕</button>
          <button className="lb-nav lb-p" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Önceki">‹</button>
          <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
            {items[lb].type === "image" ? (
              <Image src={items[lb].src} alt={items[lb].label} width={1200} height={1600} className="lb-img" />
            ) : (
              <video key={items[lb].src} src={items[lb].src} poster={items[lb].poster} className="lb-video" controls autoPlay playsInline />
            )}
            <div className="lb-cap">{items[lb].label} · {items[lb].cat} · {lb + 1} / {items.length}</div>
          </div>
          <button className="lb-nav lb-n" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Sonraki">›</button>
        </div>,
        document.body
      )}

      <style jsx>{`
        .pr-outer { position: relative; }
        .pr-sticky { padding: clamp(64px, 9vw, 104px) 0 clamp(56px, 8vw, 88px); }
        .pr-sticky.is-pinned { position: sticky; top: 0; height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 0; overflow: hidden; }
        .pr-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; margin-bottom: clamp(28px, 4vh, 44px); width: 100%; }
        .pr-head .h2 { color: #fff; margin-bottom: 0; max-width: 640px; }
        .pr-meta { display: flex; align-items: center; gap: 18px; flex-shrink: 0; padding-bottom: 8px; }
        .pr-count { font-family: var(--font-display); font-weight: 800; font-size: 34px; letter-spacing: -0.02em; line-height: 1; }
        .pr-count em { font-style: normal; font-size: 15px; font-weight: 600; color: #8a97a8; margin-left: 6px; }
        .pr-bar { width: 140px; height: 2px; background: rgba(255,255,255,0.15); position: relative; overflow: hidden; }
        .pr-bar span { position: absolute; inset: 0; background: var(--accent); transform-origin: left; transition: transform .15s linear; }
        .pr-hint { font-size: 12.5px; letter-spacing: 0.12em; text-transform: uppercase; color: #8a97a8; font-family: var(--font-display); font-weight: 600; }
        .pr-viewport { width: 100%; overflow: hidden; }
        .pr-track { display: flex; gap: 22px; padding: 0 max(24px, calc((100vw - var(--max)) / 2 + 24px)); width: max-content; will-change: transform; }
        .pr-card { position: relative; height: min(60vh, 560px); flex-shrink: 0; border: none; padding: 0; overflow: hidden; border-radius: 10px; background: rgba(255,255,255,0.05); cursor: pointer; }
        .pr-card :global(.pr-img), .pr-media { object-fit: cover; transition: transform .7s cubic-bezier(.2,.75,.2,1); }
        .pr-media { position: absolute; inset: 0; width: 100%; height: 100%; }
        .pr-card:hover :global(.pr-img), .pr-card:hover .pr-media { transform: scale(1.06); }
        .pr-card::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 55%, rgba(10,15,22,0.82) 100%); pointer-events: none; }
        .pr-cap { position: absolute; left: 18px; right: 18px; bottom: 16px; z-index: 1; display: grid; grid-template-columns: auto 1fr; column-gap: 12px; text-align: left; }
        .pr-n { grid-row: span 2; font-family: var(--font-display); font-weight: 800; font-size: 13px; color: #ff7a6b; padding-top: 3px; }
        .pr-l { font-family: var(--font-display); font-weight: 700; font-size: 17px; color: #fff; }
        .pr-c { font-size: 12.5px; color: #b8c1cd; }
        .pr-live { position: absolute; top: 14px; left: 14px; z-index: 1; display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-display); font-size: 11px; font-weight: 700; letter-spacing: 0.14em; color: #fff; background: rgba(15,20,28,0.72); backdrop-filter: blur(4px); padding: 7px 12px; border-radius: 100px; }
        .pr-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: prPulse 1.4s ease-in-out infinite; }
        @keyframes prPulse { 50% { opacity: .4; transform: scale(.8); } }
        .pr-play { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); z-index: 1; width: 56px; height: 56px; border-radius: 50%; background: var(--accent); display: flex; align-items: center; justify-content: center; font-size: 18px; padding-left: 4px; box-shadow: 0 8px 24px rgba(0,0,0,0.35); }
        .pr-end { flex-shrink: 0; width: min(420px, 80vw); height: min(60vh, 560px); border-radius: 10px; border: 1px solid rgba(255,255,255,0.14); background: rgba(255,255,255,0.03); padding: 32px 28px; display: flex; flex-direction: column; justify-content: space-between; }
        .pr-end-t { font-family: var(--font-display); font-weight: 800; font-size: clamp(26px, 2.6vw, 34px); line-height: 1.1; letter-spacing: -0.02em; }
        .pr-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .pr-chips :global(.pr-chip) { font-family: var(--font-display); font-size: 13px; font-weight: 600; color: #cfd6df; border: 1px solid rgba(255,255,255,0.16); padding: 9px 14px; border-radius: 100px; transition: all .2s ease; }
        .pr-chips :global(.pr-chip:hover) { color: #fff; border-color: var(--accent); background: rgba(211,45,39,0.15); }
        .pr-chips :global(.pr-chip span) { color: #ff7a6b; margin-left: 4px; }
        .pr-end :global(.btn) { align-self: flex-start; }
        /* Mobil / sabitlemesiz: parmakla kaydırılan şerit */
        .pr-sticky:not(.is-pinned) .pr-viewport { overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; padding-bottom: 6px; }
        .pr-sticky:not(.is-pinned) .pr-viewport::-webkit-scrollbar { display: none; }
        @media (max-width: 899px) {
          .pr-viewport { scroll-snap-type: x mandatory; }
          .pr-card, .pr-end { scroll-snap-align: start; scroll-margin-left: 20px; }
          .pr-head { flex-direction: column; align-items: flex-start; gap: 18px; }
          .pr-card { height: 62vh; max-height: 520px; }
          .pr-end { height: 62vh; max-height: 520px; }
          .pr-track { padding: 0 20px; gap: 14px; }
          .pr-bar { display: none; }
        }
        @media (prefers-reduced-motion: reduce) { .pr-dot { animation: none; } }

        .lb { position: fixed; inset: 0; z-index: 200; background: rgba(15,20,28,0.95); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 24px; animation: lbFade .25s ease both; }
        .lb-stage { position: relative; max-width: 92vw; max-height: 88vh; animation: lbZoom .4s cubic-bezier(.2,.75,.2,1) both; }
        .lb-stage :global(.lb-img) { max-width: 92vw; max-height: 86vh; width: auto; height: auto; object-fit: contain; border-radius: 4px; }
        .lb-video { max-width: 92vw; max-height: 82vh; width: auto; height: auto; border-radius: 4px; display: block; background: #000; }
        .lb-cap { position: absolute; bottom: -34px; left: 50%; transform: translateX(-50%); font-family: var(--font-display); font-size: 14px; color: #aeb9c7; white-space: nowrap; }
        .lb-x { position: absolute; top: 20px; right: 24px; background: none; border: none; color: #fff; font-size: 26px; cursor: pointer; opacity: .85; z-index: 2; }
        .lb-nav { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2); color: #fff; width: 50px; height: 50px; border-radius: 50%; font-size: 28px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .2s; z-index: 2; }
        .lb-nav:hover { background: var(--accent); border-color: var(--accent); }
        .lb-p { left: 20px; } .lb-n { right: 20px; }
        @keyframes lbFade { from { opacity: 0; } }
        @keyframes lbZoom { from { opacity: 0; transform: scale(.96); } }
        @media (max-width: 700px) { .lb-nav { width: 42px; height: 42px; font-size: 22px; } .lb-p { left: 8px; } .lb-n { right: 8px; } }
      `}</style>
    </section>
  );
}
