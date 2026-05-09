import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { splitText } from '../text-split.js'

gsap.registerPlugin(ScrollTrigger)

function animateHero() {
  const hero = document.querySelector('.hero')
  if (!hero) return

  const tl = gsap.timeline({ delay: 0.3 })

  const tags = hero.querySelectorAll('.hero__label .tag')
  if (tags.length) {
    tl.fromTo(tags,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' }
    )
  }

  const title = hero.querySelector('.hero__title')
  if (title) {
    const split = splitText(title, { type: 'chars', charsClass: 'hero-char' })
    if (split && split.chars.length) {
      gsap.set(split.chars, { opacity: 0, y: 60, rotateX: -40 })
      tl.to(split.chars, {
        opacity: 1, y: 0, rotateX: 0,
        duration: 0.9,
        stagger: 0.02,
        ease: 'power3.out',
      }, '-=0.3')
    }
  }

  const subtitle = hero.querySelector('.hero__subtitle')
  if (subtitle) {
    gsap.set(subtitle, { clipPath: 'inset(0 100% 0 0)' })
    tl.to(subtitle, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1,
      ease: 'power2.inOut',
    }, '-=0.5')
  }

  const buttons = hero.querySelectorAll('.hero__actions .btn')
  if (buttons.length) {
    tl.fromTo(buttons,
      { opacity: 0, scale: 0.85, y: 15 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)' },
      '-=0.4'
    )
  }

  const imgWrap = hero.querySelector('.hero__img-wrap')
  if (imgWrap) {
    gsap.set(imgWrap, { clipPath: 'circle(0% at 50% 50%)' })
    tl.to(imgWrap, {
      clipPath: 'circle(75% at 50% 50%)',
      duration: 1.4,
      ease: 'power4.inOut',
    }, '-=0.9')
  }

  const caption = hero.querySelector('.hero__img-caption')
  if (caption) {
    tl.fromTo(caption,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )
  }

  gsap.to('.hero__content', {
    y: -60,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      _persistent: true,
    },
  })

  const heroImg = hero.querySelector('.hero__img-wrap img')
  if (heroImg) {
    gsap.set(heroImg, { scale: 1.15 })
    gsap.to(heroImg, {
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        _persistent: true,
      },
    })
  }
}

function animateStats() {
  const stats = document.querySelector('.stats')
  if (!stats) return

  const statsContainer = stats.querySelector('.stats__container')
  if (!statsContainer) return

  const statItems = statsContainer.querySelectorAll('.stat')
  if (!statItems.length) return

  gsap.set(statItems, { opacity: 0, y: 40, scale: 0.95 })
  gsap.set(statItems, { borderLeftColor: 'var(--border-2)' })

  ScrollTrigger.create({
    trigger: stats,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(statItems, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: 'back.out(1.2)',
      })

      statItems.forEach((stat, i) => {
        gsap.to(stat, {
          borderLeftColor: 'var(--accent)',
          duration: 0.5,
          delay: i * 0.15,
        })

        const numberEl = stat.querySelector('.stat__number[data-target]')
        if (numberEl) {
          const target = parseInt(numberEl.dataset.target, 10)
          const counter = { val: 0 }
          gsap.to(counter, {
            val: target,
            duration: 2.2,
            delay: i * 0.15,
            ease: 'power2.out',
            onUpdate() {
              numberEl.textContent = Math.round(counter.val)
            },
          })
        }
      })
    },
  })
}

function animateIntro() {
  const section = document.querySelector('.intro__container')
  if (!section) return

  const label = section.querySelector('.section-label')
  if (label) {
    const split = splitText(label, { type: 'chars', charsClass: 'label-char' })
    if (split && split.chars.length) {
      gsap.set(split.chars, { opacity: 0, y: 20 })
      ScrollTrigger.create({
        trigger: label,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(split.chars, {
            opacity: 1, y: 0,
            duration: 0.5,
            stagger: 0.03,
            ease: 'power2.out',
          })
        },
      })
    }
  }

  const title = section.querySelector('.section-title')
  if (title) {
    const split = splitText(title, { type: 'words', wordsClass: 'title-word' })
    if (split && split.words.length) {
      gsap.set(split.words, { opacity: 0, y: 40, rotateX: -15 })
      ScrollTrigger.create({
        trigger: title,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(split.words, {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.8,
            stagger: 0.06,
            ease: 'power3.out',
          })
        },
      })
    }
  }

  const paragraphs = section.querySelectorAll('.intro__lead, .intro__body')
  if (paragraphs.length) {
    gsap.fromTo(paragraphs,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: paragraphs[0],
          start: 'top 85%',
          once: true,
        },
      }
    )
  }

  const quote = section.querySelector('.intro__quote')
  if (quote) {
    gsap.set(quote, { opacity: 0, borderLeftColor: 'transparent' })
    ScrollTrigger.create({
      trigger: quote,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline()
        tl.to(quote, { opacity: 1, duration: 0.4, ease: 'power2.out' })
        tl.fromTo(quote, { borderLeftColor: 'transparent' }, {
          borderLeftColor: 'var(--accent)',
          duration: 0.8,
          ease: 'power2.inOut',
        }, '<')

        const split = splitText(quote, { type: 'chars', charsClass: 'quote-char' })
        if (split && split.chars.length) {
          gsap.set(split.chars, { opacity: 0 })
          tl.to(split.chars, {
            opacity: 1,
            duration: 0.4,
            stagger: 0.015,
            ease: 'none',
          }, '-=0.5')
        }
      },
    })
  }

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

    gsap.to(imgBack, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: imgBack.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        _persistent: true,
      },
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

    gsap.to(imgFront, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: imgFront.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        _persistent: true,
      },
    })
  }
}

function animateCities() {
  const container = document.querySelector('.cities__container')
  if (!container) return

  const label = container.querySelector('.section-label')
  if (label) {
    const split = splitText(label, { type: 'chars', charsClass: 'label-char' })
    if (split && split.chars.length) {
      gsap.set(split.chars, { opacity: 0, y: 20 })
      ScrollTrigger.create({
        trigger: label,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(split.chars, {
            opacity: 1, y: 0,
            duration: 0.5,
            stagger: 0.03,
            ease: 'power2.out',
          })
        },
      })
    }
  }

  const title = container.querySelector('.section-title')
  if (title) {
    const split = splitText(title, { type: 'words', wordsClass: 'title-word' })
    if (split && split.words.length) {
      gsap.set(split.words, { opacity: 0, y: 40 })
      ScrollTrigger.create({
        trigger: title,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(split.words, {
            opacity: 1, y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
          })
        },
      })
    }
  }

  const cards = container.querySelectorAll('.city-card')
  cards.forEach((card, i) => {
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
      { opacity: 0, y: 60, rotateY: -5 },
      { opacity: 1, y: 0, rotateY: 0, duration: 0.9, ease: 'power3.out' }
    )

    if (img) {
      gsap.set(img, { clipPath: 'inset(0 0 100% 0)' })
      tl.to(img, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.8,
        ease: 'power2.inOut',
      }, '-=0.7')
    }

    if (flag) {
      tl.fromTo(flag,
        { scale: 0, rotation: -20 },
        { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)' },
        '-=0.3'
      )
    }

    if (body) {
      const children = body.querySelectorAll('.city-card__location, .city-card__name, .city-card__desc, .city-card__link')
      tl.fromTo(children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
        '-=0.4'
      )
    }
  })

  const mapContainer = container.querySelector('.cities-map-layout__map')
  if (mapContainer) {
    gsap.fromTo(mapContainer,
      { opacity: 0, scale: 0.92 },
      {
        opacity: 1, scale: 1,
        duration: 1,
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

function animateCTA() {
  const cta = document.querySelector('.cta')
  if (!cta) return

  const title = cta.querySelector('.cta__title')
  if (title) {
    const split = splitText(title, { type: 'words', wordsClass: 'cta-word' })
    if (split && split.words.length) {
      gsap.set(split.words, { opacity: 0, y: 50, scale: 0.9 })
      ScrollTrigger.create({
        trigger: title,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(split.words, {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power3.out',
          })
        },
      })
    }
  }

  const sub = cta.querySelector('.cta__sub')
  if (sub) {
    gsap.fromTo(sub,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        duration: 0.6,
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
      { opacity: 0, scale: 0.85, y: 15 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: buttons[0],
          start: 'top 88%',
          once: true,
        },
      }
    )
  }

  const hashtags = cta.querySelectorAll('.hashtag')
  if (hashtags.length) {
    gsap.fromTo(hashtags,
      { opacity: 0, y: 30, rotation: () => gsap.utils.random(-8, 8) },
      {
        opacity: 1, y: 0, rotation: 0,
        duration: 0.7,
        stagger: {
          each: 0.08,
          from: 'random',
        },
        ease: 'back.out(1.5)',
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
  animateStats()
  animateIntro()
  animateCities()
  animateCTA()
}
