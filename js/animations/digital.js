import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { splitText } from '../text-split.js'
import {
  animateSectionLabel,
  animateSectionTitle,
  animateParagraphs,
} from './shared.js'

gsap.registerPlugin(ScrollTrigger)

function animateDigitalHero() {
  const hero = document.querySelector('.digital-hero')
  if (!hero) return

  const tl = gsap.timeline({ delay: 0.3 })

  const tag = hero.querySelector('.digital-hero__tag')
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
      })
    }
  }

  const sub = hero.querySelector('.digital-hero__sub')
  if (sub) {
    tl.fromTo(sub, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
  }

  const meta = hero.querySelectorAll('.digital-hero__meta span')
  if (meta.length) {
    tl.fromTo(meta,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      '-=0.3'
    )
  }

  const imgWrap = hero.querySelector('.digital-hero__img-wrap')
  if (imgWrap) {
    gsap.set(imgWrap, { clipPath: 'circle(0% at 50% 50%)' })
    tl.to(imgWrap, { clipPath: 'circle(75% at 50% 50%)', duration: 1.4, ease: 'power4.inOut' }, '-=0.9')
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
        _persistent: true,
      },
    })
  }
}

function animatePageEntries() {
  const section = document.querySelector('.pages-section')
  if (section) {
    animateSectionLabel(section)
    animateSectionTitle(section, { y: 40, rotateX: -10 })
  }

  const entries = document.querySelectorAll('.page-entry')
  if (!entries.length) return

  entries.forEach((entry) => {
    const num = entry.querySelector('.page-entry__num')
    const img = entry.querySelector('.page-entry__img')
    const content = entry.querySelector('.page-entry__content')
    const title = content ? content.querySelector('h3') : null
    const text = content ? content.querySelector('p') : null

    const tl = gsap.timeline({
      scrollTrigger: { trigger: entry, start: 'top 88%', once: true },
    })

    tl.fromTo(entry,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )

    if (num) {
      tl.fromTo(num,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' },
        '-=0.5'
      )
    }

    if (img) {
      gsap.set(img, { clipPath: 'inset(0 0 100% 0)' })
      tl.to(img, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.9, ease: 'power2.inOut',
      }, '-=0.6')

      gsap.to(img, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: entry, start: 'top bottom', end: 'bottom top', scrub: 1, _persistent: true },
      })
    }

    if (title) {
      const split = splitText(title, { type: 'chars', charsClass: 'entry-char' })
      if (split && split.chars.length) {
        gsap.set(split.chars, { opacity: 0, y: 20 })
        tl.to(split.chars, {
          opacity: 1, y: 0,
          duration: 0.5, stagger: 0.02, ease: 'power3.out',
        }, '-=0.5')
      }
    }

    if (text) {
      tl.fromTo(text,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      )
    }
  })
}

function animateFinalCTA() {
  const cta = document.querySelector('.final-cta')
  if (!cta) return

  animateSectionLabel(cta, { start: 'top 85%' })
  animateSectionTitle(cta, { y: 40, rotateX: -10, start: 'top 85%' })

  const sub = cta.querySelector('p')
  if (sub) {
    gsap.fromTo(sub,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: sub, start: 'top 88%', once: true },
      }
    )
  }

  const buttons = cta.querySelectorAll('.btn')
  if (buttons.length) {
    gsap.fromTo(buttons,
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: buttons[0], start: 'top 88%', once: true },
      }
    )
  }
}

export function init() {
  animateDigitalHero()
  animateHeroParallax()
  animatePageEntries()
  animateFinalCTA()
}