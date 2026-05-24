/* ==========================================================================
   BIBLIOTECA DE ANIMACIONES COMPARTIDAS (assets/js/animations/shared.js)
   Proporciona primitivas de animación estandarizadas para etiquetas, títulos,
   párrafos, contadores y llamadas a la acción.
   ========================================================================== */

import gsap from '../animation-engine.js'
import { ScrollTrigger } from '../animation-engine.js'
import { splitText } from '../text-split.js'
import {
  revealTextChars,
  revealTextWords,
  revealImage,
  parallaxImage,
  staggerReveal,
  animateCounter,
  heroParallax,
  reducedMotion,
} from '../animation-utils.js'

gsap.registerPlugin(ScrollTrigger)

export function animateSectionLabel(element, options = {}) {
  if (!element) return

  const label = element.querySelector('.section-label')
  if (!label) return

  const { start = 'top 88%' } = options

  const result = revealTextChars(label, {
    y: 20,
    duration: 0.5,
    stagger: 0.03,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: label,
      start,
      once: true,
    },
  })

  return result
}

export function animateSectionTitle(element, options = {}) {
  if (!element) return

  const title = element.querySelector('.section-title')
  if (!title) return

  const {
    start = 'top 88%',
    y = 40,
    rotateX = -15,
  } = options

  const result = revealTextWords(title, {
    y,
    rotateX,
    duration: 0.8,
    stagger: 0.06,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: title,
      start,
      once: true,
    },
  })

  return result
}

export function animateParagraphs(paragraphs, options = {}) {
  if (!paragraphs || !paragraphs.length) return null

  const {
    duration = 0.8,
    stagger = 0.2,
    ease = 'power2.out',
    y = 30,
    start = 'top 85%',
  } = options

  return gsap.fromTo(
    paragraphs,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: paragraphs[0],
        start,
        once: true,
      },
    }
  )
}

export function createParallaxImage(imgElement, options = {}) {
  if (!imgElement) return null

  const {
    clipPathStart = 'inset(100% 0 0 0)',
    clipPathEnd = 'inset(0% 0 0 0)',
    clipStart = 'top 90%',
    clipEnd = 'top 30%',
    yPercentPositive = 12,
    yPercentNegative = -10,
    parentElement = imgElement.parentElement,
    scrub = 1,
  } = options

  revealImage(imgElement, 'up', {
    scrollTrigger: {
      trigger: imgElement,
      start: clipStart,
      end: clipEnd,
      scrub,
    },
  })

  if (parentElement) {
    parallaxImage(imgElement, yPercentPositive, {
      trigger: parentElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub,
    })
  }
}

export function createDualParallax(frontImg, backImg, options = {}) {
  if (frontImg) {
    createParallaxImage(frontImg, {
      clipPathStart: 'inset(100% 0 0 0)',
      yPercentPositive: -10,
      ...options,
    })
  }

  if (backImg) {
    createParallaxImage(backImg, {
      clipPathStart: 'inset(0 0 100% 0)',
      yPercentPositive: 12,
      ...options,
    })
  }
}

export function animateCardTimeline(card, elements, options = {}) {
  if (!card) return

  const {
    triggerStart = 'top 88%',
    cardDuration = 0.9,
    cardEase = 'power3.out',
    imgClipPath = 'inset(0 0 100% 0)',
    imgClipDuration = 0.8,
    imgClipEase = 'power2.inOut',
    imgOffset = '-=0.7',
    flagScale = 0,
    flagRotation = -20,
    flagEndScale = 1,
    flagEndRotation = 0,
    flagDuration = 0.5,
    flagEase = 'back.out(2)',
    flagOffset = '-=0.3',
    childrenStagger = 0.08,
    childrenDuration = 0.5,
    childrenEase = 'power2.out',
    childrenOffset = '-=0.4',
  } = options

  const { img, flag, body, ...rest } = elements

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: card,
      start: triggerStart,
      once: true,
    },
  })

  tl.fromTo(
    card,
    { opacity: 0, y: 60, rotateY: -5 },
    { opacity: 1, y: 0, rotateY: 0, duration: cardDuration, ease: cardEase }
  )

  if (img) {
    gsap.set(img, { clipPath: imgClipPath })
    tl.to(img, {
      clipPath: imgClipPath.replace('100%', '0%'),
      duration: imgClipDuration,
      ease: imgClipEase,
    }, imgOffset)
  }

  if (flag) {
    tl.fromTo(
      flag,
      { scale: flagScale, rotation: flagRotation },
      { scale: flagEndScale, rotation: flagEndRotation, duration: flagDuration, ease: flagEase },
      flagOffset
    )
  }

  if (body) {
    const children = body.querySelectorAll(
      '.city-card__location, .city-card__name, .city-card__desc, .city-card__link'
    )
    if (children.length) {
      tl.fromTo(
        children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: childrenDuration, stagger: childrenStagger, ease: childrenEase },
        childrenOffset
      )
    }
  }

  if (rest.parallaxTarget && img) {
    gsap.to(img, {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })
  }

  return tl
}

export function animateNumberCounter(element, options = {}) {
  if (!element) return null

  const target = parseInt(element.dataset.target || element.textContent, 10)
  if (isNaN(target) || target <= 0) {
    
    return null
  }

  const { duration = 2.2, ease = 'power2.out', delay = 0 } = options

  if (reducedMotion) {
    element.textContent = target
    return null
  }

  const obj = { val: 0 }
  return gsap.to(obj, {
    val: target,
    duration,
    ease,
    delay,
    onUpdate() {
      element.textContent = Math.round(obj.val)
    },
  })
}

export function animateStatItems(statsContainer, options = {}) {
  if (!statsContainer) return

  const statItems = statsContainer.querySelectorAll('.stat')
  if (!statItems.length) return

  const {
    opacity = 0,
    y = 40,
    scale = 0.95,
    duration = 0.7,
    stagger = 0.15,
    ease = 'back.out(1.2)',
    borderColorFrom = 'var(--border-2)',
    borderColorTo = 'var(--accent)',
    counterDelay = 0.15,
  } = options

  gsap.set(statItems, { opacity, y, scale })
  gsap.set(statItems, { borderLeftColor: borderColorFrom })

  const runAnimations = () => {
    gsap.to(statItems, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      stagger,
      ease,
    })

    statItems.forEach((stat, i) => {
      gsap.to(stat, {
        borderLeftColor: borderColorTo,
        duration: 0.5,
        delay: i * counterDelay,
      })

      const numberEl = stat.querySelector('.stat__number[data-target]')
      if (numberEl) {
        animateNumberCounter(numberEl, { delay: i * counterDelay })
      }
    })
  }

  const rect = statsContainer.getBoundingClientRect()
  const vh = window.innerHeight
  const isInViewport = rect.top < vh * 0.85 && rect.bottom > 0

  if (isInViewport) {
    runAnimations()
  } else {
    ScrollTrigger.create({
      trigger: statsContainer,
      start: 'top 85%',
      once: true,
      onEnter: runAnimations,
    })
  }

  setTimeout(() => {
    const anyStillZero = Array.from(statItems).some((stat) => {
      const num = stat.querySelector('.stat__number')
      return num && num.textContent.trim() === '0'
    })
    if (anyStillZero) {
      runAnimations()
    }
  }, 3000)
}

export function animateCTA(ctaElement, options = {}) {
  if (!ctaElement) return

  const {
    titleOptions = {},
    subOptions = {},
    buttonsOptions = {},
    hashtagsOptions = {},
  } = options

  const title = ctaElement.querySelector('.cta__title')
  if (title) {
    const split = splitText(title, { type: 'words', wordsClass: 'cta-word' })
    if (split && split.words.length) {
      const {
        opacity = 0,
        y = 50,
        scale = 0.9,
        duration = 0.8,
        stagger = 0.05,
        ease = 'power3.out',
        start = 'top 85%',
      } = titleOptions

      gsap.set(split.words, { opacity, y, scale })
      ScrollTrigger.create({
        trigger: title,
        start,
        once: true,
        onEnter: () => {
          gsap.to(split.words, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration,
            stagger,
            ease,
          })
        },
      })
    }
  }

  const sub = ctaElement.querySelector('.cta__sub')
  if (sub) {
    const { opacity = 0, y = 20, duration = 0.6, ease = 'power2.out', start = 'top 88%' } = subOptions
    gsap.fromTo(
      sub,
      { opacity, y },
      {
        opacity: 1,
        y: 0,
        duration,
        ease,
        scrollTrigger: {
          trigger: sub,
          start,
          once: true,
        },
      }
    )
  }

  const buttons = ctaElement.querySelectorAll('.cta__actions .btn')
  if (buttons.length) {
    const { opacity = 0, scale = 0.85, y = 15, duration = 0.6, stagger = 0.12, ease = 'back.out(1.5)', start = 'top 88%' } = buttonsOptions
    gsap.fromTo(
      buttons,
      { opacity, scale, y },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: buttons[0],
          start,
          once: true,
        },
      }
    )
  }

  const hashtags = ctaElement.querySelectorAll('.hashtag')
  if (hashtags.length) {
    const { opacity = 0, y = 30, duration = 0.7, staggerEach = 0.08, ease = 'back.out(1.5)', start = 'top 88%' } = hashtagsOptions
    gsap.fromTo(
      hashtags,
      { opacity, y, rotation: () => gsap.utils.random(-8, 8) },
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration,
        stagger: {
          each: staggerEach,
          from: 'random',
        },
        ease,
        scrollTrigger: {
          trigger: ctaElement.querySelector('.cta__tag-cloud'),
          start,
          once: true,
        },
      }
    )
  }
}

export function animatePageHeroAdvanced(hero, options = {}) {
  if (!hero) return

  const tl = gsap.timeline({ delay: 0.2 })

  const {
    tagOptions = {},
    titleOptions = {},
    subOptions = {},
    imgOptions = {},
  } = options

  const tag = hero.querySelector('.tag')
  if (tag) {
    const { opacity = 0, x = -30, duration = 0.6, ease = 'power3.out' } = tagOptions
    tl.fromTo(tag, { opacity, x }, { opacity: 1, x: 0, duration, ease })
  }

  const title = hero.querySelector('.page-hero__title')
  if (title) {
    const result = revealTextChars(title, {
      y: 50,
      duration: 0.8,
      stagger: 0.025,
      ease: 'power3.out',
    })
    if (result) {
      tl.add(result.tween, '-=0.3')
    }
  }

  const sub = hero.querySelector('.page-hero__sub')
  if (sub) {
    const { opacity = 0, y = 25, duration = 0.7, ease = 'power2.out' } = subOptions
    tl.fromTo(sub, { opacity, y }, { opacity: 1, y: 0, duration, ease }, '-=0.4')
  }

  const imgWrap = hero.querySelector('.page-hero__img-wrap')
  if (imgWrap) {
    const { clipPath = 'circle(0% at 50% 50%)', clipPathEnd = 'circle(75% at 50% 50%)', duration = 1.4, ease = 'power4.inOut' } = imgOptions
    gsap.set(imgWrap, { clipPath })
    tl.to(imgWrap, { clipPath: clipPathEnd, duration, ease }, '-=0.9')
  }

  return tl
}

export function animateHeroParallax(hero, options = {}) {
  if (!hero) return

  const {
    contentY = -60,
    imgScaleFrom = 1.15,
    imgScaleTo = 1,
    start = 'top top',
    end = 'bottom top',
    scrub = 1,
  } = options

  const content = hero.querySelector('.hero__content')
  if (content) {
    gsap.to(content, {
      y: contentY,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start,
        end,
        scrub,
      },
    })
  }

  const heroImg = hero.querySelector('.hero__img-wrap img, .page-hero__img-wrap img')
  if (heroImg) {
    gsap.set(heroImg, { scale: imgScaleFrom })
    gsap.to(heroImg, {
      scale: imgScaleTo,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start,
        end,
        scrub,
      },
    })
  }
}

export function animateQuoteReveal(quoteEl, options = {}) {
  if (!quoteEl) return

  const { start = 'top 85%' } = options

  gsap.set(quoteEl, { opacity: 0, borderLeftColor: 'transparent' })

  ScrollTrigger.create({
    trigger: quoteEl,
    start,
    once: true,
    onEnter: () => {
      const tl = gsap.timeline()

      tl.to(quoteEl, { opacity: 1, duration: 0.4, ease: 'power2.out' })
      tl.fromTo(quoteEl, { borderLeftColor: 'transparent' }, {
        borderLeftColor: 'var(--accent)',
        duration: 0.8,
        ease: 'power2.inOut',
      }, '<')

      const split = splitText(quoteEl, { type: 'chars', charsClass: 'quote-char' })
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

export function scrubReveal(el, vars, scrollVars) {
  if (!el) return null
  return gsap.fromTo(el, vars.from, {
    ...vars.to,
    scrollTrigger: {
      trigger: el,
      once: true,
      ...scrollVars,
    },
  })
}
