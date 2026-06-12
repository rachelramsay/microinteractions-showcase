/* ============================================================
   Shared app behaviour: mobile nav + view-code toggles
   ============================================================ */
window.prefersReduced =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Mobile sidebar ---------- */
function initNav() {
  const sidebar = document.querySelector('.sidebar');
  const menuBtn = document.querySelector('.menu-btn');
  const scrim = document.querySelector('.scrim');
  if (!sidebar || !menuBtn) return;
  const toggle = (open) => {
    sidebar.classList.toggle('open', open);
    if (scrim) scrim.hidden = !open;
  };
  menuBtn.addEventListener('click', () => toggle(!sidebar.classList.contains('open')));
  if (scrim) scrim.addEventListener('click', () => toggle(false));
}

/* ---------- View-code toggles ----------
   Markup contract: a .demo contains a button.code-toggle and a
   sibling .code-panel[hidden]. Clicking flips both.                */
function initCodeToggles() {
  document.querySelectorAll('.code-toggle').forEach((btn) => {
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
      btn.querySelector('.txt').textContent = open ? 'View code' : 'Hide code';
    });
  });
}

/* ---------- Theme toggle (light / dark) ----------
   The no-FOUC inline script in each page's <head> applies the saved
   theme before paint; here we just build the control and wire clicks. */
function initTheme() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;
  const current = () => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

  const btn = document.createElement('button');
  btn.className = 'theme-toggle';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Toggle light or dark theme');
  btn.innerHTML = '<span class="tt-track"><span class="tt-knob">●</span></span><span class="tt-label"></span>';
  const label = btn.querySelector('.tt-label');
  const sync = () => { label.textContent = current() === 'light' ? 'Light mode' : 'Dark mode'; };
  sync();

  btn.addEventListener('click', () => {
    const next = current() === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('mi-theme', next); } catch (e) {}
    sync();
  });
  sidebar.appendChild(btn);
}

/* ---------- Copy-code buttons ----------
   Inject a "Copy" button into every code column's header and wire it to
   the column's <pre>. Works for all panels without per-page markup. */
function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  // Fallback for file:// or insecure contexts
  return new Promise((resolve, reject) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy') ? resolve() : reject(); }
    catch (e) { reject(e); }
    finally { ta.remove(); }
  });
}

function initCopyButtons() {
  document.querySelectorAll('.code-col').forEach((col) => {
    const pre = col.querySelector('pre');
    const head = col.querySelector('h4');
    if (!pre || !head) return;
    const btn = document.createElement('button');
    btn.className = 'copy-code';
    btn.type = 'button';
    btn.textContent = 'Copy';
    head.appendChild(btn);
    btn.addEventListener('click', () => {
      copyText(pre.textContent).then(() => {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        clearTimeout(btn._t);
        btn._t = setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1400);
      }).catch(() => {
        btn.textContent = 'Press ⌘C';
        clearTimeout(btn._t);
        btn._t = setTimeout(() => { btn.textContent = 'Copy'; }, 1400);
      });
    });
  });
}

initNav();
initCodeToggles();
initTheme();
initCopyButtons();
