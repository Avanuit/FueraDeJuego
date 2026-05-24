import gsap from '../animation-engine.js'
import { ScrollTrigger } from '../animation-engine.js'
import { splitText } from '../text-split.js'
import {
  revealTextChars,
  revealImage,
  parallaxImage,
  staggerReveal,
  initMagneticButtons,
  reducedMotion,
} from '../animation-utils.js'
import {
  animateSectionLabel,
  animateSectionTitle,
} from './shared.js'

gsap.registerPlugin(ScrollTrigger)

function animateDigitalHero() {
  const hero = document.querySelector('.digital-hero')
  if (!hero) return

  const tl = gsap.timeline({ delay: 0.2 })

  const tag = hero.querySelector('.tag')
  if (tag) {
    tl.fromTo(tag, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' })
  }

  const title = hero.querySelector('.digital-hero__title')
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

  const sub = hero.querySelector('.digital-hero__sub')
  if (sub) {
    tl.fromTo(sub, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
  }

  const metaSpans = hero.querySelectorAll('.digital-hero__meta span')
  if (metaSpans.length) {
    tl.fromTo(metaSpans,
      { opacity: 0, y: 10, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.5)' },
      '-=0.3'
    )
  }
}

function animateHeroParallax() {
  const hero = document.querySelector('.digital-hero')
  if (!hero) return

  const heroImg = hero.querySelector('.digital-hero__img-wrap img')
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
      },
    })
  }
}

function animatePageEntries() {
  const entries = document.querySelectorAll('.page-entry')
  if (!entries.length) return

  entries.forEach((entry, i) => {
    const num = entry.querySelector('.page-entry__num')
    const img = entry.querySelector('.page-entry__img')
    const sep = entry.querySelector('.page-entry__sep')

    const tl = gsap.timeline({
      scrollTrigger: { trigger: entry, start: 'top 88%', once: true },
    })

    if (num) {
      tl.fromTo(num,
        { opacity: 0, y: 20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }
      )
    }

    if (img) {
      const direction = i % 2 === 0 ? 'up' : 'left'
      revealImage(img, direction, {
        duration: 1.1,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: img, start: 'top 85%', once: true },
      })

      parallaxImage(img, 6, {
        trigger: entry,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      })
    }

    if (sep) {
      tl.fromTo(sep,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.8, ease: 'power2.inOut' },
        '-=0.3'
      )
    }
  })
}

function animateFinalCTA() {
  const cta = document.querySelector('.final-cta')
  if (!cta) return

  const title = cta.querySelector('h2')
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
    initMagneticButtons('.final-cta .btn')
  }
}

export function init() {
  animateDigitalHero()
  animateHeroParallax()
  animatePageEntries()
  animateFinalCTA()
}
