/* ============================================================
   Category 01 — Buttons & clicks (GSAP + vanilla demos)
   ============================================================ */

/* ---------- 1. Hover (GSAP) ---------- */
(() => {
  const b = document.getElementById('hoverGsap');
  const enter = () => gsap.to(b, { y: -4, scale: 1.04, boxShadow: '0 14px 28px -8px rgba(108,140,255,0.7)', duration: .35, ease: 'back.out(2)' });
  const leave = () => gsap.to(b, { y: 0, scale: 1, boxShadow: '0 0 0 rgba(0,0,0,0)', duration: .4, ease: 'power3.out' });
  b.addEventListener('mouseenter', enter);
  b.addEventListener('mouseleave', leave);
  b.addEventListener('mousedown', () => gsap.to(b, { scale: .95, duration: .12 }));
  b.addEventListener('mouseup', enter);
})();

/* ---------- 2. Ripple ---------- */
function makeRipple(e, btn) {
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const span = document.createElement('span');
  span.className = 'ripple';
  span.style.width = span.style.height = size + 'px';
  span.style.left = (e.clientX - rect.left - size / 2) + 'px';
  span.style.top  = (e.clientY - rect.top  - size / 2) + 'px';
  btn.appendChild(span);
  return span;
}
document.getElementById('rippleCss').addEventListener('click', function (e) {
  const r = makeRipple(e, this);
  r.classList.add('ripple--css');
  r.addEventListener('animationend', () => r.remove());
});
document.getElementById('rippleGsap').addEventListener('click', function (e) {
  const r = makeRipple(e, this);
  gsap.fromTo(r, { scale: 0, opacity: .55 },
    { scale: 2.6, opacity: 0, duration: .7, ease: 'power2.out', onComplete: () => r.remove() });
});

/* ---------- 3. Loading ---------- */
const check = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px"><polyline points="20 6 9 17 4 12"/></svg>';

document.getElementById('loadCss').addEventListener('click', function () {
  if (this.dataset.busy) return;
  this.dataset.busy = 1;
  const label = this.querySelector('.label');
  label.innerHTML = '<span class="spinner spinner--css"></span>';
  setTimeout(() => {
    this.classList.add('is-success');
    label.innerHTML = check + ' Saved';
    setTimeout(() => {
      this.classList.remove('is-success');
      label.textContent = 'Save changes';
      delete this.dataset.busy;
    }, 1400);
  }, 1500);
});

document.getElementById('loadGsap').addEventListener('click', function () {
  if (this.dataset.busy) return;
  this.dataset.busy = 1;
  const label = this.querySelector('.label');
  const tl = gsap.timeline();
  tl.to(label, { y: -8, opacity: 0, duration: .2, onComplete: () => {
      label.innerHTML = '<span class="spinner"></span>';
      gsap.to(label.querySelector('.spinner'), { rotation: 360, repeat: 3, duration: .7, ease: 'none' });
    }})
    .to(label, { y: 0, opacity: 1, duration: .2 })
    .to({}, { duration: 1.6 })
    .to(label, { y: -8, opacity: 0, duration: .2, onComplete: () => {
        this.classList.add('is-success');
        label.innerHTML = check + ' Saved';
      }})
    .to(label, { y: 0, opacity: 1, scale: 1, duration: .3, ease: 'back.out(2.5)' })
    .to({}, { duration: 1.2 })
    .to(label, { opacity: 0, duration: .2, onComplete: () => {
        this.classList.remove('is-success');
        label.textContent = 'Save changes';
        delete this.dataset.busy;
      }})
    .to(label, { opacity: 1, duration: .2 });
});

/* ---------- 4. Copy ---------- */
function copy(text) {
  if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
}
document.getElementById('copyCss').addEventListener('click', function () {
  copy('npm install gsap');
  const msg = document.getElementById('copyCssMsg');
  msg.style.transition = 'opacity .3s';
  msg.style.opacity = 1;
  msg.textContent = '✓ Copied!';
  clearTimeout(msg._t);
  msg._t = setTimeout(() => { msg.style.opacity = 0; }, 1300);
});
document.getElementById('copyGsap').addEventListener('click', function () {
  copy('npm install gsap');
  const msg = document.getElementById('copyGsapMsg');
  msg.textContent = '✓ Copied!';
  gsap.killTweensOf(msg);
  gsap.fromTo(msg, { y: 10, opacity: 0, scale: .8 },
    { y: 0, opacity: 1, scale: 1, duration: .4, ease: 'back.out(3)' });
  gsap.to(msg, { y: -10, opacity: 0, duration: .3, delay: 1.2, ease: 'power2.in' });
});

/* ---------- 5. Heart ---------- */
const colors = ['#ff6b81', '#b06cff', '#6c8cff', '#36d399', '#ffd166'];

document.getElementById('heartCss').addEventListener('click', function () {
  this.classList.toggle('is-liked');
  const svg = this.querySelector('svg');
  svg.style.animation = 'none';
  void svg.offsetWidth;
  svg.style.animation = '';
});

document.getElementById('heartGsap').addEventListener('click', function () {
  const liked = this.classList.toggle('is-liked');
  const svg = this.querySelector('svg');
  gsap.fromTo(svg, { scale: 1 },
    { scale: 1.4, duration: .18, yoyo: true, repeat: 1, ease: 'power2.out' });
  if (!liked) return;
  for (let i = 0; i < 10; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.style.background = colors[i % colors.length];
    p.style.left = '50%'; p.style.top = '50%';
    this.appendChild(p);
    const ang = (Math.PI * 2 * i) / 10;
    gsap.fromTo(p, { x: -3.5, y: -3.5, scale: 1, opacity: 1 },
      { x: Math.cos(ang) * 38 - 3.5, y: Math.sin(ang) * 38 - 3.5,
        scale: 0, opacity: 0, duration: .6, ease: 'power2.out',
        onComplete: () => p.remove() });
  }
});
