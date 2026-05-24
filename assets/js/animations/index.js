/* ==========================================================================
   CONTRALADOR CENTRAL DE ANIMACIONES POR PÁGINA (assets/js/animations/index.js)
   Este script importa dinámicamente y ejecuta los módulos de animación de GSAP
   específicos para la página que se está cargando (basado en su namespace).
   Inicializa la barra de progreso de lectura global.
   ========================================================================== */

import gsap from '../animation-engine.js'
import { ScrollTrigger } from '../animation-engine.js'
import { scrollProgressColor } from '../animation-utils.js'

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
  impacto: () => import('./impacto.js'),
  investigacion: () => import('./investigacion.js'),
  glosario: () => import('./glosario.js'),
  recursos: () => import('./recursos.js'),
}

function createScrollProgress() {
  if (progressBar) {
    progressBar.remove()
    progressBar = null
  }

  progressBar = document.createElement('div')
  progressBar.className = 'scroll-progress'
  document.body.appendChild(progressBar)

  scrollProgressColor(progressBar, {
    fromColor: '#FF2A00',
    toColor: '#FFD600',
    scrub: 0.3,
  })
}

export function killPageAnimations() {
  if (currentContext) {
    try {
      currentContext.revert()
    } catch (e) {
      // ignore
    }
    currentContext = null
  }
  ScrollTrigger.getAll().forEach((st) => {
    if (st.vars && !st.vars._persistent) {
      try {
        st.kill()
      } catch (e) {
        // ignore
      }
    }
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

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
  })
}

export function refreshAnimations() {
  ScrollTrigger.refresh()
}
