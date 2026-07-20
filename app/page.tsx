import Link from "next/link";
import Image from "next/image";
import HomeHero from "../components/HomeHero";
import ServicesGrid from "../components/ServicesGrid";
import HomeShowcase from "../components/HomeShowcase";
import Marquee from "../components/Marquee";
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

      {/* ÜRETİMDEN KARELER */}
      <section className="section section-dark">
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <div>
                <div className="eyebrow" style={{ color: "#ff7a6b" }}>Üretimden Kareler</div>
                <h2 className="h2">İşçiliğimizi kendi gözlerinizle görün</h2>
              </div>
              <p className="lead sec-head-p" style={{ color: "#9fabbb" }}>
                Atölyemizden ve sahadan seçtiğimiz kareler; lazer kesimden çelik
                montaja üretimin her aşaması burada.
              </p>
            </div>
          </Reveal>
          <HomeShowcase />
        </div>
      </section>

      <Marquee />

      {/* SÜREÇ */}
      <section className="section">
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
        .intro-grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: clamp(32px, 6vw, 72px); align-items: center; }
        .intro-img { position: relative; }
        .i-img { width: 100%; height: auto; border-radius: 8px; object-fit: cover; box-shadow: 0 20px 50px rgba(22,32,46,0.12); }
        .sec-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; margin-bottom: 44px; flex-wrap: wrap; }
        .sec-head-p { max-width: 420px; }
        .proc { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; position: relative; }
        .proc::before { content: ""; position: absolute; top: 7px; left: 8px; right: 8px; height: 2px; background: linear-gradient(90deg, var(--accent), var(--line-strong)); }
        .proc-step { position: relative; padding: 34px 20px 0 0; transition: transform .25s ease; }
        .proc-step:hover { transform: translateY(-4px); }
        .proc-node { position: absolute; top: 0; left: 0; width: 16px; height: 16px; border-radius: 50%; background: var(--bg); border: 3px solid var(--accent); transition: background .25s ease, box-shadow .25s ease; }
        .proc-step:hover .proc-node { background: var(--accent); box-shadow: 0 0 0 6px rgba(211,45,39,0.12); }
        .proc-n { font-family: var(--font-display); font-size: 13px; font-weight: 800; color: var(--accent); letter-spacing: 0.14em; }
        .proc-title { font-family: var(--font-display); font-size: 19px; font-weight: 700; margin: 10px 0 8px; }
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
          .intro-grid { grid-template-columns: 1fr; }
          .intro-img { order: 2; }
          .intro-tx { order: 1; }
          .proc { grid-template-columns: 1fr 1fr; gap: 28px 20px; }
          .proc::before { display: none; }
          .why-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 520px) {
          .proc { grid-template-columns: 1fr; gap: 26px; }
          .proc-step { padding-left: 30px; padding-top: 0; }
          .proc-node { top: 3px; }
          .sec-head { flex-direction: column; align-items: flex-start; gap: 16px; }
          .sec-head-p { max-width: 100%; }
        }
      ` }} />
    </>
  );
}
