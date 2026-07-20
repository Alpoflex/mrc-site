# MRC Makine Sanayi — mrcmaksan.com

Standart Next.js 14 (App Router) projesi, `output: "export"` ile statik siteye derlenir ve
GitHub `main` push'unda Vercel otomatik deploy eder.

- Tüm içerik (hizmetler, galeriler, videolar, iletişim) tek dosyadan yönetilir: `data/site.js`
- Stiller: styled-jsx (client bileşenler) + `app/globals.css`; Tailwind/shadcn YOKTUR
- `next/image` `unoptimized` modda çalışır (statik export gereği); videolar `public/videos/` altındadır
- Test: `npm run build` sonra `out/` klasörünü herhangi bir statik sunucuyla aç
