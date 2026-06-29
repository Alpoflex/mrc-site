import Link from "next/link";

export const metadata = {
  title: "Sayfa Bulunamadı",
  description: "Aradığınız sayfa bulunamadı.",
};

export default function NotFound() {
  return (
    <section className="nf">
      <div className="container nf-in">
        <span className="nf-code">404</span>
        <h1 className="h1 nf-title">Sayfa bulunamadı</h1>
        <p className="nf-text">
          Aradığınız sayfa taşınmış veya hiç var olmamış olabilir. Aşağıdaki
          bağlantılardan devam edebilirsiniz.
        </p>
        <div className="nf-btns">
          <Link href="/" className="btn btn-primary">Anasayfaya dön →</Link>
          <Link href="/iletisim" className="btn btn-ghost">İletişim</Link>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .nf { background: var(--steel-2); color: #fff; min-height: 70vh; display: flex; align-items: center; padding: 80px 0; }
        .nf-in { text-align: center; max-width: 560px; }
        .nf-code { font-family: var(--font-display); font-weight: 800; font-size: clamp(64px, 16vw, 130px); line-height: 1; color: var(--accent); letter-spacing: -0.03em; display: block; }
        .nf-title { color: #fff; margin: 10px 0 16px; }
        .nf-text { color: #b8c1cd; font-size: 16px; line-height: 1.7; margin: 0 auto 32px; max-width: 440px; }
        .nf-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .nf-btns .btn-ghost { color: #fff; border-color: rgba(255,255,255,0.4); }
        .nf-btns .btn-ghost:hover { border-color: #fff; }
      ` }} />
    </section>
  );
}
