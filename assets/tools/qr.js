/**
 * AshiKit - QR Code Generator Tool
 */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  let qrInstance = null;

  document.addEventListener('DOMContentLoaded', () => {
    const textInp = $('qr-text');
    const sizeSelect = $('qr-size');
    const colorDarkInp = $('qr-color-dark');
    const colorLightInp = $('qr-color-light');
    const btnGen = $('qr-gen');
    const qrContainer = $('qr-container');
    const qrDlWrap = $('qr-dl-wrap');
    if (!textInp || !btnGen) return;

    function generate() {
      const text = textInp.value.trim();
      if (!text) {
        qrContainer.innerHTML = '<span style="color:var(--danger)">Kuch matan ya website ka link likhein.</span>';
        if (qrDlWrap) qrDlWrap.innerHTML = '';
        return;
      }

      if (!window.QRCode) {
        qrContainer.innerHTML = '<span style="color:var(--danger)">QR Code library load nahi hui. Internet check karein.</span>';
        return;
      }

      const size = parseInt(sizeSelect ? sizeSelect.value : 220, 10);
      const dark = colorDarkInp ? colorDarkInp.value : '#000000';
      const light = colorLightInp ? colorLightInp.value : '#ffffff';

      qrContainer.innerHTML = '';

      qrInstance = new QRCode(qrContainer, {
        text: text,
        width: size,
        height: size,
        colorDark: dark,
        colorLight: light,
        correctLevel: QRCode.CorrectLevel.H
      });

      setTimeout(() => {
        const img = qrContainer.querySelector('img');
        const canvas = qrContainer.querySelector('canvas');
        const dataUrl = img && img.src ? img.src : (canvas ? canvas.toDataURL('image/png') : '');
        if (dataUrl && qrDlWrap) {
          qrDlWrap.innerHTML = `
            <a href="${dataUrl}" download="ashikit-qrcode.png">
              <button type="button" class="btn btn-primary" style="padding:10px 22px;">QR Code Download Karein (PNG) 📥</button>
            </a>
          `;
        }
      }, 200);
    }

    btnGen.onclick = generate;
    textInp.addEventListener('keypress', e => {
      if (e.key === 'Enter') generate();
    });

    const sampleBtn = $('qr-sample');
    if (sampleBtn) {
      sampleBtn.onclick = () => {
        textInp.value = 'https://YOUR_DOMAIN.pages.dev';
        generate();
      };
    }
  });
})();
