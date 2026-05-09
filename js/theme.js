import gsap from 'gsap'

const STORAGE_KEY = 'fj-theme'
const root = document.documentElement

let currentTheme = 'dark'
let initialized = false

export function getTheme() {
  return currentTheme
}

function detectPreferredTheme() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function applyTheme(theme, animate = false) {
  currentTheme = theme
  root.dataset.theme = theme
  localStorage.setItem(STORAGE_KEY, theme)

  const toggles = document.querySelectorAll('.theme-toggle')
  if (!toggles.length) return

  toggles.forEach((toggle) => {
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro')
  })

  const firstToggle = toggles[0]
  const sunGroup = firstToggle.querySelector('.theme-sun')
  const moonGroup = firstToggle.querySelector('.theme-moon')

  if (!sunGroup || !moonGroup) return

  if (!animate) {
    if (theme === 'dark') {
      toggles.forEach((t) => {
        const sg = t.querySelector('.theme-sun')
        const mg = t.querySelector('.theme-moon')
        if (sg) gsap.set(sg, { opacity: 1, scale: 1, rotation: 0 })
        if (mg) gsap.set(mg, { opacity: 0, scale: 0.5, rotation: -90 })
      })
    } else {
      toggles.forEach((t) => {
        const sg = t.querySelector('.theme-sun')
        const mg = t.querySelector('.theme-moon')
        if (sg) gsap.set(sg, { opacity: 0, scale: 0.5, rotation: 90 })
        if (mg) gsap.set(mg, { opacity: 1, scale: 1, rotation: 0 })
      })
    }
    return
  }

  const tl = gsap.timeline()

  tl.to(firstToggle, {
    scale: 0.75,
    duration: 0.12,
    ease: 'power2.in',
  })

  if (theme === 'dark') {
    tl.to(moonGroup, {
      opacity: 0,
      scale: 0.5,
      rotation: -90,
      duration: 0.25,
      ease: 'power2.in',
    }, '<')

    tl.to(sunGroup, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.35,
      ease: 'back.out(2)',
    }, '-=0.1')
  } else {
    tl.to(sunGroup, {
      opacity: 0,
      scale: 0.5,
      rotation: 90,
      duration: 0.25,
      ease: 'power2.in',
    }, '<')

    tl.to(moonGroup, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.35,
      ease: 'back.out(2)',
    }, '-=0.1')
  }

  tl.to(firstToggle, {
    scale: 1.15,
    duration: 0.15,
    ease: 'power2.out',
  }, '-=0.2')

  tl.to(firstToggle, {
    scale: 1,
    duration: 0.3,
    ease: 'elastic.out(1, 0.4)',
  })

  createRipple(firstToggle, theme)

  toggles.forEach((t) => {
    if (t !== firstToggle) {
      const sg = t.querySelector('.theme-sun')
      const mg = t.querySelector('.theme-moon')
      if (theme === 'dark') {
        if (sg) gsap.set(sg, { opacity: 1, scale: 1, rotation: 0 })
        if (mg) gsap.set(mg, { opacity: 0, scale: 0.5, rotation: -90 })
      } else {
        if (sg) gsap.set(sg, { opacity: 0, scale: 0.5, rotation: 90 })
        if (mg) gsap.set(mg, { opacity: 1, scale: 1, rotation: 0 })
      }
    }
  })
}

function createRipple(button, theme) {
  const ripple = document.createElement('span')
  ripple.className = 'theme-toggle__ripple'

  const accent = theme === 'dark' ? '#FFD600' : '#FF2A00'
  ripple.style.background = accent

  button.appendChild(ripple)

  gsap.fromTo(ripple,
    { scale: 0, opacity: 0.6 },
    {
      scale: 4,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      onComplete: () => ripple.remove(),
    }
  )
}

export function toggleTheme() {
  const next = currentTheme === 'dark' ? 'light' : 'dark'
  applyTheme(next, true)
}

function setupDelegation() {
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.theme-toggle')
    if (!btn) return
    toggleTheme()
  })
}

function initIconState() {
  const toggles = document.querySelectorAll('.theme-toggle')
  if (!toggles.length) return

  toggles.forEach((toggle) => {
    const sunGroup = toggle.querySelector('.theme-sun')
    const moonGroup = toggle.querySelector('.theme-moon')
    if (!sunGroup || !moonGroup) return

    if (currentTheme === 'dark') {
      gsap.set(sunGroup, { opacity: 1, scale: 1, rotation: 0 })
      gsap.set(moonGroup, { opacity: 0, scale: 0.5, rotation: -90 })
    } else {
      gsap.set(sunGroup, { opacity: 0, scale: 0.5, rotation: 90 })
      gsap.set(moonGroup, { opacity: 1, scale: 1, rotation: 0 })
    }

    toggle.setAttribute('aria-label', currentTheme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro')
  })
}

export function initTheme() {
  if (initialized) {
    initIconState()
    return
  }
  initialized = true

  currentTheme = detectPreferredTheme()
  root.dataset.theme = currentTheme

  setupDelegation()

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIconState)
  } else {
    initIconState()
  }
}

initTheme()
