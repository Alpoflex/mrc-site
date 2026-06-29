import Link from "next/link";
import Image from "next/image";
import HomeHero from "../components/HomeHero";
import ServicesGrid from "../components/ServicesGrid";
import Reveal from "../components/Reveal";
import { processSteps, advantages, sectors } from "../data/site";

export default function Home() {
  return (
    <>
      <HomeHero />

      {/* TANITIM */}
      <section className="section">
        <div className="container intro-grid">
          <Reveal>
            <div className="intro-img">
              <Image src="/images/celik/celik-06.jpeg" alt="Üretim tesisi" width={560} height={620} className="i-img" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="intro-tx">
              <div className="eyebrow">Hakkımızda</div>
              <h2 className="h2">Üretimin her aşamasını tek çatı altında topluyoruz</h2>
              <p className="lead">
                MRC Makine Sanayi olarak Kırıkkale Hacılar&apos;da çelik konstrüksiyon,
                lazer kesim, abkant büküm, sac işleme ve inşaat taahhüt alanlarında
                hizmet veriyoruz. Modern makine parkurumuz ve uzman kadromuzla, küçük
                bir dekoratif lazer kesimden büyük ölçekli bir fabrika yapısına kadar
                her işi aynı titizlikle gerçekleştiriyoruz.
              </p>
              <p className="lead" style={{ marginTop: 14 }}>
                Önceliğimiz; teknik çizime tam uyum, kaliteli işçilik ve zamanında
                teslimat. İşinizi bize emanet ettiğinizde, baştan sona güvenilir bir
                üretim ortağıyla çalışırsınız.
              </p>
              <Link href="/hakkimizda" className="btn btn-dark" style={{ marginTop: 28 }}>
                Daha fazlası →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

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
          <ServicesGrid />
        </div>
      </section>

      {/* SÜREÇ */}
      <section className="section">
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

      {/* NEDEN BİZ + SEKTÖRLER (koyu) */}
      <section className="section section-dark">
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
        .intro-grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: clamp(32px, 6vw, 72px); align-items: center; }
        .intro-img { position: relative; }
        .i-img { width: 100%; height: auto; border-radius: 8px; object-fit: cover; box-shadow: 0 20px 50px rgba(22,32,46,0.12); }
        .sec-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; margin-bottom: 44px; flex-wrap: wrap; }
        .sec-head-p { max-width: 420px; }
        .proc { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border-top: 2px solid var(--ink); }
        .proc-step { padding: 28px 24px 28px 0; border-right: 1px solid var(--line); padding-left: 24px; }
        .proc-step:first-child { padding-left: 0; }
        .proc-step:last-child { border-right: none; }
        .proc-n { font-family: var(--font-display); font-size: 14px; font-weight: 700; color: var(--accent); letter-spacing: 0.1em; }
        .proc-title { font-family: var(--font-display); font-size: 19px; font-weight: 700; margin: 12px 0 8px; }
        .proc-desc { font-size: 14px; color: var(--ink-2); line-height: 1.6; }
        .why-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: clamp(32px, 6vw, 72px); align-items: start; }
        .adv-list { display: flex; flex-direction: column; gap: 22px; margin-top: 30px; }
        .adv { display: flex; gap: 16px; align-items: flex-start; }
        .adv-mark { flex-shrink: 0; width: 28px; height: 28px; border: 1px solid rgba(255,255,255,0.25); border-radius: 3px; display: inline-flex; align-items: center; justify-content: center; color: #ff7a6b; font-weight: 700; font-size: 14px; }
        .adv-title { font-family: var(--font-display); font-weight: 700; font-size: 16px; color: #fff; margin-bottom: 4px; }
        .adv-desc { font-size: 14.5px; color: #9fabbb; line-height: 1.6; }
        .sectors-box { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 30px 28px; }
        .sectors-title { font-family: var(--font-display); font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 20px; }
        .sectors { display: flex; flex-wrap: wrap; gap: 10px; }
        .sector-chip { font-size: 13.5px; color: #cfd6df; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); padding: 8px 14px; border-radius: 100px; }
        .cta { background: var(--accent); padding: clamp(56px, 8vw, 88px) 0; }
        .cta-in { text-align: center; }
        .cta-title { color: #fff; margin-bottom: 14px; }
        .cta-text { color: rgba(255,255,255,0.9); font-size: 17px; max-width: 480px; margin: 0 auto 30px; }
        .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .cta-ghost { color: #fff; border-color: rgba(255,255,255,0.5); }
        .cta-ghost:hover { border-color: #fff; background: rgba(255,255,255,0.1); }
        @media (max-width: 820px) {
          .intro-grid { grid-template-columns: 1fr; }
          .intro-img { order: 2; }
          .intro-tx { order: 1; }
          .proc { grid-template-columns: 1fr 1fr; }
          .proc-step { border-bottom: 1px solid var(--line); }
          .proc-step:nth-child(2) { border-right: none; }
          .proc-step:nth-child(3), .proc-step:nth-child(4) { border-bottom: none; }
          .why-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 520px) {
          .proc { grid-template-columns: 1fr; }
          .proc-step { border-right: none; padding-left: 0; border-bottom: 1px solid var(--line); }
          .proc-step:last-child { border-bottom: none; }
          .sec-head { flex-direction: column; align-items: flex-start; gap: 16px; }
          .sec-head-p { max-width: 100%; }
        }
      ` }} />
    </>
  );
}
