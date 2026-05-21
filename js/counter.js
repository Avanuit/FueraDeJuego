import gsap from './animation-engine.js'
import { ScrollTrigger } from './animation-engine.js'

gsap.registerPlugin(ScrollTrigger)

export function initCounters() {
  const counters = document.querySelectorAll('.stat__number[data-target]')
  counters.forEach((el) => {
    gsap.fromTo(el,
      { textContent: 0 },
      {
        textContent: parseInt(el.dataset.target, 10),
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      }
    )
  })
}
