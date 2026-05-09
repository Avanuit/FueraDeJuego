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
    tl.fromTo(tag,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
    )
  }

  const title = hero.querySelector('.page-hero__title')
  if (title) {
    const split = splitText(title, { type: 'chars', charsClass: 'hero-char' })
    if (split && split.chars.length) {
      gsap.set(split.chars, { opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' })
      tl.to(split.chars, {
        opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
        duration: 0.8,
        stagger: 0.025,
        ease: 'power3.out',
      }, '-=0.3')
    }
  }

  const sub = hero.querySelector('.page-hero__sub')
  if (sub) {
    tl.fromTo(sub,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.4'
    )
  }
}

function animateSinopsis() {
  const section = document.querySelector('.two-col')
  if (!section) return

  const textCol = section.querySelector('.two-col__text')
  const imgCol = section.querySelector('.two-col__image')

  if (textCol) {
    const label = textCol.querySelector('.section-label')
    if (label) {
      const split = splitText(label, { type: 'chars', charsClass: 'label-char' })
      if (split && split.chars.length) {
        gsap.set(split.chars, { opacity: 0, y: 20 })
        ScrollTrigger.create({
          trigger: label,
          start: 'top 88%',
          once: true,
          onEnter: () => gsap.to(split.chars, { opacity: 1, y: 0, duration: 0.5, stagger: 0.03, ease: 'power2.out' }),
        })
      }
    }

    const title = textCol.querySelector('.section-title')
    if (title) {
      const split = splitText(title, { type: 'words', wordsClass: 'title-word' })
      if (split && split.words.length) {
        gsap.set(split.words, { opacity: 0, y: 40 })
        ScrollTrigger.create({
          trigger: title,
          start: 'top 88%',
          once: true,
          onEnter: () => gsap.to(split.words, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: 'power3.out' }),
        })
      }
    }

    const paragraphs = textCol.querySelectorAll('p')
    if (paragraphs.length) {
      gsap.fromTo(paragraphs,
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: paragraphs[0], start: 'top 85%', once: true },
        }
      )
    }
  }

  if (imgCol) {
    const img = imgCol.querySelector('img')
    if (img) {
      gsap.set(img, { clipPath: 'inset(0 100% 0 0)' })
      gsap.to(img, {
        clipPath: 'inset(0 0% 0 0)',
        ease: 'power2.inOut',
        scrollTrigger: { trigger: imgCol, start: 'top 85%', end: 'top 30%', scrub: 1 },
      })

      gsap.to(img, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: imgCol, start: 'top bottom', end: 'bottom top', scrub: 1, _persistent: true },
      })
    }
  }
}

function animateChapters() {
  const grid = document.querySelector('.chapters__grid')
  if (!grid) return

  const cards = grid.querySelectorAll('.chapter-card')
  cards.forEach((card, i) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: card, start: 'top 88%', once: true },
    })

    tl.fromTo(card,
      { opacity: 0, y: 50, rotateX: 8 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.9, ease: 'power3.out' }
    )

    const number = card.querySelector('.chapter-card__number')
    if (number) {
      tl.fromTo(number,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' },
        '-=0.6'
      )
    }

    const content = card.querySelector('.chapter-card__content')
    if (content) {
      const children = content.querySelectorAll('h3, p, a')
      tl.fromTo(children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
        '-=0.4'
      )
    }
  })
}

function animateTransmedia() {
  const section = document.querySelector('.transmedia__flow')
  if (!section) return

  const steps = section.querySelectorAll('.flow-step')
  const arrows = section.querySelectorAll('.flow-arrow')

  steps.forEach((step, i) => {
    gsap.fromTo(step,
      { opacity: 0, y: 40, scale: 0.92 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: step, start: 'top 88%', once: true },
      }
    )
  })

  arrows.forEach((arrow, i) => {
    gsap.fromTo(arrow,
      { opacity: 0, scaleX: 0 },
      {
        opacity: 1, scaleX: 1,
        duration: 0.6,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: arrow, start: 'top 88%', once: true },
      }
    )
  })
}

function animateMetrics() {
  const grid = document.querySelector('.metrics__grid')
  if (!grid) return

  const items = grid.querySelectorAll('.metric-item')
  gsap.fromTo(items,
    { opacity: 0, y: 40, scale: 0.95 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.7,
      stagger: 0.15,
      ease: 'back.out(1.2)',
      scrollTrigger: { trigger: grid, start: 'top 85%', once: true },
    }
  )

  items.forEach((item) => {
    const value = item.querySelector('.metric-item__value')
    if (value) {
      const target = parseInt(value.textContent, 10)
      if (!isNaN(target) && target > 0) {
        const counter = { val: 0 }
        ScrollTrigger.create({
          trigger: value,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.to(counter, {
              val: target,
              duration: 2,
              ease: 'power2.out',
              onUpdate() { value.textContent = Math.round(counter.val) },
            })
          },
        })
      }
    }
  })
}

export function init() {
  animatePageHero()
  animateSinopsis()
  animateChapters()
  animateTransmedia()
  animateMetrics()
}
