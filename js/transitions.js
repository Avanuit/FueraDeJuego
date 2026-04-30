/**
 * transitions.js
 * Barba.js + GSAP — Cortina de teatro buttery.
 * ES Module.
 */

import gsap from 'gsap';
import barba from '@barba/core';
import { PageReinit, getLenis } from './app.js';

/* ============================================
   CORTINAS (Theatre Curtain)
   ============================================ */
const Curtains = {
  left: null,
  right: null,

  getLeft() {
    if (!this.left) {
      this.left = document.createElement('div');
      this.left.className = 'curtain-panel curtain-panel--left';
      document.body.appendChild(this.left);
    }
    return this.left;
  },

  getRight() {
    if (!this.right) {
      this.right = document.createElement('div');
      this.right.className = 'curtain-panel curtain-panel--right';
      document.body.appendChild(this.right);
    }
    return this.right;
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
    const target = map[namespace];
    if (!target) return;

    document.querySelectorAll('.nav__link').forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === target);
    });
  },
};

/* ============================================
   THEATRE WIPE TRANSITION
   ============================================ */
const theatreWipe = {
  name: 'theatre-wipe',

  beforeLeave() {
    document.body.classList.add('is-transitioning');
    const lenis = getLenis();
    if (lenis) lenis.stop();
  },

  leave({ current }) {
    const done = this.async();
    const left = Curtains.getLeft();
    const right = Curtains.getRight();

    // Reset curtain positions (closed = 0, open = -100/+100)
    gsap.set(left,  { xPercent: -100 });
    gsap.set(right, { xPercent: 100 });

    const tl = gsap.timeline({ onComplete: done });

    // Content fades gently while curtains close
    tl.to(current.container, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.inOut',
    }, 0);

    // Curtains close simultaneously — buttery expo easing
    tl.to(left,  { xPercent: 0, duration: 0.75, ease: 'expo.inOut' }, 0);
    tl.to(right, { xPercent: 0, duration: 0.75, ease: 'expo.inOut' }, 0);
  },

  enter({ next }) {
    const done = this.async();
    const lenis = getLenis();
    const left = Curtains.getLeft();
    const right = Curtains.getRight();

    // Reset scroll instantly
    window.scrollTo({ top: 0, behavior: 'instant' });

    // New content is ready behind the curtains
    gsap.set(next.container, { opacity: 1, y: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        // Park curtains off-screen for next time
        gsap.set(left,  { xPercent: -100 });
        gsap.set(right, { xPercent: 100 });
        document.body.classList.remove('is-transitioning');
        if (lenis) lenis.start();
        done();
      },
    });

    // Dramatic beat: curtains stay closed for 90ms so the viewer
    // perceives the "page has changed" before the reveal.
    tl.to({}, { duration: 0.09 });

    // Curtains open simultaneously — reveal the new page
    tl.to(left,  { xPercent: -100, duration: 0.75, ease: 'expo.inOut' }, 'open');
    tl.to(right, { xPercent: 100,  duration: 0.75, ease: 'expo.inOut' }, 'open');
  },

  after({ next }) {
    NavUpdater.update(next.namespace);
    PageReinit.run();
  },
};

/* ============================================
   BARBA INIT
   ============================================ */
const BarbaController = {
  init() {
    // Ensure curtains exist and are hidden
    const left = Curtains.getLeft();
    const right = Curtains.getRight();
    gsap.set(left,  { xPercent: -100 });
    gsap.set(right, { xPercent: 100 });

    barba.init({
      prevent: ({ el }) => el.classList?.contains('no-barba'),
      timeout: 10000,
      transitions: [theatreWipe],
    });
  },
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => BarbaController.init());
} else {
  BarbaController.init();
}
