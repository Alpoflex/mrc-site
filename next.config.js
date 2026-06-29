/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // statik HTML export -> Natro'ya atılabilir
  images: { unoptimized: true }, // static export'ta Image optimizasyonu kapalı olmalı
  trailingSlash: true,       // /about/ gibi klasör yapısı -> paylaşımlı hostingde sorunsuz
};
module.exports = nextConfig;
