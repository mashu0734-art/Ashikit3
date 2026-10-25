/**
 * AshiKit - Age Calculator Tool
 */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);

  document.addEventListener('DOMContentLoaded', () => {
    const dobInp = $('dob');
    const asofInp = $('asof');
    const btnCalc = $('age-calc');
    const resEl = $('age-res');
    if (!dobInp || !btnCalc) return;

    // Default as of date to today
    const today = new Date().toISOString().split('T')[0];
    if (asofInp && !asofInp.value) asofInp.value = today;

    function getZodiac(m, d) {
      const signs = [
        ['Capricorn (جدی)', 20], ['Aquarius (دلو)', 19], ['Pisces (حوت)', 21],
        ['Aries (حمل)', 20], ['Taurus (ثور)', 21], ['Gemini (جوزا)', 21],
        ['Cancer (سرطان)', 23], ['Leo (اسد)', 23], ['Virgo (سنبلہ)', 23],
        ['Libra (میزان)', 23], ['Scorpio (عقرب)', 22], ['Sagittarius (قوس)', 22],
        ['Capricorn (جدی)', 31]
      ];
      return d < signs[m - 1][1] ? signs[m - 1][0] : signs[m][0];
    }

    btnCalc.onclick = () => {
      const dobVal = dobInp.value;
      if (!dobVal) {
        resEl.innerHTML = '<span style="color:var(--danger);">Barae meherbani apni tareekh-e-paidaish (Date of Birth) chunein.</span>';
        return;
      }

      const dob = new Date(dobVal);
      const asof = new Date(asofInp && asofInp.value ? asofInp.value : today);

      if (dob > asof) {
        resEl.innerHTML = '<span style="color:var(--danger);">Paidaish ki tareekh aaj ki tareekh se aagay nahi ho sakti.</span>';
        return;
      }

      let y = asof.getFullYear() - dob.getFullYear();
      let m = asof.getMonth() - dob.getMonth();
      let d = asof.getDate() - dob.getDate();

      if (d < 0) {
        m--;
        const prevMonthDays = new Date(asof.getFullYear(), asof.getMonth(), 0).getDate();
        d += prevMonthDays;
      }
      if (m < 0) {
        y--;
        m += 12;
      }

      const diffMs = asof.getTime() - dob.getTime();
      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const totalWeeks = Math.floor(totalDays / 7);
      const totalHours = Math.floor(diffMs / (1000 * 60 * 60));

      // Next Birthday
      let nextBday = new Date(asof.getFullYear(), dob.getMonth(), dob.getDate());
      if (nextBday < asof) {
        nextBday = new Date(asof.getFullYear() + 1, dob.getMonth(), dob.getDate());
      }
      const daysToNext = Math.ceil((nextBday - asof) / (1000 * 60 * 60 * 24));
      const nextDayName = ['Itwar', 'Peer', 'Mangal', 'Budh', 'Jumeraat', 'Juma', 'Hafta'][nextBday.getDay()];

      const zodiac = getZodiac(dob.getMonth() + 1, dob.getDate());

      resEl.innerHTML = `
        <div style="background:var(--accent-soft); padding:16px; border-radius:10px; border:1px solid var(--accent); margin-bottom:16px;">
          <div style="font-size:13px; color:var(--muted); font-weight:700; text-transform:uppercase;">Aap Ki Kul Umar</div>
          <div style="font-size:26px; font-weight:800; color:var(--ink); margin:4px 0;">
            ${y} Saal, ${m} Mahine, ${d} Din
          </div>
          <div style="font-size:14.5px; color:var(--muted);">
            Agli saalgirah mein <b>${daysToNext} din</b> baaqi hain (${nextDayName} ke roz).
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:10px; text-align:center;">
          <div style="background:var(--panel-alt); padding:12px; border-radius:8px; border:1px solid var(--line);">
            <div style="font-size:12px; color:var(--muted);">Kul Mahine</div>
            <div style="font-size:18px; font-weight:800;">${((y * 12) + m).toLocaleString('en-PK')}</div>
          </div>
          <div style="background:var(--panel-alt); padding:12px; border-radius:8px; border:1px solid var(--line);">
            <div style="font-size:12px; color:var(--muted);">Kul Hafte</div>
            <div style="font-size:18px; font-weight:800;">${totalWeeks.toLocaleString('en-PK')}</div>
          </div>
          <div style="background:var(--panel-alt); padding:12px; border-radius:8px; border:1px solid var(--line);">
            <div style="font-size:12px; color:var(--muted);">Kul Din</div>
            <div style="font-size:18px; font-weight:800;">${totalDays.toLocaleString('en-PK')}</div>
          </div>
          <div style="background:var(--panel-alt); padding:12px; border-radius:8px; border:1px solid var(--line);">
            <div style="font-size:12px; color:var(--muted);">Burj (Star)</div>
            <div style="font-size:15px; font-weight:700; color:var(--accent);">${zodiac}</div>
          </div>
        </div>
      `;
    };
  });
})();
