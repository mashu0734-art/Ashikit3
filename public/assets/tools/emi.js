/**
 * AshiKit - EMI Calculator Tool
 */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const n = id => parseFloat($(id) ? $(id).value : 0) || 0;
  const fmt = x => Math.round(x).toLocaleString('en-PK');

  document.addEventListener('DOMContentLoaded', () => {
    const btnCalc = $('ego');
    const btnReset = $('ereset');
    if (!btnCalc) return;

    document.querySelectorAll('.e-tenure').forEach(btn => {
      btn.onclick = () => {
        if ($('e3')) $('e3').value = btn.dataset.m;
      };
    });

    if (btnReset) {
      btnReset.onclick = () => {
        ['e1', 'e2', 'e3'].forEach(id => {
          if ($(id)) $(id).value = '';
        });
        if ($('eres')) $('eres').textContent = '';
      };
    }

    btnCalc.onclick = () => {
      const P = n('e1'), m = n('e3'), r = n('e2') / 1200;
      const res = $('eres');
      if (!res) return;

      if (!P || !m) {
        res.innerHTML = '<span style="color:var(--danger)">Raqam aur Muddat lazmi likhein.</span>';
        return;
      }

      const e = r ? P * r * Math.pow(1 + r, m) / (Math.pow(1 + r, m) - 1) : P / m;
      const total = e * m;
      const extra = total - P;

      res.innerHTML = `
        <div style="font-size:22px; color:var(--accent); margin-bottom:8px;">
          Mahana Qist: Rs ${fmt(e)}
        </div>
        <div style="font-size:14.5px; line-height:1.6; color:var(--ink-secondary); font-weight:normal;">
          <b>Kul Adaigi:</b> Rs ${fmt(total)}<br>
          <b>Extra Markup / Interest:</b> Rs ${fmt(extra)} (${((extra / P) * 100).toFixed(1)}% of Principal)
        </div>
      `;
    };
  });
})();
