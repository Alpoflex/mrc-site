export const SITE = {
  name: "MRC Makine Sanayi",
  shortName: "MRC",
  tagline: "Kırıkkale Fiber Lazer Kesim & Sac İşleme",
  phone: "+90 500 000 00 00",
  phoneHref: "tel:+905000000000",
  whatsapp: "905000000000",
  email: "info@mrcmaksan.com",
  address: "Hacılar, Kırıkkale, Türkiye",
  // Web3Forms ücretsiz access key — buraya kendi key'inizi yapıştırın
  web3formsKey: "YOUR_WEB3FORMS_ACCESS_KEY",
};

export const NAV = [
  { label: "Anasayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda/" },
  { label: "Hizmetler", href: "/hizmetler/" },
  { label: "Projeler", href: "/projeler/" },
  { label: "İletişim", href: "/iletisim/" },
];

export const SERVICES = [
  {
    code: "LK-01",
    title: "Fiber Lazer Kesim",
    spec: "≤ 25 mm",
    desc: "25 mm kalınlığa kadar hassas fiber lazer kesim. Her ölçü, her geometri — çelik, paslanmaz ve alüminyumda temiz kenar.",
    points: ["Yüksek hassasiyetli kesim", "Karmaşık geometriler", "Seri ve tekil üretim"],
  },
  {
    code: "AB-02",
    title: "Abkant Büküm",
    spec: "≤ 10 mm",
    desc: "10 mm kalınlığa kadar sac bükme. Teknik çiziminize birebir uygun, açı toleransı kontrollü, hatasız büküm.",
    points: ["CNC abkant pres", "Tekrarlanabilir açı", "Karmaşık form bükümleri"],
  },
  {
    code: "Sİ-03",
    title: "Sac İşleme",
    spec: "Çok malzeme",
    desc: "Çelik, paslanmaz ve alüminyum sacların kesilmesi, şekillendirilmesi ve işlenmesi. Hammaddeden bitmiş parçaya.",
    points: ["Malzeme tedariği", "Yüzey işleme", "Montaja hazır parça"],
  },
  {
    code: "CN-04",
    title: "CNC İşleme",
    spec: "Talaşlı imalat",
    desc: "Sipariş bazlı CNC talaşlı imalat. Teknik resme uygun, ölçü hassasiyetinde parça üretimi.",
    points: ["Ölçü hassasiyeti", "Prototip & seri", "Teknik resim üretimi"],
  },
  {
    code: "SU-05",
    title: "Sipariş Üretim",
    spec: "Proje bazlı",
    desc: "Küçük seriden büyük partiye, tek parçadan komple projeye kadar ihtiyacınıza özel imalat çözümleri.",
    points: ["Esnek adetler", "Proje yönetimi", "Zamanında teslimat"],
  },
  {
    code: "MA-06",
    title: "Makine Alım Satım",
    spec: "Endüstriyel",
    desc: "Endüstriyel makine ve ekipman alım satımı. Üretim hattınız için doğru makineye ulaşın.",
    points: ["Makine tedariği", "Ekipman çözümleri", "Danışmanlık"],
  },
];

export const SECTORS = [
  { n: "01", title: "Makine İmalatı", desc: "Makine üreticilerine özel parça ve aksam üretimi." },
  { n: "02", title: "Metal Sektörü", desc: "Sac işleme, kesim ve büküm gerektiren her türlü metal iş." },
  { n: "03", title: "İnşaat Sektörü", desc: "Yapısal çelik elemanları ve şantiye parçaları." },
  { n: "04", title: "Otomotiv", desc: "Otomotiv yan sanayi için hassas üretim parçaları." },
  { n: "05", title: "Tarım Makineleri", desc: "Tarım ekipmanları için dayanıklı sac ve metal parçalar." },
  { n: "06", title: "Genel Sanayi", desc: "Küçük seriden büyük siparişe tüm sanayi ihtiyaçları." },
];

export const STATS = [
  { value: "25", unit: "mm", label: "Maks. kesim kalınlığı" },
  { value: "10", unit: "mm", label: "Maks. büküm kalınlığı" },
  { value: "6", unit: "+", label: "İşleme hizmeti" },
  { value: "100", unit: "%", label: "Sipariş bazlı üretim" },
];
