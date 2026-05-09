import { getLenis } from './lenis.js'

export function initNavigation() {
  const toggle = document.getElementById('navToggle')
  const links = document.querySelector('.nav__links')
  if (!toggle || !links) return

  const lenis = getLenis()
  let closeHandler = null

  const open = () => {
    if (closeHandler) {
      links.removeEventListener('transitionend', closeHandler)
      closeHandler = null
    }
    links.classList.add('visible')
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        links.classList.add('open')
        toggle.classList.add('open')
      })
    })
    toggle.setAttribute('aria-expanded', 'true')
    document.body.classList.add('menu-open')
    if (lenis) lenis.stop()
  }

  const close = () => {
    links.classList.remove('open')
    toggle.classList.remove('open')
    toggle.setAttribute('aria-expanded', 'false')
    document.body.classList.remove('menu-open')
    if (lenis) lenis.start()

    closeHandler = () => {
      if (!links.classList.contains('open')) {
        links.classList.remove('visible')
      }
      links.removeEventListener('transitionend', closeHandler)
      closeHandler = null
    }
    links.addEventListener('transitionend', closeHandler)
  }

  const toggleMenu = () => {
    if (links.classList.contains('open')) {
      close()
    } else {
      open()
    }
  }

  // Remove old listener to avoid duplicates on re-init (Barba transitions)
  toggle.removeEventListener('click', toggle._handler)
  toggle._handler = toggleMenu
  toggle.addEventListener('click', toggle._handler)

  links.querySelectorAll('.nav__link').forEach((link) => {
    link.removeEventListener('click', close)
    link.addEventListener('click', close)
  })

  // Close on Escape key
  document.removeEventListener('keydown', handleKeydown)
  document.addEventListener('keydown', handleKeydown)

  function handleKeydown(e) {
    if (e.key === 'Escape' && links.classList.contains('open')) {
      close()
      toggle.focus()
    }
  }

  // Close when clicking outside the menu
  document.removeEventListener('click', handleClickOutside)
  document.addEventListener('click', handleClickOutside)

  function handleClickOutside(e) {
    if (
      links.classList.contains('open') &&
      !links.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      close()
    }
  }

  // Initialize aria-expanded state
  toggle.setAttribute('aria-expanded', 'false')
}
