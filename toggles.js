/* ============================================================
   Category 03 — Toggles & selection (GSAP + vanilla demos)
   ============================================================ */

/* ---------- 1. Switch (GSAP) ---------- */
(() => {
  const sw = document.getElementById('switchGsap');
  const knob = sw.querySelector('.knob');
  let on = false;
  const flip = () => {
    on = !on;
    sw.setAttribute('aria-checked', String(on));
    sw.classList.toggle('on', on); // CSS drives the track colour (theme-aware)
    gsap.to(knob, { x: on ? 24 : 0, duration: 0.35, ease: 'back.out(2)' });
  };
  sw.addEventListener('click', flip);
  sw.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
  });
})();

/* ---------- 2. Checkbox draw-in (GSAP) ---------- */
(() => {
  const wrap = document.getElementById('checkGsap');
  const input = wrap.querySelector('input');
  const box = wrap.querySelector('.box');
  const path = wrap.querySelector('path');
  gsap.set(path, { strokeDasharray: 24, strokeDashoffset: 24 });
  input.addEventListener('change', () => {
    // CSS (:checked) drives the box fill/border colour so it stays theme-aware;
    // GSAP handles the scale pop and the checkmark stroke draw.
    if (input.checked) {
      gsap.timeline()
        .to(box, { scale: 0.85, duration: 0.1 })
        .to(box, { scale: 1, duration: 0.35, ease: 'back.out(3)' })
        .to(path, { strokeDashoffset: 0, duration: 0.3, ease: 'power2.out' }, '<');
    } else {
      gsap.to(path, { strokeDashoffset: 24, duration: 0.2 });
    }
  });
})();

/* ---------- 3. Star rating ---------- */
function wireStars(containerId, pop) {
  const container = document.getElementById(containerId);
  const stars = Array.from(container.children);
  const label = document.getElementById(container.dataset.label);
  const words = ['', 'Hated it', 'Meh', 'It’s ok', 'Liked it', 'Loved it!'];
  let rating = 0;

  const light = (n) => stars.forEach((s, i) => s.classList.toggle('lit', i < n));

  stars.forEach((s, i) => {
    s.addEventListener('mouseenter', () => { light(i + 1); label.textContent = words[i + 1]; });
    s.addEventListener('click', () => {
      rating = i + 1;
      light(rating);
      label.textContent = words[rating];
      if (pop) {
        gsap.fromTo(stars.slice(0, rating),
          { scale: 0.5 },
          { scale: 1, duration: 0.4, stagger: 0.06, ease: 'back.out(4)' });
      }
    });
  });
  container.addEventListener('mouseleave', () => {
    light(rating);
    label.textContent = rating ? words[rating] : 'Rate it';
  });
}
wireStars('starsCss', false);
wireStars('starsGsap', true);

/* ---------- 4. Segmented control ---------- */
function wireSegment(segId, elastic) {
  const seg = document.getElementById(segId);
  const ind = seg.querySelector('.seg-ind');
  const btns = Array.from(seg.querySelectorAll('button'));

  const move = (btn, animate) => {
    btns.forEach((b) => b.classList.toggle('active', b === btn));
    if (elastic && animate) {
      gsap.to(ind, { width: btn.offsetWidth, x: btn.offsetLeft - 4, duration: 0.5, ease: 'elastic.out(1, 0.6)' });
    } else if (elastic) {
      gsap.set(ind, { width: btn.offsetWidth, x: btn.offsetLeft - 4 });
    } else {
      ind.style.width = btn.offsetWidth + 'px';
      ind.style.transform = `translateX(${btn.offsetLeft - 4}px)`;
    }
  };

  btns.forEach((b) => b.addEventListener('click', () => move(b, true)));
  // initial position (no animation)
  move(btns[0], false);
  window.addEventListener('resize', () => move(seg.querySelector('.active'), false));
}
wireSegment('segCss', false);
wireSegment('segGsap', true);
