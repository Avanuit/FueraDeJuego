import gsap from '../animation-engine.js'
import { ScrollTrigger } from '../animation-engine.js'
import { splitText } from '../text-split.js'

gsap.registerPlugin(ScrollTrigger)

export function animateSectionLabel(element, options = {}) {
  if (!element) return

  const label = element.querySelector('.section-label')
  if (!label) return

  const split = splitText(label, { type: 'chars', charsClass: 'label-char' })
  if (!split || !split.chars.length) return

  const {
    delay = 0,
    duration = 0.5,
    stagger = 0.03,
    ease = 'power2.out',
    start = 'top 88%',
  } = options

  gsap.set(split.chars, { opacity: 0, y: 20 })
  ScrollTrigger.create({
    trigger: label,
    start,
    once: true,
    onEnter: () => {
      gsap.to(split.chars, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease,
        delay,
      })
    },
  })
}

export function animateSectionTitle(element, options = {}) {
  if (!element) return

  const title = element.querySelector('.section-title')
  if (!title) return

  const split = splitText(title, { type: 'words', wordsClass: 'title-word' })
  if (!split || !split.words.length) return

  const {
    delay = 0,
    duration = 0.8,
    stagger = 0.06,
    ease = 'power3.out',
    start = 'top 88%',
    y = 40,
    rotateX = -15,
  } = options

  gsap.set(split.words, { opacity: 0, y, rotateX })
  ScrollTrigger.create({
    trigger: title,
    start,
    once: true,
    onEnter: () => {
      gsap.to(split.words, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration,
        stagger,
        ease,
        delay,
      })
    },
  })
}

export function animateParagraphs(paragraphs, options = {}) {
  if (!paragraphs || !paragraphs.length) return

  const {
    duration = 0.8,
    stagger = 0.2,
    ease = 'power2.out',
    y = 30,
    start = 'top 85%',
  } = options

  gsap.fromTo(
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
  if (!imgElement) return

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

  gsap.set(imgElement, { clipPath: clipPathStart })

  ScrollTrigger.create({
    trigger: imgElement,
    start: clipStart,
    end: clipEnd,
    scrub,
    onEnter: () => {
      gsap.to(imgElement, {
        clipPath: clipPathEnd,
        ease: 'power2.inOut',
        duration: 1,
      })
    },
  })

  if (parentElement) {
    gsap.to(imgElement, {
      yPercent: yPercentPositive,
      ease: 'none',
      scrollTrigger: {
        trigger: parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub,
        _persistent: true,
      },
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
        _persistent: true,
      },
    })
  }

  return tl
}

export function animateNumberCounter(element, options = {}) {
  if (!element) return

  const target = parseInt(element.dataset.target || element.textContent, 10)
  if (isNaN(target) || target <= 0) return

  const { duration = 2.2, ease = 'power2.out', delay = 0 } = options

  const counter = { val: 0 }

  ScrollTrigger.create({
    trigger: element,
    start: 'top 88%',
    once: true,
    onEnter: () => {
      gsap.to(counter, {
        val: target,
        duration,
        ease,
        delay,
        onUpdate() {
          element.textContent = Math.round(counter.val)
        },
      })
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

  ScrollTrigger.create({
    trigger: statsContainer,
    start: 'top 85%',
    once: true,
    onEnter: () => {
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
    },
  })
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
    const split = splitText(title, { type: 'chars', charsClass: 'hero-char' })
    if (split && split.chars.length) {
      const { opacity = 0, y = 50, clipPathIn = 'inset(0 0 100% 0)', duration = 0.8, stagger = 0.025, ease = 'power3.out' } = titleOptions
      gsap.set(split.chars, { opacity, y, clipPath: clipPathIn })
      tl.to(split.chars, {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0 0 0% 0)',
        duration,
        stagger,
        ease,
      }, '-=0.3')
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
        _persistent: true,
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
        _persistent: true,
      },
    })
  }
}
