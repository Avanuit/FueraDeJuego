/* ==========================================================================
   ANIMACIONES DE HISTORIA (assets/js/animations/historia.js)
   Maneja las revelaciones de las etapas del cómic y los contadores
   de la vista de Historia del proyecto.
   ========================================================================== */

import gsap from '../animation-engine.js'
import { ScrollTrigger } from '../animation-engine.js'
import { splitText } from '../text-split.js'
import {
  revealTextChars,
  revealTextWords,
  staggerReveal,
  animateCounter,
  drawSVG,
  initMagneticButtons,
  reducedMotion,
} from '../animation-utils.js'
import {
  animateSectionLabel,
  animateSectionTitle,
  animateParagraphs,
  createParallaxImage,
  animateStatItems,
  animateNumberCounter,
  animatePageHeroAdvanced,
  animateHeroParallax,
} from './shared.js'

gsap.registerPlugin(ScrollTrigger)

function animatePageHero() {
  animatePageHeroAdvanced(document.querySelector('.page-hero'))
}

function animateHeroParallaxWrapper() {
  animateHeroParallax(document.querySelector('.page-hero'))
}

function animateSinopsis() {
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

function animateChapters() {
  const grid = document.querySelector('.chapters__grid')
  if (!grid) return

  const cards = grid.querySelectorAll('.chapter-card')
  cards.forEach((card, i) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: card, start: 'top 88%', once: true },
    })

    tl.fromTo(card,
      { opacity: 0, y: 60, rotateX: 12, rotateY: i % 2 === 0 ? -6 : 6 },
      { opacity: 1, y: 0, rotateX: 0, rotateY: 0, duration: 1, ease: 'power3.out' }
    )

    const number = card.querySelector('.chapter-card__number')
    if (number) {
      tl.fromTo(number,
        { scale: 0.4, opacity: 0, rotateY: -90 },
        { scale: 1, opacity: 1, rotateY: 0, duration: 0.6, ease: 'back.out(2)' },
        '-=0.7'
      )
    }

    const content = card.querySelector('.chapter-card__content')
    if (content) {
      const children = content.querySelectorAll('h3, p, a')
      tl.fromTo(children,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: 'power2.out' },
        '-=0.4'
      )
    }

    const img = card.querySelector('.chapter-card__img')
    if (img) {
      gsap.set(img, { clipPath: 'inset(0 0 100% 0)' })
      tl.to(img, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.9,
        ease: 'power2.inOut',
      }, '-=0.8')
    }
  })
}

function animateTransmedia() {
  const section = document.querySelector('.transmedia__flow')
  if (!section) return

  animateSectionLabel(section)
  animateSectionTitle(section, { y: 40, rotateX: -10 })

  const steps = section.querySelectorAll('.flow-step')
  const arrows = section.querySelectorAll('.flow-arrow')

  steps.forEach((step, i) => {
    gsap.fromTo(step,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: step, start: 'top 88%', once: true },
      }
    )

    const icon = step.querySelector('.flow-step__icon')
    if (icon) {
      gsap.fromTo(icon,
        { scale: 0, rotation: -45 },
        {
          scale: 1, rotation: 0,
          duration: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: { trigger: step, start: 'top 85%', once: true },
        }
      )
    }
  })

  arrows.forEach((arrow) => {
    gsap.fromTo(arrow,
      { opacity: 0, scaleX: 0 },
      {
        opacity: 1, scaleX: 1,
        duration: 0.7,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: arrow, start: 'top 88%', once: true },
      }
    )
  })
}

function animateMetrics() {
  const grid = document.querySelector('.metrics__grid')
  if (!grid) return

  animateSectionLabel(grid.parentElement)
  animateSectionTitle(grid.parentElement, { y: 40, rotateX: -10 })

  const items = grid.querySelectorAll('.metric-item')
  gsap.fromTo(items,
    { opacity: 0, y: 50, scale: 0.92 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.4)',
      scrollTrigger: { trigger: grid, start: 'top 85%', once: true },
    }
  )

  items.forEach((item, i) => {
    const value = item.querySelector('.metric-item__value')
    if (value) {
      const text = value.textContent.trim()
      const match = text.match(/(\d+)/)
      if (match) {
        const target = parseInt(match[1], 10)
        const suffix = text.replace(/[\d,]/g, '')
        const counter = { val: 0 }
        ScrollTrigger.create({
          trigger: value,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.to(counter, {
              val: target,
              duration: 2.2,
              ease: 'power2.out',
              delay: i * 0.15,
              onUpdate() {
                value.textContent = Math.round(counter.val).toLocaleString() + suffix
              },
            })
          },
        })
      }
    }
  })
}

export function init() {
  animatePageHero()
  animateHeroParallaxWrapper()
  animateSinopsis()
  animateChapters()
  animateTransmedia()
  animateMetrics()
}
