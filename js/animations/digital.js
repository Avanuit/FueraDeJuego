import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { splitText } from '../text-split.js'

gsap.registerPlugin(ScrollTrigger)

function animateDigitalHero() {
  const hero = document.querySelector('.digital-hero')
  if (!hero) return

  const tl = gsap.timeline({ delay: 0.3 })

  const title = hero.querySelector('.digital-hero__title')
  if (title) {
    const split = splitText(title, { type: 'chars', charsClass: 'hero-char' })
    if (split && split.chars.length) {
      gsap.set(split.chars, { opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' })
      tl.to(split.chars, {
        opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
        duration: 0.8, stagger: 0.025, ease: 'power3.out',
      })
    }
  }

  const sub = hero.querySelector('.digital-hero__sub')
  if (sub) {
    tl.fromTo(sub, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
  }

  const meta = hero.querySelectorAll('.digital-hero__meta span')
  if (meta.length) {
    tl.fromTo(meta,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      '-=0.3'
    )
  }
}

function animatePageEntries() {
  const entries = document.querySelectorAll('.page-entry')
  if (!entries.length) return

  entries.forEach((entry) => {
    const num = entry.querySelector('.page-entry__num')
    const img = entry.querySelector('.page-entry__img')

    const tl = gsap.timeline({
      scrollTrigger: { trigger: entry, start: 'top 88%', once: true },
    })

    tl.fromTo(entry,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )

    if (num) {
      tl.fromTo(num,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' },
        '-=0.5'
      )
    }

    if (img) {
      gsap.set(img, { clipPath: 'inset(0 0 100% 0)' })
      tl.to(img, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.9, ease: 'power2.inOut',
      }, '-=0.6')
    }
  })
}

function animateFinalCTA() {
  const cta = document.querySelector('.final-cta')
  if (!cta) return

  const title = cta.querySelector('h2')
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
  animateDigitalHero()
  animatePageEntries()
  animateFinalCTA()
}
