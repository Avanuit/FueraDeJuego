/* ==========================================================================
   CONTROLADOR DE ANIMACIONES PARA INVESTIGACIÓN (assets/js/animations/investigacion.js)
   Este módulo ejecuta las secuencias de animación específicas para la vista
   de investigación académica de la USB, controlando tarjetas tridimensionales.
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

function animateOrigin() {
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

function animateSteps() {
  const grid = document.querySelector('.chapters__grid')
  if (!grid) return

  animateSectionLabel(grid.parentElement)
  animateSectionTitle(grid.parentElement, { y: 40, rotateX: -10 })

  const cards = grid.querySelectorAll('.chapter-card')
  cards.forEach((card, i) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: card, start: 'top 88%', once: true },
    })

    tl.fromTo(card,
      { autoAlpha: 0, y: 60, rotateX: 12, rotateY: i % 2 === 0 ? -6 : 6 },
      { autoAlpha: 1, y: 0, rotateX: 0, rotateY: 0, duration: 1, ease: 'power3.out' }
    )

    const number = card.querySelector('.chapter-card__number')
    if (number) {
      tl.fromTo(number,
        { scale: 0.4, autoAlpha: 0, rotateY: -90 },
        { scale: 1, autoAlpha: 1, rotateY: 0, duration: 0.6, ease: 'back.out(2)' },
        '-=0.7'
      )
    }

    const content = card.querySelector('.chapter-card__content')
    if (content) {
      const children = content.querySelectorAll('h3, p, a')
      tl.fromTo(children,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08, ease: 'power2.out' },
        '-=0.4'
      )
    }
  })
}

export function init() {
  animateHero()
  animateOrigin()
  animateSteps()
}
