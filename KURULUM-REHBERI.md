# MRC Makine Sanayi — Site Kurulum Rehberi

Merhaba Alperen. Site hazır. Bu rehber iki şeyi anlatıyor:
**(A)** siteyi Natro'ya nasıl yükleyeceğin, **(B)** iletişim formunu nasıl çalıştıracağın.

İki tane zip dosyan var:
- **mrc-site-yayin.zip** → Natro'ya yükleyeceğin HAZIR site (içinde `out` klasörünün içeriği)
- **mrc-site-kaynak.zip** → İleride değişiklik yapmak istersen kaynak kod (şimdilik kenara koy)

---

## ⚠️ ÖNCE ŞUNU YAP: Formu çalışır hale getir (5 dakika)

Site statik olduğu için form, **Web3Forms** adlı ücretsiz servisle çalışıyor.
Anahtar girmezsen form gönderilince hata verir. Şu adımları yap:

1. https://web3forms.com adresine git
2. "Create Access Key" / "Get Started" kısmına **sametmer10@gmail.com** yaz
3. Mailine gelen onay linkine tıkla
4. Sana bir **Access Key** verecek (örnek: `a1b2c3d4-e5f6-...`)
5. Bu anahtarı siteye koyman lazım. İki yolun var:

   **Kolay yol (yayın dosyasında):** Yüklemeden önce zip'i açıp içindeki
   tüm `.html` ve `.js` dosyalarında `BURAYA_WEB3FORMS_ANAHTARINI_YAPISTIR`
   yazan yeri bul-değiştir ile kendi anahtarınla değiştir. (Not: anahtar
   `index.html` ve `_next/static/.../*.js` içinde geçiyor.)

   **Temiz yol (kaynaktan):** `mrc-site-kaynak.zip` içindeki
   `data/site.js` dosyasını aç, `web3formsKey: "..."` satırına anahtarını
   yapıştır, sonra `npm install && npm run build` çalıştır, oluşan yeni
   `out` klasörünü yükle. (Bilgisayarında Node.js gerekir.)

Form gönderilen mesajlar **sametmer10@gmail.com** adresine düşecek.

---

## (A) Siteyi Natro'ya yükleme

### Yöntem 1 — cPanel File Manager (en kolay)

1. Natro müşteri panelinden **cPanel**'e gir
2. **File Manager** (Dosya Yöneticisi) aç
3. **public_html** klasörüne gir
4. İçindeki **eski WordPress dosyalarını sil** (hepsini seç → Delete).
   ⚠️ Önce yedek almak istersen, hepsini seçip "Compress" ile zip yapıp
   indir, sonra sil.
5. **mrc-site-yayin.zip** dosyasını **Upload** ile public_html içine yükle
6. Yüklenen zip'e sağ tıkla → **Extract** (çıkart)
7. Çıkan dosyalar doğrudan public_html içinde olmalı (yani
   `public_html/index.html` şeklinde). Eğer `public_html/out/index.html`
   gibi bir klasörün içine çıktıysa, `out` içindekileri bir üste taşı.
8. Zip dosyasını silebilirsin
9. mrcmaksan.com adresine gir — site açılmalı

### Yöntem 2 — FTP (FileZilla)

1. FileZilla indir, Natro FTP bilgilerinle bağlan (cPanel'de FTP hesabı var)
2. Sol tarafta bilgisayarındaki açılmış `out` klasörünü bul
3. Sağ tarafta sunucudaki `public_html` klasörüne gir, eskileri sil
4. `out` klasörünün **içindeki** tüm dosyaları public_html'e sürükle
5. Bitince mrcmaksan.com'u aç

---

## Önemli notlar

- **WordPress'e artık gerek yok.** Bu site WordPress değil, statik HTML.
  Natro panelinden WordPress'i kaldırman gerekmez ama site artık onu
  kullanmıyor. public_html'de ne varsa o gösterilir.

- **HTTPS / SSL:** Natro genelde ücretsiz Let's Encrypt SSL veriyor.
  cPanel > SSL/TLS Status'tan aktif et. Site https ile açılsın.

- **Telefon/mail/adres değişirse:** kaynak koddaki `data/site.js` tek
  dosyadan değiştirilir, yeniden build alınır. İçerik hep oradan yönetilir.

- **Filigranlı görseller:** Lazer kesim bölümünde, hocandan gelen
  "Aéro Battant" kapısı görselinde başka bir firmanın (art et portails)
  logosu olduğu için onu siteye KOYMADIM. Hocandan o işin MRC'nin kendi
  fotoğrafı varsa, `public/images/lazer/` klasörüne ekleyip galeri
  listesine ekleyebiliriz.

- **Savunma sanayii:** Bu bölüm, gizlilik sözleşmesi gereği görselsiz,
  kilitli "GİZLİLİK SÖZLEŞMESİ" rozetiyle yapıldı. Askeri görselleri
  (gemi, tank vb.) bilerek koymadım — onlar MRC ürünü değil.

---

## Site içeriği özeti (ne yaptık)

5 hizmet kolu, tek sayfa, kaydırmalı:
1. **Çelik Konstrüksiyon** — 12 görselli galeri
2. **İnşaat & Taahhüt** — 8 görselli galeri
3. **Lazer Kesim** — 7 görselli galeri (dekoratif kapı/korkuluk/pergola)
4. **Abkant Büküm & Sac İşleme** — ikon (galeri yok)
5. **Savunma Sanayii** — NDA, görselsiz

Ek özellikler: galeri lightbox (tıkla-büyüt), çalışan iletişim formu,
WhatsApp butonu (sabit + iletişimde), Google Maps linki, mobil uyumlu,
SEO meta etiketleri.

Sorun olursa bana yaz. Kolay gelsin!
