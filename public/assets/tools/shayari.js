/**
 * AshiKit - Shayari & Quote Card Maker Tool (HTML5 Canvas to PNG)
 */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);

  document.addEventListener('DOMContentLoaded', () => {
    const textInp = $('sc-text');
    const authorInp = $('sc-author');
    const themeSelect = $('sc-theme');
    const sizeRange = $('sc-size');
    const ratioSelect = $('sc-ratio');
    const fontSelect = $('sc-font');
    const canvas = $('sc-canvas');
    const btnDl = $('sc-dl');
    const btnSample = $('sc-sample');
    if (!textInp || !canvas) return;

    const ctx = canvas.getContext('2d');

    const THEMES = {
      teal: ['#0E3B43', '#05191D'],
      gold: ['#78350F', '#B45309'],
      purple: ['#2E1065', '#581C87'],
      forest: ['#064E3B', '#022C22'],
      dark: ['#18181B', '#09090B'],
      crimson: ['#881337', '#4C0519']
    };

    function renderCard() {
      const text = textInp.value.trim() || 'دل ناداں تجھے ہوا کیا ہے\nآخر اس درد کی دوا کیا ہے';
      const author = authorInp ? authorInp.value.trim() : 'مرزا غالب';
      const themeKey = themeSelect ? themeSelect.value : 'teal';
      const colors = THEMES[themeKey] || THEMES.teal;
      const isSquare = !ratioSelect || ratioSelect.value === '1:1';
      const fontSize = parseInt(sizeRange ? sizeRange.value : 34, 10);
      const isUrduFont = !fontSelect || fontSelect.value === 'nastaliq';

      const w = 1080;
      const h = isSquare ? 1080 : 1920;
      canvas.width = w;
      canvas.height = h;

      // Background Gradient
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, colors[0]);
      grad.addColorStop(1, colors[1]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Decorative Border / Vignette
      ctx.strokeStyle = 'rgba(242, 169, 0, 0.35)';
      ctx.lineWidth = 14;
      ctx.strokeRect(36, 36, w - 72, h - 72);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 2;
      ctx.strokeRect(54, 54, w - 108, h - 108);

      // AshiKit watermark at top
      ctx.font = '700 20px "Bricolage Grotesque", sans-serif';
      ctx.fillStyle = 'rgba(242, 169, 0, 0.7)';
      ctx.textAlign = 'center';
      ctx.fillText('AshiKit • Shayari Card', w / 2, 90);

      // Text setup
      const fontFam = isUrduFont ? '"Noto Nastaliq Urdu", serif' : '"Bricolage Grotesque", sans-serif';
      ctx.font = `600 ${fontSize}px ${fontFam}`;
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.direction = 'rtl';

      const lines = text.split('\n').filter(x => x.trim());
      const lineHeight = fontSize * (isUrduFont ? 2.2 : 1.5);
      const totalTextH = lines.length * lineHeight;
      const startY = (h / 2) - (totalTextH / 2) + (isUrduFont ? fontSize * 0.7 : 0);

      lines.forEach((line, idx) => {
        ctx.fillText(line.trim(), w / 2, startY + (idx * lineHeight));
      });

      // Author name
      if (author) {
        ctx.font = `italic 700 ${Math.round(fontSize * 0.65)}px ${fontFam}`;
        ctx.fillStyle = '#F2A900';
        ctx.fillText('— ' + author, w / 2, startY + (lines.length * lineHeight) + 40);
      }
    }

    [textInp, authorInp, themeSelect, sizeRange, ratioSelect, fontSelect].forEach(el => {
      if (el) el.addEventListener('input', renderCard);
    });

    if (btnSample) {
      btnSample.onclick = () => {
        textInp.value = 'ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے\nبہت نکلے مرے ارمان لیکن پھر بھی کم نکلے';
        authorInp.value = 'مرزا اسد اللہ خان غالب';
        renderCard();
      };
    }

    if (btnDl) {
      btnDl.onclick = () => {
        renderCard();
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = 'ashikit-shayari-card.png';
        a.click();
      };
    }

    // Initial render
    setTimeout(renderCard, 200);
  });
})();
