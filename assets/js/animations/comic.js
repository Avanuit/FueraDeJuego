/* ==========================================================================
   ANIMACIONES DE CÓMIC (assets/js/animations/comic.js)
   Controla las revelaciones de la portada y la navegación del cómic impreso.
   ========================================================================== */

import gsap from '../animation-engine.js'
import { ScrollTrigger } from '../animation-engine.js'
import { splitText } from '../text-split.js'
import {
  staggerReveal,
  initMagneticButtons,
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

function animateComicViewer() {
  const wrapper = document.querySelector('.comic-book-wrapper')
  if (!wrapper) return

  gsap.set(wrapper, { opacity: 0, rotateY: -15, scale: 0.9, transformPerspective: 2000 })
  gsap.to(wrapper, {
    opacity: 1, rotateY: 0, scale: 1,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: wrapper,
      start: 'top 85%',
      once: true,
    },
  })

  const controls = document.querySelector('.comic-controls')
  if (controls) {
    gsap.fromTo(controls,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: controls, start: 'top 90%', once: true },
      }
    )
  }

  const thumbs = document.querySelectorAll('.comic-thumb')
  if (thumbs.length) {
    gsap.fromTo(thumbs,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1, scale: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: thumbs[0].parentElement,
          start: 'top 90%',
          once: true,
        },
      }
    )
  }
}

function animateInfoCards() {
  const cards = document.querySelectorAll('.comic-info-card')
  if (!cards.length) return

  const section = cards[0].closest('section')
  if (section) {
    animateSectionLabel(section)
    animateSectionTitle(section, { y: 35, rotateX: -10 })
  }

  cards.forEach((card, i) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: card, start: 'top 88%', once: true },
    })

    tl.fromTo(card,
      { opacity: 0, y: 50, rotateX: 10 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.9, ease: 'power3.out' }
    )

    const icon = card.querySelector('.comic-info-card__icon')
    if (icon) {
      tl.fromTo(icon,
        { scale: 0, rotation: -30 },
        { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)' },
        '-=0.5'
      )
    }

    const title = card.querySelector('h4')
    if (title) {
      const split = splitText(title, { type: 'chars', charsClass: 'info-char' })
      if (split && split.chars.length) {
        gsap.set(split.chars, { opacity: 0, y: 20 })
        tl.to(split.chars, {
          opacity: 1, y: 0,
          duration: 0.4,
          stagger: 0.015,
          ease: 'power2.out',
        }, '-=0.3')
      }
    }
  })
}

function animateComicCTA() {
  const cta = document.querySelector('.comic-cta__inner')
  if (!cta) return

  const title = cta.querySelector('h3')
  if (title) {
    const split = splitText(title, { type: 'words', wordsClass: 'cta-word' })
    if (split && split.words.length) {
      gsap.set(split.words, { opacity: 0, y: 40, rotateX: -15 })
      ScrollTrigger.create({
        trigger: title,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(split.words, {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power3.out',
          })
        },
      })
    }
  }

  const sub = cta.querySelector('p')
  if (sub) {
    gsap.fromTo(sub,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: sub, start: 'top 88%', once: true },
      }
    )
  }

  const buttons = cta.querySelectorAll('.btn')
  if (buttons.length) {
    gsap.fromTo(buttons,
      { opacity: 0, scale: 0.85, y: 15 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'back.out(1.5)',
        scrollTrigger: { trigger: buttons[0], start: 'top 88%', once: true },
      }
    )
    initMagneticButtons('.comic-cta__inner .btn')
  }
}

export function init() {
  animatePageHero()
  animateHeroParallaxWrapper()
  animateComicViewer()
  animateInfoCards()
  animateComicCTA()
}
