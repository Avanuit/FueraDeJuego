// ──────────────────────────────────────────────
// GSAP Global Setup — Fuera de Juego
// Configura defaults, accesibilidad y rendimiento
// ──────────────────────────────────────────────

const gsap = window.gsap
const ScrollTrigger = window.ScrollTrigger

if (!gsap || !ScrollTrigger) {
  console.warn('[GSAP] No se detecto GSAP o ScrollTrigger globales. Asegurate de cargar los scripts CDN antes que los modulos ES.')
}

// ── Register plugins ──────────────────────────
if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger)

// ── Defaults globales ─────────────────────────
gsap.defaults({
  duration: 0.6,
  ease: 'power2.out',
})

// ── ScrollTrigger defaults ────────────────────
if (ScrollTrigger) {
  ScrollTrigger.defaults({
    once: true,
  })
}

// ── Responsive / Accessibility with matchMedia ──
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

      // Global class hooks for CSS
      document.documentElement.classList.toggle('reduced-motion', reducedMotion)
      document.documentElement.classList.toggle('mobile-animations', isMobile)
    }
  )
}

// ── Revert all animations helper ────────────────
export function killAllAnimations() {
  gsap.globalTimeline.clear()
  if (ScrollTrigger) {
    ScrollTrigger.getAll().forEach((st) => st.kill())
  }
}

// ── Safe create context helper ──────────────────
export function createSafeContext(fn) {
  if (reducedMotion) {
    // In reduced motion, just run fn without heavy animations
    // but still allow ScrollTriggers that reveal content simply
    return fn()
  }
  return gsap.context(fn)
}

// ── Easing presets ──────────────────────────────
export const EASE = {
  smooth: 'power2.out',
  dramatic: 'power3.out',
  elasticPop: 'back.out(1.5)',
  elasticBig: 'back.out(2)',
  expoSmooth: 'expo.inOut',
  bounce: 'elastic.out(1, 0.4)',
  none: 'none',
}

// ── Responsive helpers ──────────────────────────
export function mobileSkip(fn) {
  if (!isMobile) return fn()
  return null
}

export function desktopOnly(fn) {
  if (!isMobile && !reducedMotion) return fn()
  return null
}

export { reducedMotion, isMobile, mm }
