"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { company } from "../data/site";

const nav = [
  ["Anasayfa", "/"],
  ["Hakkımızda", "/hakkimizda"],
  ["Hizmetler", "/hizmetler"],
  ["Projeler", "/projeler"],
  ["İletişim", "/iletisim"],
];

const LOGO = "/images/genel/logo-mark.jpeg";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  // trailingSlash açık olduğu için yolları normalize edip aktif linki bul
  const norm = (s) => (s && s.length > 1 ? s.replace(/\/+$/, "") : s);
  const isActive = (href) => norm(pathname) === norm(href);

  // Menü açıkken arka plan kaymasını kilitle
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`hdr ${scrolled ? "scrolled" : ""} ${open ? "menu-open" : ""}`}>
      {/* Üst ince iletişim şeridi */}
      <div className="topbar">
        <div className="container topbar-in">
          <span className="topbar-loc">{company.location}</span>
          <div className="topbar-links">
            <a href={`tel:${company.phoneIntl}`} className="topbar-phone">{company.phone}</a>
            <span className="sep">·</span>
            <a href={`mailto:${company.email}`} className="topbar-email">{company.email}</a>
          </div>
        </div>
      </div>

      <div className="container hdr-in">
        <Link href="/" className="brand" aria-label={`${company.name} anasayfa`}>
          <Image src={LOGO} alt={company.name} width={830} height={470} className="brand-logo" priority />
        </Link>

        <nav className="nav-d">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className={`nav-l ${isActive(href) ? "active" : ""}`}>
              {label}
            </Link>
          ))}
        </nav>

        <Link href="/iletisim" className="btn btn-primary hdr-cta">Teklif Al</Link>

        <button className={`burger ${open ? "open" : ""}`} onClick={() => setOpen(v => !v)} aria-label={open ? "Menüyü kapat" : "Menüyü aç"} aria-expanded={open} aria-controls="mobile-menu">
          <span /><span /><span />
        </button>
      </div>

      {/* Mobil menü — kayan panel + arka plan karartması */}
      <div className={`mob-backdrop ${open ? "show" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <nav id="mobile-menu" className={`mob ${open ? "mob-open" : ""}`} aria-hidden={!open}>
        <div className="mob-head">
          <Image src={LOGO} alt={company.name} width={830} height={470} className="mob-logo" />
          <button className="mob-x" onClick={() => setOpen(false)} aria-label="Menüyü kapat">✕</button>
        </div>

        <div className="mob-links">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className={`mob-l ${isActive(href) ? "active" : ""}`}>{label}</Link>
          ))}
        </div>

        <Link href="/iletisim" className="btn btn-primary mob-cta">Teklif Al →</Link>

        <div className="mob-contact">
          <a href={`tel:${company.phoneIntl}`}>{company.phone}</a>
          <a href={`https://wa.me/${company.phoneIntl}`} target="_blank" rel="noopener noreferrer" className="mob-wa">WhatsApp&apos;tan yazın →</a>
        </div>
      </nav>

      <style jsx>{`
        .hdr { position: sticky; top: 0; z-index: 50; background: var(--bg); transition: box-shadow .25s ease; }
        .hdr.menu-open { z-index: 110; }
        .hdr.scrolled { box-shadow: 0 1px 0 var(--line), 0 8px 24px rgba(22,32,46,0.05); }
        .topbar { background: var(--steel-2); color: #fff; font-size: 12.5px; }
        .topbar-in { display: flex; align-items: center; justify-content: space-between; height: 38px; }
        .topbar-loc { color: #aeb9c7; letter-spacing: 0.04em; font-family: var(--font-display); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-right: 12px; }
        .topbar-links { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
        .topbar-links a { color: #d7dde5; transition: color .2s; white-space: nowrap; }
        .topbar-links a:hover { color: #fff; }
        .topbar-links .sep { color: #5a6678; }
        .hdr-in { display: flex; align-items: center; justify-content: space-between; height: var(--header-h); gap: 16px; }
        .hdr-in :global(.brand) { display: flex; align-items: center; flex-shrink: 0; }
        :global(.brand-logo) { height: 50px; width: auto; display: block; border-radius: 7px; }
        .nav-d { display: flex; align-items: center; gap: 30px; margin-left: auto; }
        .nav-d :global(.nav-l) { font-family: var(--font-display); font-size: 15px; font-weight: 600; color: var(--ink-2); transition: color .2s; position: relative; padding: 4px 0; white-space: nowrap; }
        .nav-d :global(.nav-l):hover { color: var(--ink); }
        .nav-d :global(.nav-l.active) { color: var(--ink); }
        .nav-d :global(.nav-l.active)::after { content: ""; position: absolute; left: 0; right: 0; bottom: -2px; height: 2px; background: var(--accent); }
        .hdr-in :global(.hdr-cta) { margin-left: 8px; padding: 11px 22px; flex-shrink: 0; }
        .burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 6px; flex-shrink: 0; }
        .burger span { width: 24px; height: 2px; background: var(--ink); transition: all .3s; display: block; }
        .burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .burger.open span:nth-child(2) { opacity: 0; }
        .burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobil kayan menü */
        .mob-backdrop { position: fixed; inset: 0; background: rgba(15,20,28,0.5); backdrop-filter: blur(2px); opacity: 0; visibility: hidden; transition: opacity .3s ease, visibility .3s ease; z-index: 95; }
        .mob-backdrop.show { opacity: 1; visibility: visible; }
        .mob {
          position: fixed; top: 0; right: 0; height: 100dvh; width: min(84vw, 330px);
          background: var(--bg); z-index: 100; display: flex; flex-direction: column;
          padding: 18px 24px calc(28px + env(safe-area-inset-bottom));
          transform: translateX(105%); transition: transform .33s cubic-bezier(.4,0,.2,1);
          box-shadow: -12px 0 40px rgba(15,20,28,0.18); overflow-y: auto;
        }
        .mob.mob-open { transform: none; }
        .mob-head { display: flex; align-items: center; justify-content: space-between; padding-bottom: 18px; border-bottom: 1px solid var(--line); margin-bottom: 8px; }
        :global(.mob-logo) { height: 42px; width: auto; display: block; border-radius: 6px; }
        .mob-x { background: none; border: none; font-size: 22px; color: var(--ink-2); cursor: pointer; line-height: 1; padding: 4px; }
        .mob-x:hover { color: var(--ink); }
        .mob-links { display: flex; flex-direction: column; }
        .mob-links :global(.mob-l) { display: block; font-family: var(--font-display); font-weight: 600; font-size: 17px; color: var(--ink); padding: 16px 0; border-bottom: 1px solid var(--line); transition: color .2s, padding-left .2s; }
        .mob-links :global(.mob-l):hover, .mob-links :global(.mob-l.active) { color: var(--accent); }
        .mob-links :global(.mob-l.active) { padding-left: 10px; }
        .mob :global(.mob-cta) { justify-content: center; margin-top: 22px; }
        .mob-contact { margin-top: auto; padding-top: 24px; display: flex; flex-direction: column; gap: 10px; }
        .mob-contact a { font-family: var(--font-display); font-weight: 600; font-size: 15px; color: var(--ink); }
        .mob-contact .mob-wa { color: var(--accent); }

        @media (max-width: 940px) {
          .nav-d { display: none; }
          .hdr-in :global(.hdr-cta) { display: none; }
          .burger { display: flex; }
          .topbar-links a:last-child { display: none; }
          .topbar-links .sep { display: none; }
        }
        @media (max-width: 500px) {
          :global(.brand-logo) { height: 40px; }
          .hdr-in { gap: 10px; --header-h: 64px; }
          .topbar { font-size: 11px; }
          .topbar-in { height: 32px; }
          .topbar-loc { font-size: 10.5px; }
        }
        @media (max-width: 360px) {
          :global(.brand-logo) { height: 36px; }
          .hdr-in { --header-h: 58px; }
          .topbar-loc { font-size: 10px; max-width: 130px; }
          .topbar-links { gap: 6px; }
          .topbar-links a { font-size: 10px; }
        }
      `}</style>
    </header>
  );
}
