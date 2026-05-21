// ──────────────────────────────────────────────
// Animation Utils — Fuera de Juego
// Reusable premium animation helpers
// ──────────────────────────────────────────────

import gsap from './animation-engine.js'
import { ScrollTrigger } from './animation-engine.js'
import { splitText } from './text-split.js'
import { reducedMotion, isMobile } from './gsap-setup.js'

// ── Text Reveals ──────────────────────────────

export function revealTextChars(el, options = {}) {
  if (!el || reducedMotion) return null

  const {
    y = 60,
    rotateX = -40,
    duration = 0.9,
    stagger = 0.02,
    ease = 'power3.out',
    scrollTrigger = null,
    charsClass = 'char',
  } = options

  const split = splitText(el, { type: 'chars', charsClass })
  if (!split || !split.chars.length) return null

  gsap.set(split.chars, { opacity: 0, y, rotateX })

  const vars = {
    opacity: 1, y: 0, rotateX: 0,
    duration, stagger, ease,
  }

  if (scrollTrigger) {
    vars.scrollTrigger = scrollTrigger
  }

  const tween = gsap.to(split.chars, vars)

  return { tween, split }
}

export function revealTextWords(el, options = {}) {
  if (!el || reducedMotion) return null

  const {
    y = 40,
    rotateX = -15,
    duration = 0.8,
    stagger = 0.06,
    ease = 'power3.out',
    scrollTrigger = null,
    wordsClass = 'word',
  } = options

  const split = splitText(el, { type: 'words', wordsClass })
  if (!split || !split.words.length) return null

  gsap.set(split.words, { opacity: 0, y, rotateX })

  const vars = {
    opacity: 1, y: 0, rotateX: 0,
    duration, stagger, ease,
  }

  if (scrollTrigger) {
    vars.scrollTrigger = scrollTrigger
  }

  const tween = gsap.to(split.words, vars)

  return { tween, split }
}

// ── Image Wipe Reveals ────────────────────────

export function revealImage(el, direction = 'up', options = {}) {
  if (!el) return null

  const {
    duration = 1,
    ease = 'power2.inOut',
    scrollTrigger = null,
  } = options

  const clipPaths = {
    up: { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' },
    down: { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0% 0)' },
    left: { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' },
    right: { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' },
    circle: { from: 'circle(0% at 50% 50%)', to: 'circle(75% at 50% 50%)' },
  }

  const clip = clipPaths[direction] || clipPaths.up

  if (reducedMotion) {
    gsap.set(el, { clipPath: clip.to, opacity: 1 })
    return null
  }

  gsap.set(el, { clipPath: clip.from, opacity: 1 })

  const vars = {
    clipPath: clip.to,
    duration, ease,
  }

  if (scrollTrigger) {
    vars.scrollTrigger = scrollTrigger
  }

  return gsap.to(el, vars)
}

// ── Parallax ──────────────────────────────────

export function parallaxImage(el, speed = 12, options = {}) {
  if (!el || isMobile) return null

  const {
    scrub = 1,
    trigger = el.parentElement || el,
    start = 'top bottom',
    end = 'bottom top',
  } = options

  return gsap.to(el, {
    yPercent: speed,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub,
    },
  })
}

// ── Magnetic Buttons ──────────────────────────

export function magneticButton(el, options = {}) {
  if (!el || isMobile || reducedMotion) return null

  const {
    strength = 0.35,
    duration = 0.4,
    ease = 'power3',
  } = options

  const xTo = gsap.quickTo(el, 'x', { duration, ease })
  const yTo = gsap.quickTo(el, 'y', { duration, ease })

  const rect = el.getBoundingClientRect

  function onMove(e) {
    const r = rect.call(el)
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength
    xTo(dx)
    yTo(dy)
  }

  function onLeave() {
    xTo(0)
    yTo(0)
  }

  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseleave', onLeave)

  // Return cleanup function
  return () => {
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
    xTo(0)
    yTo(0)
  }
}

export function initMagneticButtons(selector = '.btn, .magnetic') {
  const buttons = document.querySelectorAll(selector)
  const cleaners = []

  buttons.forEach((btn) => {
    const cleanup = magneticButton(btn)
    if (cleanup) cleaners.push(cleanup)
  })

  return () => cleaners.forEach((fn) => fn())
}

// ── Stagger Reveal ────────────────────────────

export function staggerReveal(elements, options = {}) {
  if (!elements || !elements.length) return null

  const {
    fromVars = { opacity: 0, y: 40, scale: 0.95 },
    toVars = { opacity: 1, y: 0, scale: 1 },
    duration = 0.7,
    stagger = 0.12,
    ease = 'power3.out',
    scrollTrigger = null,
  } = options

  const vars = { ...toVars, duration, stagger, ease }

  if (scrollTrigger) {
    vars.scrollTrigger = scrollTrigger
  }

  if (reducedMotion) {
    gsap.set(elements, toVars)
    return null
  }

  return gsap.fromTo(elements, fromVars, vars)
}

// ── Counter ───────────────────────────────────

export function animateCounter(el, options = {}) {
  if (!el) return null

  const target = parseInt(el.dataset.target || el.textContent, 10)
  if (isNaN(target) || target <= 0) return null

  const {
    duration = 2.2,
    ease = 'power2.out',
    delay = 0,
    suffix = '',
    scrollTrigger = null,
  } = options

  const obj = { val: 0 }

  if (reducedMotion) {
    el.textContent = target + suffix
    return null
  }

  const vars = {
    val: target,
    duration,
    ease,
    delay,
    onUpdate() {
      el.textContent = Math.round(obj.val) + suffix
    },
  }

  if (scrollTrigger) {
    vars.scrollTrigger = scrollTrigger
  }

  return gsap.to(obj, vars)
}

// ── SVG Stroke Draw ───────────────────────────

export function drawSVG(el, options = {}) {
  if (!el || reducedMotion) return null

  const {
    duration = 1.2,
    ease = 'power2.inOut',
    delay = 0,
    scrollTrigger = null,
  } = options

  const length = el.getTotalLength ? el.getTotalLength() : 1000
  gsap.set(el, { strokeDasharray: length, strokeDashoffset: length })

  const vars = {
    strokeDashoffset: 0,
    duration,
    ease,
    delay,
  }

  if (scrollTrigger) {
    vars.scrollTrigger = scrollTrigger
  }

  return gsap.to(el, vars)
}

// ── 3D Tilt (for cards) ───────────────────────

export function tiltCard(el, options = {}) {
  if (!el || isMobile || reducedMotion) return null

  const {
    maxRotate = 8,
    perspective = 1000,
    duration = 0.4,
    ease = 'power2.out',
  } = options

  el.style.perspective = perspective + 'px'
  el.style.transformStyle = 'preserve-3d'

  const rotateXTo = gsap.quickTo(el, 'rotateX', { duration, ease })
  const rotateYTo = gsap.quickTo(el, 'rotateY', { duration, ease })

  function onMove(e) {
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const dx = (e.clientX - cx) / (r.width / 2)
    const dy = (e.clientY - cy) / (r.height / 2)
    rotateYTo(dx * maxRotate)
    rotateXTo(-dy * maxRotate)
  }

  function onLeave() {
    rotateXTo(0)
    rotateYTo(0)
  }

  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseleave', onLeave)

  return () => {
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
    rotateXTo(0)
    rotateYTo(0)
  }
}

export function initTiltCards(selector = '.tilt-card') {
  const cards = document.querySelectorAll(selector)
  const cleaners = []
  cards.forEach((card) => {
    const cleanup = tiltCard(card)
    if (cleanup) cleaners.push(cleanup)
  })
  return () => cleaners.forEach((fn) => fn())
}

// ── Hero Parallax ─────────────────────────────

export function heroParallax(contentEl, imgEl, options = {}) {
  if (!contentEl && !imgEl) return null

  const {
    contentY = -60,
    imgScaleFrom = 1.15,
    imgScaleTo = 1,
    scrub = 1,
  } = options

  const tweens = []

  if (contentEl) {
    tweens.push(gsap.to(contentEl, {
      y: contentY,
      ease: 'none',
      scrollTrigger: {
        trigger: contentEl.closest('.hero, .page-hero') || contentEl,
        start: 'top top',
        end: 'bottom top',
        scrub,
      },
    }))
  }

  if (imgEl) {
    gsap.set(imgEl, { scale: imgScaleFrom })
    tweens.push(gsap.to(imgEl, {
      scale: imgScaleTo,
      ease: 'none',
      scrollTrigger: {
        trigger: imgEl.closest('.hero, .page-hero') || imgEl,
        start: 'top top',
        end: 'bottom top',
        scrub,
      },
    }))
  }

  return tweens
}

// ── Scroll Progress Color Shift ───────────────

export function scrollProgressColor(el, options = {}) {
  if (!el) return null

  const {
    fromColor = '#FF2A00',
    toColor = '#FFD600',
    start = 'top top',
    end = 'bottom bottom',
    scrub = 0.3,
  } = options

  gsap.fromTo(el,
    { scaleX: 0, backgroundColor: fromColor },
    {
      scaleX: 1,
      backgroundColor: toColor,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start,
        end,
        scrub,
      },
    }
  )
}
