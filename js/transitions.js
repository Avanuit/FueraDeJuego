import gsap from 'gsap'
import barba from '@barba/core'
import { getLenis } from './lenis.js'
import { reinit } from './app.js'

const NAMESPACE_TO_URL = {
  home: 'index.html',
  historia: 'historia.html',
  personajes: 'personajes.html',
  mapa: 'mapa.html',
  comic: 'comic.html',
  testimonios: 'testimonios.html',
}

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
    document.body.classList.add('is-transitioning')
    const lenis = getLenis()
    if (lenis) lenis.stop()
  },

  leave() {
    const done = this.async()
    const left = curtains.getLeft()
    const right = curtains.getRight()

    gsap.set(left, { xPercent: -100 })
    gsap.set(right, { xPercent: 100 })

    const tl = gsap.timeline({ onComplete: done })
    tl.to(left, { xPercent: 0, duration: 0.75, ease: 'expo.inOut' }, 0)
    tl.to(right, { xPercent: 0, duration: 0.75, ease: 'expo.inOut' }, 0)
  },

  enter({ next }) {
    const done = this.async()
    const lenis = getLenis()
    const left = curtains.getLeft()
    const right = curtains.getRight()

    window.scrollTo({ top: 0, behavior: 'instant' })
    gsap.set(next.container, { opacity: 1, y: 0 })

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(left, { xPercent: -100 })
        gsap.set(right, { xPercent: 100 })
        document.body.classList.remove('is-transitioning')
        if (lenis) lenis.start()
        done()
      },
    })

    tl.to({}, { duration: 0.09 })
    tl.to(left, { xPercent: -100, duration: 0.75, ease: 'expo.inOut' }, 'open')
    tl.to(right, { xPercent: 100, duration: 0.75, ease: 'expo.inOut' }, 'open')
  },

  after({ next }) {
    updateActiveNav(next.namespace)
    reinit()
  },
}

function initBarba() {
  const left = curtains.getLeft()
  const right = curtains.getRight()
  gsap.set(left, { xPercent: -100 })
  gsap.set(right, { xPercent: 100 })

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
