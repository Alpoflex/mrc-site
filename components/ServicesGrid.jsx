"use client";

import Link from "next/link";
import Image from "next/image";
import { services } from "../data/site";
import Reveal from "./Reveal";

function BendIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" width="44" height="44">
      <path d="M8 44h28a12 12 0 0 0 12-12V12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M44 18l4-6 4 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 52h48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" width="44" height="44">
      <rect x="14" y="28" width="36" height="26" rx="3" stroke="currentColor" strokeWidth="3" />
      <path d="M22 28v-6a10 10 0 0 1 20 0v6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="40" r="3.5" fill="currentColor" />
    </svg>
  );
}

export default function ServicesGrid() {
  return (
    <div className="sg">
      {services.map((s, i) => (
        <Reveal key={s.slug} delay={i * 70}>
          <Link href={`/hizmetler/${s.slug}`} className="sg-card">
            <div className="sg-media">
              {s.cover ? (
                <Image src={s.cover} alt={s.title} fill sizes="(max-width:800px) 100vw, 33vw" className="sg-img" />
              ) : (
                <div className={`sg-ph ${s.confidential ? "conf" : ""}`}>
                  {s.confidential ? <LockIcon /> : <BendIcon />}
                  {s.confidential && <span className="conf-tag">GİZLİLİK SÖZLEŞMESİ</span>}
                </div>
              )}
              <span className="sg-num">{s.n}</span>
              {(s.gallery.length > 0 || (s.videos && s.videos.length > 0)) && (
                <span className="sg-count">
                  {s.gallery.length > 0 && `${s.gallery.length} fotoğraf`}
                  {s.gallery.length > 0 && s.videos && s.videos.length > 0 && " · "}
                  {s.videos && s.videos.length > 0 && `${s.videos.length} video`}
                </span>
              )}
            </div>
            <div className="sg-body">
              <h3 className="sg-title">{s.title}</h3>
              <p className="sg-short">{s.short}</p>
              <span className="sg-link">Detaylı bilgi →</span>
            </div>
          </Link>
        </Reveal>
      ))}

      <style jsx>{`
        .sg { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .sg :global(.sg-card) {
          display: flex; flex-direction: column; background: var(--surface);
          border: 1px solid var(--line); border-radius: 6px; overflow: hidden; height: 100%;
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
        }
        .sg :global(.sg-card:hover) { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(22,32,46,0.1); border-color: var(--line-strong); }
        .sg-media { position: relative; aspect-ratio: 16/10; background: var(--bg-soft); overflow: hidden; }
        .sg :global(.sg-img) { object-fit: cover; transition: transform .5s ease; }
        .sg :global(.sg-card:hover) :global(.sg-img) { transform: scale(1.06); }
        .sg-ph { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; color: var(--ink-2); background: var(--bg-soft); }
        .sg-ph.conf { color: var(--accent); }
        .conf-tag { font-family: var(--font-display); font-size: 11px; letter-spacing: 0.16em; font-weight: 700; }
        .sg-num { position: absolute; top: 14px; left: 14px; font-family: var(--font-display); font-size: 12px; font-weight: 700; color: #fff; background: rgba(22,32,46,0.78); backdrop-filter: blur(4px); padding: 5px 11px; border-radius: 3px; letter-spacing: 0.06em; }
        .sg-count { position: absolute; right: 12px; bottom: 12px; font-family: var(--font-display); font-size: 11.5px; font-weight: 600; color: #fff; background: rgba(22,32,46,0.78); backdrop-filter: blur(4px); padding: 5px 11px; border-radius: 100px; }
        .sg-body { padding: 24px 22px 26px; display: flex; flex-direction: column; flex: 1; }
        .sg-title { font-family: var(--font-display); font-size: 21px; font-weight: 700; margin-bottom: 9px; color: var(--ink); }
        .sg-short { font-size: 14.5px; color: var(--ink-2); line-height: 1.55; flex: 1; margin-bottom: 18px; }
        .sg-link { font-family: var(--font-display); font-size: 14px; font-weight: 600; color: var(--accent); }
        @media (max-width: 820px) { .sg { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 520px) { .sg { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
