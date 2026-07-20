// Endüstriyel kayan yazı şeridi — bölümler arası ritim için.
const words = ["Çelik Konstrüksiyon", "Lazer Kesim", "Abkant Büküm", "İnşaat & Taahhüt", "Savunma Sanayii"];

export default function Marquee() {
  const row = words.map((w) => (
    <span key={w} className="mq-item">
      {w}
      <span className="mq-sep" aria-hidden="true">✦</span>
    </span>
  ));

  return (
    <div className="mq" aria-hidden="true">
      <div className="mq-track">
        <div className="mq-row">{row}</div>
        <div className="mq-row">{row}</div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .mq { overflow: hidden; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); background: var(--bg); padding: 26px 0; }
        .mq-track { display: flex; width: max-content; animation: mqScroll 36s linear infinite; }
        .mq-row { display: flex; align-items: center; flex-shrink: 0; }
        .mq-item { display: inline-flex; align-items: center; font-family: var(--font-display); font-size: clamp(30px, 4.6vw, 54px); font-weight: 800; letter-spacing: -0.01em; text-transform: uppercase; white-space: nowrap; color: transparent; -webkit-text-stroke: 1.5px var(--line-strong); }
        .mq-sep { color: var(--accent); -webkit-text-stroke: 0; font-size: 0.45em; margin: 0 28px; }
        @keyframes mqScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .mq-track { animation: none; } }
      ` }} />
    </div>
  );
}
