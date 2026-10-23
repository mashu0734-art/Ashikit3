/**
 * AshiKit - CV Maker Tool (Dual Column Live Preview & PDF Print)
 */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = t => t.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const li = t => '<ul>' + esc(t).split('\n').filter(x => x.trim()).map(x => '<li dir="auto">' + x + '</li>').join('') + '</ul>';

  document.addEventListener('DOMContentLoaded', () => {
    const preview = $('cvp');
    if (!preview) return;

    function cv() {
      const v = id => ($(id) ? $(id).value.trim() : '');
      const col = $('cc') ? $('cc').value : '#0E3B43';
      preview.style.setProperty('--cc', col);

      const name = esc(v('c1')) || 'Aap Ka Naam';
      const role = esc(v('c2')) || 'Job Title';
      const info = [v('c3'), v('c4'), v('c5')].filter(Boolean).map(esc).join(' • ');
      const sk = v('c7').split(/[,،]/).map(x => x.trim()).filter(Boolean).map(x => '<li dir="auto">' + esc(x) + '</li>').join('');

      preview.innerHTML = `
        <h2 dir="auto" style="color:${col}; margin:0 0 2px; font-size:26px;">${name}</h2>
        <p dir="auto" style="font-size:16px; font-weight:700; color:#444; margin:0 0 4px;">${role}</p>
        <p dir="auto" style="font-size:13px; color:#666; margin:0 0 16px;">${info || 'Phone • Email • Shehar'}</p>
        ${v('c6') ? `<h3 style="border-bottom:2px solid ${col}; color:${col}; font-size:15px; text-transform:uppercase; margin:14px 0 4px; padding-bottom:3px;">Profile</h3><p dir="auto" style="line-height:1.6; font-size:14px;">${esc(v('c6'))}</p>` : ''}
        ${v('c8') ? `<h3 style="border-bottom:2px solid ${col}; color:${col}; font-size:15px; text-transform:uppercase; margin:14px 0 4px; padding-bottom:3px;">Tajurba (Experience)</h3>${li(v('c8'))}` : ''}
        ${v('c9') ? `<h3 style="border-bottom:2px solid ${col}; color:${col}; font-size:15px; text-transform:uppercase; margin:14px 0 4px; padding-bottom:3px;">Taleem (Education)</h3>${li(v('c9'))}` : ''}
        ${sk ? `<h3 style="border-bottom:2px solid ${col}; color:${col}; font-size:15px; text-transform:uppercase; margin:14px 0 4px; padding-bottom:3px;">Skills</h3><ul style="columns:2; margin-top:4px;">${sk}</ul>` : ''}
      `;
    }

    document.querySelectorAll('#cvform input, #cvform textarea, #cvform select').forEach(e => {
      e.addEventListener('input', cv);
    });

    const sampleBtn = $('btn-sample-cv');
    if (sampleBtn) {
      sampleBtn.onclick = () => {
        $('c1').value = 'Muhammad Ali Khan';
        $('c2').value = 'Graphic Designer & Video Editor';
        $('c3').value = '+92 300 1234567';
        $('c4').value = 'ali.khan@example.com';
        $('c5').value = 'Karachi, Pakistan';
        $('c6').value = '4 saal ka tajurba Adobe Suite, social media marketing aur branding mein. Waqt ka paband aur team player.';
        $('c7').value = 'Photoshop, Illustrator, Premiere Pro, Figma, Typography, Urdu Nastaliq Layout';
        $('c8').value = 'Senior Designer at CreativeAgency (2022 - Haal)\nJunior Designer at MediaPlus (2020 - 2022)';
        $('c9').value = 'BS Visual Studies - Karachi University (2020)\nIntermediate (2016)';
        cv();
      };
    }

    const clearBtn = $('cvclear');
    if (clearBtn) {
      clearBtn.onclick = () => {
        document.querySelectorAll('#cvform input, #cvform textarea').forEach(e => { e.value = ''; });
        cv();
      };
    }

    const printBtn = $('cvpdf');
    if (printBtn) {
      printBtn.onclick = () => window.print();
    }

    cv();
  });
})();
