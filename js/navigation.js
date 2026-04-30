export function initNavigation() {
  const toggle = document.getElementById('navToggle')
  const links = document.querySelector('.nav__links')
  if (!toggle || !links) return

  const open = () => links.classList.add('open')
  const close = () => links.classList.remove('open')

  toggle.addEventListener('click', () => {
    links.classList.toggle('open')
  })

  links.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', close)
  })
}
