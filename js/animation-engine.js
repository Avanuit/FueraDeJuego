// ──────────────────────────────────────────────
// Animation Engine Wrapper — Fuera de Juego
// Re-exporta GSAP real cargado globalmente via CDN
// ──────────────────────────────────────────────

const gsap = window.gsap
const ScrollTrigger = window.ScrollTrigger

if (!gsap) {
  throw new Error('[Animation Engine] GSAP no esta disponible. Asegurate de cargar <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script> antes que los modulos ES.')
}

if (!ScrollTrigger) {
  throw new Error('[Animation Engine] ScrollTrigger no esta disponible. Asegurate de cargar <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script> antes que los modulos ES.')
}

// Auto-register ScrollTrigger on the global gsap instance
gsap.registerPlugin(ScrollTrigger)

// Ensure the old vanilla engine signatures still work
// gsap.utils.random is already present in real GSAP
// gsap.context is present in real GSAP
// gsap.getProperty is present in real GSAP
// gsap.ticker is present in real GSAP

export default gsap
export { ScrollTrigger, gsap }
