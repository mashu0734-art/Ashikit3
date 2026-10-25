/**
 * AshiKit - Urdu Number to Words Converter (0 to 9,999,999)
 */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);

  const U_1_99 = {
    0: 'صفر', 1: 'ایک', 2: 'دو', 3: 'تین', 4: 'چار', 5: 'پانچ', 6: 'چھ', 7: 'سات', 8: 'آٹھ', 9: 'نو', 10: 'دس',
    11: 'گیارہ', 12: 'بارہ', 13: 'تیرہ', 14: 'چودہ', 15: 'پندرہ', 16: 'سولہ', 17: 'سترہ', 18: 'اٹھارہ', 19: 'انیس', 20: 'بیس',
    21: 'اکیس', 22: 'بائیس', 23: 'تیئیس', 24: 'چوبیس', 25: 'پچیس', 26: 'چھبیس', 27: 'ستائیس', 28: 'اٹَھائیس', 29: 'انتیس', 30: 'تیس',
    31: 'اکتیس', 32: 'بتیس', 33: 'تینتیس', 34: 'چونتیس', 35: 'پینتیس', 36: 'چھتیس', 37: 'سینتیس', 38: 'اڑتیس', 39: 'انتالیس', 40: 'چالیس',
    41: 'اکتالیس', 42: 'بیالیس', 43: 'تینتالیس', 44: 'چوالیس', 45: 'پینتالیس', 46: 'چھیاسٹھ', 47: 'سینتالیس', 48: 'اڑتالیس', 49: 'انچاس', 50: 'پچاس',
    51: 'اکیاون', 52: 'باون', 53: 'ترپن', 54: 'چون', 55: 'پچپن', 56: 'چھپن', 57: 'ستاون', 58: 'اٹھاون', 59: 'انسٹھ', 60: 'ساٹھ',
    61: 'اکسٹھ', 62: 'باسٹھ', 63: 'تریسٹھ', 64: 'چونسٹھ', 65: 'پینسٹھ', 66: 'چھیاسٹھ', 67: 'سڑسٹھ', 68: 'اڑسٹھ', 69: 'انتر', 70: 'ستر',
    71: 'اکہتر', 72: 'بہتر', 73: 'تہتر', 74: 'چوہتر', 75: 'پچہتر', 76: 'چھہتر', 77: 'ستتر', 78: 'اٹھتر', 79: 'اناسی', 80: 'اسی',
    81: 'اکیاسی', 82: 'بیاسی', 83: 'تراسی', 84: 'چوراسی', 85: 'پچاسی', 86: 'چھیاسی', 87: 'ستاسی', 88: 'اٹَھاسی', 89: 'نواسی', 90: 'نوے',
    91: 'اکانوے', 92: 'بانوے', 93: 'ترانوے', 94: 'چورانوے', 95: 'پچانوے', 96: 'چھیانوے', 97: 'ستانوے', 98: 'اٹھانوے', 99: 'ننانوے'
  };

  const R_1_99 = {
    0: 'Sifar', 1: 'Aik', 2: 'Do', 3: 'Teen', 4: 'Chaar', 5: 'Paanch', 6: 'Chhe', 7: 'Saat', 8: 'Aath', 9: 'Nau', 10: 'Dus',
    11: 'Gyarah', 12: 'Barah', 13: 'Terah', 14: 'Chaudah', 15: 'Pandrah', 16: 'Solah', 17: 'Satrah', 18: 'Atharah', 19: 'Unnees', 20: 'Bees',
    21: 'Ikkis', 22: 'Baais', 23: 'Teis', 24: 'Chaubees', 25: 'Pachees', 26: 'Chhabees', 27: 'Sattais', 28: 'Athais', 29: 'Untees', 30: 'Tees',
    31: 'Iktees', 32: 'Battees', 33: 'Taintees', 34: 'Chauntees', 35: 'Paintees', 36: 'Chhatees', 37: 'Saintees', 38: 'Adhtees', 39: 'Untalees', 40: 'Chalees',
    41: 'Iktalees', 42: 'Byalees', 43: 'Taintalees', 44: 'Chawalees', 45: 'Paintalees', 46: 'Chhyalees', 47: 'Saintalees', 48: 'Adhtalees', 49: 'Unchaas', 50: 'Pachaas',
    51: 'Ikyawan', 52: 'Baawan', 53: 'Tirpan', 54: 'Chauwan', 55: 'Pachpan', 56: 'Chhappan', 57: 'Sattawan', 58: 'Athawan', 59: 'Unsath', 60: 'Saath',
    61: 'Iksath', 62: 'Baasath', 63: 'Tirasath', 64: 'Chaunsath', 65: 'Painsath', 66: 'Chhyasath', 67: 'Sadsath', 68: 'Adhsath', 69: 'Unhattar', 70: 'Sattar',
    71: 'Ikhattar', 72: 'Bahattar', 73: 'Tihattar', 74: 'Chauhattar', 75: 'Pachhattar', 76: 'Chhihattar', 77: 'Sathattar', 78: 'Athhattar', 79: 'Unasi', 80: 'Assi',
    81: 'Ikyasi', 82: 'Byasi', 83: 'Tirasi', 84: 'Chaurasi', 85: 'Pachasi', 86: 'Chhyasi', 87: 'Satasi', 88: 'Athasi', 89: 'Nawasi', 90: 'Naway',
    91: 'Ikanway', 92: 'Baanway', 93: 'Tiranway', 94: 'Chauranway', 95: 'Pachanway', 96: 'Chhyanway', 97: 'Satanway', 98: 'Athanway', 99: 'Ninnanway'
  };

  function toUrduWords(num) {
    if (num === 0) return U_1_99[0];
    let parts = [];

    // Lakh (100,000)
    const lakh = Math.floor(num / 100000);
    num %= 100000;
    if (lakh > 0) {
      parts.push(U_1_99[lakh] + ' لاکھ');
    }

    // Hazar (1,000)
    const hazar = Math.floor(num / 1000);
    num %= 1000;
    if (hazar > 0) {
      parts.push(U_1_99[hazar] + ' ہزار');
    }

    // Sau (100)
    const sau = Math.floor(num / 100);
    num %= 100;
    if (sau > 0) {
      parts.push(U_1_99[sau] + ' سو');
    }

    // 1-99
    if (num > 0) {
      parts.push(U_1_99[num]);
    }

    return parts.join(' ');
  }

  function toRomanWords(num) {
    if (num === 0) return R_1_99[0];
    let parts = [];

    const lakh = Math.floor(num / 100000);
    num %= 100000;
    if (lakh > 0) {
      parts.push(R_1_99[lakh] + ' Lakh');
    }

    const hazar = Math.floor(num / 1000);
    num %= 1000;
    if (hazar > 0) {
      parts.push(R_1_99[hazar] + ' Hazar');
    }

    const sau = Math.floor(num / 100);
    num %= 100;
    if (sau > 0) {
      parts.push(R_1_99[sau] + ' Sau');
    }

    if (num > 0) {
      parts.push(R_1_99[num]);
    }

    return parts.join(' ');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const inp = $('num-inp');
    const outUrdu = $('num-urdu');
    const outRoman = $('num-roman');
    const chkCurrency = $('num-currency');
    const btnCopy = $('num-copy');
    if (!inp || !outUrdu) return;

    function convert() {
      const val = parseInt(inp.value, 10);
      if (isNaN(val) || val < 0 || val > 9999999) {
        outUrdu.textContent = '0 se 9,999,999 tak koi number likhein.';
        if (outRoman) outRoman.textContent = '';
        return;
      }

      let urdu = toUrduWords(val);
      let roman = toRomanWords(val);

      if (chkCurrency && chkCurrency.checked) {
        urdu += ' روپے فقط';
        roman += ' Rupees Only';
      }

      outUrdu.textContent = urdu;
      if (outRoman) outRoman.textContent = roman;
    }

    inp.addEventListener('input', convert);
    if (chkCurrency) chkCurrency.addEventListener('change', convert);

    document.querySelectorAll('.num-preset').forEach(btn => {
      btn.onclick = () => {
        inp.value = btn.dataset.val;
        convert();
      };
    });

    if (btnCopy) {
      btnCopy.onclick = function () {
        window.ashikitCopy(outUrdu.textContent, this, 'Copy Ho Gaya!');
      };
    }

    convert();
  });
})();
