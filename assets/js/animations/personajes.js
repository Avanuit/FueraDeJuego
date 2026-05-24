/* ==========================================================================
   ANIMACIONES DE PERSONAJES (assets/js/animations/personajes.js)
   Controla las revelaciones y efectos tridimensionales interactivos
   de las tarjetas de Lucía, Marcus y Aiyana.
   ========================================================================== */

import gsap from '../animation-engine.js'
import { ScrollTrigger } from '../animation-engine.js'
import { splitText } from '../text-split.js'
import {
  revealTextChars,
  staggerReveal,
  initTiltCards,
  initMagneticButtons,
  parallaxImage,
  reducedMotion,
} from '../animation-utils.js'
import {
  animateSectionLabel,
  animateSectionTitle,
  animateParagraphs,
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

function animateCharacterCards() {
  const cards = document.querySelectorAll('.char-card')
  if (!cards.length) return

  cards.forEach((card, i) => {
    const img = card.querySelector('.char-card__img')
    const body = card.querySelector('.char-card__body')
    const flag = card.querySelector('.char-card__flag')
    const name = card.querySelector('.char-card__name')
    const age = card.querySelector('.char-card__age')
    const represents = card.querySelector('.char-card__represents')
    const lema = card.querySelector('.char-card__lema')
    const backstory = card.querySelector('.char-card__backstory')
    const appearance = card.querySelector('.char-card__appearance')

    const tl = gsap.timeline({
      scrollTrigger: { trigger: card, start: 'top 88%', once: true },
    })

    if (img) {
      gsap.set(img, { clipPath: 'inset(0 0 100% 0)', scale: 1.05 })
      tl.to(img, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1,
        ease: 'power2.inOut',
      }, 0)
      tl.to(img, { scale: 1, duration: 1.2, ease: 'power2.out' }, '<')

      parallaxImage(img, 6, {
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      })
    }

    tl.fromTo(card,
      { opacity: 0, y: 70, rotateY: i % 2 === 0 ? -8 : 8 },
      { opacity: 1, y: 0, rotateY: 0, duration: 1, ease: 'power3.out' },
      '-=0.7'
    )

    if (flag) {
      tl.fromTo(flag,
        { scale: 0, rotation: -30 },
        { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2.2)' },
        '-=0.6'
      )
    }

    if (name) {
      const split = splitText(name, { type: 'chars', charsClass: 'char-name' })
      if (split && split.chars.length) {
        gsap.set(split.chars, { opacity: 0, y: 30 })
        tl.to(split.chars, {
          opacity: 1, y: 0,
          duration: 0.6,
          stagger: 0.02,
          ease: 'power2.out',
        }, '-=0.5')
      }
    }

    const textEls = [age, represents, lema, backstory, appearance].filter(Boolean)
    if (textEls.length) {
      tl.fromTo(textEls,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out' },
        '-=0.4'
      )
    }

    if (lema) {
      const lemaSplit = splitText(lema, { type: 'chars', charsClass: 'lema-char' })
      if (lemaSplit && lemaSplit.chars.length && !reducedMotion) {
        gsap.set(lemaSplit.chars, { opacity: 0 })
        tl.to(lemaSplit.chars, {
          opacity: 1,
          duration: 0.4,
          stagger: 0.02,
          ease: 'none',
        }, '-=0.3')
      }
    }
  })

  initTiltCards('.char-card')
}

function animateConnection() {
  const box = document.querySelector('.connection-box')
  if (!box) return

  gsap.set(box, { clipPath: 'inset(0 100% 0 0)' })

  const tl = gsap.timeline({
    scrollTrigger: { trigger: box, start: 'top 85%', once: true },
  })

  tl.to(box, {
    clipPath: 'inset(0 0% 0 0)',
    duration: 0.9,
    ease: 'power2.inOut',
  })

  const children = box.querySelectorAll('h3, p, .btn')
  tl.fromTo(children,
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
    '-=0.5'
  )

  initMagneticButtons('.connection-box .btn')
}

export function init() {
  animatePageHero()
  animateHeroParallaxWrapper()
  animateCharacterCards()
  animateConnection()
}
