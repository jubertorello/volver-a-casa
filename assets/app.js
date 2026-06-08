/* =========================================================================
   VOLVER A CASA — Interacciones
   Robusto en entornos que congelan animaciones/transiciones (los timers SÍ
   corren): el contenido es visible por defecto (.fx se quita si no hay motion).
   ========================================================================= */
(function () {
  'use strict';
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  let MOTION = true;
  let armed = false; // don't trigger reveal transitions until motion is known
  let revealEls = $$('[data-reveal]');
  let countEls = $$('[data-count]');
  const nav = $('.nav');
  const progress = $('.scroll-progress');
  const path = $('.path');
  const wave = path ? $('.path__wave', path) : null;
  const waveTrack = wave ? $('.track', wave) : null;
  const waveFill = wave ? $('.fill', wave) : null;
  const steps = path ? $$('.step', path) : [];
  let waveLen = 0, waveH = 0;

  // Build a vertical wavy line whose amplitude/wavelength stay constant
  // regardless of how tall the timeline section is.
  function roadSpan() {
    // how far the road should reach: from the top of the timeline down to the
    // bottom edge of the whole section (so the next section visually cuts it off)
    const pr = path.getBoundingClientRect();
    const sectionEl = path.closest('.section');
    const sr = sectionEl ? sectionEl.getBoundingClientRect() : pr;
    return Math.max(pr.height, sr.bottom - pr.top);
  }
  function buildWave() {
    if (!wave || !waveTrack) return;
    const H = path.getBoundingClientRect().height;
    if (!H) return;
    waveH = H;
    const span = roadSpan();
    const Htotal = span + 90;   // a little extra so the rounded end hides under the next section
    const isMobile = window.matchMedia('(max-width: 760px)').matches;
    const cx = isMobile ? 40 : 60;   // centre of the svg (px = user units, no viewBox)
    const heroEl = document.querySelector('.hero');
    const straight = heroEl && heroEl.dataset.variant === 'b';
    let d;
    if (straight) {
      d = 'M ' + cx + ' 0 L ' + cx + ' ' + Htotal;   // Editorial = straight line
    } else if (isMobile) {
      // Mobile: houses all sit on one side, so keep a steady gentle wave.
      const off = 24, seg = 140;
      d = 'M ' + cx + ' 0';
      let yy = 0;
      while (yy < Htotal) {
        let end = yy + seg;
        if (end > Htotal) end = Htotal;
        const len = end - yy;
        const o = off * Math.min(1, len / seg);
        d += ' C ' + (cx + o) + ' ' + (yy + len * 0.42) + ', ' + (cx - o) + ' ' + (yy + len * 0.62) + ', ' + cx + ' ' + end;
        yy += seg;
      }
    } else {
      // Constelación (desktop): the wave bulges AWAY from each card, so every
      // house lands in the pocket of the curve. We sample each step's house
      // centre (transform-independent via offsetTop) and make the wave reach its
      // opposite-side extreme exactly there; it crosses the centre between steps.
      const off = 48;   // horizontal amplitude
      const pts = [{ x: cx, y: 0 }];
      steps.forEach((s, i) => {
        const home = s.querySelector('.step__home') || s;
        const yc = s.offsetTop + home.offsetTop + home.offsetHeight / 2;
        const rightSide = (i % 2 === 0);            // steps 1,3,5 sit on the right
        pts.push({ x: cx + (rightSide ? -off : off), y: yc });   // bulge to the far side
      });
      pts.push({ x: cx, y: Htotal });
      d = 'M ' + pts[0].x + ' ' + pts[0].y;
      for (let i = 1; i < pts.length; i++) {
        const p0 = pts[i - 1], p1 = pts[i], my = (p0.y + p1.y) / 2;
        d += ' C ' + p0.x + ' ' + my + ', ' + p1.x + ' ' + my + ', ' + p1.x + ' ' + p1.y;   // horizontal tangents => sine-like extremes
      }
    }
    waveTrack.setAttribute('d', d);
    waveLen = waveTrack.getTotalLength();
    // the orange road itself "paints" in on scroll
    waveTrack.style.strokeDasharray = waveLen;
    waveTrack.style.strokeDashoffset = waveLen;
    if (waveFill) waveFill.setAttribute('d', '');   // drop the old central marking line
  }

  function finalCount(el) {
    const target = parseFloat(el.dataset.count);
    el.textContent = (el.dataset.prefix || '') + target.toLocaleString('es-ES') + (el.dataset.suffix || '');
    el.dataset.done = '1';
  }
  function runCounter(el) {
    if (el.dataset.done) return;
    if (!MOTION || reduce) { finalCount(el); return; }
    el.dataset.done = '1';
    const target = parseFloat(el.dataset.count);
    const dec = (el.dataset.count.split('.')[1] || '').length;
    const suffix = el.dataset.suffix || '', prefix = el.dataset.prefix || '';
    const dur = 1500, t0 = performance.now();
    (function tick(t) {
      const k = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = prefix + Number((target * eased).toFixed(dec)).toLocaleString('es-ES') + suffix;
      if (k < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target.toLocaleString('es-ES') + suffix;
    })(performance.now());
  }

  function update() {
    const y = window.scrollY;
    const vh = window.innerHeight;

    if (nav) nav.classList.toggle('scrolled', y > 30);
    if (progress) {
      const h = document.documentElement.scrollHeight - vh;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
    if (armed) {
      for (let i = revealEls.length - 1; i >= 0; i--) {
        const r = revealEls[i].getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > -40) { revealEls[i].classList.add('in'); revealEls.splice(i, 1); }
      }
      for (let i = countEls.length - 1; i >= 0; i--) {
        const r = countEls[i].getBoundingClientRect();
        if (r.top < vh * 0.85 && r.bottom > 0) { runCounter(countEls[i]); countEls.splice(i, 1); }
      }
    }
    if (MOTION && !reduce) {
      $$('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.2;
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
    }
    if (path) {
      if (!waveLen || Math.abs(path.getBoundingClientRect().height - waveH) > 2) buildWave();
      const pr = path.getBoundingClientRect();
      const span = roadSpan();
      const passed = Math.min(Math.max(vh * 0.7 - pr.top, 0), span);
      const p = span ? passed / span : 0;
      if (waveTrack && waveLen) waveTrack.style.strokeDashoffset = waveLen * (1 - p);
      steps.forEach((s) => s.classList.toggle('active', s.getBoundingClientRect().top < vh * 0.6));
    }
  }

  // throttled scroll without depending on rAF (rAF may be frozen in capture envs)
  let last = 0, queued = null;
  function onScroll() {
    const now = Date.now();
    if (now - last > 60) { last = now; update(); }
    else { clearTimeout(queued); queued = setTimeout(() => { last = Date.now(); update(); }, 70); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update(); // nav/progress/timeline only (reveal is gated by `armed`)

  /* ---------- motion-capability detection ----------
     The capture/preview iframe freezes CSS animations + transitions (timers
     still run). We detect that BEFORE arming reveals, so we never start a
     transition that would freeze half-done. */
  (function detectMotion() {
    if (reduce) { // honor reduced motion: show everything, no transitions
      root.classList.remove('fx');
      revealEls.forEach((e) => e.classList.add('in')); revealEls = [];
      countEls.forEach(finalCount); countEls = [];
      return;
    }
    const probe = document.createElement('div');
    probe.style.cssText = 'position:fixed;left:-9999px;top:0;width:2px;height:2px;pointer-events:none;animation:vac-probe 1s linear infinite';
    document.body.appendChild(probe);
    const a = getComputedStyle(probe).transform;
    setTimeout(() => {
      const b = getComputedStyle(probe).transform;
      probe.remove();
      if (a === b) {
        // frozen -> show everything statically (no transitions ever started)
        MOTION = false;
        root.classList.remove('fx');
        revealEls.forEach((e) => e.classList.add('in')); revealEls = [];
        countEls.forEach(finalCount); countEls = [];
      } else {
        // real browser -> arm scroll-driven reveal + counters
        armed = true;
        update();
        [40, 160, 380, 800].forEach((ms) => setTimeout(update, ms));
      }
    }, 160);
  })();

  /* ---------- mobile menu ---------- */
  const burger = $('.nav__burger');
  const menu = $('.mobile-menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    $$('a', menu).forEach((a) => a.addEventListener('click', () => {
      menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
    }));
  }

  /* ---------- hero A/B switch ---------- */
  const hero = $('.hero');
  function setHero(v) {
    if (hero) hero.dataset.variant = v;
    waveH = -1;   // force the timeline conductor to rebuild for this variant
    $$('[data-hero-variant]').forEach((b) => b.classList.toggle('is-on', b.dataset.heroVariant === v));
    try { localStorage.setItem('vac-hero', v); } catch (e) {}
    setTimeout(update, 50);
  }
  $$('[data-hero-variant]').forEach((btn) => btn.addEventListener('click', () => setHero(btn.dataset.heroVariant)));
  try { const saved = localStorage.getItem('vac-hero'); if (saved) setHero(saved); } catch (e) {}

  /* ---------- smooth anchor offset ---------- */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (ev) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const t = document.querySelector(id);
      if (!t) return;
      ev.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 76, behavior: reduce ? 'auto' : 'smooth' });
    });
  });

  /* ---------- pointer tilt on hero stage ---------- */
  const stage = $('.hero__stage');
  if (stage && hero && !reduce && window.matchMedia('(pointer:fine)').matches) {
    hero.addEventListener('mousemove', (e) => {
      if (!MOTION) return;
      const r = hero.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      $$('.erizo', stage).forEach((el, i) => {
        const depth = (i + 1) * 7;
        el.style.transition = 'transform .5s var(--ease)';
        el.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
      });
    });
  }

  /* ---------- contacto modal ---------- */
  const modal = $('#contactoModal');
  if (modal) {
    let lastFocus = null;
    const openModal = () => {
      lastFocus = document.activeElement;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const c = $('.modal__close', modal); if (c) c.focus();
    };
    const closeModal = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };
    $$('[data-open-contacto]').forEach((b) => b.addEventListener('click', openModal));
    $$('[data-close-contacto]', modal).forEach((b) => b.addEventListener('click', closeModal));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
  }
})();
