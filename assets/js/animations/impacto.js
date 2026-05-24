/* ==========================================================================
   CONTROLADOR DE ANIMACIONES PARA LA PÁGINA DE IMPACTO (assets/js/animations/impacto.js)
   Este módulo ejecuta las secuencias de animación específicas para la vista
   de impacto, controlando contadores de estadísticas y revelaciones progresivas.
   ========================================================================== */

import gsap from '../animation-engine.js'
import { ScrollTrigger } from '../animation-engine.js'
import {
  animateSectionLabel,
  animateSectionTitle,
  animateParagraphs,
  createParallaxImage,
  animateStatItems,
  animatePageHeroAdvanced,
} from './shared.js'

gsap.registerPlugin(ScrollTrigger)

function animateHero() {
  animatePageHeroAdvanced(document.querySelector('.page-hero'))
}

function animateCaseStudy() {
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

function animateStats() {
  const grid = document.querySelector('.metrics__grid')
  if (!grid) return

  animateSectionLabel(grid.parentElement)
  animateSectionTitle(grid.parentElement, { y: 40, rotateX: -10 })

  const items = grid.querySelectorAll('.metric-item')
  gsap.fromTo(items,
    { autoAlpha: 0, y: 50, scale: 0.92 },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
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

function animateHistoryFlow() {
  const section = document.querySelector('.transmedia__flow')
  if (!section) return

  animateSectionLabel(section.parentElement)
  animateSectionTitle(section.parentElement, { y: 40, rotateX: -10 })

  const steps = section.querySelectorAll('.flow-step')
  const arrows = section.querySelectorAll('.flow-arrow')

  steps.forEach((step, i) => {
    gsap.fromTo(step,
      { autoAlpha: 0, y: 50, scale: 0.9 },
      {
        autoAlpha: 1, y: 0, scale: 1,
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
      { autoAlpha: 0, scaleX: 0 },
      {
        autoAlpha: 1, scaleX: 1,
        duration: 0.7,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: arrow, start: 'top 88%', once: true },
      }
    )
  })
}

export function init() {
  animateHero()
  animateCaseStudy()
  animateStats()
  animateHistoryFlow()
}
