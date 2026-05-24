/* ==========================================================================
   CONTROLADOR DE ANIMACIONES PARA EL GLOSARIO (assets/js/animations/glosario.js)
   Este módulo inicializa el menú tipo acordeón interactivo de los conceptos
   utilizando GSAP para animar de forma ultrafluida el alto, rotación y bordes.
   ========================================================================== */

import gsap from '../animation-engine.js'
import { ScrollTrigger } from '../animation-engine.js'
import {
  animateSectionLabel,
  animateSectionTitle,
  animatePageHeroAdvanced,
} from './shared.js'

gsap.registerPlugin(ScrollTrigger)

function animateHero() {
  animatePageHeroAdvanced(document.querySelector('.page-hero'))
}

function animateTitles() {
  const container = document.querySelector('.content-section')
  if (!container) return

  animateSectionLabel(container)
  animateSectionTitle(container, { y: 40, rotateX: -15 })
}

function initAccordion() {
  const items = document.querySelectorAll('.glosario-item')
  if (!items.length) return

  // Stagger entry of accordion items
  gsap.fromTo(items,
    { opacity: 0, y: 30, scale: 0.98 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.glosario-list', start: 'top 85%', once: true },
    }
  )

  items.forEach((item) => {
    const header = item.querySelector('.glosario-header')
    const content = item.querySelector('.glosario-content')
    const icon = item.querySelector('.glosario-icon')

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open')

      items.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains('open')) {
          otherItem.classList.remove('open')
          const otherContent = otherItem.querySelector('.glosario-content')
          const otherIcon = otherItem.querySelector('.glosario-icon')
          gsap.to(otherContent, { height: 0, duration: 0.4, ease: 'power2.out' })
          gsap.to(otherIcon, { rotation: 0, duration: 0.4, ease: 'power2.out' })
          gsap.to(otherItem, { borderColor: 'var(--border)', duration: 0.4 })
        }
      })

      if (isOpen) {
        item.classList.remove('open')
        gsap.to(content, { height: 0, duration: 0.4, ease: 'power2.out' })
        gsap.to(icon, { rotation: 0, duration: 0.4, ease: 'power2.out' })
        gsap.to(item, { borderColor: 'var(--border)', duration: 0.4 })
      } else {
        item.classList.add('open')
        gsap.set(content, { height: 'auto' })
        gsap.from(content, { height: 0, duration: 0.5, ease: 'power3.out' })
        gsap.to(icon, { rotation: 45, duration: 0.4, ease: 'power2.out' })
        gsap.to(item, { borderColor: 'var(--accent)', duration: 0.4 })
      }
    })
  })
}

export function init() {
  animateHero()
  animateTitles()
  initAccordion()
}
