const NAV_HTML = `
  <a href="index.html" class="nav__logo">
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
  <button class="nav__toggle" id="navToggle" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
`

const FOOTER_HTML = `
  <div class="footer__container">
    <div class="footer__brand">
      <span class="footer__logo">Fuera de Juego</span>
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
