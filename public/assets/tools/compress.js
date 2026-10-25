/**
 * AshiKit - Image Compressor Tool (100% In-Browser)
 */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);

  document.addEventListener('DOMContentLoaded', () => {
    const fileInp = $('if');
    const rangeQ = $('q');
    const qv = $('qv');
    const ires = $('ires');
    const idl = $('idl');
    const prevWrap = $('prev-wrap');
    const prevImg = $('prev-img');
    if (!fileInp || !rangeQ) return;

    function comp() {
      const f = fileInp.files[0];
      if (!f) return;
      const q = rangeQ.value / 100;
      if (qv) qv.textContent = rangeQ.value;

      const im = new Image();
      im.onload = () => {
        const c = document.createElement('canvas');
        c.width = im.width;
        c.height = im.height;
        const ctx = c.getContext('2d');
        ctx.drawImage(im, 0, 0);

        c.toBlob(b => {
          if (!b) return;
          const u = URL.createObjectURL(b);
          const origKb = (f.size / 1024).toFixed(0);
          const newKb = (b.size / 1024).toFixed(0);
          const diff = Math.max(0, Math.round(((f.size - b.size) / f.size) * 100));

          if (prevWrap && prevImg) {
            prevWrap.style.display = 'block';
            prevImg.src = u;
          }

          if (ires) {
            ires.innerHTML = `
              <div style="font-size: 19px; color: var(--success); margin-bottom: 4px;">
                ✓ Size ${diff}% Kam Ho Gaya!
              </div>
              <div style="font-size: 14px; color: var(--muted); font-weight: normal;">
                Asal Size: <b>${origKb} KB</b> ➔ Naya Size: <b>${newKb} KB</b>
              </div>
            `;
          }

          if (idl) {
            idl.innerHTML = `
              <a href="${u}" download="compressed-${f.name}">
                <button type="button" class="btn btn-primary" style="padding: 12px 24px;">Compressed Photo Download Karein 📥</button>
              </a>
            `;
          }
        }, 'image/jpeg', q);
      };
      im.src = URL.createObjectURL(f);
    }

    fileInp.onchange = comp;
    rangeQ.oninput = comp;
  });
})();
