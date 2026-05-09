const NAV_HTML = `
  <a href="index.html" class="nav__logo">
    <img src="img/isotipo.svg" alt="FJ" class="nav__logo-icon" />
    <span class="nav__logo-text">FUERA<em>DE</em>JUEGO</span>
  </a>
  <ul class="nav__links">
    <li><a href="index.html" class="nav__link" data-nav="home">Inicio</a></li>
    <li><a href="historia.html" class="nav__link" data-nav="historia">Historia</a></li>
    <li><a href="personajes.html" class="nav__link" data-nav="personajes">Personajes</a></li>
    <li><a href="mapa.html" class="nav__link" data-nav="mapa">Mapa</a></li>
    <li><a href="comic.html" class="nav__link" data-nav="comic">Comic</a></li>
    <li><a href="testimonios.html" class="nav__link" data-nav="testimonios">Testimonios</a></li>
  </ul>
  <div class="nav__right">
    <button class="theme-toggle" id="themeToggle" aria-label="Activar modo claro" type="button">
      <span class="theme-toggle__icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g class="theme-sun">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" class="sun-ray" />
            <line x1="12" y1="21" x2="12" y2="23" class="sun-ray" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" class="sun-ray" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" class="sun-ray" />
            <line x1="1" y1="12" x2="3" y2="12" class="sun-ray" />
            <line x1="21" y1="12" x2="23" y2="12" class="sun-ray" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" class="sun-ray" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" class="sun-ray" />
          </g>
          <g class="theme-moon">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </g>
        </svg>
      </span>
    </button>
    <button class="nav__toggle" id="navToggle" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
`

const FOOTER_HTML = `
  <div class="footer__container">
    <div class="footer__brand">
      <div class="footer__logo-group">
        <img src="img/isotipo.svg" alt="FJ" class="footer__logo-icon" />
        <span class="footer__logo">Fuera de Juego</span>
      </div>
      <p>Proyecto Transmedia — Copa del Mundo FIFA 2026</p>
      <p>Universidad de San Buenaventura · Ingenieria Multimedia</p>
    </div>
    <div class="footer__links">
      <a href="index.html">Inicio</a>
      <a href="historia.html">Historia</a>
      <a href="personajes.html">Personajes</a>
      <a href="mapa.html">Mapa</a>
      <a href="comic.html">Comic</a>
      <a href="testimonios.html">Testimonios</a>
    </div>
    <div class="footer__contact">
      <p>proyectofueradejuego@gmail.com</p>
      <span>#FueraDeJuego</span>
    </div>
  </div>
  <div class="footer__bottom">
    <p>© 2026 Equipo Fuera de Juego · Juan Pablo Chaves · David Florez · Sadid Acosta</p>
  </div>
`

export function injectComponents() {
  const body = document.body

  if (!document.getElementById('mainNav')) {
    const nav = document.createElement('nav')
    nav.className = 'nav'
    nav.id = 'mainNav'
    nav.innerHTML = NAV_HTML
    body.insertBefore(nav, body.firstChild)
  }

  if (!document.querySelector('.footer')) {
    const footer = document.createElement('footer')
    footer.className = 'footer'
    footer.innerHTML = FOOTER_HTML
    body.appendChild(footer)
  }
}
