import Link from "next/link";
import HomeHero from "../components/HomeHero";
import ServicesScrolly from "../components/ServicesScrolly";
import ProjectsRail from "../components/ProjectsRail";
import Manifesto from "../components/Manifesto";
import Marquee from "../components/Marquee";
import StructureTypes from "../components/StructureTypes";
import Reveal from "../components/Reveal";
import { processSteps, advantages, sectors } from "../data/site";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <HomeHero />

      <Manifesto />

      {/* PROJELER — masaüstünde sabitlenip yatay akan şerit */}
      <ProjectsRail />

      {/* HİZMETLER */}
      <section className="section section-soft">
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <div>
                <div className="eyebrow">Hizmetlerimiz</div>
                <h2 className="h2">Beş uzmanlık alanı, tek üretim ortağı</h2>
              </div>
              <p className="lead sec-head-p">
                Endüstriyel çelik yapıdan ince dekoratif lazer kesime kadar ihtiyacınız
                olan her üretimi tek elden sunuyoruz.
              </p>
            </div>
          </Reveal>
          <ServicesScrolly />
        </div>
      </section>

      {/* YAPI TÜRLERİ */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <div>
                <div className="eyebrow">Yaptığımız Yapılar</div>
                <h2 className="h2">Fabrikadan mandıraya, her ölçekte çelik yapı</h2>
              </div>
              <p className="lead sec-head-p">
                Sanayi tesislerinden depo ve hayvancılık yapılarına kadar projenizi
                atölyemizde üretip sahada anahtar teslim kuruyoruz.
              </p>
            </div>
          </Reveal>
          <StructureTypes />
        </div>
      </section>

      <Marquee />

      {/* SÜREÇ */}
      <section className="section section-soft">
        <div className="container">
          <Reveal>
            <div className="eyebrow">Nasıl Çalışıyoruz</div>
            <h2 className="h2" style={{ marginBottom: 40 }}>Tekliften teslimata net bir süreç</h2>
          </Reveal>
          <div className="proc">
            {processSteps.map((p, i) => (
              <Reveal key={p.n} delay={i * 90}>
                <div className="proc-step">
                  <span className="proc-node" aria-hidden="true" />
                  <span className="proc-n">{p.n}</span>
                  <h3 className="proc-title">{p.title}</h3>
                  <p className="proc-desc">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEDEN BİZ + SEKTÖRLER (koyu, çelik iskelet fotoğraflı) */}
      <section className="section section-dark why-sec">
        <div className="container why-grid">
          <Reveal>
            <div>
              <div className="eyebrow" style={{ color: "#ff7a6b" }}>Neden MRC</div>
              <h2 className="h2">Güvenle çalışabileceğiniz bir üretim ortağı</h2>
              <div className="adv-list">
                {advantages.map((a) => (
                  <div key={a.title} className="adv">
                    <span className="adv-mark">✓</span>
                    <div>
                      <div className="adv-title">{a.title}</div>
                      <div className="adv-desc">{a.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="sectors-box">
              <h3 className="sectors-title">Çalıştığımız Sektörler</h3>
              <div className="sectors">
                {sectors.map((s) => <span key={s} className="sector-chip">{s}</span>)}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <svg className="cta-gear" viewBox="0 0 100 100" aria-hidden="true">
          <path fill="currentColor" d="M50 34a16 16 0 1 0 0 32 16 16 0 0 0 0-32zm0 24a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm45-13.3-8.6-1.5a37 37 0 0 0-2.5-6.1l5-7.2-7.8-7.8-7.2 5a37 37 0 0 0-6.1-2.5L66.3 16H55.2l-1.5 8.6a37 37 0 0 0-6.1 2.5l-7.2-5-7.8 7.8 5 7.2a37 37 0 0 0-2.5 6.1L26.5 44v11.1l8.6 1.5a37 37 0 0 0 2.5 6.1l-5 7.2 7.8 7.8 7.2-5a37 37 0 0 0 6.1 2.5l1.5 8.6h11.1l1.5-8.6a37 37 0 0 0 6.1-2.5l7.2 5 7.8-7.8-5-7.2a37 37 0 0 0 2.5-6.1l8.6-1.5V44.7z" />
        </svg>
        <div className="container cta-in">
          <Reveal>
            <h2 className="h2 cta-title">Projeniz için hemen teklif alın</h2>
            <p className="cta-text">
              Teknik çiziminizi veya ihtiyacınızı iletin, en kısa sürede dönüş yapalım.
            </p>
            <div className="cta-btns">
              <Link href="/iletisim" className="btn btn-light">Teklif Formu →</Link>
              <a href="tel:+905383159654" className="btn btn-ghost cta-ghost">Hemen Arayın</a>
            </div>
          </Reveal>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .sec-head { display: grid; grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr); align-items: end; gap: 24px clamp(32px, 6vw, 80px); margin-bottom: clamp(36px, 5vw, 56px); }
        .sec-head .h2 { margin-bottom: 0; }
        .sec-head-p { max-width: 440px; padding-bottom: 6px; }
        .proc { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; position: relative; }
        .proc::before { content: ""; position: absolute; top: 7px; left: 8px; right: 8px; height: 2px; background: linear-gradient(90deg, var(--accent), var(--line-strong)); }
        /* Destekleyen tarayıcılarda çizgi kaydırdıkça kendini çizer */
        @supports (animation-timeline: view()) {
          .proc::before { transform-origin: left; animation: procDraw linear both; animation-timeline: view(); animation-range: entry 5% cover 45%; }
          @keyframes procDraw { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        }
        .proc-step { position: relative; padding: 34px 20px 0 0; transition: transform .25s ease; }
        .proc-step:hover { transform: translateY(-4px); }
        .proc-node { position: absolute; top: 0; left: 0; width: 16px; height: 16px; border-radius: 50%; background: var(--bg-soft); border: 3px solid var(--accent); transition: background .25s ease, box-shadow .25s ease; }
        .proc-step:hover .proc-node { background: var(--accent); box-shadow: 0 0 0 6px rgba(211,45,39,0.12); }
        .proc-n { font-family: var(--font-display); font-size: 13px; font-weight: 800; color: var(--accent); letter-spacing: 0.14em; }
        .proc-title { font-family: var(--font-display); font-size: 19px; font-weight: 700; margin: 10px 0 8px; }
        .proc-desc { font-size: 14px; color: var(--ink-2); line-height: 1.6; }
        .why-sec { position: relative; overflow: hidden; background-image: linear-gradient(90deg, rgba(22,32,46,0.97) 0%, rgba(22,32,46,0.9) 50%, rgba(22,32,46,0.72) 100%), url('/images/celik/celik-07.jpeg'); background-size: cover; background-position: center; }
        .why-sec .container { position: relative; }
        .why-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: clamp(32px, 6vw, 72px); align-items: start; }
        .adv-list { display: flex; flex-direction: column; gap: 22px; margin-top: 30px; }
        .adv { display: flex; gap: 16px; align-items: flex-start; }
        .adv-mark { flex-shrink: 0; width: 30px; height: 30px; background: var(--accent); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 13px; box-shadow: 0 0 0 5px rgba(211,45,39,0.18); }
        .adv-title { font-family: var(--font-display); font-weight: 700; font-size: 16px; color: #fff; margin-bottom: 4px; }
        .adv-desc { font-size: 14.5px; color: #9fabbb; line-height: 1.6; }
        .sectors-box { background: rgba(12,18,27,0.55); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 30px 28px; }
        .sectors-title { font-family: var(--font-display); font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 20px; }
        .sectors { display: flex; flex-wrap: wrap; gap: 10px; }
        .sector-chip { font-size: 13.5px; color: #cfd6df; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); padding: 8px 14px; border-radius: 100px; }
        .cta { position: relative; background: var(--accent); padding: clamp(56px, 8vw, 88px) 0; overflow: hidden; }
        .cta::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 10px; background: repeating-linear-gradient(-45deg, rgba(15,20,28,0.35) 0 14px, transparent 14px 28px); }
        .cta-gear { position: absolute; right: -70px; top: 50%; transform: translateY(-50%); width: 340px; height: 340px; color: rgba(255,255,255,0.09); animation: gearSpin 40s linear infinite; pointer-events: none; }
        @keyframes gearSpin { to { transform: translateY(-50%) rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .cta-gear { animation: none; } }
        .cta-in { position: relative; text-align: center; }
        .cta-title { color: #fff; margin-bottom: 14px; }
        .cta-text { color: rgba(255,255,255,0.9); font-size: 17px; max-width: 480px; margin: 0 auto 30px; }
        .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .cta-ghost { color: #fff; border-color: rgba(255,255,255,0.5); }
        .cta-ghost:hover { border-color: #fff; background: rgba(255,255,255,0.1); }
        @media (max-width: 820px) {
          .proc { grid-template-columns: 1fr 1fr; gap: 28px 20px; }
          .proc::before { display: none; }
          .why-grid { grid-template-columns: 1fr; }
          .sec-head { grid-template-columns: 1fr; align-items: start; }
        }
        @media (max-width: 520px) {
          .proc { grid-template-columns: 1fr; gap: 26px; }
          .proc-step { padding-left: 30px; padding-top: 0; }
          .proc-node { top: 3px; }
          .sec-head-p { max-width: 100%; }
        }
      ` }} />
    </>
  );
}
