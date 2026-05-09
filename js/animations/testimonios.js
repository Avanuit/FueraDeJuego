import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { splitText } from '../text-split.js'
import {
  animateSectionLabel,
  animateSectionTitle,
  animateParagraphs,
} from './shared.js'

gsap.registerPlugin(ScrollTrigger)

function animatePageHero() {
  const hero = document.querySelector('.page-hero')
  if (!hero) return

  const tl = gsap.timeline({ delay: 0.2 })

  const tag = hero.querySelector('.tag')
  if (tag) {
    tl.fromTo(tag, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' })
  }

  const title = hero.querySelector('.page-hero__title')
  if (title) {
    const split = splitText(title, { type: 'chars', charsClass: 'hero-char' })
    if (split && split.chars.length) {
      gsap.set(split.chars, { opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' })
      tl.to(split.chars, {
        opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
        duration: 0.8, stagger: 0.025, ease: 'power3.out',
      }, '-=0.3')
    }
  }

  const sub = hero.querySelector('.page-hero__sub')
  if (sub) {
    tl.fromTo(sub, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
  }

  const imgWrap = hero.querySelector('.page-hero__img-wrap')
  if (imgWrap) {
    gsap.set(imgWrap, { clipPath: 'circle(0% at 50% 50%)' })
    tl.to(imgWrap, { clipPath: 'circle(75% at 50% 50%)', duration: 1.4, ease: 'power4.inOut' }, '-=0.9')
  }
}

function animateHeroParallax() {
  const hero = document.querySelector('.page-hero')
  if (!hero) return

  const heroImg = hero.querySelector('.page-hero__img-wrap img')
  if (heroImg) {
    gsap.set(heroImg, { scale: 1.15 })
    gsap.to(heroImg, {
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        _persistent: true,
      },
    })
  }
}

function animateUnlockBanner() {
  const box = document.querySelector('.unlock-box')
  if (!box) return

  const label = box.querySelector('.section-label')
  const title = box.querySelector('.section-title')
  if (label) animateSectionLabel(box, { start: 'top 85%' })
  if (title) animateSectionTitle(box, { y: 40, rotateX: -10, start: 'top 85%' })

  gsap.fromTo(box,
    { opacity: 0, y: 30 },
    {
      opacity: 1, y: 0,
      duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: box, start: 'top 85%', once: true },
    }
  )

  const ring = box.querySelector('.progress-ring circle')
  if (ring) {
    const circumference = 2 * Math.PI * 40
    const progress = parseFloat(ring.style.getPropertyValue('--progress')) || 0.25
    const offset = circumference * (1 - progress)

    gsap.set(ring, { strokeDasharray: circumference, strokeDashoffset: circumference })
    gsap.to(ring, {
      strokeDashoffset: offset,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: ring, start: 'top 85%', once: true },
    })
  }

  const icon = box.querySelector('.unlock-box__icon')
  if (icon) {
    gsap.fromTo(icon,
      { scale: 0, rotation: -20 },
      {
        scale: 1, rotation: 0,
        duration: 0.6, ease: 'back.out(2)',
        scrollTrigger: { trigger: box, start: 'top 85%', once: true },
      }
    )
  }
}

function animateFormSection() {
  const formInfo = document.querySelector('.form-info')
  if (formInfo) {
    animateSectionLabel(formInfo)
    animateSectionTitle(formInfo, { y: 40, rotateX: -10 })

    const paragraphs = formInfo.querySelectorAll('p')
    if (paragraphs.length) {
      animateParagraphs(paragraphs, { y: 20 })
    }

    const benefits = formInfo.querySelectorAll('.benefit')
    if (benefits.length) {
      benefits.forEach((benefit) => {
        const icon = benefit.querySelector('.benefit__icon')
        gsap.fromTo(benefit,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: benefit, start: 'top 88%', once: true },
          }
        )
        if (icon) {
          gsap.fromTo(icon,
            { scale: 0 },
            {
              scale: 1, duration: 0.5, ease: 'back.out(2)',
              scrollTrigger: { trigger: benefit, start: 'top 88%', once: true },
            }
          )
        }
      })
    }
  }

  const form = document.querySelector('.testimony-form')
  if (form) {
    const groups = form.querySelectorAll('.form-group')
    gsap.fromTo(groups,
      { opacity: 0, x: 30 },
      {
        opacity: 1, x: 0,
        duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: form, start: 'top 85%', once: true },
      }
    )

    const submitBtn = form.querySelector('#submitBtn')
    if (submitBtn) {
      gsap.fromTo(submitBtn,
        { opacity: 0, scale: 0.9, y: 15 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 0.6, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: submitBtn, start: 'top 90%', once: true },
        }
      )
    }
  }
}

function animateTestimonials() {
  const section = document.querySelector('.testimonials-section')
  if (section) {
    animateSectionLabel(section)
    animateSectionTitle(section, { y: 40, rotateX: -10 })
  }

  const cards = document.querySelectorAll('.testimonial-card')
  if (!cards.length) return

  cards.forEach((card) => {
    const avatar = card.querySelector('.testimonial-card__avatar')
    const img = avatar ? avatar.querySelector('img') : null

    const tl = gsap.timeline({
      scrollTrigger: { trigger: card, start: 'top 88%', once: true },
    })

    tl.fromTo(card,
      { opacity: 0, y: 60, rotation: -1.5 },
      { opacity: 1, y: 0, rotation: 0, duration: 0.8, ease: 'back.out(1.2)' }
    )

    if (img) {
      gsap.set(img, { clipPath: 'circle(0% at 50% 50%)', scale: 1.2 })
      tl.to(img, {
        clipPath: 'circle(50% at 50% 50%)',
        scale: 1,
        duration: 0.8,
        ease: 'power2.inOut',
      }, '-=0.5')
    } else if (avatar) {
      gsap.set(avatar, { clipPath: 'circle(0% at 50% 50%)' })
      tl.to(avatar, {
        clipPath: 'circle(50% at 50% 50%)',
        duration: 0.6, ease: 'power2.inOut',
      }, '-=0.5')
    }

    const header = card.querySelector('.testimonial-card__header')
    const body = card.querySelector('p')
    const tag = card.querySelector('.testimonial-card__tag')

    if (header) {
      tl.fromTo(header, { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, '-=0.4')
    }
    if (body) {
      tl.fromTo(body, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3')
    }
    if (tag) {
      tl.fromTo(tag, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, '-=0.2')
    }

    if (img) {
      gsap.to(img, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1, _persistent: true },
      })
    }
  })
}

export function init() {
  animatePageHero()
  animateHeroParallax()
  animateUnlockBanner()
  animateFormSection()
  animateTestimonials()
}