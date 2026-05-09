import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { splitText } from '../text-split.js'
import {
  animateSectionLabel,
  animateSectionTitle,
  animateParagraphs,
  createParallaxImage,
  animateStatItems,
  animateNumberCounter,
  animateCTA,
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

function animateSinopsis() {
  const section = document.querySelector('.two-col')
  if (!section) return

  const textCol = section.querySelector('.two-col__text')
  const imgCol = section.querySelector('.two-col__image')

  if (textCol) {
    animateSectionLabel(textCol)
    animateSectionTitle(textCol, { y: 40, rotateX: -15 })
    animateParagraphs(textCol.querySelectorAll('p'), { y: 25 })
  }

  if (imgCol) {
    const img = imgCol.querySelector('img')
    if (img) {
      createParallaxImage(img, {
        clipPathStart: 'inset(0 100% 0 0)',
        yPercentPositive: 10,
      })
    }
  }
}

function animateChapters() {
  const grid = document.querySelector('.chapters__grid')
  if (!grid) return

  const cards = grid.querySelectorAll('.chapter-card')
  cards.forEach((card) => {
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

    const img = card.querySelector('.chapter-card__img')
    if (img) {
      gsap.set(img, { clipPath: 'inset(0 0 100% 0)' })
      tl.to(img, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.8,
        ease: 'power2.inOut',
      }, '-=0.7')
    }
  })
}

function animateTransmedia() {
  const section = document.querySelector('.transmedia__flow')
  if (!section) return

  animateSectionLabel(section)
  animateSectionTitle(section, { y: 40, rotateX: -10 })

  const steps = section.querySelectorAll('.flow-step')
  const arrows = section.querySelectorAll('.flow-arrow')

  steps.forEach((step) => {
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

  arrows.forEach((arrow) => {
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

  animateSectionLabel(grid.parentElement)
  animateSectionTitle(grid.parentElement, { y: 40, rotateX: -10 })

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

  items.forEach((item, i) => {
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
              delay: i * 0.15,
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
  animateHeroParallax()
  animateSinopsis()
  animateChapters()
  animateTransmedia()
  animateMetrics()
}
