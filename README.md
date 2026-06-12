# Microinteractions Showcase

A live reference of common web microinteractions, each built **two ways** — hand-rolled with plain CSS & vanilla JavaScript, and again with the [GSAP](https://gsap.com/) animation library — shown side by side so you can compare the effort and the result. Every demo has a **View code** panel with a copy button.

Dark and light themes (toggle in the sidebar, remembered across pages).

## Categories

| # | Page | Interactions |
|---|------|--------------|
| 01 | Buttons & clicks | hover lift · click ripple · async loading · copy-to-clipboard · like burst |
| 02 | Forms & inputs | floating label · inline validation · password strength · character counter |
| 03 | Toggles & selection | switch · animated checkbox · star rating · segmented control |
| 04 | Loading & progress | skeleton screen · progress bar · spinner · animated counter |
| 05 | Notifications | toast · badge count · tooltip · modal dialog |
| 06 | Navigation & scroll | hamburger morph · sticky shrink · scroll progress · accordion |
| 07 | Cards & content | hover tilt · image zoom · read-more · flip card |
| 08 | Delight | cursor follower · confetti · magnetic button · animated empty state |

## Running it

No build step. Either:

- Open `index.html` directly in a browser, **or**
- Serve the folder (recommended — e.g. VS Code's *Live Server*, or `npx serve`) so the copy-code buttons use the native clipboard API.

GSAP loads from a CDN, so an internet connection is needed for the GSAP demos.

## Structure

```
index.html            Overview / landing page
<category>.html       One page per category (buttons, forms, toggles, …)
<category>.js         Demo logic for that category
styles.css            Shared theme, layout, and components
app.js                Sidebar nav, theme toggle, view-code & copy-code buttons
```

## Accessibility

The interactions respect `prefers-reduced-motion` — CSS animations are neutralized and the perpetual GSAP idle motions (spinner, floating empty-state) render statically.

---

Built as a learning reference. Plain CSS/JS vs GSAP, side by side.
