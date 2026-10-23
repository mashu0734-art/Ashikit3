/**
 * AshiKit - Zakat Calculator Tool
 */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const n = id => parseFloat($(id) ? $(id).value : 0) || 0;
  const fmt = x => Math.round(x).toLocaleString('en-PK');

  document.addEventListener('DOMContentLoaded', () => {
    const btnCalc = $('zgo');
    const btnReset = $('zreset');
    const btnPreset = $('zpreset');
    if (!btnCalc) return;

    if (btnPreset) {
      btnPreset.onclick = () => {
        $('z6').value = 150000;
      };
    }

    if (btnReset) {
      btnReset.onclick = () => {
        ['z1', 'z2', 'z3', 'z4', 'z5', 'z6'].forEach(id => {
          if ($(id)) $(id).value = '';
        });
        if ($('zres')) $('zres').textContent = '';
      };
    }

    btnCalc.onclick = () => {
      const net = n('z1') + n('z2') + n('z3') + n('z4') - n('z5');
      const nis = n('z6');
      const res = $('zres');
      if (!res) return;

      if (!nis) {
        res.innerHTML = '<span style="color:var(--danger)">Pehle Nisab ki qeemat (field 6) likhein ya "Set Nisab" button dabayein.</span>';
        return;
      }

      if (net <= 0) {
        res.innerHTML = `Net dolat (Rs ${fmt(net)}) qarz manfi karne ke baad sifar ya manfi hai. Zakat farz nahi.`;
        return;
      }

      if (net >= nis) {
        const zakatAmount = net * 0.025;
        res.innerHTML = `
          <div style="color:var(--success); font-size:22px; margin-bottom:6px;">
            ✓ Aap par Zakat Farz Hai: Rs ${fmt(zakatAmount)}
          </div>
          <div style="font-size:14.5px; color:var(--muted); font-weight:normal;">
            Net Dulat: Rs ${fmt(net)} | Nisab: Rs ${fmt(nis)} | Sharah: 2.5% (40wan hissa)
          </div>
        `;
      } else {
        res.innerHTML = `Net dolat <b>Rs ${fmt(net)}</b> Nisab (Rs ${fmt(nis)}) se kam hai, lihaza zakat farz nahi hai.`;
      }
    };
  });
})();
