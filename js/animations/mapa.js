import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { splitText } from '../text-split.js'
import {
  animateSectionLabel,
  animateSectionTitle,
  animateParagraphs,
  animateNumberCounter,
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

function animateMapSection() {
  const mapWrapper = document.querySelector('.map-wrapper--leaflet')
  if (!mapWrapper) return

  const label = mapWrapper.parentElement.querySelector('.section-label')
  const title = mapWrapper.parentElement.querySelector('.section-title')

  if (label) animateSectionLabel(mapWrapper.parentElement)
  if (title) animateSectionTitle(mapWrapper.parentElement, { y: 40, rotateX: -10 })

  const mapEl = mapWrapper.querySelector('#leafletMap')
  const legend = mapWrapper.querySelector('.map-legend')

  if (mapEl) {
    gsap.fromTo(mapEl,
      { opacity: 0, scale: 0.93 },
      {
        opacity: 1, scale: 1,
        duration: 1.2, ease: 'power2.out',
        scrollTrigger: { trigger: mapEl, start: 'top 85%', once: true },
      }
    )
  }

  if (legend) {
    gsap.fromTo(legend,
      { opacity: 0, x: 40 },
      {
        opacity: 1, x: 0,
        duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: legend, start: 'top 85%', once: true },
      }
    )

    const dots = legend.querySelectorAll('.legend-dot')
    if (dots.length) {
      gsap.fromTo(dots,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.4, stagger: 0.1, ease: 'back.out(2)',
          scrollTrigger: { trigger: legend, start: 'top 85%', once: true },
        }
      )
    }
  }
}

function animateDataCards() {
  const grid = document.querySelector('.data-grid')
  if (!grid) return

  animateSectionLabel(grid.parentElement)
  animateSectionTitle(grid.parentElement, { y: 40, rotateX: -10 })

  const cards = grid.querySelectorAll('.data-card')
  cards.forEach((card) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: card, start: 'top 88%', once: true },
    })

    tl.fromTo(card,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )

    const bars = card.querySelectorAll('.bar-item')
    if (bars.length) {
      bars.forEach((bar) => {
        const width = bar.style.width || '0%'
        gsap.set(bar, { width: '0%' })
        tl.to(bar, {
          width: width,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.5')
      })
    }

    const bigNumbers = card.querySelectorAll('.big-number')
    if (bigNumbers.length) {
      bigNumbers.forEach((num) => {
        const text = num.textContent
        const match = text.match(/(\d+)/)
        if (match) {
          const target = parseInt(match[1], 10)
          const prefix = text.slice(0, text.indexOf(match[1]))
          const suffix = text.slice(text.indexOf(match[1]) + match[1].length)

          tl.fromTo(num,
            { textContent: 0 },
            {
              textContent: target,
              duration: 1.5,
              ease: 'power2.out',
              snap: { textContent: 1 },
              onUpdate() {
                num.textContent = prefix + Math.round(gsap.getProperty(num, 'textContent')) + suffix
              },
            },
            '-=0.6'
          )
        }
      })
    }

    const contrastItems = card.querySelectorAll('.contrast-item')
    if (contrastItems.length) {
      tl.fromTo(contrastItems[0],
        { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power2.inOut' },
        '-=0.5'
      )
      if (contrastItems[1]) {
        tl.fromTo(contrastItems[1],
          { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
          { opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.7, ease: 'power2.inOut' },
          '-=0.5'
        )
      }
    }
  })
}

function animateEvidence() {
  const section = document.querySelector('.evidence-section')
  if (section) {
    animateSectionLabel(section)
    animateSectionTitle(section, { y: 40, rotateX: -10 })
  }

  const items = document.querySelectorAll('.evidence-item')
  if (!items.length) return

  const clipPaths = [
    'inset(0 100% 0 0)',
    'inset(0 0 100% 0)',
    'inset(0 0 0 100%)',
  ]

  items.forEach((item, i) => {
    const img = item.querySelector('img')
    const caption = item.querySelector('figcaption')

    const tl = gsap.timeline({
      scrollTrigger: { trigger: item, start: 'top 88%', once: true },
    })

    if (img) {
      gsap.set(img, { clipPath: clipPaths[i % clipPaths.length] })
      tl.to(img, {
        clipPath: 'inset(0 0 0 0)',
        duration: 1,
        ease: 'power2.inOut',
      })

      gsap.to(img, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: 1, _persistent: true },
      })
    }

    if (caption) {
      tl.fromTo(caption,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      )
    }
  })
}

export function init() {
  animatePageHero()
  animateHeroParallax()
  animateMapSection()
  animateDataCards()
  animateEvidence()
}