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

function animateComicViewer() {
  const wrapper = document.querySelector('.comic-book-wrapper')
  if (!wrapper) return

  gsap.set(wrapper, { opacity: 0, rotateY: -15, scale: 0.9, transformPerspective: 2000 })
  gsap.to(wrapper, {
    opacity: 1, rotateY: 0, scale: 1,
    duration: 1.2, ease: 'power3.out',
    scrollTrigger: { trigger: wrapper, start: 'top 85%', once: true },
  })

  const controls = document.querySelector('.comic-controls')
  if (controls) {
    gsap.fromTo(controls,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: controls, start: 'top 90%', once: true },
      }
    )
  }

  const thumbs = document.querySelector('.comic-thumbs-wrapper')
  if (thumbs) {
    const thumbItems = thumbs.querySelectorAll('.comic-thumb')
    if (thumbItems.length) {
      gsap.fromTo(thumbItems,
        { opacity: 0, scale: 0.85, y: 15 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 0.5, stagger: 0.08, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: thumbs, start: 'top 90%', once: true },
        }
      )
    }
  }
}

function animateInfoCards() {
  const cards = document.querySelectorAll('.comic-info-card')
  if (!cards.length) return

  cards.forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 40, rotateY: 8 },
      {
        opacity: 1, y: 0, rotateY: 0,
        duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%', once: true },
      }
    )
  })
}

function animateComicCTA() {
  const cta = document.querySelector('.comic-cta')
  if (!cta) return

  const title = cta.querySelector('h3')
  if (title) {
    const split = splitText(title, { type: 'words', wordsClass: 'cta-word' })
    if (split && split.words.length) {
      gsap.set(split.words, { opacity: 0, y: 30 })
      ScrollTrigger.create({
        trigger: title,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(split.words, {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out',
          })
        },
      })
    }
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
  animatePageHero()
  animateComicViewer()
  animateInfoCards()
  animateComicCTA()
}
