/**
 * AshiKit - Roman Urdu to Urdu Converter Tool
 * Google Input Tools smart mode + offline phonetic dictionary fallback
 */
(function () {
  'use strict';

  const D = {
    mera:'میرا', meri:'میری', mere:'میرے', naam:'نام', hai:'ہے', hain:'ہیں', main:'میں', mein:'میں',
    aap:'آپ', ap:'آپ', tum:'تم', hum:'ہم', kya:'کیا', kaise:'کیسے', kesy:'کیسے', kaisa:'کیسا', kahan:'کہاں',
    kab:'کب', kyun:'کیوں', nahi:'نہیں', nahin:'نہیں', haan:'ہاں', ji:'جی', shukriya:'شکریہ', salam:'سلام',
    khush:'خوش', dost:'دوست', ghar:'گھر', pakistan:'پاکستان', karachi:'کراچی', lahore:'لاہور', islamabad:'اسلام آباد',
    ali:'علی', ahmed:'احمد', ashi:'آشی', ashu:'آشو', acha:'اچھا', achi:'اچھی', achy:'اچھے', ache:'اچھے',
    bohat:'بہت', bahut:'بہت', bohot:'بہت', zyada:'زیادہ', kam:'کم', aur:'اور', ya:'یا', se:'سے', ko:'کو',
    ka:'کا', ki:'کی', ke:'کے', ne:'نے', par:'پر', ho:'ہو', hoon:'ہوں', hona:'ہونا', kar:'کر', karna:'کرنا',
    karo:'کرو', karein:'کریں', ab:'اب', aaj:'آج', kal:'کل', roz:'روز', din:'دن', raat:'رات', subah:'صبح',
    khana:'کھانا', pani:'پانی', chai:'چائے', paisa:'پیسہ', paisy:'پیسے', paise:'پیسے', kaam:'کام',
    website:'ویب سائٹ', mujhe:'مجھے', mujhy:'مجھے', tumhara:'تمہارا', humara:'ہمارا', yeh:'یہ', ye:'یہ',
    woh:'وہ', wo:'وہ', is:'اس', us:'اس', jo:'جو', liye:'لیے', saath:'ساتھ', sath:'ساتھ', bhi:'بھی',
    sirf:'صرف', bas:'بس', dil:'دل', zindagi:'زندگی', pyar:'پیار', mohabbat:'محبت', allah:'اللہ',
    duniya:'دنیا', log:'لوگ', ek:'ایک', do:'دو', teen:'تین', theek:'ٹھیک', thk:'ٹھیک', wala:'والا',
    wali:'والی', sab:'سب', kuch:'کچھ', koi:'کوئی', kyunke:'کیونکہ', lekin:'لیکن', agar:'اگر', to:'تو',
    tu:'تو', abhi:'ابھی', phir:'پھر', jaldi:'جلدی', chalo:'چلو', aao:'آؤ', jao:'جاؤ', dekho:'دیکھو',
    batao:'بتاؤ', likho:'لکھو', rehta:'رہتا', rehti:'رہتی', rehte:'رہتے', tha:'تھا', thi:'تھی',
    the:'تھے', gaya:'گیا', gayi:'گئی', kon:'کون', kaun:'کون', kisi:'کسی', bhai:'بھائی', behan:'بہن',
    ammi:'امی', abbu:'ابو', maa:'ماں', wahan:'وہاں', yahan:'یہاں', zaroor:'ضرور', bilkul:'بالکل',
    naya:'نیا', nayi:'نئی', purana:'پرانا', kitab:'کتاب', school:'اسکول', office:'آفس'
  };

  const DG = { chh:'چھ', kh:'خ', gh:'غ', sh:'ش', ch:'چ', zh:'ژ', bh:'بھ', ph:'پھ', th:'تھ', dh:'دھ', jh:'جھ' };
  const C = { b:'ب', p:'پ', t:'ت', j:'ج', d:'د', r:'ر', z:'ز', s:'س', f:'ف', q:'ق', k:'ک', g:'گ', l:'ل', m:'م', n:'ن', v:'و', w:'و', h:'ہ', y:'ی', c:'ک', x:'کس' };

  function word(w) {
    if (D[w]) return D[w];
    let o = '', i = 0;
    while (i < w.length) {
      let hit = false;
      for (const L of [3, 2]) {
        const s = w.substr(i, L);
        if (DG[s]) { o += DG[s]; i += L; hit = true; break; }
      }
      if (hit) continue;
      const ch = w[i], two = w.substr(i, 2), first = i === 0, last = i === w.length - 1;
      if ('aeiou'.includes(ch)) {
        if (two === 'aa') { o += first ? 'آ' : 'ا'; i += 2; continue; }
        if (two === 'ee' || two === 'ii') { o += first ? 'ای' : 'ی'; i += 2; continue; }
        if (two === 'oo') { o += first ? 'او' : 'و'; i += 2; continue; }
        if (two === 'ai') { o += first ? 'ائ' : (i + 2 >= w.length ? 'ے' : 'ی'); i += 2; continue; }
        if (first) { o += ch === 'o' ? 'او' : 'ا'; }
        else if (last) { o += { a:'ا', e:'ے', i:'ی', o:'و', u:'و' }[ch]; }
        else if (ch === 'e') { o += 'ی'; }
        else if (ch === 'o') { o += 'و'; }
        i++; continue;
      }
      o += C[ch] || ch;
      i++;
    }
    return o;
  }

  function convert(t) {
    return t.replace(/[a-zA-Z]+/g, m => word(m.toLowerCase())).replace(/\?/g, '؟').replace(/,/g, '،');
  }

  const cache = new Map();
  let tm, seq = 0;

  async function gword(w) {
    if (cache.has(w)) return cache.get(w);
    const r = await fetch('https://inputtools.google.com/request?text=' + encodeURIComponent(w) + '&itc=ur-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage');
    const j = await r.json();
    if (j[0] !== 'SUCCESS') throw 0;
    const u = j[1][0][1][0];
    cache.set(w, u);
    return u;
  }

  const post = t => t.replace(/\?/g, '؟').replace(/,/g, '،');

  document.addEventListener('DOMContentLoaded', () => {
    const inp = document.getElementById('inp');
    const out = document.getElementById('out');
    const modeEl = document.getElementById('mode');
    if (!inp || !out) return;

    async function render() {
      const t = inp.value, my = ++seq;
      if (!t.trim()) {
        out.textContent = '';
        if (modeEl) modeEl.textContent = '';
        return;
      }
      out.textContent = convert(t);
      const ws = [...new Set((t.match(/[a-zA-Z]+/g) || []).map(x => x.toLowerCase()))];
      if (!ws.length) {
        if (modeEl) modeEl.textContent = '';
        return;
      }
      try {
        await Promise.all(ws.map(gword));
        if (my !== seq) return;
        out.textContent = post(t.replace(/[a-zA-Z]+/g, m => cache.get(m.toLowerCase()) || word(m.toLowerCase())));
        if (modeEl) modeEl.textContent = 'Smart Google Mode chal raha hai.';
      } catch (e) {
        if (my === seq && modeEl) modeEl.textContent = 'Offline dictionary mode.';
      }
    }

    inp.addEventListener('input', () => {
      clearTimeout(tm);
      out.textContent = convert(inp.value);
      tm = setTimeout(render, 250);
    });

    const sampleBtn = document.getElementById('sample');
    if (sampleBtn) {
      sampleBtn.onclick = () => {
        inp.value = 'mera naam Ali hai aur main Karachi mein rehta hoon. aap kaise hain?';
        render();
      };
    }

    const clearBtn = document.getElementById('clear');
    if (clearBtn) {
      clearBtn.onclick = () => {
        inp.value = '';
        render();
        inp.focus();
      };
    }

    const copyBtn = document.getElementById('copy');
    if (copyBtn) {
      copyBtn.onclick = function () {
        window.ashikitCopy(out.textContent, this, 'Urdu Copy Ho Gayi!');
      };
    }

    document.querySelectorAll('.u-sym').forEach(btn => {
      btn.onclick = () => {
        const sym = btn.dataset.sym;
        const start = inp.selectionStart;
        const end = inp.selectionEnd;
        inp.value = inp.value.substring(0, start) + sym + inp.value.substring(end);
        inp.focus();
        inp.selectionStart = inp.selectionEnd = start + sym.length;
        render();
      };
    });
  });
})();
