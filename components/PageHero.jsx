import Link from "next/link";
import Image from "next/image";

// İç sayfa hero'su — image verilirse sinematik arka plan, verilmezse düz koyu bant.
export default function PageHero(props) {
  const { eyebrow, title, desc = "", crumb = "", image = null } = props;
  return (
    <section className={`ph ${image ? "ph-media" : ""}`}>
      {image && (
        <div className="ph-bg" aria-hidden="true">
          <Image src={image} alt="" fill priority sizes="100vw" className="ph-img" />
          <div className="ph-overlay" />
        </div>
      )}
      <div className="container ph-in">
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
        .ph { position: relative; background: var(--steel-2); color: #fff; padding: clamp(40px, 6vw, 64px) 0 clamp(44px, 7vw, 72px); overflow: hidden; }
        .ph.ph-media { padding: clamp(56px, 8vw, 96px) 0 clamp(60px, 9vw, 104px); }
        .ph-bg { position: absolute; inset: 0; }
        .ph-img { object-fit: cover; }
        .ph-overlay { position: absolute; inset: 0; background: linear-gradient(100deg, rgba(20,32,46,0.95) 0%, rgba(20,32,46,0.84) 48%, rgba(20,32,46,0.55) 100%); }
        .ph-in { position: relative; }
        .crumb { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #8a97a8; margin-bottom: 24px; font-family: var(--font-display); }
        .crumb a:hover { color: #fff; }
        .crumb-cur { color: #cfd6df; }
        .ph-title { color: #fff; max-width: 800px; }
        .ph-title::after { content: ""; display: block; width: 72px; height: 4px; background: var(--accent); margin-top: 24px; }
        .ph-desc { color: #b8c1cd; font-size: clamp(16px,2vw,18px); line-height: 1.7; max-width: 620px; margin-top: 18px; }
      ` }} />
    </section>
  );
}
