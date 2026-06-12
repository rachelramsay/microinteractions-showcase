/* ============================================================
   Category 02 — Forms & inputs (GSAP + vanilla demos)
   ============================================================ */

/* ---------- 1. Floating label (GSAP) ---------- */
(() => {
  const input = document.getElementById('flGsap');
  const label = input.nextElementSibling;
  const up = { y: -9, scale: 0.78, color: '#6c8cff' };
  input.addEventListener('focus', () => gsap.to(label, { ...up, duration: 0.3, ease: 'back.out(2)' }));
  input.addEventListener('blur', () => {
    if (!input.value) gsap.to(label, { y: 0, scale: 1, color: '#5d6479', duration: 0.25, ease: 'power2.out' });
    else gsap.to(label, { color: '#5d6479', duration: 0.2 });
  });
})();

/* ---------- 2. Inline validation ---------- */
const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function wireValidation(fieldId, shake) {
  const field = document.getElementById(fieldId);
  const input = field.querySelector('input');
  input.addEventListener('input', () => {
    const v = input.value.trim();
    const ok = emailRe.test(v);
    field.classList.toggle('valid', ok);
    field.classList.toggle('invalid', !ok && v.length > 0);
    if (shake && !ok && v.length > 0) {
      gsap.fromTo(field, { x: -6 }, { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
    }
  });
}
wireValidation('valCss', false);
wireValidation('valGsap', true);

/* ---------- 3. Password strength ---------- */
const pwColors = ['#ff6b81', '#ff6b81', '#ffd166', '#6c8cff', '#36d399'];
const pwWords  = ['', 'Weak', 'Fair', 'Good', 'Strong'];

function scorePw(v) {
  if (!v) return 0;
  let s = 0;
  if (v.length >= 8) s++;
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) s++;
  if (/\d/.test(v)) s++;
  if (/[^A-Za-z0-9]/.test(v)) s++;
  return Math.max(1, s);
}

(() => {
  const input = document.getElementById('pwCss');
  const fill = document.getElementById('pwCssFill');
  const label = document.getElementById('pwCssLabel');
  input.addEventListener('input', () => {
    const s = scorePw(input.value);
    fill.style.width = (s / 4 * 100) + '%';
    fill.style.background = pwColors[s];
    label.textContent = pwWords[s];
    label.style.color = s ? pwColors[s] : 'var(--text-faint)';
  });
})();

(() => {
  const input = document.getElementById('pwGsap');
  const fill = document.getElementById('pwGsapFill');
  const label = document.getElementById('pwGsapLabel');
  input.addEventListener('input', () => {
    const s = scorePw(input.value);
    gsap.to(fill, { width: (s / 4 * 100) + '%', backgroundColor: pwColors[s], duration: 0.4, ease: 'power2.out' });
    label.textContent = pwWords[s];
    label.style.color = s ? pwColors[s] : 'var(--text-faint)';
  });
})();

/* ---------- 4. Character counter ---------- */
const LIMIT = 140;

function wireCounter(areaId, countId, punch) {
  const area = document.getElementById(areaId);
  const count = document.getElementById(countId);
  let prev = 0;
  area.addEventListener('input', () => {
    const len = area.value.length;
    count.textContent = len + ' / ' + LIMIT;
    count.classList.toggle('warn', len > 120 && len <= LIMIT);
    count.classList.toggle('over', len > LIMIT);
    if (punch && len > 120 && prev <= 120) {
      gsap.fromTo(count, { scale: 1.5 }, { scale: 1, duration: 0.5, ease: 'back.out(4)' });
    }
    prev = len;
  });
}
wireCounter('ccCss', 'ccCssCount', false);
wireCounter('ccGsap', 'ccGsapCount', true);
