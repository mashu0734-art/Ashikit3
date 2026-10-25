/**
 * AshiKit - Shared Site JavaScript
 * Injects header and footer once, handles dark mode, mobile menu, and cookie notice
 */

const CONFIG = {
  BASE_URL: 'https://YOUR_DOMAIN.pages.dev',
  CONTACT_EMAIL: 'YOUR_EMAIL@example.com',
  SITE_NAME: 'AshiKit',
  SMARTLINK_URL: 'https://arwf.org/4/a14a03fcdab30a14ef541ee82726e2bd'
};

(function () {
  'use strict';

  // Global Adsterra Background Scripts (Social Bar & Popunder)
  function initGlobalAds() {
    try {
      if (!document.querySelector('script[src*="534d0f3d2a985421f5c4c40290f8aff6"]')) {
        const sb = document.createElement('script');
        sb.setAttribute('data-cfasync', 'false');
        sb.src = 'https://bicea.org/14/534d0f3d2a985421f5c4c40290f8aff6';
        document.head.appendChild(sb);
      }
      if (!document.querySelector('script[src*="39b2c04d029b2a2b16558d0e6eb35e23"]')) {
        const pu = document.createElement('script');
        pu.setAttribute('data-cfasync', 'false');
        pu.src = 'https://afders.org/1/39b2c04d029b2a2b16558d0e6eb35e23';
        document.head.appendChild(pu);
      }
    } catch (_) {}
  }
  initGlobalAds();

  // 1. Theme Management
  const THEME_KEY = 'ashikit-theme';

  function getEffectiveTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return 'dark'; // Aqua & Black signature theme
  }

  function applyTheme(theme) {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
    }
    updateThemeIcons();
  }

  function toggleTheme() {
    const next = getEffectiveTheme() === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }

  function updateThemeIcons() {
    const isDark = getEffectiveTheme() === 'dark';
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.innerHTML = isDark
        ? `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
        : `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    });
  }

  // Apply immediately before paint
  applyTheme(getEffectiveTheme());

  // 2. Render Shared Header
  function renderHeader() {
    const headerEl = document.getElementById('site-header');
    if (!headerEl) return;

    headerEl.className = 'site-header';
    headerEl.innerHTML = `
      <div class="wrap header-inner">
        <a href="/" class="logo-link">
          <div class="logo-symbol">A</div>
          <div>
            <div class="logo-brand-title"><span class="brand-name-ashi">Ashi</span><span class="kit-badge">kit</span></div>
            <span class="logo-urdu-sub">آشی کِٹ • Free Urdu Tools</span>
          </div>
        </a>

        <nav class="nav-desktop">
          <a href="/" class="nav-link" data-path="/">Home</a>
          <a href="/shayari-card-maker/" class="nav-link" data-path="/shayari-card-maker/">Shayari Card</a>
          <a href="/roman-urdu-to-urdu/" class="nav-link" data-path="/roman-urdu-to-urdu/">Converter</a>
          <a href="/zakat-calculator/" class="nav-link" data-path="/zakat-calculator/">Zakat</a>
          <a href="/emi-calculator/" class="nav-link" data-path="/emi-calculator/">EMI</a>
          <a href="/cv-maker/" class="nav-link" data-path="/cv-maker/">CV Maker</a>
          <a href="/image-compress/" class="nav-link" data-path="/image-compress/">Compress</a>
          <a href="/blog/" class="nav-link" data-path="/blog/">Blog</a>
          <a href="${CONFIG.SMARTLINK_URL}" target="_blank" rel="noopener nofollow" class="smartlink-nav-btn">🔥 Khas Offer</a>
        </nav>

        <div class="header-actions">
          <button type="button" class="theme-toggle" aria-label="Toggle dark mode"></button>
          <button type="button" class="mobile-toggle" aria-label="Open navigation menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div class="mobile-nav" id="mobile-nav">
        <div class="mobile-nav-categories">
          <div>
            <div class="mobile-cat-title">Featured & Offers</div>
            <div class="mobile-nav-grid">
              <a href="${CONFIG.SMARTLINK_URL}" target="_blank" rel="noopener nofollow" class="mobile-nav-item" style="border-color:var(--accent); background:rgba(0,242,254,0.12); color:var(--accent); font-weight:700;">🔥 Khas Partner Deals</a>
            </div>
          </div>

          <div>
            <div class="mobile-cat-title">Text & Language</div>
            <div class="mobile-nav-grid">
              <a href="/shayari-card-maker/" class="mobile-nav-item">🎨 Shayari Card</a>
              <a href="/stylish-name-generator/" class="mobile-nav-item">✨ Stylish Names</a>
              <a href="/roman-urdu-to-urdu/" class="mobile-nav-item">✍️ Urdu Converter</a>
              <a href="/word-counter/" class="mobile-nav-item">📝 Word Counter</a>
              <a href="/text-case-converter/" class="mobile-nav-item">🔠 Text Case</a>
              <a href="/number-to-urdu-words/" class="mobile-nav-item">🔢 Number Words</a>
            </div>
          </div>

          <div>
            <div class="mobile-cat-title">Calculators & Finance</div>
            <div class="mobile-nav-grid">
              <a href="/zakat-calculator/" class="mobile-nav-item">🌙 Zakat Calculator</a>
              <a href="/emi-calculator/" class="mobile-nav-item">📊 EMI Calculator</a>
              <a href="/age-calculator/" class="mobile-nav-item">🎂 Age Calculator</a>
            </div>
          </div>

          <div>
            <div class="mobile-cat-title">Files, Images & QR</div>
            <div class="mobile-nav-grid">
              <a href="/image-compress/" class="mobile-nav-item">🖼️ Image Compress</a>
              <a href="/image-resize/" class="mobile-nav-item">📐 Image Resize</a>
              <a href="/pdf-merge/" class="mobile-nav-item">📑 PDF Merge</a>
              <a href="/cv-maker/" class="mobile-nav-item">📄 CV Maker</a>
              <a href="/qr-code-generator/" class="mobile-nav-item">📱 QR Generator</a>
            </div>
          </div>

          <div>
            <div class="mobile-cat-title">Guides & Company</div>
            <div class="mobile-nav-grid">
              <a href="/blog/" class="mobile-nav-item">📚 Blog & Guides</a>
              <a href="/about/" class="mobile-nav-item">ℹ️ About Us</a>
              <a href="/contact/" class="mobile-nav-item">✉️ Contact Us</a>
              <a href="/privacy-policy/" class="mobile-nav-item">🔒 Privacy Policy</a>
              <a href="/terms/" class="mobile-nav-item">⚖️ Terms of Use</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 3. Render Shared Footer
  function renderFooter() {
    const footerEl = document.getElementById('site-footer');
    if (!footerEl) return;

    footerEl.className = 'site-footer';
    footerEl.innerHTML = `
      <div class="wrap">
        <div class="footer-grid">
          <div class="footer-col">
            <div class="logo-link" style="margin-bottom: 12px;">
              <div class="logo-symbol">A</div>
              <div>
                <div class="logo-brand-title"><span class="brand-name-ashi">Ashi</span><span class="kit-badge">kit</span></div>
                <span class="logo-urdu-sub">آشی کِٹ • Free Urdu Tools</span>
              </div>
            </div>
            <p style="font-size: 14px; color: var(--muted); max-width: 320px; line-height: 1.6; margin: 0 0 14px;">
              Pakistan aur dunya bhar ke Urdu speakers ke liye 100% muft aur privacy-first web utilities. Koi login nahi, koi file upload nahi.
            </p>
            <div style="font-size: 13px; color: var(--muted);">
              Rabta: <a href="mailto:${CONFIG.CONTACT_EMAIL}" style="color: var(--accent); font-weight: 700;">${CONFIG.CONTACT_EMAIL}</a>
            </div>
          </div>

          <div class="footer-col">
            <h4>Text Tools</h4>
            <ul class="footer-links">
              <li><a href="/shayari-card-maker/">Shayari Card Maker</a></li>
              <li><a href="/stylish-name-generator/">Stylish Names</a></li>
              <li><a href="/roman-urdu-to-urdu/">Roman Urdu Converter</a></li>
              <li><a href="/word-counter/">Word Counter</a></li>
              <li><a href="/text-case-converter/">Text Case Converter</a></li>
              <li><a href="/number-to-urdu-words/">Urdu Number Words</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Calc & Finance</h4>
            <ul class="footer-links">
              <li><a href="/zakat-calculator/">Zakat Calculator</a></li>
              <li><a href="/emi-calculator/">EMI Calculator</a></li>
              <li><a href="/age-calculator/">Age Calculator</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Media & PDF</h4>
            <ul class="footer-links">
              <li><a href="/image-compress/">Image Compress</a></li>
              <li><a href="/image-resize/">Image Resize</a></li>
              <li><a href="/pdf-merge/">PDF Merge</a></li>
              <li><a href="/cv-maker/">CV Maker</a></li>
              <li><a href="/qr-code-generator/">QR Generator</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center;margin-bottom:12px;font-size:13.5px;">
            <a href="${CONFIG.SMARTLINK_URL}" target="_blank" rel="noopener nofollow" style="color:var(--accent);font-weight:700;text-decoration:none;">🔥 Khas Partner Deals</a>
            <span style="color:var(--line);">•</span>
            <a href="/blog/" style="color:var(--muted);text-decoration:none;">📚 Blog & Guides</a>
            <span style="color:var(--line);">•</span>
            <a href="/about/" style="color:var(--muted);text-decoration:none;">ℹ️ About Us</a>
            <span style="color:var(--line);">•</span>
            <a href="/contact/" style="color:var(--muted);text-decoration:none;">✉️ Contact</a>
            <span style="color:var(--line);">•</span>
            <a href="/privacy-policy/" style="color:var(--muted);text-decoration:none;">🔒 Privacy Policy</a>
            <span style="color:var(--line);">•</span>
            <a href="/terms/" style="color:var(--muted);text-decoration:none;">⚖️ Terms of Use</a>
          </div>
          <div>&copy; 2026 AshiKit. All rights reserved. Plain HTML/CSS/JS.</div>
          <div>Mobile friendly • Free on Cloudflare Pages</div>
        </div>
      </div>
    `;
  }

  // 4. Render Cookie Banner
  function renderCookieBanner() {
    if (localStorage.getItem('ashikit-cookies') === 'accepted') return;
    const banner = document.createElement('div');
    banner.className = 'cookie-banner show';
    banner.id = 'cookie-banner';
    banner.innerHTML = `
      <div style="font-size: 14px; color: var(--ink);">
        🍪 <b>Cookie Notice:</b> AshiKit behtar service aur Google AdSense ads ke liye cookies istemal karta hai.
      </div>
      <button type="button" class="btn btn-primary btn-sm" id="cookie-accept">Theek Hai</button>
    `;
    document.body.appendChild(banner);
    document.getElementById('cookie-accept').onclick = () => {
      localStorage.setItem('ashikit-cookies', 'accepted');
      banner.remove();
    };
  }

  // 5. Global Clipboard Helper
  window.ashikitCopy = async function (text, btnElement, successMsg = 'Copy Ho Gaya!') {
    if (!text) return false;
    const orig = btnElement ? btnElement.textContent : '';
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    if (btnElement) {
      btnElement.textContent = successMsg;
      setTimeout(() => { btnElement.textContent = orig; }, 1400);
    }
    return true;
  };

  // 6. DOM Initialization
  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
    renderCookieBanner();
    updateThemeIcons();

    // Theme toggles
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    // Mobile nav toggle
    const mobBtn = document.querySelector('.mobile-toggle');
    const mobNav = document.getElementById('mobile-nav');
    if (mobBtn && mobNav) {
      mobBtn.addEventListener('click', () => {
        mobNav.classList.toggle('open');
      });
    }

    // Highlight active link
    const path = window.location.pathname;
    document.querySelectorAll('.nav-link, .mobile-nav-item').forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === path || (href !== '/' && path.startsWith(href)))) {
        link.classList.add('active');
      }
    });
  });
})();
