import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "../../../components/PageHero";
import ServiceGallery from "../../../components/ServiceGallery";
import Reveal from "../../../components/Reveal";
import { services, getService } from "../../../data/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const s = getService(params.slug);
  if (!s) return {};
  return { title: s.title, description: s.desc };
}

export default function ServiceDetail({ params }: { params: { slug: string } }) {
  const s = getService(params.slug);
  if (!s) notFound();

  const others = services.filter((x) => x.slug !== s.slug).slice(0, 4);

  return (
    <>
      <PageHero eyebrow={`Hizmet ${s.n}`} title={s.title} desc={s.short} crumb={s.title} image={s.cover} />

      <section className="section">
        <div className="container det-grid">
          <Reveal>
            <div>
              <div className="eyebrow">Genel Bakış</div>
              <h2 className="h2">{s.title}</h2>
              <p className="lead">{s.longDesc}</p>

              <div className="feat-list">
                {s.features.map((f) => (
                  <div key={f} className="feat">
                    <span className="feat-mark">✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <Link href="/iletisim" className="btn btn-primary" style={{ marginTop: 30 }}>
                Bu hizmet için teklif alın →
              </Link>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <aside className="det-side">
              <h3 className="side-title">Hızlı İletişim</h3>
              <p className="side-text">
                {s.confidential
                  ? "Bu alandaki talepleriniz için doğrudan bizimle iletişime geçin."
                  : "Bu hizmetle ilgili sorularınız için bize ulaşın, hızlıca dönüş yapalım."}
              </p>
              <a href="tel:+905383159654" className="side-row">
                <span className="side-key">Telefon</span>
                <span className="side-val">0538 315 96 54</span>
              </a>
              <a href="https://wa.me/905383159654" target="_blank" rel="noopener noreferrer" className="btn btn-dark side-wa">
                WhatsApp&apos;tan yazın
              </a>
            </aside>
          </Reveal>
        </div>
      </section>

      {(s.gallery.length > 0 || (s.videos && s.videos.length > 0)) && (
        <section className="section section-soft">
          <div className="container">
            <Reveal>
              <div className="eyebrow">Galeri</div>
              <h2 className="h2" style={{ marginBottom: 36 }}>Çalışmalarımızdan örnekler</h2>
            </Reveal>
            <ServiceGallery title={s.title} gallery={s.gallery} videos={("videos" in s ? s.videos : []) as any} />
          </div>
        </section>
      )}

      {s.confidential && (
        <section className="section section-soft">
          <div className="container">
            <div className="conf-note">
              <div className="conf-ico">🔒</div>
              <div>
                <h3 className="conf-title">Gizlilik Sözleşmesi</h3>
                <p className="conf-text">
                  Savunma sanayii projelerinde imzalanan gizlilik sözleşmeleri (NDA)
                  gereği üretilen ürün ve parçalara ait görseller paylaşılmamaktadır.
                  Talepleriniz için doğrudan bizimle iletişime geçebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Diğer hizmetler */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="eyebrow">Diğer Hizmetler</div>
            <h2 className="h2" style={{ marginBottom: 32 }}>Sunduğumuz diğer alanlar</h2>
          </Reveal>
          <div className="others">
            {others.map((o) => (
              <Link key={o.slug} href={`/hizmetler/${o.slug}`} className="other">
                <span className="other-n">{o.n}</span>
                <span className="other-t">{o.title}</span>
                <span className="other-a">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .det-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: clamp(32px,5vw,56px); align-items: start; }
        .feat-list { display: flex; flex-direction: column; gap: 14px; margin-top: 28px; }
        .feat { display: flex; gap: 14px; align-items: flex-start; font-size: 15.5px; color: var(--ink); }
        .feat-mark { flex-shrink: 0; width: 26px; height: 26px; border-radius: 3px; background: var(--accent); color: #fff; display: inline-flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; }
        .det-side { background: var(--bg-soft); border: 1px solid var(--line); border-radius: 8px; padding: 30px 28px; position: sticky; top: 96px; }
        .side-title { font-family: var(--font-display); font-size: 18px; font-weight: 700; margin-bottom: 10px; }
        .side-text { font-size: 14.5px; color: var(--ink-2); line-height: 1.6; margin-bottom: 22px; }
        .side-row { display: flex; flex-direction: column; gap: 3px; padding: 14px 0; border-top: 1px solid var(--line); }
        .side-key { font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--ink-2); }
        .side-val { font-family: var(--font-display); font-size: 17px; font-weight: 700; color: var(--ink); }
        .side-wa { width: 100%; justify-content: center; margin-top: 18px; }
        .conf-note { display: flex; gap: 22px; align-items: flex-start; background: var(--surface); border: 1px solid var(--line); border-left: 4px solid var(--accent); border-radius: 6px; padding: 30px 32px; }
        .conf-ico { font-size: 30px; }
        .conf-title { font-family: var(--font-display); font-size: 20px; font-weight: 700; margin-bottom: 8px; }
        .conf-text { font-size: 15px; color: var(--ink-2); line-height: 1.7; max-width: 640px; }
        .others { display: grid; grid-template-columns: repeat(2,1fr); gap: 0; border-top: 1px solid var(--line); }
        .others .other { display: flex; align-items: center; gap: 18px; padding: 22px 8px; border-bottom: 1px solid var(--line); transition: padding .25s ease; }
        .others .other:nth-child(odd) { border-right: 1px solid var(--line); padding-right: 24px; }
        .others .other:hover { padding-left: 16px; }
        .other-n { font-family: var(--font-display); font-size: 13px; font-weight: 700; color: var(--accent); }
        .other-t { font-family: var(--font-display); font-size: 18px; font-weight: 700; flex: 1; color: var(--ink); }
        .other-a { color: var(--ink-2); transition: color .2s; }
        .others .other:hover .other-a { color: var(--accent); }
        @media (max-width: 820px) {
          .det-grid { grid-template-columns: 1fr; }
          .det-side { position: static; }
          .others { grid-template-columns: 1fr; }
          .others .other:nth-child(odd) { border-right: none; padding-right: 8px; }
        }
        @media (max-width: 400px) {
          .conf-note { flex-direction: column; padding: 24px 20px; gap: 14px; }
          .det-side { padding: 24px 20px; }
          .feat { font-size: 14.5px; }
        }
      ` }} />
    </>
  );
}
