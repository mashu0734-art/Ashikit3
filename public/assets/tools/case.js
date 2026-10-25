/**
 * AshiKit - Text Case Converter Tool
 */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);

  document.addEventListener('DOMContentLoaded', () => {
    const textInp = $('tc-text');
    if (!textInp) return;

    function toTitleCase(str) {
      return str.toLowerCase().replace(/(^|\s)\w/g, c => c.toUpperCase());
    }

    function toSentenceCase(str) {
      return str.toLowerCase().replace(/(^\s*\w|[.!?؟]\s*\w)/g, c => c.toUpperCase());
    }

    function toCamelCase(str) {
      return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }

    function toSnakeCase(str) {
      return str.trim().toLowerCase().replace(/[\s\-_]+/g, '_');
    }

    function toKebabCase(str) {
      return str.trim().toLowerCase().replace(/[\s\-_]+/g, '-');
    }

    function toAlternating(str) {
      return [...str].map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase())).join('');
    }

    document.querySelectorAll('.btn-case').forEach(btn => {
      btn.onclick = () => {
        const type = btn.dataset.case;
        const v = textInp.value;
        if (!v) return;

        switch (type) {
          case 'upper':
            textInp.value = v.toUpperCase();
            break;
          case 'lower':
            textInp.value = v.toLowerCase();
            break;
          case 'title':
            textInp.value = toTitleCase(v);
            break;
          case 'sentence':
            textInp.value = toSentenceCase(v);
            break;
          case 'camel':
            textInp.value = toCamelCase(v);
            break;
          case 'snake':
            textInp.value = toSnakeCase(v);
            break;
          case 'kebab':
            textInp.value = toKebabCase(v);
            break;
          case 'alternating':
            textInp.value = toAlternating(v);
            break;
        }
      };
    });

    const copyBtn = $('tc-copy');
    if (copyBtn) {
      copyBtn.onclick = function () {
        window.ashikitCopy(textInp.value, this, 'Copy Ho Gaya!');
      };
    }

    const clearBtn = $('tc-clear');
    if (clearBtn) {
      clearBtn.onclick = () => {
        textInp.value = '';
        textInp.focus();
      };
    }

    const sampleBtn = $('tc-sample');
    if (sampleBtn) {
      sampleBtn.onclick = () => {
        textInp.value = 'ashiKit is a free website for urdu tools and converters. it works fast on mobile phones.';
      };
    }
  });
})();
