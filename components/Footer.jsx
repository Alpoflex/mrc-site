"use client";

import Link from "next/link";
import Image from "next/image";
import { company, services, sectors } from "../data/site";

export default function Footer() {
  return (
    <footer className="ft">
      <div className="container">
        <div className="ft-top">
          <div className="ft-brand">
            <div className="ft-logo">
              <Image src="/images/genel/logo-mark.jpeg" alt={company.name} width={830} height={470} className="ft-logo-img" />
            </div>
            <p className="ft-text">
              Kırıkkale Hacılar&apos;da çelik konstrüksiyon, lazer kesim, abkant büküm,
              sac işleme ve inşaat taahhüt alanında güvenilir üretim ortağınız.
            </p>
            <a href={`https://wa.me/${company.phoneIntl}`} target="_blank" rel="noopener noreferrer" className="ft-wa">
              WhatsApp&apos;tan yazın →
            </a>
          </div>

          <div className="ft-col">
            <h4>Hizmetler</h4>
            <ul>
              {services.map((s) => (
                <li key={s.slug}><Link href={`/hizmetler/${s.slug}`}>{s.title}</Link></li>
              ))}
            </ul>
          </div>

          <div className="ft-col">
            <h4>Sektörler</h4>
            <ul>{sectors.slice(0, 6).map((s) => <li key={s}>{s}</li>)}</ul>
          </div>

          <div className="ft-col">
            <h4>İletişim</h4>
            <ul className="ft-contact">
              <li><a href={company.mapUrl} target="_blank" rel="noopener noreferrer">{company.address}</a></li>
              <li><a href={`tel:${company.phoneIntl}`}>{company.phone}</a></li>
              <li><a href={`mailto:${company.email}`}>{company.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="ft-bottom">
          <span>© {new Date().getFullYear()} {company.name}</span>
          <span>Tüm hakları saklıdır. Alperen Ertaş.</span>
        </div>
      </div>

      <style jsx>{`
        .ft { background: var(--steel-2); color: #cfd6df; padding: 64px 0 28px; }
        .ft-top { display: grid; grid-template-columns: 1.7fr 1fr 1fr 1.3fr; gap: 44px; padding-bottom: 44px; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .ft-logo { margin-bottom: 18px; }
        .ft-logo :global(.ft-logo-img) { height: 58px; width: auto; display: block; }
        .ft-text { font-size: 14.5px; line-height: 1.7; color: #9fabbb; max-width: 340px; margin-bottom: 18px; }
        .ft-wa { font-family: var(--font-display); font-weight: 600; font-size: 14px; color: #fff; }
        .ft-wa:hover { color: var(--accent); }
        .ft-col h4 { font-family: var(--font-display); font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 16px; letter-spacing: 0.02em; }
        .ft-col ul { list-style: none; display: flex; flex-direction: column; gap: 11px; }
        .ft-col li, .ft-col li :global(a) { font-size: 14px; color: #9fabbb; transition: color .2s; line-height: 1.45; }
        .ft-col li :global(a):hover { color: #fff; }
        .ft-contact li a { display: inline-block; }
        .ft-bottom { display: flex; justify-content: space-between; padding-top: 22px; padding-bottom: 12px; font-size: 13px; color: #7f8b9c; flex-wrap: wrap; gap: 8px; }
        @media (max-width: 860px) { .ft-top { grid-template-columns: 1fr 1fr; gap: 32px; } }
        @media (max-width: 600px) {
          .ft-bottom { flex-direction: column; gap: 4px; padding-bottom: 72px; }
        }
        @media (max-width: 480px) { .ft-top { grid-template-columns: 1fr; } }
      `}</style>
    </footer>
  );
}
