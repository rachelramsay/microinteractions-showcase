/* ============================================================
   Category 08 — Delight (GSAP + vanilla demos)
   ============================================================ */

const confColors = ['#ff6b81', '#b06cff', '#6c8cff', '#36d399', '#ffd166', '#ff9f6b'];

/* ---------- 1a. Cursor follower (plain) ---------- */
(() => {
  const stage = document.getElementById('curCss');
  const dot = stage.querySelector('.follower');
  stage.addEventListener('mousemove', (e) => {
    dot.style.left = e.offsetX + 'px';
    dot.style.top = e.offsetY + 'px';
  });
})();

/* ---------- 1b. Cursor follower (GSAP) ---------- */
(() => {
  const stage = document.getElementById('curGsap');
  const dot = stage.querySelector('.follower');
  const xTo = gsap.quickTo(dot, 'left', { duration: 0.4, ease: 'power3' });
  const yTo = gsap.quickTo(dot, 'top', { duration: 0.4, ease: 'power3' });
  stage.addEventListener('mousemove', (e) => { xTo(e.offsetX); yTo(e.offsetY); });
})();

/* ---------- 2a. Confetti (plain) ---------- */
(() => {
  const stage = document.getElementById('confCss');
  const btn = document.getElementById('confCssBtn');
  btn.addEventListener('click', () => {
    const cx = stage.clientWidth / 2;
    const cy = stage.clientHeight / 2;
    for (let i = 0; i < 26; i++) {
      const p = document.createElement('span');
      p.className = 'confetti';
      p.style.background = confColors[i % confColors.length];
      p.style.left = cx + 'px';
      p.style.top = cy + 'px';
      stage.appendChild(p);
      const rx = (Math.random() - 0.5) * 260;
      const ry = (Math.random() - 0.5) * 200 - 30;
      const rot = (Math.random() - 0.5) * 720;
      p.style.transition = 'transform 1s cubic-bezier(.2,.7,.4,1), opacity 1s ease';
      requestAnimationFrame(() => {
        p.style.transform = `translate(${rx}px, ${ry}px) rotate(${rot}deg)`;
        p.style.opacity = '0';
      });
      setTimeout(() => p.remove(), 1100);
    }
  });
})();

/* ---------- 2b. Confetti (GSAP) ---------- */
(() => {
  const stage = document.getElementById('confGsap');
  const btn = document.getElementById('confGsapBtn');
  btn.addEventListener('click', () => {
    const cx = stage.clientWidth / 2;
    const cy = stage.clientHeight / 2;
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('span');
      p.className = 'confetti';
      p.style.background = confColors[i % confColors.length];
      p.style.left = cx + 'px';
      p.style.top = cy + 'px';
      stage.appendChild(p);
      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 110;
      gsap.timeline({ onComplete: () => p.remove() })
        .to(p, { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist - 40, rotation: (Math.random() - 0.5) * 720, duration: 0.5, ease: 'power2.out' })
        .to(p, { y: '+=160', opacity: 0, duration: 0.7 + Math.random() * 0.5, ease: 'power1.in' });
    }
  });
})();

/* ---------- 3. Magnetic button (GSAP) ---------- */
(() => {
  const btn = document.getElementById('magGsap');
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    gsap.to(btn, {
      x: (e.clientX - r.left - r.width / 2) * 0.4,
      y: (e.clientY - r.top - r.height / 2) * 0.4,
      duration: 0.4, ease: 'power2.out'
    });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
  });
})();

/* ---------- 4. Empty state (GSAP) ---------- */
(() => {
  const wrap = document.getElementById('emptyGsap');
  const icon = wrap.querySelector('.glyph-box');
  const title = wrap.querySelector('.et');
  const sub = wrap.querySelector('.es');
  if (window.prefersReduced) return; // skip entrance + perpetual float
  gsap.from([icon, title, sub], { opacity: 0, y: 12, stagger: 0.12, duration: 0.5, ease: 'power2.out' });
  gsap.to(icon, { y: -9, repeat: -1, yoyo: true, duration: 1.3, ease: 'sine.inOut' });
})();
