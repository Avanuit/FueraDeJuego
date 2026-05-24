/* ==========================================================================
   CONTROLADOR DE ANIMACIONES PARA RECURSOS (assets/js/animations/recursos.js)
   Este módulo ejecuta las secuencias de animación específicas para la vista
   de recursos comunitarios, controlando efectos parallax e ingresos elásticos.
   ========================================================================== */

import gsap from '../animation-engine.js'
import { ScrollTrigger } from '../animation-engine.js'
import {
  animateSectionLabel,
  animateSectionTitle,
  animateParagraphs,
  createParallaxImage,
  animatePageHeroAdvanced,
} from './shared.js'

gsap.registerPlugin(ScrollTrigger)

function animateHero() {
  animatePageHeroAdvanced(document.querySelector('.page-hero'))
}

function animateOrganize() {
  const section = document.querySelector('.two-col')
  if (!section) return

  const textCol = section.querySelector('.two-col__text')
  const imgCol = section.querySelector('.two-col__image')

  if (textCol) {
    animateSectionLabel(textCol)
    animateSectionTitle(textCol, { y: 40, rotateX: -15 })
    animateParagraphs(textCol.querySelectorAll('p'), { y: 25 })
  }

  if (imgCol) {
    const img = imgCol.querySelector('img')
    if (img) {
      createParallaxImage(img, {
        clipPathStart: 'inset(0 100% 0 0)',
        yPercentPositive: 10,
      })
    }
  }
}

function animateAdvisories() {
  const container = document.querySelector('.content-section[style*="surface"]')
  if (!container) return

  animateSectionLabel(container)
  animateSectionTitle(container, { y: 40, rotateX: -10 })

  const cards = container.querySelectorAll('.chapter-card')
  cards.forEach((card) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: card, start: 'top 88%', once: true },
    })

    tl.fromTo(card,
      { opacity: 0, y: 50, rotateX: 10 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.9, ease: 'power3.out' }
    )

    const num = card.querySelector('.chapter-card__number')
    if (num) {
      tl.fromTo(num,
        { scale: 0, rotation: -90 },
        { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)' },
        '-=0.6'
      )
    }

    const content = card.querySelector('.chapter-card__content')
    if (content) {
      const children = content.querySelectorAll('h3, p')
      tl.fromTo(children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        '-=0.4'
      )
    }
  })
}

export function init() {
  animateHero()
  animateOrganize()
  animateAdvisories()
}
