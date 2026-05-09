import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { splitText } from '../text-split.js'

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
  animateCharacterCards()
  animateConnection()
}
