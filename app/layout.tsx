import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@fontsource/archivo/500.css";
import "@fontsource/archivo/600.css";
import "@fontsource/archivo/700.css";
import "@fontsource/archivo/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import ScrollExtras from "../components/ScrollExtras";
import { company } from "../data/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://mrcmaksan.com"),
  title: {
    default: "MRC Makine Sanayi | Kırıkkale Çelik Konstrüksiyon & Lazer Kesim",
    template: "%s | MRC Makine Sanayi",
  },
  description:
    "Kırıkkale Hacılar'da çelik konstrüksiyon, fiber lazer kesim, abkant büküm, sac işleme ve inşaat taahhüt. Uçtan uca üretim, zamanında teslimat.",
  keywords: [
    "çelik konstrüksiyon Kırıkkale", "lazer kesim Kırıkkale", "fiber lazer kesim",
    "abkant büküm", "sac işleme", "inşaat taahhüt Kırıkkale", "dekoratif lazer kesim",
    "bahçe kapısı", "ferforje korkuluk", "metal işleme Kırıkkale",
  ],
  authors: [{ name: company.name }],
  openGraph: {
    title: "MRC Makine Sanayi | Kırıkkale",
    description: "Çelik konstrüksiyon, lazer kesim, sac işleme ve inşaatta güvenilir üretim ortağınız.",
    locale: "tr_TR", type: "website", siteName: company.name,
    url: "https://mrcmaksan.com",
    images: [
      { url: "/images/celik/celik-02.jpeg", width: 1200, height: 630, alt: "MRC Makine Sanayi" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MRC Makine Sanayi | Kırıkkale",
    description: "Çelik konstrüksiyon, lazer kesim, sac işleme ve inşaatta güvenilir üretim ortağınız.",
    images: ["/images/celik/celik-02.jpeg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#16202E",
  width: "device-width",
  initialScale: 1,
};

// Google'ın işletmeyi tanıması için yapılandırılmış veri (yerel SEO)
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://mrcmaksan.com/#isletme",
  name: company.name,
  url: "https://mrcmaksan.com",
  telephone: company.phoneIntl,
  email: company.email,
  image: "https://mrcmaksan.com/images/celik/celik-02.jpeg",
  logo: "https://mrcmaksan.com/images/genel/logo.jpeg",
  description:
    "Kırıkkale Hacılar'da çelik konstrüksiyon, fiber lazer kesim, abkant büküm, sac işleme ve inşaat taahhüt hizmetleri.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sağlık Mah. Abdi İpekçi Cad. No:36",
    addressLocality: "Hacılar",
    addressRegion: "Kırıkkale",
    addressCountry: "TR",
  },
  hasMap: company.mapUrl,
  areaServed: ["Kırıkkale", "Ankara", "Türkiye"],
  knowsAbout: [
    "çelik konstrüksiyon", "lazer kesim", "fiber lazer kesim",
    "abkant büküm", "sac işleme", "inşaat taahhüt",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c") }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <ScrollExtras />
        {/* Google Analytics (GA4) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZLCC5KBPKF" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZLCC5KBPKF');
        `}</Script>
      </body>
    </html>
  );
}
