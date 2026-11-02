"use client";

import Link from "next/link";
import Image from "next/image";
import { structureTypes } from "../data/site";
import Reveal from "./Reveal";

export default function StructureTypes() {
  return (
    <div className="st">
      {structureTypes.map((s, i) => (
        <Reveal key={s.title} delay={i * 90}>
          <Link href={s.href} className="st-card">
            <div className="st-media">
              <Image src={s.image} alt={`${s.title} — temsili görsel`} fill sizes="(max-width:820px) 100vw, 33vw" className="st-img" />
              <span className="st-tag">Temsili görsel</span>
            </div>
            <div className="st-body">
              <h3 className="st-title">{s.title}</h3>
              <p className="st-desc">{s.desc}</p>
              <span className="st-link">Teklif alın <span className="st-arrow">→</span></span>
            </div>
          </Link>
        </Reveal>
      ))}

      <style jsx>{`
        .st { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .st :global(.st-card) {
          display: flex; flex-direction: column; height: 100%;
          background: var(--surface); border: 1px solid var(--line); border-radius: 8px; overflow: hidden;
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .st :global(.st-card:hover) { transform: translateY(-6px); box-shadow: 0 22px 50px rgba(22,32,46,0.14); }
        .st :global(.st-card) { position: relative; }
        .st :global(.st-card)::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: var(--accent); transform: scaleX(0); transform-origin: left; transition: transform .5s cubic-bezier(.2,.75,.2,1); }
        .st :global(.st-card:hover)::after { transform: scaleX(1); }
        .st-media { position: relative; aspect-ratio: 3/2; overflow: hidden; background: var(--bg-soft); }
        .st :global(.st-img) { object-fit: cover; transition: transform .55s ease; }
        .st :global(.st-card:hover) :global(.st-img) { transform: scale(1.06); }
        .st-tag { position: absolute; right: 10px; bottom: 10px; font-family: var(--font-display); font-size: 10.5px; font-weight: 600; letter-spacing: 0.04em; color: rgba(255,255,255,0.9); background: rgba(15,20,28,0.55); backdrop-filter: blur(4px); padding: 3px 9px; border-radius: 100px; }
        .st-body { padding: 22px 22px 24px; display: flex; flex-direction: column; flex: 1; }
        .st-title { font-family: var(--font-display); font-size: 20px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
        .st-desc { font-size: 14.5px; color: var(--ink-2); line-height: 1.6; flex: 1; margin-bottom: 16px; }
        .st-link { font-family: var(--font-display); font-size: 14px; font-weight: 700; color: var(--accent); }
        .st-arrow { display: inline-block; transition: transform .25s ease; }
        .st :global(.st-card:hover) .st-arrow { transform: translateX(5px); }
        @media (max-width: 960px) { .st { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .st { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
