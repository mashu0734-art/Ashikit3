/**
 * AshiKit - Word & Character Counter Tool (Urdu & English)
 */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);

  document.addEventListener('DOMContentLoaded', () => {
    const textInp = $('cnt-text');
    if (!textInp) return;

    function count() {
      const text = textInp.value;
      const charsWithSpaces = text.length;
      const charsWithoutSpaces = text.replace(/\s+/g, '').length;

      // Words (works for both English & Urdu words separated by spaces or punctuation)
      const wordsArr = text.trim().split(/[\s\n\r،؛!?؟.]+/).filter(Boolean);
      const words = text.trim() ? wordsArr.length : 0;

      // Sentences
      const sentences = text.trim() ? (text.match(/[^.!?؟\n]+[.!?؟\n]+/g) || [text]).length : 0;

      // Paragraphs
      const paras = text.trim() ? text.split(/\n+/).filter(x => x.trim()).length : 0;

      // Reading time (approx 200 words per min)
      const readTime = Math.ceil(words / 200) || 0;
      const speakTime = Math.ceil(words / 130) || 0;

      const setEl = (id, val) => {
        const el = $(id);
        if (el) el.textContent = val;
      };

      setEl('stat-words', words.toLocaleString('en-PK'));
      setEl('stat-chars', charsWithSpaces.toLocaleString('en-PK'));
      setEl('stat-chars-nospace', charsWithoutSpaces.toLocaleString('en-PK'));
      setEl('stat-sentences', sentences.toLocaleString('en-PK'));
      setEl('stat-paras', paras.toLocaleString('en-PK'));
      setEl('stat-readtime', readTime + ' min');
      setEl('stat-speaktime', speakTime + ' min');
    }

    textInp.addEventListener('input', count);

    const btnClear = $('cnt-clear');
    if (btnClear) {
      btnClear.onclick = () => {
        textInp.value = '';
        count();
        textInp.focus();
      };
    }

    const btnSample = $('cnt-sample');
    if (btnSample) {
      btnSample.onclick = () => {
        textInp.value = 'AshiKit aik nihayat mufeed aur asaan platform hai jahan aap Roman Urdu ko Urdu mein badal sakte hain, Zakat aur EMI calculate kar sakte hain, aur mukhtalif tools istemal kar sakte hain.';
        count();
      };
    }

    const btnCopy = $('cnt-copy');
    if (btnCopy) {
      btnCopy.onclick = function () {
        window.ashikitCopy(textInp.value, this, 'Text Copy Ho Gaya!');
      };
    }

    count();
  });
})();
