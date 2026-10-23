# AshiKit – Free Urdu Web Utilities Platform
### Mukammal Documentation, Deployment & Setup Guide

AshiKit aik modern, mobile-friendly aur privacy-first static web utilities suite hai jo Pakistan aur dunya bhar ke Urdu aur Roman Urdu bolne walon ke liye tayyar kiya gaya hai. Is mein **14 interactive tools**, **5 tafseeli rehnuma guides**, mukammal **AdSense-ready legal pages** (About, Contact, Privacy Policy, Terms, 404), SEO schema markup (JSON-LD), sitemap.xml aur robots.txt shamil hain.

Yeh project **100% vanilla web technologies (Plain HTML, CSS, JavaScript)** par mabni hai. Isay kisi build step ya runtime server ke baghair **Cloudflare Pages** par bilkul muft host kiya ja sakta hai.

---

## 1. Placeholders Replace Karne Ki List (Find & Replace)

Apni site ko live karne se pehle poore project mein mandarja zail 2 placeholders ko apni zati information se tabdeel karein:

### A) `YOUR_DOMAIN`
* **Default Placeholder:** `YOUR_DOMAIN` (ya `https://YOUR_DOMAIN.pages.dev`)
* **Aap Ki Asal Value:** Aap ka Cloudflare Pages subdomain (maslan `ashikit.pages.dev`) ya custom domain (maslan `ashikit.com`).
* **Kahan Kahan Mojood Hai:**
  1. `/assets/site.js` (line 7: `BASE_URL: 'https://YOUR_DOMAIN.pages.dev'`)
  2. `/sitemap.xml` & `/public/sitemap.xml` (Tamam 24 URLs mein `<loc>`)
  3. `/robots.txt` & `/public/robots.txt` (`Sitemap: https://YOUR_DOMAIN.pages.dev/sitemap.xml`)
  4. `/index.html` (Canonical, OpenGraph, Twitter, JSON-LD)
  5. Tamam 14 tool pages (`/roman-urdu-to-urdu/index.html`, `/zakat-calculator/index.html`, etc.)
  6. `/blog/index.html` aur tamam 5 guide pages (`/blog/roman-urdu-se-urdu-kaise-likhein/index.html`, etc.)
  7. `/about/index.html`, `/contact/index.html`, `/privacy-policy/index.html`, `/terms/index.html`, `/404.html`

### B) `YOUR_EMAIL@example.com`
* **Default Placeholder:** `YOUR_EMAIL@example.com`
* **Aap Ki Asal Value:** Aap ka official support email (maslan `support@ashikit.com` ya `yourname@gmail.com`).
* **Kahan Kahan Mojood Hai:**
  1. `/assets/site.js` (line 8: `CONTACT_EMAIL: 'YOUR_EMAIL@example.com'`)
  2. `/about/index.html` (Rabta section)
  3. `/contact/index.html` (Direct email link aur `<form action="mailto:YOUR_EMAIL@example.com">`)
  4. `/privacy-policy/index.html` (Section 10: Hum Se Rabta)
  5. `/terms/index.html` (Section 8: Rabta)

---

## 2. Cloudflare Pages Par Free Hosting Ka Tareeqa (Direct Asset Upload)

AshiKit plain HTML/CSS/JS par mushtamil hai, is liye isay host karne ke liye kisi paid server ya database ki zaroorat nahi hai:

1. **Cloudflare Account Banayein:** [dash.cloudflare.com](https://dash.cloudflare.com/) par free sign up karein.
2. **Workers & Pages:** Left sidebar se **Compute (Workers & Pages)** par click karein aur **Create application** &rarr; **Pages** &rarr; **Upload assets** select karein.
3. **Project Name:** Apna pasandeeda project name dein (maslan `ashikit`). Yeh aap ka `https://ashikit.pages.dev` URL banaye ga.
4. **Folder Upload:**
   * Poore project folder ko (jahan `index.html`, `assets/`, `sitemap.xml`, etc. mojood hain) drag & drop kar ke upload karein.
   * **Deploy Site** par click karein.
5. **Instant Live:** Chand seconds mein aap ki website global Cloudflare CDN par deploy ho kar live ho jaye gi!
6. *(Ikhtiari)* Agar aap ka apna custom domain hai (maslan `.com` ya `.pk`), to Pages project ki **Custom domains** tab mein ja kar apna domain connect kar sakte hain. Free SSL certificate Cloudflare khud provide karega.

---

## 3. Google Search Console & Sitemap Submit Karna

Google par website rank karwane aur traffic haasil karne ke liye:

1. [Google Search Console](https://search.google.com/search-console/) open karein aur Google account se login karein.
2. **Add Property** par click kar ke apna domain ya URL prefix darj karein (`https://your-project.pages.dev` ya custom domain).
3. **Ownership Verification:**
   * Sab se aasan tareeqa: HTML tag verification code copy karein aur `/index.html` ke `<head>` tag ke andar paste kar ke deploy karein.
   * Ya Cloudflare DNS mein TXT record add karein.
4. **Submit Sitemap:**
   * Verification ke baad left menu se **Sitemaps** par click karein.
   * `Add a new sitemap` field mein **`sitemap.xml`** likhein aur **Submit** button dabayein.
   * Google foran aap ke تمام 24 safhon ko crawl aur index karna shuru kar dega.

---

## 4. Google AdSense Approval & Ad Codes Lagane Ka Tareeqa

AshiKit ko AdSense policies ke mutabiq design kiya gaya hai (original Roman Urdu guides, legal pages, zero copyright content, client-side tools).

### Step A: Apply Karna
1. Site live hone aur 1 se 2 haftay tak organic traffic aane ke baad [google.com/adsense](https://www.google.com/adsense/) par apply karein.
2. Google verification script code dega jise aap ko `/index.html` aur doosray pages ke `<head>` tag mein shamil karna hoga.

### Step B: `ads.txt` Update Karna
Jab account approve ho jaye:
1. Root directory mein `/ads.txt` file kholein.
2. Apni publisher ID darj karein, maslan:
   ```text
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```

### Step C: Ad Code Kahan Paste Karein?
Tamam tool pages aur blog articles mein pehle se **Zero-CLS reserved-height ad slots** mojood hain:
```html
<!-- ZERO CLS AD SLOT TOP -->
<div class="ad-slot">
  <!-- Google AdSense Code Yahan Lagayein: Top Banner (Responsive Display Unit) -->
  <span>Advertisement Placeholder</span>
</div>
```
Aap ko sirf `<div class="ad-slot">` ke andar apna Google AdSense ad unit code paste karna hai. Layout bilkul jump nahi karega kyunke CSS mein `min-height: 90px` pehle se reserved hai.

---

## 5. Mukammal Testing Checklist

Deployment se qabl aur baad yeh checklist zaroor mukammal karein:

- [ ] **Roman Urdu to Urdu Converter:** 5 mukhtalif jumlay type kar ke check karein:
  1. `aap kaise hain` &rarr; `آپ کیسے ہیں`
  2. `hum pakistan se muhabbat karte hain` &rarr; `ہم پاکستان سے محبت کرتے ہیں`
  3. `aaj mausam kaisa hai` &rarr; `آج موسم کیسا ہے`
  4. `urdu typing ab bohot aasan ho gayi hai` &rarr; `اردو ٹائپنگ اب بہت آسان ہو گئی ہے`
  5. `allah taala aap ko hamesha khush rakhay` &rarr; `اللہ تعالی آپ کو ہمیشہ خوش رکھے`
  * Check karein ke Copy button kaam karta hai aur clear button text saaf karta hai.
- [ ] **Zakat Calculator:** Sona (10 tola), chandi (60 tola), cash (50000) aur qarz darj kar ke hisab check karein (2.5% formula durust kaam kare).
- [ ] **EMI Calculator:** Loan 500,000, 18% interest, 36 months darj karein aur monthly installment verify karein.
- [ ] **Word & Counter:** Urdu aur Roman Urdu text paste kar ke words, characters aur lines ka hisab check karein.
- [ ] **Stylish Names:** Koi naam type karein aur copy button se clipboard par paste kar ke test karein.
- [ ] **Shayari Card Maker:** Urdu text likhein, background color change karein aur "Download Image" dabayein (PNG save ho).
- [ ] **Image Tools (Compress & Resize):** Phone se tasveer select karein, quality aur dimensions set karein aur preview/download check karein.
- [ ] **CV Maker:** Form fill karein aur "Download / Print PDF" button dabayein.
- [ ] **PDF Merge:** 2 mukhtalif PDF documents select kar ke merge karein aur combined PDF check karein.
- [ ] **Text Case & Number Words:** English text ka case badlein aur 1500 likh kar "ایک ہزار پانچ سو" check karein.
- [ ] **Age Calculator:** Apni date of birth select kar ke exact saal, mahine aur din check karein.
- [ ] **QR Code Generator:** Kisi URL ya text ka QR code banayein aur scan kar ke check karein.
- [ ] **Mobile Navigation Drawer:** Mobile screen par hamburger icon dabayein aur navigation menu open/close check karein.
- [ ] **Dark Mode Toggle:** Sun/Moon button dabayein, page refresh karein aur check karein ke setting save rehti hai.
- [ ] **Internal Links:** Header, footer, home cards aur related tool links par click kar ke check karein ke koi 404 error na aaye.
- [ ] **404 Page:** Browser mein `https://your-domain/ghalat-link/` type karein aur custom 404 page ka test karein.

---
&copy; 2026 AshiKit. Built for Urdu speakers worldwide.
