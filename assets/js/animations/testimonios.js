/* ==========================================================================
   ANIMACIONES DE TESTIMONIOS (assets/js/animations/testimonios.js)
   Controla la revelación del formulario y el ingreso estético de las tarjetas de testimonios.
   ========================================================================== */

import gsap from '../animation-engine.js'
import { ScrollTrigger } from '../animation-engine.js'
import { splitText } from '../text-split.js'
import {
  staggerReveal,
  animateCounter,
  drawSVG,
  initMagneticButtons,
  initTiltCards,
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

function animateUnlockBanner() {
  const box = document.querySelector('.unlock-box')
  if (!box) return

  gsap.set(box, { opacity: 0, y: 40, scale: 0.96 })
  gsap.to(box, {
    opacity: 1, y: 0, scale: 1,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: { trigger: box, start: 'top 85%', once: true },
  })

  const icon = box.querySelector('.unlock-box__icon')
  if (icon) {
    gsap.fromTo(icon,
      { scale: 0, rotation: -20 },
      {
        scale: 1, rotation: 0,
        duration: 0.5,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: icon, start: 'top 88%', once: true },
      }
    )
  }

  const ring = box.querySelector('.progress-ring circle:last-child')
  if (ring) {
    const circumference = 2 * Math.PI * 25
    gsap.set(ring, { strokeDasharray: circumference, strokeDashoffset: circumference })
    gsap.to(ring, {
      strokeDashoffset: circumference * (1 - 0.4),
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: { trigger: ring, start: 'top 88%', once: true },
    })
  }
}

function animateFormSection() {
  const info = document.querySelector('.form-info')
  if (info) {
    animateSectionLabel(info)
    animateSectionTitle(info, { y: 35, rotateX: -10 })
    animateParagraphs(info.querySelectorAll('p'), { y: 20 })
  }

  const benefits = document.querySelectorAll('.benefit')
  benefits.forEach((benefit) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: benefit, start: 'top 88%', once: true },
    })

    tl.fromTo(benefit,
      { opacity: 0, x: -25 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
    )

    const icon = benefit.querySelector('.benefit__icon')
    if (icon) {
      tl.fromTo(icon,
        { scale: 0, rotation: -20 },
        { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)' },
        '-=0.3'
      )
    }
  })

  const form = document.querySelector('.testimony-form')
  if (form) {
    const groups = form.querySelectorAll('.form-group')
    gsap.fromTo(groups,
      { opacity: 0, y: 25 },
      {
        opacity: 1, y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: form, start: 'top 88%', once: true },
      }
    )

    const submitBtn = form.querySelector('#submitBtn')
    if (submitBtn) {
      gsap.fromTo(submitBtn,
        { opacity: 0, scale: 0.9, y: 15 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 0.6,
          ease: 'back.out(1.5)',
          scrollTrigger: { trigger: submitBtn, start: 'top 90%', once: true },
        }
      )
      initMagneticButtons('#submitBtn')
    }
  }
}

function animateTestimonials() {
  const cards = document.querySelectorAll('.testimonial-card')
  if (!cards.length) return

  cards.forEach((card) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: card, start: 'top 88%', once: true },
    })

    tl.fromTo(card,
      { opacity: 0, y: 50, rotation: -2 },
      { opacity: 1, y: 0, rotation: 0, duration: 0.9, ease: 'power3.out' }
    )

    const avatar = card.querySelector('.testimonial-card__avatar')
    if (avatar) {
      gsap.set(avatar, { clipPath: 'circle(0% at 50% 50%)' })
      tl.to(avatar, {
        clipPath: 'circle(50% at 50% 50%)',
        duration: 0.7,
        ease: 'power2.inOut',
      }, '-=0.6')
    }

    const header = card.querySelector('.testimonial-card__header')
    if (header) {
      tl.fromTo(header,
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      )
    }

    const body = card.querySelector('p')
    if (body) {
      tl.fromTo(body,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      )
    }

    const tag = card.querySelector('.testimonial-card__tag')
    if (tag) {
      tl.fromTo(tag,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
        '-=0.2'
      )
    }
  })

  initTiltCards('.testimonial-card')
}

export function init() {
  animatePageHero()
  animateHeroParallaxWrapper()
  animateUnlockBanner()
  animateFormSection()
  animateTestimonials()
}
