/**
 * AshiKit - Image Resize Tool (100% In-Browser)
 */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);

  document.addEventListener('DOMContentLoaded', () => {
    const fileInp = $('res-file');
    const widthInp = $('res-width');
    const heightInp = $('res-height');
    const lockRatio = $('res-lock');
    const fmtSelect = $('res-fmt');
    const btnGo = $('res-go');
    const outBox = $('res-out');
    const prevWrap = $('res-prev-wrap');
    const prevImg = $('res-prev-img');
    if (!fileInp || !btnGo) return;

    let origWidth = 0, origHeight = 0, currentImg = null;

    fileInp.onchange = e => {
      const f = e.target.files[0];
      if (!f) return;
      const im = new Image();
      im.onload = () => {
        currentImg = im;
        origWidth = im.width;
        origHeight = im.height;
        widthInp.value = origWidth;
        heightInp.value = origHeight;
        $('res-orig-info').textContent = `Asal Size: ${origWidth}px x ${origHeight}px (${(f.size / 1024).toFixed(0)} KB)`;
        if (prevWrap && prevImg) {
          prevWrap.style.display = 'block';
          prevImg.src = im.src;
        }
      };
      im.src = URL.createObjectURL(f);
    };

    widthInp.oninput = () => {
      if (lockRatio.checked && origWidth > 0) {
        heightInp.value = Math.round((widthInp.value / origWidth) * origHeight);
      }
    };

    heightInp.oninput = () => {
      if (lockRatio.checked && origHeight > 0) {
        widthInp.value = Math.round((heightInp.value / origHeight) * origWidth);
      }
    };

    document.querySelectorAll('.dim-preset').forEach(btn => {
      btn.onclick = () => {
        const [w, h] = btn.dataset.dim.split('x');
        widthInp.value = w;
        heightInp.value = h;
      };
    });

    btnGo.onclick = () => {
      if (!currentImg) {
        outBox.innerHTML = '<span style="color:var(--danger)">Pehle koi tasveer chunein.</span>';
        return;
      }

      const w = parseInt(widthInp.value, 10);
      const h = parseInt(heightInp.value, 10);
      if (!w || !h || w <= 0 || h <= 0) {
        outBox.innerHTML = '<span style="color:var(--danger)">Width aur Height durust likhein.</span>';
        return;
      }

      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d');
      ctx.drawImage(currentImg, 0, 0, w, h);

      const mime = fmtSelect ? fmtSelect.value : 'image/jpeg';
      const ext = mime.split('/')[1] || 'jpg';

      c.toBlob(blob => {
        if (!blob) return;
        const u = URL.createObjectURL(blob);
        outBox.innerHTML = `
          <div style="color:var(--success); font-size:18px; margin-bottom:6px;">
            ✓ Tasveer resize ho gayi (${w}px x ${h}px, ${(blob.size / 1024).toFixed(0)} KB)
          </div>
          <a href="${u}" download="resized-${w}x${h}.${ext}">
            <button type="button" class="btn btn-primary" style="padding:12px 24px;">Resized Photo Download Karein 📥</button>
          </a>
        `;
      }, mime, 0.9);
    };
  });
})();
