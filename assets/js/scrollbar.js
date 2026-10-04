/*
 * Custom scrollbars.
 *
 * Scrolling stays native (wheel, touch, keyboard, find-in-page, scroll anchoring).
 * Only the bar is drawn by the site, so it looks the same on every OS.
 *
 *   - The page gets a fixed bar on the right edge.
 *   - [data-cscroll]    : vertical/horizontal scroller whose parent hosts the bar.
 *   - [data-cscroll-x], .markdown-body pre, .table-responsive-wrapper : wrapped in a host.
 *
 * CSS (css/main.css) hides the native bars only while html.cs is set.
 */
(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('cs');

  const HIDE_DELAY = 900;
  const MIN_THUMB = 36;
  const bars = new Set();

  class Bar {
    /**
     * @param {object} o
     * @param {'y'|'x'} o.axis
     * @param {HTMLElement} o.mount       element that receives the track
     * @param {() => {client:number, scroll:number, pos:number}} o.metrics
     * @param {(px:number) => void} o.scrollTo
     * @param {string} o.trackClass
     * @param {EventTarget} o.source      emits "scroll"
     * @param {() => boolean} [o.locked]  true while the scroller cannot scroll (e.g. body overflow hidden)
     */
    constructor(o) {
      this.o = o;
      this.axis = o.axis;
      this.track = document.createElement('div');
      this.track.className = `cs-track ${o.trackClass}`;
      this.track.setAttribute('aria-hidden', 'true');
      this.thumb = document.createElement('div');
      this.thumb.className = 'cs-thumb';
      this.track.appendChild(this.thumb);
      o.mount.appendChild(this.track);

      this.timer = 0;
      this.frame = 0;
      this.dragging = false;

      o.source.addEventListener('scroll', () => { this.update(); this.flash(); }, { passive: true });
      this.thumb.addEventListener('pointerdown', e => this.startDrag(e));
      this.track.addEventListener('pointerdown', e => {
        if (e.target !== this.track) return;
        const m = o.metrics();
        const rect = this.track.getBoundingClientRect();
        const click = this.axis === 'y' ? e.clientY - rect.top : e.clientX - rect.left;
        const thumbStart = this.thumbStart();
        o.scrollTo(m.pos + (click < thumbStart ? -1 : 1) * m.client * 0.9);
        e.preventDefault();
      });
      bars.add(this);
      this.paint();
    }

    trackLen() { return this.axis === 'y' ? this.track.clientHeight : this.track.clientWidth; }
    thumbStart() { return parseFloat(this.thumb.dataset.start || '0'); }

    update() {
      if (this.frame) return;
      // requestAnimationFrame is paused in hidden tabs; the timeout keeps metrics fresh there too.
      const run = () => {
        if (!this.frame) return;
        cancelAnimationFrame(this.frame);
        clearTimeout(this.fallback);
        this.frame = 0;
        this.paint();
      };
      this.frame = requestAnimationFrame(run);
      this.fallback = setTimeout(run, 80);
    }

    paint() {
      const { client, scroll, pos } = this.o.metrics();
      const max = scroll - client;
      const locked = this.o.locked ? this.o.locked() : false;
      const scrollable = max > 1 && client > 0 && !locked;
      this.track.classList.toggle('is-scrollable', scrollable);
      if (!scrollable) return;
      const len = this.trackLen();
      const size = Math.max(MIN_THUMB, Math.round(len * client / scroll));
      const start = Math.round((len - size) * Math.min(1, Math.max(0, pos / max)));
      this.thumb.dataset.start = String(start);
      if (this.axis === 'y') {
        this.thumb.style.height = size + 'px';
        this.thumb.style.transform = `translateY(${start}px)`;
      } else {
        this.thumb.style.width = size + 'px';
        this.thumb.style.transform = `translateX(${start}px)`;
      }
      this.thumbSize = size;
    }

    flash() {
      if (!this.track.classList.contains('is-scrollable')) return;
      this.track.classList.add('is-visible');
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.track.classList.remove('is-visible'), HIDE_DELAY);
    }

    startDrag(e) {
      if (e.button !== undefined && e.button !== 0) return;
      e.preventDefault();
      const m = this.o.metrics();
      const max = m.scroll - m.client;
      const room = Math.max(1, this.trackLen() - (this.thumbSize || MIN_THUMB));
      const startPointer = this.axis === 'y' ? e.clientY : e.clientX;
      const startPos = m.pos;
      this.dragging = true;
      this.track.classList.add('is-dragging');
      try { this.thumb.setPointerCapture(e.pointerId); } catch (_) { /* synthetic events */ }
      const move = ev => {
        const delta = (this.axis === 'y' ? ev.clientY : ev.clientX) - startPointer;
        this.o.scrollTo(startPos + (delta / room) * max);
      };
      const end = () => {
        this.dragging = false;
        this.track.classList.remove('is-dragging');
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', end);
        window.removeEventListener('pointercancel', end);
        this.flash();
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', end);
      window.addEventListener('pointercancel', end);
    }
  }

  /* Page ------------------------------------------------------------------ */
  const scrolling = () => document.scrollingElement || root;

  const pageHost = document.createElement('div');
  pageHost.className = 'cs-page';
  pageHost.setAttribute('aria-hidden', 'true');
  const mountPage = () => {
    if (pageHost.isConnected) return;
    (document.body || root).appendChild(pageHost);
  };

  let pageBar = null;
  const initPage = () => {
    mountPage();
    pageBar = new Bar({
      axis: 'y',
      mount: pageHost,
      trackClass: 'cs-page-track',
      source: window,
      metrics: () => {
        const el = scrolling();
        return { client: root.clientHeight, scroll: el.scrollHeight, pos: el.scrollTop };
      },
      scrollTo: px => scrolling().scrollTo({ top: px, behavior: 'instant' }),
      locked: () => getComputedStyle(document.body).overflow === 'hidden'
    });
    // The page bar fills the fixed host: make the inner track fill it.
    pageBar.track.style.cssText = 'position:absolute;inset:0;opacity:1';
    // Visibility is controlled on the fixed host.
    const sync = () => {
      const on = pageBar.track.classList.contains('is-scrollable');
      pageHost.classList.toggle('is-scrollable', on);
    };
    const origPaint = pageBar.paint.bind(pageBar);
    pageBar.paint = () => { origPaint(); sync(); };
    pageBar.flash = () => {
      if (!pageHost.classList.contains('is-scrollable')) return;
      pageHost.classList.add('is-visible');
      clearTimeout(pageBar.timer);
      pageBar.timer = setTimeout(() => pageHost.classList.remove('is-visible'), HIDE_DELAY);
    };
    const origDragStart = pageBar.startDrag.bind(pageBar);
    pageBar.startDrag = e => {
      pageHost.classList.add('is-dragging');
      const clear = () => { pageHost.classList.remove('is-dragging'); window.removeEventListener('pointerup', clear); };
      window.addEventListener('pointerup', clear);
      origDragStart(e);
    };
    pageBar.paint();
  };

  /* Elements ------------------------------------------------------------- */
  const ready = new WeakSet();

  const attach = (scroller, host) => {
    if (ready.has(scroller)) return;
    ready.add(scroller);
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';

    const create = axis => new Bar({
      axis,
      mount: host,
      trackClass: axis === 'y' ? 'cs-v' : 'cs-h',
      source: scroller,
      metrics: () => axis === 'y'
        ? { client: scroller.clientHeight, scroll: scroller.scrollHeight, pos: scroller.scrollTop }
        : { client: scroller.clientWidth, scroll: scroller.scrollWidth, pos: scroller.scrollLeft },
      scrollTo: px => scroller.scrollTo(axis === 'y' ? { top: px, behavior: 'instant' } : { left: px, behavior: 'instant' })
    });

    const cs = getComputedStyle(scroller);
    const wantsY = /(auto|scroll)/.test(cs.overflowY);
    const wantsX = /(auto|scroll)/.test(cs.overflowX);
    const pair = [];
    if (wantsY) pair.push(create('y'));
    if (wantsX) pair.push(create('x'));
    if (pair.length === 2) pair.forEach(b => b.track.classList.add('cs-both'));

    const refresh = () => pair.forEach(b => b.update());
    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(refresh);
      ro.observe(scroller);
      [...scroller.children].slice(0, 60).forEach(child => ro.observe(child));
    }
    refresh();
  };

  const wrap = el => {
    if (ready.has(el) || el.parentElement?.classList.contains('cs-host')) return;
    const host = document.createElement('div');
    host.className = 'cs-host';
    el.parentNode.insertBefore(host, el);
    host.appendChild(el);
    attach(el, host);
  };

  const scan = () => {
    document.querySelectorAll('[data-cscroll]').forEach(el => {
      if (!ready.has(el)) attach(el, el.parentElement);
    });
    document.querySelectorAll('[data-cscroll-x], .markdown-body pre, .table-responsive-wrapper').forEach(wrap);
  };

  let scanTimer = 0;
  const scheduleScan = () => {
    clearTimeout(scanTimer);
    scanTimer = setTimeout(scan, 60);
  };

  const start = () => {
    initPage();
    scan();
    if ('MutationObserver' in window) {
      new MutationObserver(scheduleScan).observe(document.body, { childList: true, subtree: true });
    }
    if ('ResizeObserver' in window) new ResizeObserver(() => pageBar?.update()).observe(document.body);
    window.addEventListener('resize', () => bars.forEach(b => b.update()));
    window.addEventListener('load', () => { scan(); bars.forEach(b => b.update()); });
    // Show the page bar briefly on load so people learn it exists.
    pageBar?.flash();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
