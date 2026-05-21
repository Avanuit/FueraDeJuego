import gsap from './animation-engine.js'
import { ScrollTrigger } from './animation-engine.js'

gsap.registerPlugin(ScrollTrigger)

export function createScrollReveal(selector, opts = {}) {
  const elements = document.querySelectorAll(selector)
  if (!elements.length) return

  const defaults = {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.out',
    start: 'top 88%',
    once: true,
  }

  const config = { ...defaults, ...opts }

  gsap.fromTo(elements,
    { opacity: config.opacity, y: config.y, x: config.x || 0, scale: config.scale || 1 },
    {
      opacity: 1, y: 0, x: 0, scale: 1,
      duration: config.duration,
      stagger: config.stagger,
      ease: config.ease,
      scrollTrigger: {
        trigger: opts.trigger || elements[0],
        start: config.start,
        once: config.once,
      },
    }
  )
}

export function createParallax(selector, opts = {}) {
  const elements = document.querySelectorAll(selector)
  if (!elements.length) return

  elements.forEach((el) => {
    const yPercent = parseFloat(el.dataset.parallax) || opts.yPercent || 10

    gsap.to(el, {
      yPercent,
      ease: 'none',
      force3d: true,
      scrollTrigger: {
        trigger: opts.trigger || el.parentElement || el,
        start: opts.start || 'top bottom',
        end: opts.end || 'bottom top',
        scrub: opts.scrub || 1,
        _persistent: true,
      },
    })
  })
}
