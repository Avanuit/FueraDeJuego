/* ==========================================================================
   ANIMACIONES DEL MAPA INMERSIVO (assets/js/animations/mapa.js)
   Controla la presentación interactiva y transiciones de la sección
   del mapa de testimonios.
   ========================================================================== */

import gsap from '../animation-engine.js'
import { ScrollTrigger } from '../animation-engine.js'
import {
  revealTextChars,
  staggerReveal,
  animateCounter,
  drawSVG,
  reducedMotion,
} from '../animation-utils.js'
import {
  animateSectionLabel,
  animateSectionTitle,
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

function animateMapSection() {
  const mapEl = document.querySelector('#leafletMap')
  if (!mapEl) return

  gsap.fromTo(mapEl,
    { opacity: 0, scale: 0.95 },
    {
      opacity: 1, scale: 1,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: mapEl,
        start: 'top 85%',
        once: true,
      },
    }
  )

  const legend = document.querySelector('.map-legend')
  if (legend) {
    const items = legend.querySelectorAll('.legend-item')
    gsap.fromTo(items,
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: legend,
          start: 'top 88%',
          once: true,
        },
      }
    )
  }
}

function animateDataCards() {
  const cards = document.querySelectorAll('.data-card')
  if (!cards.length) return

  cards.forEach((card) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: card, start: 'top 88%', once: true },
    })

    tl.fromTo(card,
      { opacity: 0, y: 50, rotateY: -4 },
      { opacity: 1, y: 0, rotateY: 0, duration: 0.9, ease: 'power3.out' }
    )

    const bars = card.querySelectorAll('.bar-fill')
    bars.forEach((bar) => {
      const width = bar.style.getPropertyValue('--w') || '0%'
      gsap.set(bar, { scaleX: 0, transformOrigin: 'left' })
      tl.to(bar, {
        scaleX: 1,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=0.6')
    })

    const bigNumbers = card.querySelectorAll('.big-number__val')
    bigNumbers.forEach((num) => {
      const text = num.textContent.trim()
      const match = text.match(/[\d,.]+/)
      if (match) {
        const raw = match[0].replace(/,/g, '')
        const target = parseInt(raw, 10)
        const suffix = text.replace(/[\d,.]/g, '')
        if (!isNaN(target)) {
          const counter = { val: 0 }
          ScrollTrigger.create({
            trigger: num,
            start: 'top 88%',
            once: true,
            onEnter: () => {
              gsap.to(counter, {
                val: target,
                duration: 2.2,
                ease: 'power2.out',
                onUpdate() {
                  num.textContent = Math.round(counter.val).toLocaleString() + suffix
                },
              })
            },
          })
        }
      }
    })

    const contrastItems = card.querySelectorAll('.contrast-item')
    contrastItems.forEach((item, i) => {
      const clipFrom = i % 2 === 0
        ? 'inset(0 0 100% 0)'
        : 'inset(100% 0 0 0)'
      gsap.set(item, { clipPath: clipFrom })
      tl.to(item, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.7,
        ease: 'power2.inOut',
      }, '-=0.5')
    })
  })
}

function animateEvidence() {
  const items = document.querySelectorAll('.evidence-item')
  if (!items.length) return

  const directions = ['left', 'up', 'right']

  items.forEach((item, i) => {
    const dir = directions[i % directions.length]
    const img = item.querySelector('img')
    const caption = item.querySelector('figcaption')

    const tl = gsap.timeline({
      scrollTrigger: { trigger: item, start: 'top 88%', once: true },
    })

    if (img) {
      const clipPaths = {
        left: { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' },
        up: { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' },
        right: { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' },
      }
      const clip = clipPaths[dir]
      gsap.set(img, { clipPath: clip.from })
      tl.to(img, {
        clipPath: clip.to,
        duration: 1,
        ease: 'power2.inOut',
      }, 0)

      gsap.to(img, {
        yPercent: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }

    if (caption) {
      tl.fromTo(caption,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )
    }
  })
}

export function init() {
  animatePageHero()
  animateHeroParallaxWrapper()
  animateMapSection()
  animateDataCards()
  animateEvidence()
}
