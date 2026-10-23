/**
 * AshiKit - PDF Merge Tool (pdf-lib in-browser)
 */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  let pf = [];

  document.addEventListener('DOMContentLoaded', () => {
    const fileInp = $('pf');
    const listEl = $('plist');
    const btnGo = $('pgo');
    const resEl = $('pres');
    const btnClear = $('pclear');
    if (!fileInp || !listEl || !btnGo) return;

    function renderList() {
      listEl.innerHTML = '';
      if (!pf.length) {
        listEl.innerHTML = '<div style="color:var(--muted); font-size:14px; padding:10px 0;">Abhi koi PDF file nahi chuni gayi.</div>';
        return;
      }

      pf.forEach((f, i) => {
        const d = document.createElement('div');
        d.style.cssText = 'display:flex; align-items:center; gap:8px; padding:8px 0; border-bottom:1px solid var(--line); font-size:14px;';

        const sp = document.createElement('span');
        sp.style.flex = '1';
        sp.style.wordBreak = 'break-all';
        sp.textContent = `${i + 1}. ${f.name} (${(f.size / 1024).toFixed(0)} KB)`;
        d.append(sp);

        [['↑', -1, 'Upar'], ['↓', 1, 'Neeche'], ['✕', 0, 'Hatayein']].forEach(([t, m, label]) => {
          const b = document.createElement('button');
          b.className = 'btn btn-sm';
          b.textContent = t;
          b.setAttribute('aria-label', label);
          b.onclick = () => {
            if (!m) {
              pf.splice(i, 1);
            } else {
              const j = i + m;
              if (j < 0 || j >= pf.length) return;
              [pf[i], pf[j]] = [pf[j], pf[i]];
            }
            renderList();
          };
          d.append(b);
        });

        listEl.append(d);
      });
    }

    fileInp.onchange = e => {
      pf = pf.concat([...e.target.files]);
      e.target.value = '';
      renderList();
    };

    if (btnClear) {
      btnClear.onclick = () => {
        pf = [];
        renderList();
        if (resEl) resEl.textContent = '';
      };
    }

    btnGo.onclick = async () => {
      if (pf.length < 2) {
        resEl.innerHTML = '<span style="color:var(--danger)">Kam az kam 2 PDF files chunein.</span>';
        return;
      }

      if (!window.PDFLib) {
        resEl.innerHTML = '<span style="color:var(--danger)">PDF library load nahi hui. Internet check karein aur refresh karein.</span>';
        return;
      }

      resEl.innerHTML = '<span style="color:var(--accent);">Files merge ho rahi hain...</span>';

      try {
        const out = await PDFLib.PDFDocument.create();
        for (const f of pf) {
          const buf = await f.arrayBuffer();
          const src = await PDFLib.PDFDocument.load(buf);
          const indices = src.getPageIndices();
          const copied = await out.copyPages(src, indices);
          copied.forEach(p => out.addPage(p));
        }

        const mergedBytes = await out.save();
        const blob = new Blob([mergedBytes], { type: 'application/pdf' });
        const u = URL.createObjectURL(blob);

        resEl.innerHTML = `
          <div style="font-size:18px; color:var(--success); margin-bottom:8px;">
            ✓ ${pf.length} PDF files merge ho gayin! (${(blob.size / 1024).toFixed(0)} KB)
          </div>
          <a href="${u}" download="merged.pdf">
            <button type="button" class="btn btn-primary" style="padding:12px 24px;">merged.pdf Download Karein 📥</button>
          </a>
        `;
      } catch (err) {
        console.error(err);
        resEl.innerHTML = '<span style="color:var(--danger)">Merge fail hua. Ho sakta hai koi file password protected ya corrupt ho.</span>';
      }
    };
  });
})();
