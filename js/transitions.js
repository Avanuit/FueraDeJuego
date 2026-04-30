/**
 * transitions.js
 * Barba.js + GSAP transiciones cinematograficas.
 * ES Module.
 */

import gsap from 'gsap';
import barba from '@barba/core';
import { PageReinit, initLenis, getLenis } from './app.js';

/* ============================================
   OVERLAY SETUP
   ============================================ */
const TransitionOverlay = {
  overlay: null,
  get() {
    if (!this.overlay) {
      this.overlay = document.createElement('div');
      this.overlay.className = 'barba-overlay';
      document.body.appendChild(this.overlay);
    }
    return this.overlay;
  },
};

/* ============================================
   NAV UPDATER
   ============================================ */
const NavUpdater = {
  update(namespace) {
    const map = {
      home: 'index.html',
      historia: 'historia.html',
      personajes: 'personajes.html',
      mapa: 'mapa.html',
      comic: 'comic.html',
      testimonios: 'testimonios.html',
    };
    const targetHref = map[namespace];
    if (!targetHref) return;

    document.querySelectorAll('.nav__link').forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href') || '';
      if (href === targetHref) link.classList.add('active');
    });
  },
};

/* ============================================
   WIPE TRANSITION
   ============================================ */
const wipeTransition = {
  name: 'wipe-transition',

  leave({ current }) {
    const done = this.async();
    const overlay = TransitionOverlay.get();
    const lenis = getLenis();
    if (lenis) lenis.stop();

    const tl = gsap.timeline({
      onComplete: done,
    });

    // Content fade out with stagger
    tl.to(current.container.children, {
      opacity: 0,
      y: -20,
      duration: 0.35,
      stagger: 0.03,
      ease: 'power2.in',
    });

    // Overlay wipe up
    tl.fromTo(overlay,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.5, ease: 'power4.inOut' },
      '-=0.1'
    );
  },

  enter({ next }) {
    const done = this.async();
    const overlay = TransitionOverlay.get();
    const lenis = getLenis();

    window.scrollTo({ top: 0, behavior: 'instant' });

    gsap.set(next.container.children, { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(overlay, { yPercent: 100 });
        if (lenis) lenis.start();
        done();
      },
    });

    // Overlay exits up
    tl.to(overlay, {
      yPercent: -100,
      duration: 0.5,
      ease: 'power4.inOut',
    });

    // New content staggers in
    tl.to(next.container.children, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: 'power2.out',
    }, '-=0.2');
  },

  after({ next }) {
    NavUpdater.update(next.namespace);
    PageReinit.run();
  },
};

/* ============================================
   BARBA CONTROLLER
   ============================================ */
const BarbaController = {
  init() {
    const overlay = TransitionOverlay.get();
    gsap.set(overlay, { yPercent: 100 });

    barba.init({
      prevent: ({ el }) => el.classList?.contains('no-barba'),
      timeout: 10000,
      transitions: [wipeTransition],
    });
  },
};

/* ============================================
   BOOTSTRAP
   ============================================ */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => BarbaController.init());
} else {
  BarbaController.init();
}
