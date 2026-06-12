/* ============================================================
   Category 05 — Notifications (GSAP + vanilla demos)
   ============================================================ */

const toastInner = '<span class="tdot"></span> Changes saved';

/* ---------- 1a. Toast (plain) ---------- */
(() => {
  const stage = document.getElementById('toastCssStage');
  const btn = document.getElementById('toastCssBtn');
  let active;
  btn.addEventListener('click', () => {
    if (active) active.remove();
    const t = document.createElement('div');
    t.className = 'toast toast--css';
    t.innerHTML = toastInner;
    stage.appendChild(t);
    active = t;
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => {
      t.classList.remove('show');
      t.addEventListener('transitionend', () => t.remove(), { once: true });
    }, 2500);
  });
})();

/* ---------- 1b. Toast (GSAP) ---------- */
(() => {
  const stage = document.getElementById('toastGsapStage');
  const btn = document.getElementById('toastGsapBtn');
  btn.addEventListener('click', () => {
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = toastInner;
    stage.appendChild(t);
    gsap.timeline()
      .from(t, { y: 90, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' })
      .to(t, { y: 90, opacity: 0, duration: 0.35, delay: 2.2, ease: 'power2.in', onComplete: () => t.remove() });
  });
})();

/* ---------- 2a. Badge (plain) ---------- */
(() => {
  const badge = document.getElementById('badgeCss');
  const btn = document.getElementById('badgeCssBtn');
  let count = 1;
  btn.addEventListener('click', () => {
    badge.textContent = ++count;
    badge.classList.remove('pop');
    void badge.offsetWidth;
    badge.classList.add('pop');
  });
})();

/* ---------- 2b. Badge (GSAP) ---------- */
(() => {
  const badge = document.getElementById('badgeGsap');
  const bell = document.getElementById('bellGsap');
  const btn = document.getElementById('badgeGsapBtn');
  let count = 1;
  btn.addEventListener('click', () => {
    badge.textContent = ++count;
    gsap.fromTo(badge, { scale: 1.6 }, { scale: 1, duration: 0.5, ease: 'back.out(4)' });
    gsap.fromTo(bell, { rotation: -14 }, { rotation: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)', transformOrigin: 'top center' });
  });
})();

/* ---------- 3. Tooltip (GSAP) ---------- */
(() => {
  const wrap = document.getElementById('tipGsapWrap');
  const tip = document.getElementById('tipGsap');
  gsap.set(tip, { y: 6 });
  wrap.addEventListener('mouseenter', () => gsap.to(tip, { opacity: 1, y: 0, duration: 0.3, ease: 'back.out(3)' }));
  wrap.addEventListener('mouseleave', () => gsap.to(tip, { opacity: 0, y: 6, duration: 0.18, ease: 'power2.in' }));
})();

/* ---------- 4. Modal ---------- */
function wireModal(btnId, modalId, gsapAnim) {
  const btn = document.getElementById(btnId);
  const modal = document.getElementById(modalId);
  const dialog = modal.querySelector('.dialog');

  const open = () => {
    modal.hidden = false;
    if (gsapAnim) {
      gsap.timeline()
        .to(modal, { opacity: 1, duration: 0.25 })
        .from(dialog, { scale: 0.9, y: 20, opacity: 0, duration: 0.4, ease: 'back.out(1.7)' }, '<');
    } else {
      requestAnimationFrame(() => modal.classList.add('open'));
    }
  };
  const close = () => {
    if (gsapAnim) {
      gsap.to(modal, { opacity: 0, duration: 0.2, onComplete: () => { modal.hidden = true; } });
    } else {
      modal.classList.remove('open');
      modal.addEventListener('transitionend', () => { modal.hidden = true; }, { once: true });
    }
  };

  btn.addEventListener('click', open);
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.hasAttribute('data-close')) close();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) close(); });
}
if (gsap) gsap.set('#modalGsap', { opacity: 0 });
wireModal('modalCssBtn', 'modalCss', false);
wireModal('modalGsapBtn', 'modalGsap', true);
