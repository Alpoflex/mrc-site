import PageHero from "../../components/PageHero";
import ContactForm from "../../components/ContactForm";
import Reveal from "../../components/Reveal";
import { company } from "../../data/site";

export const metadata = {
  title: "İletişim",
  description: "MRC Makine Sanayi ile iletişime geçin. Kırıkkale Hacılar. Telefon, e-posta ve teklif formu.",
};

export default function Iletisim() {
  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title="Projeniz için bize ulaşın"
        desc="Teknik çiziminizi veya ihtiyacınızı iletin, en kısa sürede dönüş yapalım."
        image="/images/celik/celik-02.jpeg"
      />

      <section className="section">
        <div className="container ct-grid">
          <Reveal>
            <div className="ct-info">
              <div className="eyebrow">Bize Ulaşın</div>
              <h2 className="h2">İletişim bilgileri</h2>
              <p className="lead" style={{ marginBottom: 28 }}>
                Çelik konstrüksiyon, lazer kesim, abkant büküm, sac işleme veya inşaat
                işleriniz için aşağıdaki kanallardan bize ulaşabilirsiniz.
              </p>

              <a href={company.mapUrl} target="_blank" rel="noopener noreferrer" className="crow">
                <span className="cico">📍</span>
                <span>
                  <span className="ckey">Adres</span>
                  <span className="cval">{company.address}</span>
                </span>
              </a>
              <a href={`tel:${company.phoneIntl}`} className="crow">
                <span className="cico">📞</span>
                <span>
                  <span className="ckey">Telefon</span>
                  <span className="cval">{company.phone}</span>
                </span>
              </a>
              <a href={`mailto:${company.email}`} className="crow">
                <span className="cico">✉️</span>
                <span>
                  <span className="ckey">E-posta</span>
                  <span className="cval">{company.email}</span>
                </span>
              </a>

              <a href={`https://wa.me/${company.phoneIntl}`} target="_blank" rel="noopener noreferrer" className="btn wa-btn">
                WhatsApp&apos;tan yazın
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Harita */}
      <section className="map-sec">
        <iframe
          title="MRC Makine Sanayi — Hacılar, Kırıkkale konumu"
          className="map-frame"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(company.address)}&z=15&hl=tr&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <a href={company.mapUrl} target="_blank" rel="noopener noreferrer" className="map-cta">
          📍 Google Haritalar&apos;da aç →
        </a>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .ct-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px,5vw,64px); align-items: start; }
        .crow { display: flex; gap: 16px; align-items: center; padding: 18px 0; border-bottom: 1px solid var(--line); transition: padding-left .2s ease; }
        .crow:first-of-type { border-top: 1px solid var(--line); }
        .crow:hover { padding-left: 8px; }
        .cico { font-size: 20px; flex-shrink: 0; }
        .ckey { display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--ink-2); margin-bottom: 2px; }
        .cval { display: block; font-size: 15.5px; font-weight: 500; color: var(--ink); word-break: break-word; }
        .wa-btn { background: #25d366; color: #08230f; font-weight: 700; margin-top: 26px; }
        .wa-btn:hover { background: #2ee06f; transform: translateY(-2px); }
        .map-sec { position: relative; line-height: 0; }
        .map-frame { display: block; width: 100%; height: 400px; border: 0; }
        .map-cta { position: absolute; top: 16px; left: 16px; display: inline-flex; align-items: center; gap: 6px; line-height: 1; background: var(--surface); color: var(--ink); padding: 11px 18px; border-radius: 6px; font-family: var(--font-display); font-weight: 600; font-size: 14px; box-shadow: 0 6px 20px rgba(22,32,46,0.18); transition: transform .2s; }
        .map-cta:hover { transform: translateY(-2px); }
        @media (max-width: 600px) { .map-frame { height: 320px; } }
        @media (max-width: 760px) { .ct-grid { grid-template-columns: 1fr; } }
        @media (max-width: 400px) { .crow { padding: 14px 0; } .crow a { font-size: 14px; } }
      ` }} />
    </>
  );
}
