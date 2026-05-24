import gsap from '../animation-engine.js'
import { ScrollTrigger } from '../animation-engine.js'
import { splitText } from '../text-split.js'
import {
  revealTextChars,
  revealImage,
  parallaxImage,
  staggerReveal,
  animateCounter,
  initMagneticButtons,
  initTiltCards,
  reducedMotion,
} from '../animation-utils.js'
import {
  animateSectionLabel,
  animateSectionTitle,
  animateParagraphs,
  animateStatItems,
  animateQuoteReveal,
  animateHeroParallax,
} from './shared.js'

gsap.registerPlugin(ScrollTrigger)

// ── HERO ──────────────────────────────────────
function animateHero() {
  const hero = document.querySelector('.hero')
  if (!hero) return

  const tl = gsap.timeline({ delay: 0.3 })

  // Tags slide in
  const tags = hero.querySelectorAll('.hero__label .tag')
  if (tags.length) {
    tl.fromTo(tags,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' }
    )
  }

  // Title: dramatic wave reveal
  const title = hero.querySelector('.hero__title')
  if (title) {
    const split = splitText(title, { type: 'chars', charsClass: 'hero-char' })
    if (split && split.chars.length) {
      if (!reducedMotion) {
        gsap.set(split.chars, { opacity: 0, y: 80, rotateX: -60, transformOrigin: 'center bottom' })
        tl.to(split.chars, {
          opacity: 1, y: 0, rotateX: 0,
          duration: 1.1,
          stagger: {
            each: 0.025,
            from: 'start',
          },
          ease: 'power3.out',
        }, '-=0.2')
      } else {
        gsap.set(split.chars, { opacity: 1 })
      }
    }
  }

  // Subtitle: clip-path wipe
  const subtitle = hero.querySelector('.hero__subtitle')
  if (subtitle) {
    gsap.set(subtitle, { clipPath: 'inset(0 100% 0 0)' })
    tl.to(subtitle, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1,
      ease: 'power2.inOut',
    }, '-=0.6')
  }

  // Buttons: elastic pop + magnetic init
  const buttons = hero.querySelectorAll('.hero__actions .btn')
  if (buttons.length) {
    tl.fromTo(buttons,
      { opacity: 0, scale: 0.75, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'elastic.out(1, 0.6)' },
      '-=0.5'
    )
    // Init magnetic after animation
    tl.call(() => initMagneticButtons('.hero__actions .btn'))
  }

  // Hero image: circle expand
  const imgWrap = hero.querySelector('.hero__img-wrap')
  if (imgWrap) {
    gsap.set(imgWrap, { clipPath: 'circle(0% at 50% 50%)' })
    tl.to(imgWrap, {
      clipPath: 'circle(75% at 50% 50%)',
      duration: 1.6,
      ease: 'power4.inOut',
    }, '-=1.1')
  }

  // Caption fade up
  const caption = hero.querySelector('.hero__img-caption')
  if (caption) {
    tl.fromTo(caption,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )
  }

  // Parallax
  animateHeroParallax(hero, { contentY: -80, imgScaleFrom: 1.2 })
}

// ── STATS ─────────────────────────────────────
function animateStats() {
  const stats = document.querySelector('.stats')
  if (!stats) return

  const statsContainer = stats.querySelector('.stats__container')
  if (!statsContainer) return

  animateStatItems(statsContainer, {
    y: 50,
    scale: 0.9,
    stagger: 0.12,
    ease: 'back.out(1.4)',
    borderColorTo: 'var(--accent)',
  })
}

// ── INTRO ─────────────────────────────────────
function animateIntro() {
  const section = document.querySelector('.intro__container')
  if (!section) return

  animateSectionLabel(section)
  animateSectionTitle(section, { rotateX: -15, y: 50 })
  animateParagraphs(section.querySelectorAll('.intro__lead, .intro__body'), { y: 30 })

  const quote = section.querySelector('.intro__quote')
  if (quote) animateQuoteReveal(quote)

  const imgBack = section.querySelector('.intro__img--back')
  const imgFront = section.querySelector('.intro__img--front')

  if (imgBack) {
    gsap.set(imgBack, { clipPath: 'inset(100% 0 0 0)' })
    gsap.to(imgBack, {
      clipPath: 'inset(0% 0 0 0)',
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: imgBack,
        start: 'top 90%',
        end: 'top 30%',
        scrub: 1,
      },
    })
    parallaxImage(imgBack, 10, {
      trigger: imgBack.parentElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    })
  }

  if (imgFront) {
    gsap.set(imgFront, { clipPath: 'inset(100% 0 0 0)' })
    gsap.to(imgFront, {
      clipPath: 'inset(0% 0 0 0)',
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: imgFront,
        start: 'top 88%',
        end: 'top 40%',
        scrub: 1,
      },
    })
    parallaxImage(imgFront, -8, {
      trigger: imgFront.parentElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    })
  }
}

// ── CITIES ────────────────────────────────────
function animateCities() {
  const container = document.querySelector('.cities__container')
  if (!container) return

  animateSectionLabel(container)
  animateSectionTitle(container, { stagger: 0.08, y: 40, rotateX: -10 })

  const cards = container.querySelectorAll('.city-card')
  cards.forEach((card) => {
    const img = card.querySelector('.city-card__img-wrap')
    const body = card.querySelector('.city-card__body')
    const flag = card.querySelector('.city-card__flag')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        once: true,
      },
    })

    tl.fromTo(card,
      { opacity: 0, y: 70, rotateY: -8 },
      { opacity: 1, y: 0, rotateY: 0, duration: 1, ease: 'power3.out' }
    )

    if (img) {
      gsap.set(img, { clipPath: 'inset(0 0 100% 0)' })
      tl.to(img, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.9,
        ease: 'power2.inOut',
      }, '-=0.8')

      gsap.to(img, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
    }

    if (flag) {
      tl.fromTo(flag,
        { scale: 0, rotation: -30 },
        { scale: 1, rotation: 0, duration: 0.55, ease: 'back.out(2.2)' },
        '-=0.4'
      )
    }

    if (body) {
      const children = body.querySelectorAll('.city-card__location, .city-card__name, .city-card__desc, .city-card__link')
      tl.fromTo(children,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: 'power2.out' },
        '-=0.5'
      )
    }
  })

  // Add 3D tilt to all city cards
  initTiltCards('.city-card')

  const mapContainer = container.querySelector('.cities-map-layout__map')
  if (mapContainer) {
    gsap.fromTo(mapContainer,
      { opacity: 0, scale: 0.92 },
      {
        opacity: 1, scale: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: mapContainer,
          start: 'top 85%',
          once: true,
        },
      }
    )
  }
}

// ── CTA ───────────────────────────────────────
function animateCTA() {
  const cta = document.querySelector('.cta')
  if (!cta) return

  const title = cta.querySelector('.cta__title')
  if (title) {
    const split = splitText(title, { type: 'words', wordsClass: 'cta-word' })
    if (split && split.words.length) {
      gsap.set(split.words, { opacity: 0, y: 60, scale: 0.85, rotateX: -20 })
      ScrollTrigger.create({
        trigger: title,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(split.words, {
            opacity: 1, y: 0, scale: 1, rotateX: 0,
            duration: 0.9,
            stagger: 0.04,
            ease: 'power3.out',
          })
        },
      })
    }
  }

  const sub = cta.querySelector('.cta__sub')
  if (sub) {
    gsap.fromTo(sub,
      { opacity: 0, y: 25 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sub,
          start: 'top 88%',
          once: true,
        },
      }
    )
  }

  const buttons = cta.querySelectorAll('.cta__actions .btn')
  if (buttons.length) {
    gsap.fromTo(buttons,
      { opacity: 0, scale: 0.8, y: 20 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'elastic.out(1, 0.6)',
        scrollTrigger: {
          trigger: buttons[0],
          start: 'top 88%',
          once: true,
        },
      }
    )
    initMagneticButtons('.cta__actions .btn')
  }

  const hashtags = cta.querySelectorAll('.hashtag')
  if (hashtags.length) {
    gsap.fromTo(hashtags,
      { opacity: 0, y: 40, rotation: () => gsap.utils.random(-12, 12), scale: 0.8 },
      {
        opacity: 1, y: 0, rotation: 0, scale: 1,
        duration: 0.8,
        stagger: {
          each: 0.08,
          from: 'random',
        },
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: cta.querySelector('.cta__tag-cloud'),
          start: 'top 88%',
          once: true,
        },
      }
    )
  }
}

export function init() {
  animateHero()
  // Stats section removed per request — now static text only
  // animateStats()
  animateIntro()
  animateCities()
  animateCTA()
}
