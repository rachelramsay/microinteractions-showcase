/* ============================================================
   Category 04 — Loading & progress (GSAP + vanilla demos)
   ============================================================ */

const skeletonHTML = `
  <div class="skeleton">
    <div class="sk-avatar shimmer"></div>
    <div class="sk-lines">
      <div class="sk-line shimmer"></div>
      <div class="sk-line short shimmer"></div>
    </div>
  </div>`;

const loadedHTML = `
  <div class="loaded">
    <div class="ld-avatar"></div>
    <div class="ld-lines">
      <div class="ld-title">Ada Lovelace</div>
      <div class="ld-sub">Posted a new update · 2m ago</div>
    </div>
  </div>`;

/* ---------- 1a. Skeleton (plain) ---------- */
(() => {
  const area = document.getElementById('skCss');
  const btn = document.getElementById('skCssBtn');
  const run = () => {
    area.innerHTML = skeletonHTML;
    setTimeout(() => {
      area.innerHTML = loadedHTML;
      const card = area.firstElementChild;
      card.style.transition = 'opacity .4s ease';
      card.style.opacity = '0';
      requestAnimationFrame(() => { card.style.opacity = '1'; });
    }, 1600);
  };
  btn.addEventListener('click', run);
  run();
})();

/* ---------- 1b. Skeleton (GSAP) ---------- */
(() => {
  const area = document.getElementById('skGsap');
  const btn = document.getElementById('skGsapBtn');
  const run = () => {
    area.innerHTML = skeletonHTML;
    const sk = area.firstElementChild;
    setTimeout(() => {
      gsap.timeline()
        .to(sk, { opacity: 0, duration: 0.3, onComplete: () => { area.innerHTML = loadedHTML; } })
        .from('#skGsap .loaded > *', { opacity: 0, y: 10, stagger: 0.1, duration: 0.4, ease: 'power2.out' });
    }, 1600);
  };
  btn.addEventListener('click', run);
  run();
})();

/* ---------- 2a. Progress (plain) ---------- */
(() => {
  const fill = document.getElementById('pgCssFill');
  const pct = document.getElementById('pgCssPct');
  const btn = document.getElementById('pgCssBtn');
  let id;
  btn.addEventListener('click', () => {
    clearInterval(id);
    let p = 0;
    fill.style.width = '0%'; pct.textContent = '0%';
    id = setInterval(() => {
      p = Math.min(100, p + Math.random() * 18);
      fill.style.width = p + '%';
      pct.textContent = Math.round(p) + '%';
      if (p >= 100) clearInterval(id);
    }, 250);
  });
})();

/* ---------- 2b. Progress (GSAP) ---------- */
(() => {
  const fill = document.getElementById('pgGsapFill');
  const pct = document.getElementById('pgGsapPct');
  const btn = document.getElementById('pgGsapBtn');
  btn.addEventListener('click', () => {
    const o = { p: 0 };
    gsap.killTweensOf(o);
    gsap.set(fill, { width: '0%' });
    gsap.to(o, {
      p: 100, duration: 2.4, ease: 'power1.inOut',
      onUpdate() {
        fill.style.width = o.p + '%';
        pct.textContent = Math.round(o.p) + '%';
      }
    });
  });
})();

/* ---------- 3. Spinner (GSAP) ---------- */
(() => {
  const svg = document.getElementById('spinGsap');
  const circle = svg.querySelector('circle');
  if (window.prefersReduced) { circle.style.strokeDasharray = '90 200'; return; } // static arc
  gsap.to(svg, { rotation: 360, repeat: -1, duration: 1, ease: 'none', transformOrigin: 'center' });
  gsap.fromTo(circle,
    { strokeDasharray: '1 200', strokeDashoffset: 0 },
    { strokeDasharray: '90 200', strokeDashoffset: -35, repeat: -1, yoyo: true, duration: 0.8, ease: 'power1.inOut' });
})();

/* ---------- 4a. Counter (plain) ---------- */
(() => {
  const el = document.getElementById('countCss');
  const btn = document.getElementById('countCssBtn');
  const target = 2847;
  btn.addEventListener('click', () => {
    const start = performance.now();
    function tick(now) {
      let t = Math.min(1, (now - start) / 1800);
      t = 1 - Math.pow(1 - t, 3); // easeOutCubic
      el.textContent = Math.round(t * target).toLocaleString();
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
})();

/* ---------- 4b. Counter (GSAP) ---------- */
(() => {
  const el = document.getElementById('countGsap');
  const btn = document.getElementById('countGsapBtn');
  btn.addEventListener('click', () => {
    const o = { v: 0 };
    gsap.killTweensOf(o);
    gsap.to(o, {
      v: 2847, duration: 1.8, ease: 'power3.out', snap: { v: 1 },
      onUpdate: () => { el.textContent = o.v.toLocaleString(); }
    });
  });
})();
