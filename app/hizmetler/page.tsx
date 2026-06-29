import Link from "next/link";
import PageHero from "../../components/PageHero";
import ServicesGrid from "../../components/ServicesGrid";
import Reveal from "../../components/Reveal";
import { processSteps } from "../../data/site";

export const metadata = {
  title: "Hizmetler",
  description: "Çelik konstrüksiyon, inşaat & taahhüt, lazer kesim, abkant büküm & sac işleme ve savunma sanayii. MRC Makine Sanayi hizmetleri.",
};

export default function Hizmetler() {
  return (
    <>
      <PageHero
        eyebrow="Hizmetlerimiz"
        title="Beş uzmanlık alanı, tek üretim ortağı"
        desc="Endüstriyel çelik yapıdan ince dekoratif lazer kesime kadar ihtiyacınız olan her üretimi tek elden sunuyoruz."
      />

      <section className="section">
        <div className="container">
          <ServicesGrid />
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <Reveal>
            <div className="eyebrow">Nasıl Çalışıyoruz</div>
            <h2 className="h2" style={{ marginBottom: 40 }}>Tekliften teslimata net bir süreç</h2>
          </Reveal>
          <div className="proc">
            {processSteps.map((p, i) => (
              <Reveal key={p.n} delay={i * 80}>
                <div className="proc-step">
                  <span className="proc-n">{p.n}</span>
                  <h3 className="proc-title">{p.title}</h3>
                  <p className="proc-desc">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .proc { display: grid; grid-template-columns: repeat(4,1fr); border-top: 2px solid var(--ink); }
        .proc-step { padding: 28px 24px; border-right: 1px solid var(--line); }
        .proc-step:first-child { padding-left: 0; }
        .proc-step:last-child { border-right: none; padding-right: 0; }
        .proc-n { font-family: var(--font-display); font-size: 14px; font-weight: 700; color: var(--accent); letter-spacing: 0.1em; }
        .proc-title { font-family: var(--font-display); font-size: 19px; font-weight: 700; margin: 12px 0 8px; }
        .proc-desc { font-size: 14px; color: var(--ink-2); line-height: 1.6; }
        @media (max-width: 820px) { .proc { grid-template-columns: 1fr 1fr; } .proc-step { border-bottom: 1px solid var(--line); padding-left: 0; } .proc-step:nth-child(2){border-right:none;} .proc-step:nth-child(3), .proc-step:nth-child(4) { border-bottom: none; } }
        @media (max-width: 520px) { .proc { grid-template-columns: 1fr; } .proc-step { border-right: none; border-bottom: 1px solid var(--line); } .proc-step:last-child { border-bottom: none; } }
        @media (max-width: 400px) { .proc-step { padding: 22px 0; } }
      ` }} />
    </>
  );
}
