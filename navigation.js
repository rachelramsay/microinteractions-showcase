/* ============================================================
   Category 06 — Navigation & scroll (GSAP + vanilla demos)
   ============================================================ */

/* ---------- 1a. Hamburger (plain) ---------- */
document.getElementById('hamCss').addEventListener('click', function () {
  this.classList.toggle('open');
});

/* ---------- 1b. Hamburger (GSAP) ---------- */
(() => {
  const ham = document.getElementById('hamGsap');
  const [ln1, ln2, ln3] = ham.querySelectorAll('.ln');
  const tl = gsap.timeline({ paused: true, defaults: { duration: 0.3, ease: 'power2.inOut' } })
    .to(ln1, { y: 0, rotate: 45 }, 0)
    .to(ln2, { opacity: 0 }, 0)
    .to(ln3, { y: 0, rotate: -45 }, 0);
  let open = false;
  ham.addEventListener('click', () => { open = !open; open ? tl.play() : tl.reverse(); });
})();

/* ---------- 2a. Sticky shrink (plain) ---------- */
(() => {
  const box = document.getElementById('shrinkCss');
  const header = box.querySelector('.mini-header');
  box.addEventListener('scroll', () => {
    header.classList.toggle('shrink', box.scrollTop > 20);
  });
})();

/* ---------- 2b. Sticky shrink (GSAP) ---------- */
(() => {
  const box = document.getElementById('shrinkGsap');
  const header = document.getElementById('shrinkGsapHead');
  let small = false;
  box.addEventListener('scroll', () => {
    const next = box.scrollTop > 20;
    if (next === small) return;
    small = next;
    gsap.to(header, {
      paddingTop: small ? 9 : 18, paddingBottom: small ? 9 : 18,
      fontSize: small ? 14 : 18,
      boxShadow: small ? '0 6px 14px -8px rgba(0,0,0,0.6)' : '0 0 0 rgba(0,0,0,0)',
      duration: 0.3, ease: 'power2.out'
    });
  });
})();

/* ---------- 3a. Scroll progress (plain) ---------- */
(() => {
  const box = document.getElementById('progCss');
  const fill = document.getElementById('progCssFill');
  box.addEventListener('scroll', () => {
    const max = box.scrollHeight - box.clientHeight;
    fill.style.width = (max ? box.scrollTop / max * 100 : 0) + '%';
  });
})();

/* ---------- 3b. Scroll progress (GSAP quickTo) ---------- */
(() => {
  const box = document.getElementById('progGsap');
  const fill = document.getElementById('progGsapFill');
  const set = gsap.quickTo(fill, 'width', { duration: 0.3, ease: 'power3' });
  box.addEventListener('scroll', () => {
    const max = box.scrollHeight - box.clientHeight;
    set((max ? box.scrollTop / max * 100 : 0) + '%');
  });
})();

/* ---------- 4a. Accordion (plain) ---------- */
(() => {
  const acc = document.getElementById('accCss');
  acc.querySelectorAll('.acc-head').forEach((head) => {
    head.addEventListener('click', () => {
      head.closest('.acc-item').classList.toggle('open');
    });
  });
})();

/* ---------- 4b. Accordion (GSAP) ---------- */
(() => {
  const acc = document.getElementById('accGsap');
  acc.querySelectorAll('.acc-item').forEach((item) => {
    const head = item.querySelector('.acc-head');
    const panel = item.querySelector('.acc-panel--gsap');
    head.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      gsap.to(panel, {
        height: open ? 'auto' : 0,
        duration: open ? 0.35 : 0.3,
        ease: open ? 'power2.out' : 'power2.in'
      });
    });
  });
})();
