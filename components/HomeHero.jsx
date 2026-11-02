"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { company, stats } from "../data/site";

// Sayısal istatistikleri 0'dan değere doğru akıtır ("7/24" gibi olanlar sabit kalır)
function StatNum({ value }) {
  const numeric = /^\d+$/.test(value);
  const target = numeric ? parseInt(value, 10) : 0;
  // SSR/JS'siz durumda hedef değer görünür; animasyon mount'ta 0'dan başlar
  const [n, setN] = useState(numeric ? target : null);

  useEffect(() => {
    if (!numeric) return;
    let raf;
    const t0 = performance.now();
    const dur = 1400;
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [numeric, target]);

  return <>{numeric ? n : value}</>;
}

export default function HomeHero() {
  const videoRef = useRef(null);
  const mediaRef = useRef(null);

  // Kaydırırken arka plan videosu içerikten daha yavaş kayar (paralaks)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        if (mediaRef.current && y < window.innerHeight * 1.2) {
          mediaRef.current.style.transform = `translate3d(0, ${y * 0.32}px, 0)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  // Sekme arka plana alınıp geri gelince tarayıcının duraklattığı videoyu sürdür
  useEffect(() => {
    const resume = () => {
      if (document.visibilityState === "visible") videoRef.current?.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", resume);
    return () => document.removeEventListener("visibilitychange", resume);
  }, []);

  return (
    <section className="hero">
      <div className="hero-media" ref={mediaRef}>
        <Image
          src="/images/celik/celik-02.jpeg"
          alt="MRC Makine Sanayi çelik konstrüksiyon üretimi"
          fill
          priority
          sizes="100vw"
          className="hero-img"
        />
        <video
          ref={videoRef}
          className="hero-video"
          src="/videos/lazer-video-01.mp4"
          poster="/videos/lazer-video-01.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="hero-overlay" />
        <div className="hero-grain grain" aria-hidden="true" />
      </div>

      <div className="container hero-in">
        <div className="hero-content">
          <div className="eyebrow hero-up hero-d1" style={{ color: "#ff7a6b" }}>{company.location}</div>
          <h1 className="h1 hero-title">
            <span className="hl"><span className="hl-in hl-d1">Çelikte ve sac işlemede</span></span>
            <span className="hl"><span className="hl-in hl-d2">uçtan uca üretim ortağınız</span></span>
          </h1>
          <span className="hero-bar" aria-hidden="true" />
          <p className="hero-lead hero-up hero-d3">
            Çelik konstrüksiyon, fiber lazer kesim, abkant büküm, sac işleme ve inşaat
            taahhüt. Modern makine parkuru ve uzman kadromuzla projenizi baştan sona
            tek elden üretiyoruz.
          </p>
          <div className="hero-btns hero-up hero-d4">
            <Link href="/iletisim" className="btn btn-primary">Teklif Alın →</Link>
            <Link href="/hizmetler" className="btn btn-light">Hizmetlerimiz</Link>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <span className="hero-scroll-line" />
          KAYDIR
        </div>
      </div>

      {/* Alt istatistik şeridi */}
      <div className="hero-stats">
        <div className="container hero-stats-in">
          {stats.map((s) => (
            <div key={s.label} className="hstat">
              <div className="hstat-num"><StatNum value={s.num} /><span className="hstat-unit">{s.unit}</span></div>
              <div className="hstat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hero { position: relative; background: var(--steel-2); overflow: hidden; min-height: 100vh; min-height: 100svh; display: flex; flex-direction: column; }
        .hero-media { position: absolute; inset: 0; overflow: hidden; }
        :global(.hero-img) { object-fit: cover; }
        .hero-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        /* Arka plan çok yavaş yakınlaşır (sinematik Ken Burns) */
        .hero-video, .hero-media :global(.hero-img) { animation: kenBurns 26s ease-in-out infinite alternate; transform-origin: 60% 50%; }
        @keyframes kenBurns { from { transform: scale(1); } to { transform: scale(1.09); } }
        .hero-media { will-change: transform; }
        .hero-grain { position: absolute; inset: 0; }
        .hero-overlay {
          position: absolute; inset: 0;
          background:
            linear-gradient(180deg, rgba(12,18,27,0.35) 0%, rgba(12,18,27,0) 30%, rgba(12,18,27,0) 62%, rgba(12,18,27,0.85) 100%),
            linear-gradient(100deg, rgba(18,28,41,0.93) 0%, rgba(18,28,41,0.78) 42%, rgba(18,28,41,0.35) 100%);
        }
        /* Üstte sabit şeffaf header'ın (üst şerit + menü) altında kalmaması için */
        .hero-in { position: relative; flex: 1; width: 100%; display: flex; align-items: center; padding: calc(var(--header-h) + 38px + clamp(32px, 6vw, 72px)) 24px clamp(48px, 7vw, 88px); }
        .hero-content { max-width: 1040px; }
        .hero-title { color: #fff; margin-bottom: 24px; font-size: clamp(40px, 6.2vw, 82px); line-height: 1.04; letter-spacing: -0.03em; }
        /* Satır maskesi: her satır kendi kutusunun altından yukarı kayarak açılır */
        .hl { display: block; overflow: hidden; padding-bottom: 0.06em; }
        .hl-in { display: block; transform: translateY(108%); animation: lineUp 1s cubic-bezier(.2,.75,.2,1) forwards; text-wrap: balance; }
        .hl-d1 { animation-delay: .15s; } .hl-d2 { animation-delay: .3s; }
        @keyframes lineUp { to { transform: none; } }
        .hero-bar { display: block; width: 88px; height: 4px; background: var(--accent); margin-bottom: 28px; transform: scaleX(0); transform-origin: left; animation: barIn .8s cubic-bezier(.2,.75,.2,1) .7s forwards; }
        @keyframes barIn { to { transform: scaleX(1); } }
        .hero-lead { font-size: clamp(16px, 1.9vw, 20px); color: #d0d7e0; max-width: 620px; line-height: 1.7; margin-bottom: 38px; }
        .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
        .hero-up { opacity: 0; transform: translateY(22px); animation: heroUp .7s cubic-bezier(.2,.7,.3,1) forwards; }
        .hero-d1 { animation-delay: .1s; } .hero-d2 { animation-delay: .22s; } .hero-d3 { animation-delay: .36s; } .hero-d4 { animation-delay: .5s; }
        @keyframes heroUp { to { opacity: 1; transform: none; } }
        .hero-scroll { position: absolute; right: 24px; bottom: 26px; display: flex; flex-direction: column; align-items: center; gap: 10px; font-family: var(--font-display); font-size: 10.5px; font-weight: 700; letter-spacing: 0.3em; color: rgba(255,255,255,0.55); writing-mode: vertical-rl; }
        .hero-scroll-line { width: 2px; height: 44px; background: rgba(255,255,255,0.25); position: relative; overflow: hidden; }
        .hero-scroll-line::after { content: ""; position: absolute; left: 0; top: -50%; width: 100%; height: 50%; background: var(--accent); animation: scrollDrip 1.8s ease-in-out infinite; }
        @keyframes scrollDrip { to { top: 110%; } }
        @media (prefers-reduced-motion: reduce) {
          .hero-up { opacity: 1; transform: none; animation: none; }
          .hl-in, .hero-bar { transform: none; animation: none; }
          .hero-video, .hero-media :global(.hero-img) { animation: none; }
          .hero-scroll-line::after { animation: none; }
        }
        /* İstatistikler: videonun altında buzlu cam panel */
        .hero-stats { position: relative; background: rgba(12,18,27,0.5); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-top: 1px solid rgba(255,255,255,0.1); }
        .hero-stats-in { display: grid; grid-template-columns: repeat(4, 1fr); }
        .hstat { position: relative; padding: 28px 24px 26px; border-right: 1px solid rgba(255,255,255,0.1); }
        .hstat::before { content: ""; position: absolute; left: 24px; top: -1px; width: 32px; height: 3px; background: var(--accent); }
        .hstat:first-child { padding-left: 0; } .hstat:first-child::before { left: 0; }
        .hstat:last-child { border-right: none; }
        .hstat-num { font-family: var(--font-display); font-size: clamp(30px, 4vw, 44px); font-weight: 800; color: #fff; line-height: 1; letter-spacing: -0.02em; }
        .hstat-unit { font-size: 0.45em; font-weight: 700; margin-left: 3px; color: #ff7a6b; }
        .hstat-label { font-size: 13px; color: rgba(255,255,255,0.7); margin-top: 9px; line-height: 1.3; }
        @media (max-width: 760px) {
          .hero-stats-in { grid-template-columns: 1fr 1fr; }
          .hstat:nth-child(odd) { padding-left: 0; } .hstat:nth-child(odd)::before { left: 0; }
          .hstat:nth-child(2) { border-right: none; }
          .hstat:nth-child(1), .hstat:nth-child(2) { border-bottom: 1px solid rgba(255,255,255,0.1); }
        }
        @media (max-width: 700px) { .hero-scroll { display: none; } }
        @media (max-width: 500px) {
          .hero-in { padding-top: calc(var(--header-h) + 32px + 36px); }
        }
        @media (max-width: 400px) {
          .hero-stats-in { grid-template-columns: 1fr 1fr; gap: 0; }
          .hstat { padding: 20px 14px; }
          .hstat-label { font-size: 11px; }
          .hero-btns { flex-direction: column; gap: 10px; }
          .hero-btns .btn { text-align: center; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
