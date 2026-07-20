"use client";

import Link from "next/link";
import Image from "next/image";
import { services } from "../data/site";
import Reveal from "./Reveal";

function LockIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" width="44" height="44">
      <rect x="14" y="28" width="36" height="26" rx="3" stroke="currentColor" strokeWidth="3" />
      <path d="M22 28v-6a10 10 0 0 1 20 0v6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="40" r="3.5" fill="currentColor" />
    </svg>
  );
}

// Fotoğraf öncelikli hizmet kartları — görsel tam kart, metin degrade üzerinde.
export default function ServicesGrid() {
  return (
    <div className="sg">
      {services.map((s, i) => {
        const photos = s.gallery.length;
        const vids = s.videos ? s.videos.length : 0;
        return (
          <Reveal key={s.slug} delay={i * 70}>
            <Link href={`/hizmetler/${s.slug}`} className="sg-card">
              {s.cover && (
                <Image src={s.cover} alt={s.title} fill sizes="(max-width:800px) 100vw, 33vw" className="sg-img" />
              )}
              {s.confidential && (
                <div className="sg-conf">
                  <LockIcon />
                  <span className="sg-conf-tag">GİZLİLİK SÖZLEŞMESİ</span>
                </div>
              )}
              <div className="sg-shade" aria-hidden="true" />
              <span className="sg-num">{s.n}</span>
              {(photos > 0 || vids > 0) && (
                <span className="sg-count">
                  {photos > 0 && `${photos} fotoğraf`}
                  {photos > 0 && vids > 0 && " · "}
                  {vids > 0 && `${vids} video`}
                </span>
              )}
              <div className="sg-info">
                <h3 className="sg-title">{s.title}</h3>
                <p className="sg-short">{s.short}</p>
                <span className="sg-link">İncele <span className="sg-arrow">→</span></span>
              </div>
            </Link>
          </Reveal>
        );
      })}

      <style jsx>{`
        .sg { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .sg :global(.sg-card) {
          position: relative; display: block; aspect-ratio: 4/4.6; border-radius: 8px; overflow: hidden;
          background: var(--steel-2);
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .sg :global(.sg-card:hover) { transform: translateY(-6px); box-shadow: 0 22px 50px rgba(22,32,46,0.22); }
        .sg :global(.sg-img) { object-fit: cover; transition: transform .55s ease; }
        .sg :global(.sg-card:hover) :global(.sg-img) { transform: scale(1.07); }
        .sg-shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(20,30,44,0.2) 0%, rgba(20,30,44,0.08) 30%, rgba(15,22,32,0.62) 55%, rgba(15,22,32,0.9) 78%, rgba(13,19,28,0.96) 100%); }
        .sg-conf { position: absolute; inset: 0 0 42% 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; color: #ff7a6b; z-index: 1; }
        .sg-conf-tag { font-family: var(--font-display); font-size: 11px; letter-spacing: 0.16em; font-weight: 700; }
        .sg-num { position: absolute; top: 16px; left: 16px; font-family: var(--font-display); font-size: 12px; font-weight: 700; color: #fff; background: rgba(15,20,28,0.6); backdrop-filter: blur(4px); padding: 5px 11px; border-radius: 3px; letter-spacing: 0.06em; }
        .sg-count { position: absolute; top: 16px; right: 16px; font-family: var(--font-display); font-size: 11.5px; font-weight: 600; color: #fff; background: rgba(15,20,28,0.6); backdrop-filter: blur(4px); padding: 5px 11px; border-radius: 100px; }
        .sg-info { position: absolute; left: 0; right: 0; bottom: 0; padding: 22px 22px 24px; color: #fff; }
        .sg-title { font-family: var(--font-display); font-size: 21px; font-weight: 700; color: #fff; margin-bottom: 7px; text-shadow: 0 1px 10px rgba(10,15,22,0.65); }
        .sg-short { font-size: 13.5px; color: #d3dae3; line-height: 1.5; margin-bottom: 14px; text-shadow: 0 1px 8px rgba(10,15,22,0.65); }
        .sg-link { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-display); font-size: 14px; font-weight: 700; color: #ff8a80; }
        .sg-arrow { transition: transform .25s ease; }
        .sg :global(.sg-card:hover) .sg-arrow { transform: translateX(5px); }
        @media (max-width: 960px) { .sg { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 520px) {
          .sg { grid-template-columns: 1fr; }
          .sg :global(.sg-card) { aspect-ratio: 4/3.4; }
        }
      `}</style>
    </div>
  );
}
