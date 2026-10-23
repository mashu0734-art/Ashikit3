/**
 * AshiKit - Shared JavaScript
 * Dark mode toggle, mobile navigation, copy utilities
 */

(function () {
  'use strict';

  // 1. Dark Mode Management
  const THEME_KEY = 'ashikit-theme';

  function applyTheme(theme) {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
      html.classList.remove('light');
    } else if (theme === 'light') {
      html.classList.remove('dark');
      html.classList.add('light');
    } else {
      // System default
      html.classList.remove('dark', 'light');
    }
    updateThemeToggleIcons();
  }

  function getSavedTheme() {
    return localStorage.getItem(THEME_KEY);
  }

  function getEffectiveTheme() {
    const saved = getSavedTheme();
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function toggleTheme() {
    const current = getEffectiveTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }

  function updateThemeToggleIcons() {
    const isDark = getEffectiveTheme() === 'dark';
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.innerHTML = isDark
        ? `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
        : `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    });
  }

  // Initialize theme immediately
  const initialTheme = getSavedTheme();
  if (initialTheme) {
    applyTheme(initialTheme);
  }

  // 2. DOM Ready Listeners
  document.addEventListener('DOMContentLoaded', () => {
    updateThemeToggleIcons();

    // Theme toggle buttons
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    // Mobile nav toggle
    const mobileBtn = document.querySelector('.mobile-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    if (mobileBtn && mobileNav) {
      mobileBtn.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }

    // Active link highlighting
    const currentPath = window.location.pathname.replace(/\/index\.html$/, '/');
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === currentPath || (href !== '/' && currentPath.startsWith(href)))) {
        link.classList.add('active');
      }
    });
  });

  // 3. Global Copy Utility
  window.ashikitCopy = async function (text, btnElement, successText = 'Copy ho gaya!') {
    if (!text) return false;
    const originalText = btnElement ? btnElement.textContent : '';
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
      btnElement.textContent = successText;
      setTimeout(() => {
        btnElement.textContent = originalText;
      }, 1500);
    }
    return true;
  };
})();
