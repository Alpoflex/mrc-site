import Link from "next/link";

export default function PageHero({ eyebrow, title, desc = "", crumb = "" }) {
  return (
    <section className="ph">
      <div className="container">
        <nav className="crumb">
          <Link href="/">Anasayfa</Link>
          <span>/</span>
          <span className="crumb-cur">{crumb || title}</span>
        </nav>
        <div className="eyebrow" style={{ color: "#ff7a6b" }}>{eyebrow}</div>
        <h1 className="h1 ph-title">{title}</h1>
        {desc && <p className="ph-desc">{desc}</p>}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .ph { background: var(--steel-2); color: #fff; padding: clamp(40px, 6vw, 64px) 0 clamp(44px, 7vw, 72px); }
        .crumb { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #8a97a8; margin-bottom: 24px; font-family: var(--font-display); }
        .crumb a:hover { color: #fff; }
        .crumb-cur { color: #cfd6df; }
        .ph-title { color: #fff; max-width: 800px; }
        .ph-desc { color: #b8c1cd; font-size: clamp(16px,2vw,18px); line-height: 1.7; max-width: 620px; margin-top: 18px; }
      ` }} />
    </section>
  );
}
