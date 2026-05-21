import gsap from './animation-engine.js'
import barba from '@barba/core'
import { getLenis } from './lenis.js'
import { reinit, killPageAnimations } from './app.js'

const CURTAIN_DURATION = 0.75
const SETTLE_DELAY = 0.1
const CURTAIN_EASE = 'expo.inOut'
const CONTENT_TIMEOUT = 3000

const NAMESPACE_TO_URL = {
  home: 'index.html',
  historia: 'historia.html',
  personajes: 'personajes.html',
  mapa: 'mapa.html',
  comic: 'comic.html',
  testimonios: 'testimonios.html',
}

const VISIBLE_SELECTORS = [
  '[data-stagger] > *',
  '.anim-fade-up',
  '.anim-fade-in',
  '.anim-slide-left',
  '.anim-slide-right',
  '.anim-scale-in',
  '.char',
  '.word',
  '.hero-char',
  '.title-word',
  '[data-animate]',
  '.page-hero__title',
  '.page-hero__sub',
  '.page-hero__title *',
]

function createCurtains() {
  let left = null
  let right = null

  function getLeft() {
    if (!left) {
      left = document.createElement('div')
      left.className = 'curtain-panel curtain-panel--left'
      document.body.appendChild(left)
    }
    return left
  }

  function getRight() {
    if (!right) {
      right = document.createElement('div')
      right.className = 'curtain-panel curtain-panel--right'
      document.body.appendChild(right)
    }
    return right
  }

  return { getLeft, getRight }
}

function hideCurtains(left, right) {
  gsap.set(left, { xPercent: -100 })
  gsap.set(right, { xPercent: 100 })
}

function prepareLeave() {
  document.body.classList.add('is-transitioning')
  killPageAnimations()
  const lenis = getLenis()
  if (lenis) lenis.stop()
}

function closeCurtains(left, right, done) {
  hideCurtains(left, right)

  const tl = gsap.timeline({ onComplete: done })
  tl.to(left, { xPercent: 0, duration: CURTAIN_DURATION, ease: CURTAIN_EASE }, 0)
  tl.to(right, { xPercent: 0, duration: CURTAIN_DURATION, ease: CURTAIN_EASE }, 0)
}

function hideOldContainer(container) {
  if (!container) return
  gsap.set(container, { opacity: 0, visibility: 'hidden' })
}

function prepareContainer(container) {
  window.scrollTo({ top: 0, behavior: 'instant' })
  gsap.set(container, { opacity: 1, y: 0, visibility: 'visible' })
}

function forceVisible(container) {
  VISIBLE_SELECTORS.forEach((selector) => {
    const elements = container.querySelectorAll(selector)
    if (elements.length) {
      gsap.set(elements, {
        opacity: 1, y: 0, x: 0, scale: 1,
        clipPath: 'inset(0 0 0 0)',
        rotateX: 0, rotateY: 0, rotateZ: 0,
        clearProps: 'transform',
      })
    }
  })

  const heroImgs = container.querySelectorAll('.hero__img-wrap, .intro__img--back, .intro__img--front')
  if (heroImgs.length) {
    gsap.set(heroImgs, { clipPath: 'inset(0 0 0 0)', scale: 1 })
  }

  const pageHeroTitle = container.querySelector('.page-hero__title')
  if (pageHeroTitle) {
    gsap.set(pageHeroTitle, { opacity: 1 })
    const chars = pageHeroTitle.querySelectorAll('.hero-char')
    if (chars.length) gsap.set(chars, { opacity: 1, y: 0, clipPath: 'inset(0 0 0 0)' })
  }
}

async function waitForContentReady(container) {
  const images = container.querySelectorAll('img')
  const loaded = Array.from(images).map((img) => {
    if (img.complete) return Promise.resolve()
    return new Promise((resolve) => {
      img.addEventListener('load', resolve, { once: true })
      img.addEventListener('error', resolve, { once: true })
    })
  })

  await Promise.race([
    Promise.all(loaded),
    new Promise((resolve) => setTimeout(resolve, CONTENT_TIMEOUT)),
  ])

  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
}

function openCurtains(left, right, onDone) {
  const tl = gsap.timeline({ onComplete: onDone })
  tl.to({}, { duration: SETTLE_DELAY })
  tl.to(left, { xPercent: -100, duration: CURTAIN_DURATION, ease: CURTAIN_EASE }, 'open')
  tl.to(right, { xPercent: 100, duration: CURTAIN_DURATION, ease: CURTAIN_EASE }, 'open')
}

function cleanupTransition(left, right, lenis) {
  hideCurtains(left, right)
  document.body.classList.remove('is-transitioning')
  if (lenis) lenis.start()
}

function updateActiveNav(namespace) {
  const target = NAMESPACE_TO_URL[namespace]
  if (!target) return

  document.querySelectorAll('.nav__link').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === target)
  })
}

const curtains = createCurtains()

const theatreWipe = {
  name: 'theatre-wipe',

  beforeLeave() {
    prepareLeave()
  },

  leave() {
    const done = this.async()
    closeCurtains(curtains.getLeft(), curtains.getRight(), done)
  },

  enter(data) {
    const { current, next } = data
    const done = this.async()
    const lenis = getLenis()
    const left = curtains.getLeft()
    const right = curtains.getRight()

    hideOldContainer(current.container)
    prepareContainer(next.container)

    const onCurtainsOpen = () => {
      cleanupTransition(left, right, lenis)
      done()
    }

    const safeOpenCurtains = () => {
      forceVisible(next.container)
      openCurtains(left, right, onCurtainsOpen)
    }

    reinit()
      .then(() => forceVisible(next.container))
      .then(() => waitForContentReady(next.container))
      .then(() => updateActiveNav(next.namespace))
      .then(() => openCurtains(left, right, onCurtainsOpen))
      .catch(safeOpenCurtains)
  },
}

function initBarba() {
  hideCurtains(curtains.getLeft(), curtains.getRight())

  barba.init({
    prevent: ({ el }) => el.classList?.contains('no-barba'),
    timeout: 10000,
    transitions: [theatreWipe],
  })
}

export { initBarba as initTransitions }

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBarba)
} else {
  initBarba()
}