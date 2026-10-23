/**
 * AshiKit - Stylish Name Generator Tool
 */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const ST = [
    ['Bold', 0x1D400],
    ['Bold Italic', 0x1D468],
    ['Script', 0x1D4D0],
    ['Gothic', 0x1D56C],
    ['Mono', 0x1D670],
    ['Sans Bold', 0x1D5D4],
    ['Circle', 0x24B6]
  ];

  function sty(s, b) {
    return [...s].map(c => {
      const k = c.charCodeAt(0);
      return k >= 65 && k <= 90 ? String.fromCodePoint(b + k - 65)
           : k >= 97 && k <= 122 ? String.fromCodePoint(b + 26 + k - 97)
           : c;
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const inp = $('nm');
    const list = $('nlist');
    if (!inp || !list) return;

    function renderNames() {
      const v = inp.value.trim() || 'Ashi';
      list.innerHTML = '';

      const items = [
        ...ST.map(([l, b]) => ({ text: sty(v, b), label: l })),
        { text: '꧁' + v + '꧂', label: 'VIP Angel Wings' },
        { text: '★彡' + v + '彡★', label: 'Star Wings' },
        { text: '『' + v + '』', label: 'Gaming Brackets' },
        { text: '⚡ ' + v + ' ⚡', label: 'Thunder Bolt' },
        { text: '亗 ' + v + ' 亗', label: 'Crown Emperor' },
        { text: '☬ ' + v + ' ☬', label: 'Emblem' },
        { text: '░' + v + '░', label: 'Matrix Blocks' }
      ];

      items.forEach(({ text, label }) => {
        const row = document.createElement('div');
        row.style.cssText = 'display:flex; justify-content:space-between; align-items:center; gap:12px; padding:10px 4px; border-bottom:1px solid var(--line);';

        const left = document.createElement('div');
        left.innerHTML = `<span style="font-size:18px; font-weight:700;">${text}</span><div style="font-size:12px; color:var(--muted);">${label}</div>`;

        const btn = document.createElement('button');
        btn.className = 'btn btn-sm';
        btn.textContent = 'Copy';
        btn.onclick = () => {
          window.ashikitCopy(text, btn, 'Ho gaya!');
        };

        row.appendChild(left);
        row.appendChild(btn);
        list.appendChild(row);
      });
    }

    inp.oninput = renderNames;

    document.querySelectorAll('.n-sym').forEach(b => {
      b.onclick = () => {
        inp.value += b.dataset.s;
        renderNames();
      };
    });

    const samples = ['Ashi', 'Legend', 'Sultan', 'Shadow', 'Hunter', 'Ali_Khan'];
    const rndBtn = $('btn-rnd');
    if (rndBtn) {
      rndBtn.onclick = () => {
        inp.value = samples[Math.floor(Math.random() * samples.length)];
        renderNames();
      };
    }

    renderNames();
  });
})();
