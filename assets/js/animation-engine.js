/* ==========================================================================
   MOTOR CENTRAL DE ANIMACIÓN (assets/js/animation-engine.js)
   Exporta e inicializa la biblioteca GSAP con sus respectivos plugins
   para aceleración por hardware en navegadores modernos.
   ========================================================================== */

const gsap = window.gsap
const ScrollTrigger = window.ScrollTrigger

if (!gsap) {
  throw new Error('[Animation Engine] GSAP no esta disponible. Asegurate de cargar <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script> antes que los modulos ES.')
}

if (!ScrollTrigger) {
  throw new Error('[Animation Engine] ScrollTrigger no esta disponible. Asegurate de cargar <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script> antes que los modulos ES.')
}

gsap.registerPlugin(ScrollTrigger)

export default gsap
export { ScrollTrigger, gsap }
