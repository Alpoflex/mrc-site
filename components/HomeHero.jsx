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
      <div className="hero-media">
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
      </div>

      <div className="container hero-in">
        <div className="hero-content">
          <div className="eyebrow" style={{ color: "#ff7a6b" }}>{company.location}</div>
          <h1 className="h1 hero-title">
            Çelikte ve sac işlemede<br />
            <span className="hero-accent">uçtan uca üretim ortağınız</span>
          </h1>
          <p className="hero-lead">
            Çelik konstrüksiyon, fiber lazer kesim, abkant büküm, sac işleme ve inşaat
            taahhüt. Modern makine parkuru ve uzman kadromuzla projenizi baştan sona
            tek elden üretiyoruz.
          </p>
          <div className="hero-btns">
            <Link href="/iletisim" className="btn btn-primary">Teklif Alın →</Link>
            <Link href="/hizmetler" className="btn btn-light">Hizmetlerimiz</Link>
          </div>
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
        .hero { position: relative; background: var(--steel-2); overflow: hidden; }
        .hero-media { position: absolute; inset: 0; overflow: hidden; }
        :global(.hero-img) { object-fit: cover; }
        .hero-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(105deg, rgba(20,32,46,0.94) 0%, rgba(20,32,46,0.82) 45%, rgba(20,32,46,0.5) 100%);
        }
        .hero-in { position: relative; padding: clamp(70px, 11vw, 130px) 24px clamp(60px, 9vw, 110px); }
        .hero-content { max-width: 720px; }
        .hero-title { color: #fff; margin-bottom: 26px; }
        .hero-accent { color: #fff; position: relative; }
        .hero-accent::after { content: ""; display: block; width: 88px; height: 4px; background: var(--accent); margin-top: 22px; }
        .hero-lead { font-size: clamp(16px, 2vw, 19px); color: #c5cdd8; max-width: 600px; line-height: 1.7; margin-bottom: 36px; }
        .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
        .hero-stats { position: relative; background: var(--accent); }
        .hero-stats-in { display: grid; grid-template-columns: repeat(4, 1fr); }
        .hstat { padding: 26px 20px; border-right: 1px solid rgba(255,255,255,0.18); }
        .hstat:last-child { border-right: none; }
        .hstat-num { font-family: var(--font-display); font-size: clamp(28px, 4vw, 40px); font-weight: 800; color: #fff; line-height: 1; letter-spacing: -0.02em; }
        .hstat-unit { font-size: 0.5em; font-weight: 700; margin-left: 2px; }
        .hstat-label { font-size: 13px; color: rgba(255,255,255,0.85); margin-top: 8px; line-height: 1.3; }
        @media (max-width: 760px) {
          .hero-stats-in { grid-template-columns: 1fr 1fr; }
          .hstat:nth-child(2) { border-right: none; }
          .hstat:nth-child(1), .hstat:nth-child(2) { border-bottom: 1px solid rgba(255,255,255,0.18); }
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
