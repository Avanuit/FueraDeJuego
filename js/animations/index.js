import gsap from '../animation-engine.js'
import { ScrollTrigger } from '../animation-engine.js'

gsap.registerPlugin(ScrollTrigger)

let currentContext = null
let progressBar = null

const PAGE_ANIMATIONS = {
  home: () => import('./home.js'),
  historia: () => import('./historia.js'),
  personajes: () => import('./personajes.js'),
  mapa: () => import('./mapa.js'),
  comic: () => import('./comic.js'),
  testimonios: () => import('./testimonios.js'),
  digital: () => import('./digital.js'),
}

function createScrollProgress() {
  if (progressBar) return
  progressBar = document.createElement('div')
  progressBar.className = 'scroll-progress'
  document.body.appendChild(progressBar)

  gsap.to(progressBar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
    },
  })
}

export function killPageAnimations() {
  if (currentContext) {
    currentContext.revert()
    currentContext = null
  }
  ScrollTrigger.getAll().forEach((st) => {
    if (st.vars && !st.vars._persistent) st.kill()
  })
}

export async function initPageAnimations(namespace) {
  killPageAnimations()

  const loader = PAGE_ANIMATIONS[namespace]
  if (!loader) return

  try {
    const mod = await loader()
    currentContext = gsap.context(() => {
      if (mod.init) mod.init()
    })
  } catch (e) {
    console.warn(`Animations for ${namespace} failed:`, e)
  }

  createScrollProgress()
  ScrollTrigger.refresh()
}

export function refreshAnimations() {
  ScrollTrigger.refresh()
}
