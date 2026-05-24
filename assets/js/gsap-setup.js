/* ==========================================================================
   CONFIGURACIÓN DE MEDIAS ADAPTATIVAS (assets/js/gsap-setup.js)
   Configura la accesibilidad de movimiento reducido (prefers-reduced-motion)
   y los puntos de quiebre responsive para ScrollTrigger.
   ========================================================================== */

const gsap = window.gsap
const ScrollTrigger = window.ScrollTrigger

if (!gsap || !ScrollTrigger) {
  console.warn('[GSAP] No se detecto GSAP o ScrollTrigger globales. Asegurate de cargar los scripts CDN antes que los modulos ES.')
}

if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger)

gsap.defaults({
  duration: 0.6,
  ease: 'power2.out',
})

if (ScrollTrigger) {
  ScrollTrigger.defaults({
    once: true,
  })
}

let reducedMotion = false
let isMobile = false

const mm = gsap.matchMedia ? gsap.matchMedia() : null

if (mm) {
  mm.add(
    {
      reducedMotion: '(prefers-reduced-motion: reduce)',
      isMobile: '(max-width: 768px)',
      isTablet: '(min-width: 769px) and (max-width: 1024px)',
      isDesktop: '(min-width: 1025px)',
    },
    (context) => {
      reducedMotion = !!context.conditions.reducedMotion
      isMobile = !!context.conditions.isMobile

      document.documentElement.classList.toggle('reduced-motion', reducedMotion)
      document.documentElement.classList.toggle('mobile-animations', isMobile)
    }
  )
}

export function killAllAnimations() {
  gsap.globalTimeline.clear()
  if (ScrollTrigger) {
    ScrollTrigger.getAll().forEach((st) => st.kill())
  }
}

export function createSafeContext(fn) {
  if (reducedMotion) {

    return fn()
  }
  return gsap.context(fn)
}

export const EASE = {
  smooth: 'power2.out',
  dramatic: 'power3.out',
  elasticPop: 'back.out(1.5)',
  elasticBig: 'back.out(2)',
  expoSmooth: 'expo.inOut',
  bounce: 'elastic.out(1, 0.4)',
  none: 'none',
}

export function mobileSkip(fn) {
  if (!isMobile) return fn()
  return null
}

export function desktopOnly(fn) {
  if (!isMobile && !reducedMotion) return fn()
  return null
}

export { reducedMotion, isMobile, mm }
