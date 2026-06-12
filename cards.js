/* ============================================================
   Category 07 — Cards & content (GSAP + vanilla demos)
   ============================================================ */

/* ---------- 1. Tilt (GSAP) ---------- */
(() => {
  const card = document.getElementById('tiltGsap');
  gsap.set(card, { transformPerspective: 700, transformStyle: 'preserve-3d' });
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(card, { rotationY: px * 22, rotationX: -py * 22, scale: 1.04, duration: 0.4, ease: 'power2.out' });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotationY: 0, rotationX: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
  });
})();

/* ---------- 2. Image zoom (GSAP) ---------- */
(() => {
  const zoom = document.getElementById('zoomGsap');
  const img = document.getElementById('zoomGsapImg');
  const cap = document.getElementById('zoomGsapCap');
  zoom.addEventListener('mouseenter', () => {
    gsap.to(img, { scale: 1.14, duration: 0.5, ease: 'power2.out' });
    gsap.to(cap, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
  });
  zoom.addEventListener('mouseleave', () => {
    gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out' });
    gsap.to(cap, { y: 8, opacity: 0, duration: 0.3, ease: 'power2.in' });
  });
})();

/* ---------- 3a. Read more (plain) ---------- */
(() => {
  const card = document.getElementById('rmCss');
  const btn = card.querySelector('[data-rm]');
  btn.addEventListener('click', () => {
    const open = card.classList.toggle('open');
    btn.textContent = open ? 'Read less ↑' : 'Read more ↓';
  });
})();

/* ---------- 3b. Read more (GSAP) ---------- */
(() => {
  const card = document.getElementById('rmGsap');
  const btn = card.querySelector('[data-rm]');
  const extra = card.querySelector('.rm-extra--gsap');
  btn.addEventListener('click', () => {
    const open = card.classList.toggle('open');
    btn.textContent = open ? 'Read less ↑' : 'Read more ↓';
    gsap.to(extra, { height: open ? 'auto' : 0, opacity: open ? 1 : 0, duration: 0.35, ease: 'power2.out' });
  });
})();

/* ---------- 4a. Flip (plain) ---------- */
document.getElementById('flipCss').addEventListener('click', function () {
  this.classList.toggle('flipped');
});

/* ---------- 4b. Flip (GSAP) ---------- */
(() => {
  const card = document.getElementById('flipGsap');
  gsap.set(card, { transformPerspective: 900, transformStyle: 'preserve-3d' });
  let flipped = false;
  card.addEventListener('click', () => {
    flipped = !flipped;
    gsap.to(card, { rotationY: flipped ? 180 : 0, duration: 0.6, ease: 'power2.inOut' });
    gsap.to(card, { scale: 1.06, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.out' });
  });
})();
