/* ==========================================================================
   CONTROLADOR DE MENÚ RESPONSIVE (assets/js/navigation.js)
   Administra los estados del menú desplegable móvil, la accesibilidad del teclado (Escape)
   y los comportamientos de clic del menú de navegación.
   ========================================================================== */

import { getLenis } from './lenis.js'

let closeTimer = null

export function initNavigation() {
  const toggle = document.getElementById('navToggle')
  const links = document.querySelector('.nav__links')
  if (!toggle || !links) return

  const lenis = getLenis()
  const CLOSE_DELAY = 450

  const open = () => {
    if (closeTimer) {
      clearTimeout(closeTimer)
      closeTimer = null
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

    if (closeTimer) clearTimeout(closeTimer)
    closeTimer = setTimeout(() => {
      if (!links.classList.contains('open')) {
        links.classList.remove('visible')
      }
      closeTimer = null
    }, CLOSE_DELAY)
  }

  const toggleMenu = () => {
    if (links.classList.contains('open')) {
      close()
    } else {
      open()
    }
  }

  toggle.removeEventListener('click', toggle._handler)
  toggle._handler = toggleMenu
  toggle.addEventListener('click', toggle._handler)

  links.querySelectorAll('.nav__link').forEach((link) => {
    link.removeEventListener('click', close)
    link.addEventListener('click', close)
  })

  document.removeEventListener('keydown', handleKeydown)
  document.addEventListener('keydown', handleKeydown)

  function handleKeydown(e) {
    if (e.key === 'Escape' && links.classList.contains('open')) {
      close()
      toggle.focus()
    }
  }

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

  toggle.setAttribute('aria-expanded', 'false')
}
