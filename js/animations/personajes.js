import gsap from '../animation-engine.js'
import { ScrollTrigger } from '../animation-engine.js'
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

function animateCharacterCards() {
  const cards = document.querySelectorAll('.char-card')
  if (!cards.length) return

  cards.forEach((card) => {
    const img = card.querySelector('.char-card__img')
    const flag = card.querySelector('.char-card__flag')
    const name = card.querySelector('.char-card__name')
    const meta = card.querySelectorAll('.char-card__age, .char-card__represents')
    const lema = card.querySelector('.char-card__lema')
    const texts = card.querySelectorAll('.char-card__backstory, .char-card__appearance')

    const tl = gsap.timeline({
      scrollTrigger: { trigger: card, start: 'top 85%', once: true },
    })

    if (img) {
      gsap.set(img, { clipPath: 'inset(50% 50% 50% 50%)', scale: 1.15 })
      tl.to(img, {
        clipPath: 'inset(0% 0% 0% 0%)', scale: 1,
        duration: 1.2, ease: 'power4.inOut',
      })
    }

    tl.fromTo(card,
      { opacity: 0, y: 50, rotateY: -5 },
      { opacity: 1, y: 0, rotateY: 0, duration: 0.9, ease: 'power3.out' },
      '<'
    )

    if (flag) {
      tl.fromTo(flag,
        { scale: 0, rotation: -20 },
        { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(3)' },
        '-=0.5'
      )
    }

    if (name) {
      const split = splitText(name, { type: 'chars', charsClass: 'char-name' })
      if (split && split.chars.length) {
        gsap.set(split.chars, { opacity: 0, y: 30 })
        tl.to(split.chars, {
          opacity: 1, y: 0,
          duration: 0.7, stagger: 0.03, ease: 'power3.out',
        }, '-=0.4')
      }
    }

    if (meta.length) {
      tl.fromTo(meta,
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        '-=0.3'
      )
    }

    if (lema) {
      tl.fromTo(lema,
        { opacity: 0, scaleX: 0.8 },
        { opacity: 1, scaleX: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      )
    }

    if (texts.length) {
      tl.fromTo(texts,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' },
        '-=0.3'
      )
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

function animateConnection() {
  const box = document.querySelector('.connection-box')
  if (!box) return

  const label = box.querySelector('.section-label')
  const title = box.querySelector('.section-title')
  if (label) animateSectionLabel(box, { start: 'top 85%' })
  if (title) animateSectionTitle(box, { y: 40, rotateX: -10, start: 'top 85%' })

  gsap.set(box, { clipPath: 'inset(0 100% 0 0)' })
  gsap.to(box, {
    clipPath: 'inset(0 0% 0 0)',
    duration: 1,
    ease: 'power2.inOut',
    scrollTrigger: { trigger: box, start: 'top 85%', once: true },
  })

  const children = box.querySelectorAll('h3, p, a')
  gsap.fromTo(children,
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: box, start: 'top 80%', once: true },
    }
  )
}

export function init() {
  animatePageHero()
  animateHeroParallax()
  animateCharacterCards()
  animateConnection()
}