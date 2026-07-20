// ============================================================
// MRC MAKİNE SANAYİ — Merkezi Site Verisi
// Tüm içerik buradan yönetilir.
// ============================================================

export const company = {
  name: "MRC Makine Sanayi",
  shortName: "MRC",
  tagline: "Çelik konstrüksiyon, lazer kesim ve sac işlemede uçtan uca üretim",
  location: "Kırıkkale · Hacılar",
  phone: "0538 315 96 54",
  phoneIntl: "+905383159654",
  email: "sametmer10@gmail.com",
  address: "Sağlık Mah. Abdi İpekçi Cad. No:36, Hacılar, Kırıkkale",
  mapUrl: "https://maps.app.goo.gl/3SBZybLAfBRYj6hk8",
  // Web3Forms anahtarı — https://web3forms.com adresinden ücretsiz alınır
  web3formsKey: "68196b98-6976-4dc8-8167-0a6581f43b07",
};

// Rakamlarla biz
export const stats = [
  { num: "35", unit: "mm", label: "Siyah sacda lazer kesim" },
  { num: "10", unit: "mm", label: "Abkant büküm kapasitesi" },
  { num: "5", unit: "", label: "Uzmanlık alanı" },
  { num: "7/24", unit: "", label: "Teklif desteği" },
];

// Süreç akışı
export const processSteps = [
  { n: "01", title: "Teklif & Keşif", desc: "Teknik çiziminizi veya ihtiyacınızı iletin, hızlıca fiyatlandıralım." },
  { n: "02", title: "Planlama", desc: "Malzeme, ölçü ve termin planını netleştirip onayınızı alalım." },
  { n: "03", title: "Üretim", desc: "Modern makine parkurumuzda projeye birebir uygun üretim." },
  { n: "04", title: "Teslimat", desc: "Kalite kontrolünden geçen işi söz verdiğimiz tarihte teslim." },
];

// ============================================================
// HİZMETLER
// ============================================================
export const services = [
  {
    slug: "celik-konstruksiyon",
    n: "01",
    title: "Çelik Konstrüksiyon",
    short: "Fabrika, depo ve endüstriyel çelik yapılar",
    desc: "Temelden teslime prefabrik çelik yapı imalatı ve montajı.",
    longDesc:
      "Sanayi tesisleri, fabrika ve depo binaları için çelik konstrüksiyon imalatı ve montajını üstleniyoruz. Statik projeye uygun çelik iskelet üretimi, sandviç panel cephe ve çatı kaplaması, zemin uygulamaları dahil olmak üzere yapının her aşamasını tek elden yürütüyoruz.",
    features: [
      "Statik projeye uygun çelik iskelet imalatı",
      "Sandviç panel cephe ve çatı kaplaması",
      "Fabrika, depo ve sanayi tesisleri",
      "Sahada montaj ve kurulum",
    ],
    cover: "/images/celik/celik-04.jpeg",
    gallery: [
      "/images/celik/celik-01.jpeg","/images/celik/celik-02.jpeg","/images/celik/celik-03.jpeg",
      "/images/celik/celik-04.jpeg","/images/celik/celik-05.jpeg","/images/celik/celik-06.jpeg",
      "/images/celik/celik-07.jpeg","/images/celik/celik-08.jpeg","/images/celik/celik-09.jpeg",
      "/images/celik/celik-10.jpeg","/images/celik/celik-11.jpeg","/images/celik/celik-12.jpeg",
    ],
  },
  {
    slug: "insaat-taahhut",
    n: "02",
    title: "İnşaat & Taahhüt",
    short: "Betonarme, villa, konut ve apartman projeleri",
    desc: "Temel ve betonarme işlerinden anahtar teslim konuta kadar.",
    longDesc:
      "Betonarme kaba inşaattan anahtar teslim yapıya kadar inşaat taahhüt işlerini gerçekleştiriyoruz. Temel ve kolon uygulamaları, villa, konut sitesi ve apartman projelerinde planlamadan teslimata kadar tüm süreçleri yönetiyoruz.",
    features: [
      "Temel ve betonarme kaba inşaat",
      "Villa, konut sitesi ve apartman projeleri",
      "Anahtar teslim taahhüt",
      "Proje yönetimi ve denetim",
    ],
    cover: "/images/insaat/insaat-06.jpeg",
    gallery: [
      "/images/insaat/insaat-01.jpeg","/images/insaat/insaat-02.jpeg","/images/insaat/insaat-03.jpeg",
      "/images/insaat/insaat-04.jpeg","/images/insaat/insaat-05.jpeg","/images/insaat/insaat-06.jpeg",
      "/images/insaat/insaat-07.jpeg","/images/insaat/insaat-08.jpeg","/images/insaat/insaat-17.jpeg",
      "/images/insaat/insaat-14.jpeg","/images/insaat/insaat-09.jpeg","/images/insaat/insaat-18.jpeg",
      "/images/insaat/insaat-10.jpeg","/images/insaat/insaat-15.jpeg","/images/insaat/insaat-11.jpeg",
      "/images/insaat/insaat-13.jpeg","/images/insaat/insaat-16.jpeg","/images/insaat/insaat-12.jpeg",
    ],
  },
  {
    slug: "lazer-kesim",
    n: "03",
    title: "Lazer Kesim",
    short: "Dekoratif kapı, korkuluk, pergola ve panel",
    desc: "Fiber lazer ile 35 mm'ye kadar hassas kesim, desenli kapı ve panel üretimi.",
    longDesc:
      "Fiber lazer kesim teknolojisiyle dekoratif ve fonksiyonel metal işleri üretiyoruz. Desenli bahçe ve site kapıları, balkon ve merdiven korkulukları, pergola ve dekoratif paneller; villa, fabrika ve sosyal tesisler için özgün tasarımlar. Siyah sacda 35 mm, paslanmazda 25 mm kalınlığa kadar hassas kesim.",
    features: [
      "35 mm'ye kadar siyah sac kesim",
      "25 mm'ye kadar paslanmaz kesim",
      "Desenli bahçe ve site kapıları",
      "Balkon ve merdiven korkulukları",
      "Pergola ve dekoratif paneller",
    ],
    cover: "/images/lazer/lazer-01.jpeg",
    gallery: [
      "/images/lazer/lazer-01.jpeg","/images/lazer/lazer-02.jpeg","/images/lazer/lazer-03.jpeg",
      "/images/lazer/lazer-04.jpeg","/images/lazer/lazer-05.jpeg","/images/lazer/lazer-06.jpeg",
      "/images/lazer/lazer-07.jpeg","/images/lazer/lazer-08.jpeg","/images/lazer/lazer-09.jpeg",
      "/images/lazer/lazer-10.jpeg","/images/lazer/lazer-11.jpeg",
    ],
    videos: [
      { src: "/videos/lazer-video-01.mp4", poster: "/videos/lazer-video-01.jpg" },
      { src: "/videos/lazer-video-02.mp4", poster: "/videos/lazer-video-02.jpg" },
      { src: "/videos/lazer-video-03.mp4", poster: "/videos/lazer-video-03.jpg" },
      { src: "/videos/lazer-video-04.mp4", poster: "/videos/lazer-video-04.jpg" },
    ],
  },
  {
    slug: "abkant-sac-isleme",
    n: "04",
    title: "Abkant Büküm & Sac İşleme",
    short: "Hassas büküm ve sac şekillendirme",
    desc: "10 mm'ye kadar abkant büküm ve sac işleme.",
    longDesc:
      "Abkant pres ile 10 mm kalınlığa kadar sac bükme işlemleri yapıyoruz. Çelik, paslanmaz ve alüminyum sacların kesimi, bükümü ve şekillendirilmesinde teknik çiziminize birebir uygun, hatasız üretim sağlıyoruz. Tekli parçadan seri üretime kadar her ölçekte sipariş alıyoruz.",
    features: [
      "10 mm kalınlığa kadar abkant büküm",
      "Çelik, paslanmaz ve alüminyum sac işleme",
      "Teknik çizime tam uyumlu üretim",
      "Tekli parçadan seri üretime",
    ],
    cover: "/images/abkant/abkant-12.jpeg",
    gallery: [
      "/images/abkant/abkant-12.jpeg","/images/abkant/abkant-01.jpeg","/images/abkant/abkant-07.jpeg",
      "/images/abkant/abkant-13.jpeg","/images/abkant/abkant-02.jpeg","/images/abkant/abkant-10.jpeg",
      "/images/abkant/abkant-03.jpeg","/images/abkant/abkant-08.jpeg","/images/abkant/abkant-04.jpeg",
      "/images/abkant/abkant-14.jpeg","/images/abkant/abkant-05.jpeg","/images/abkant/abkant-09.jpeg",
      "/images/abkant/abkant-06.jpeg","/images/abkant/abkant-11.jpeg",
    ],
    videos: [
      { src: "/videos/abkant-video-01.mp4", poster: "/videos/abkant-video-01.jpg" },
    ],
  },
  {
    slug: "savunma-sanayii",
    n: "05",
    title: "Savunma Sanayii",
    short: "Savunma projeleri için hassas parça imalatı",
    desc: "Gizlilik sözleşmeleri gereği görseller paylaşılmamaktadır.",
    longDesc:
      "Savunma sanayii projeleri kapsamında hassas parça imalatı gerçekleştiriyoruz. İmzalanan gizlilik sözleşmeleri (NDA) gereği üretilen ürün ve parçalara ait görseller paylaşılmamaktadır. Bu alandaki talepleriniz için doğrudan bizimle iletişime geçebilirsiniz.",
    features: [
      "Savunma projelerine yönelik hassas parça imalatı",
      "Gizlilik sözleşmesi (NDA) ile çalışma",
      "Yüksek hassasiyet ve kalite standardı",
    ],
    cover: null,
    confidential: true,
    gallery: [],
  },
];

// Kurumsal tanıtım afişleri (Hakkımızda sayfasında gösterilir)
export const posters = [
  { src: "/images/genel/afis-01.jpeg", alt: "MRC Makine Sanayi — Lazer kesimde hassasiyet neden önemlidir?", w: 1086, h: 1448 },
  { src: "/images/genel/afis-02.jpeg", alt: "MRC Makine Sanayi — Lazer kesim, abkant büküm, kaynaklı imalat", w: 1023, h: 1537 },
];

export const sectors = [
  "Makine İmalatı", "Metal Sektörü", "İnşaat", "Otomotiv",
  "Savunma Sanayii", "Tarım Makineleri", "Enerji", "Genel Sanayi",
];

export const advantages = [
  { title: "Tek Elden Üretim", desc: "Çelik konstrüksiyondan lazer kesime, beş uzmanlık alanını tek çatı altında topluyoruz." },
  { title: "Teknik Çizime Tam Uyum", desc: "Projelerinizi milimetrik hassasiyetle, verdiğiniz teknik çizime birebir uygun üretiyoruz." },
  { title: "Zamanında Teslimat", desc: "Söz verdiğimiz tarihte, kaliteden ödün vermeden teslim ediyoruz." },
  { title: "Modern Makine Parkuru", desc: "Fiber lazer, abkant pres ve çelik işleme ekipmanlarıyla her ölçekte üretim." },
];

export function getService(slug) {
  return services.find((s) => s.slug === slug);
}
