import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DEFAULT_SELECTORS = [
  '.city-card',
  '.chapter-card',
  '.data-card',
  '.testimonial-card',
  '.flow-step',
  '.char-card',
  '.evidence-item',
  '.metric-item',
  '.comic-info-card',
].join(', ')

export function initScrollReveal() {
  const elements = document.querySelectorAll(DEFAULT_SELECTORS)
  elements.forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    )
  })

  document.querySelectorAll('[data-stagger]').forEach((group) => {
    gsap.fromTo(group.children,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      }
    )
  })

  document.querySelectorAll('[data-parallax]').forEach((img) => {
    gsap.to(img, {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  })
}
