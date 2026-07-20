import Image from "next/image";
import Link from "next/link";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import PosterGallery from "../../components/PosterGallery";
import { advantages, stats, sectors } from "../../data/site";

export const metadata = {
  title: "Hakkımızda",
  description: "MRC Makine Sanayi — Kırıkkale Hacılar'da çelik konstrüksiyon, lazer kesim, sac işleme ve inşaat taahhüt alanında uçtan uca üretim.",
};

export default function Hakkimizda() {
  return (
    <>
      <PageHero
        eyebrow="Hakkımızda"
        title="Köklü tecrübe, modern üretim"
        desc="Kırıkkale Hacılar'da, çelik ve sac işlemenin her alanında güvenilir bir üretim ortağı."
        image="/images/insaat/insaat-14.jpeg"
      />

      <section className="section">
        <div className="container ab-grid">
          <Reveal>
            <div>
              <div className="eyebrow">Biz Kimiz</div>
              <h2 className="h2">Tek elden, baştan sona üretim</h2>
              <p className="lead" style={{ marginBottom: 16 }}>
                MRC Makine Sanayi olarak Kırıkkale Hacılar&apos;da faaliyet gösteriyoruz.
                Çelik konstrüksiyon, fiber lazer kesim, abkant büküm, sac işleme ve
                inşaat taahhüt olmak üzere beş ana alanda hizmet veriyoruz.
              </p>
              <p className="lead" style={{ marginBottom: 16 }}>
                Modern makine parkurumuz sayesinde, dekoratif bir bahçe kapısından
                büyük ölçekli bir fabrika çelik yapısına kadar farklı ölçek ve
                karmaşıklıktaki işleri aynı titizlikle üretiyoruz. Savunma sanayii
                projelerinde de gizlilik sözleşmeleri çerçevesinde hassas parça imalatı
                gerçekleştiriyoruz.
              </p>
              <p className="lead">
                İşinizi tek bir üretim ortağına emanet etmenin rahatlığını sunuyoruz:
                teklif, planlama, üretim ve teslimat tek elden, net bir süreçle ilerliyor.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="ab-img-wrap">
              <Image src="/images/celik/celik-03.jpeg" alt="MRC üretim" width={520} height={640} className="ab-img" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Rakamlar */}
      <section className="section section-dark">
        <div className="container">
          <div className="ab-stats">
            {stats.map((s) => (
              <Reveal key={s.label}>
                <div className="ab-stat">
                  <div className="ab-stat-num">{s.num}<span>{s.unit}</span></div>
                  <div className="ab-stat-label">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Değerler */}
      <section className="section section-soft">
        <div className="container">
          <Reveal>
            <div className="eyebrow">Değerlerimiz</div>
            <h2 className="h2" style={{ marginBottom: 40 }}>Çalışma biçimimizi belirleyen ilkeler</h2>
          </Reveal>
          <div className="vals">
            {advantages.map((a, i) => (
              <Reveal key={a.title} delay={i * 70}>
                <div className="val">
                  <h3 className="val-title">{a.title}</h3>
                  <p className="val-desc">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sektörler + CTA */}
      <section className="section">
        <div className="container ab-sectors-grid">
          <Reveal>
            <div>
              <div className="eyebrow">Sektörler</div>
              <h2 className="h2">Hizmet verdiğimiz alanlar</h2>
              <div className="chips">
                {sectors.map((s) => <span key={s} className="chip">{s}</span>)}
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="ab-cta">
              <h3 className="ab-cta-title">Projenizi konuşalım</h3>
              <p className="ab-cta-text">İhtiyacınızı iletin, size en uygun çözümü birlikte planlayalım.</p>
              <Link href="/iletisim" className="btn btn-primary">Teklif Alın →</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Kurumsal afişler */}
      <section className="section section-soft">
        <div className="container">
          <Reveal>
            <div className="eyebrow" style={{ textAlign: "center" }}>Tanıtım</div>
            <h2 className="h2" style={{ marginBottom: 40, textAlign: "center" }}>Kurumsal afişlerimiz</h2>
          </Reveal>
          <PosterGallery />
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .ab-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: clamp(32px,6vw,64px); align-items: center; }
        .ab-img-wrap { position: relative; }
        .ab-img { width: 100%; height: auto; border-radius: 8px; object-fit: cover; box-shadow: 0 20px 50px rgba(22,32,46,0.12); }
        .ab-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; }
        .ab-stat { text-align: center; }
        .ab-stat-num { font-family: var(--font-display); font-size: clamp(34px,5vw,52px); font-weight: 800; color: #fff; line-height: 1; letter-spacing: -0.02em; }
        .ab-stat-num span { font-size: 0.5em; color: #ff7a6b; margin-left: 2px; }
        .ab-stat-label { font-size: 14px; color: #9fabbb; margin-top: 10px; }
        .vals { display: grid; grid-template-columns: repeat(2,1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: 6px; overflow: hidden; }
        .val { background: var(--bg); padding: 30px 28px; }
        .val-title { font-family: var(--font-display); font-size: 19px; font-weight: 700; margin-bottom: 10px; color: var(--ink); position: relative; padding-left: 16px; }
        .val-title::before { content: ""; position: absolute; left: 0; top: 4px; bottom: 4px; width: 3px; background: var(--accent); border-radius: 2px; }
        .val-desc { font-size: 14.5px; color: var(--ink-2); line-height: 1.65; }
        .ab-sectors-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: clamp(32px,6vw,64px); align-items: center; }
        .chips { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
        .chip { font-size: 14px; background: var(--bg-soft); border: 1px solid var(--line); padding: 9px 16px; border-radius: 100px; color: var(--ink); }
        .ab-cta { background: var(--steel-2); color: #fff; border-radius: 8px; padding: 36px 32px; }
        .ab-cta-title { font-family: var(--font-display); font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 10px; }
        .ab-cta-text { color: #b8c1cd; font-size: 15px; line-height: 1.6; margin-bottom: 24px; }
        @media (max-width: 820px) {
          .ab-grid { grid-template-columns: 1fr; }
          .ab-img-wrap { order: 2; }
          .ab-stats { grid-template-columns: 1fr 1fr; gap: 32px; }
          .vals { grid-template-columns: 1fr; }
          .ab-sectors-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 400px) {
          .ab-stats { gap: 20px; }
          .val { padding: 24px 20px; }
          .ab-cta { padding: 28px 24px; }
        }
      ` }} />
    </>
  );
}
