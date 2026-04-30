/**
 * app.js
 * Motor principal: Lenis, GSAP ScrollTrigger, UI modules.
 * ES Modules — Import Map required.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/* ============================================
   LENIS SMOOTH SCROLL
   ============================================ */
let lenisInstance = null;

export function initLenis() {
  if (lenisInstance) {
    lenisInstance.destroy();
  }
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

export function getLenis() {
  return lenisInstance;
}

/* ============================================
   COMPONENT INJECTION (Nav + Footer)
   ============================================ */
const NAV_TEMPLATE = `
  <div class="nav__start">
    <button class="nav__toggle" id="navToggle" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
    <a href="index.html" class="nav__logo" aria-label="Fuera de Juego">
      <svg class="nav__logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" stroke="currentColor" stroke-width="1.5"/>
        <path d="M20 4L26 8V16L20 20L14 16V8L20 4Z" stroke="currentColor" stroke-width="1"/>
        <path d="M14 16L10 22L14 28H26L30 22L26 16" stroke="currentColor" stroke-width="1"/>
        <line x1="7" y1="33" x2="33" y2="7" stroke="#FF2A00" stroke-width="2" stroke-linecap="round"/>
        <circle cx="20" cy="20" r="2" fill="#FF2A00"/>
      </svg>
    </a>
  </div>

  <a href="index.html" class="nav__brand">
    <span class="nav__brand-text">FUERA<em>DE</em>JUEGO</span>
  </a>

  <div class="nav__overlay" id="navOverlay">
    <button class="nav__close" id="navClose" aria-label="Cerrar menu">
      <span></span><span></span>
    </button>
    <ul class="nav__links">
      <li class="nav__links-item"><a href="index.html" class="nav__link" data-nav="home"><span class="nav__link-num">01</span>Inicio</a></li>
      <li class="nav__links-item"><a href="historia.html" class="nav__link" data-nav="historia"><span class="nav__link-num">02</span>Historia</a></li>
      <li class="nav__links-item"><a href="personajes.html" class="nav__link" data-nav="personajes"><span class="nav__link-num">03</span>Personajes</a></li>
      <li class="nav__links-item"><a href="mapa.html" class="nav__link" data-nav="mapa"><span class="nav__link-num">04</span>Mapa</a></li>
      <li class="nav__links-item"><a href="comic.html" class="nav__link" data-nav="comic"><span class="nav__link-num">05</span>Comic</a></li>
      <li class="nav__links-item"><a href="testimonios.html" class="nav__link" data-nav="testimonios"><span class="nav__link-num">06</span>Testimonios</a></li>
    </ul>
  </div>
`;

const FOOTER_TEMPLATE = `
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
`;

export function injectComponents() {
  const body = document.body;

  if (!document.getElementById('mainNav')) {
    const nav = document.createElement('nav');
    nav.className = 'nav';
    nav.id = 'mainNav';
    nav.innerHTML = NAV_TEMPLATE;
    body.insertBefore(nav, body.firstChild);
  }

  if (!document.querySelector('.footer')) {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = FOOTER_TEMPLATE;
    body.appendChild(footer);
  }
}

/* ============================================
   NAVIGATION MODULE
   ============================================ */
export const Navigation = {
  init() {
    const toggle = document.getElementById('navToggle');
    const closeBtn = document.getElementById('navClose');
    const overlay = document.getElementById('navOverlay');
    if (!toggle || !overlay) return;

    const open = () => {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      const items = overlay.querySelectorAll('.nav__links-item');
      items.forEach((item) => {
        item.style.animation = 'none';
        void item.offsetHeight;
        item.style.animation = '';
      });
    };

    const close = () => {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    const toggleMenu = () => (overlay.classList.contains('open') ? close() : open());

    toggle.addEventListener('click', toggleMenu);
    if (closeBtn) closeBtn.addEventListener('click', close);

    overlay.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', close);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) close();
    });
  },
};

/* ============================================
   COUNTER ANIMATION
   ============================================ */
export const CounterAnimation = {
  easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  },

  animateCounter(el, target, duration = 1800) {
    const start = performance.now();
    const isInt = Number.isInteger(target);

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(this.easeOut(progress) * target);
      el.textContent = isInt ? value : value.toFixed(0);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };

    requestAnimationFrame(step);
  },

  init() {
    const counters = document.querySelectorAll('.stat__number[data-target]');
    if (!counters.length) return;

    counters.forEach((el) => {
      gsap.fromTo(el,
        { textContent: 0 },
        {
          textContent: parseInt(el.dataset.target, 10),
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });
  },
};

/* ============================================
   SCROLL REVEAL (GSAP ScrollTrigger)
   ============================================ */
export const ScrollReveal = {
  init() {
    const elements = document.querySelectorAll(
      '.city-card, .chapter-card, .data-card, .testimonial-card, .flow-step, .char-card, .evidence-item, .metric-item, .comic-info-card'
    );

    elements.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        }
      );
    });

    // Stagger groups
    const staggerGroups = document.querySelectorAll('[data-stagger]');
    staggerGroups.forEach((group) => {
      gsap.fromTo(group.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    // Parallax images
    const parallaxImages = document.querySelectorAll('[data-parallax]');
    parallaxImages.forEach((img) => {
      gsap.to(img, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  },
};

/* ============================================
   CHAR COUNTER
   ============================================ */
export const CharCounter = {
  init() {
    const textarea = document.getElementById('testimony');
    const counter = document.getElementById('charCount');
    if (!textarea || !counter) return;

    textarea.addEventListener('input', () => {
      const len = textarea.value.length;
      counter.textContent = len;
      counter.style.color = len > 450 ? 'var(--accent)' : 'var(--text-dim)';
    });
  },
};

/* ============================================
   FORM VALIDATION
   ============================================ */
export const FormValidator = {
  showError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
  },

  clearErrors() {
    const ids = ['nameError', 'cityError', 'countryError', 'testimonyError', 'consentError'];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
  },

  validate(formData) {
    let valid = true;
    this.clearErrors();

    if (!formData.name.trim()) {
      this.showError('nameError', 'Por favor ingresa un nombre o seudonimo.');
      valid = false;
    }
    if (!formData.city.trim()) {
      this.showError('cityError', 'Por favor ingresa tu ciudad o barrio.');
      valid = false;
    }
    if (!formData.country) {
      this.showError('countryError', 'Por favor selecciona tu pais.');
      valid = false;
    }
    if (!formData.testimony.trim()) {
      this.showError('testimonyError', 'Por favor escribe tu testimonio.');
      valid = false;
    } else if (formData.testimony.trim().length < 50) {
      this.showError('testimonyError', 'Tu testimonio debe tener al menos 50 caracteres.');
      valid = false;
    }
    if (!formData.consent) {
      this.showError('consentError', 'Debes aceptar los terminos para continuar.');
      valid = false;
    }

    return valid;
  },
};

/* ============================================
   TESTIMONY FORM
   ============================================ */
export const TestimonyForm = {
  escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  showUnlockSuccess() {
    const success = document.getElementById('unlockSuccess');
    if (!success) return;
    success.style.display = 'flex';
    gsap.fromTo(success,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
    gsap.fromTo(success.querySelector('.unlock-success__content'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.15, ease: 'power2.out' }
    );
  },

  addTestimonyCard(data) {
    const grid = document.getElementById('testimonialsGrid');
    if (!grid) return;

    const initials = data.name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const colors = ['#FF2A00', '#00E5FF', '#FFD600', '#888888'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const card = document.createElement('article');
    card.className = 'testimonial-card';
    card.innerHTML = `
      <div class="testimonial-card__header">
        <div class="testimonial-card__avatar" style="background:${color}">${initials}</div>
        <div>
          <strong>${this.escapeHtml(data.name)}</strong>
          <span>${this.escapeHtml(data.city)}</span>
        </div>
      </div>
      <p>"${this.escapeHtml(data.testimony.slice(0, 300))}${data.testimony.length > 300 ? '...' : ''}"</p>
      <div class="testimonial-card__tag">#FueraDeJuego #NuevoTestimonio</div>
    `;

    grid.prepend(card);
    gsap.fromTo(card,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
  },

  init() {
    const form = document.getElementById('testimonyForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = {
        name: document.getElementById('name')?.value || '',
        city: document.getElementById('city')?.value || '',
        country: document.getElementById('country')?.value || '',
        testimony: document.getElementById('testimony')?.value || '',
        consent: document.getElementById('consent')?.checked || false,
      };

      if (!FormValidator.validate(data)) return;

      const btn = document.getElementById('submitBtn');
      if (btn) {
        btn.querySelector('.btn-text').style.display = 'none';
        btn.querySelector('.btn-loader').style.display = 'block';
        btn.disabled = true;
      }

      await new Promise((r) => setTimeout(r, 1500));

      this.addTestimonyCard(data);
      form.reset();
      const charCount = document.getElementById('charCount');
      if (charCount) charCount.textContent = '0';
      this.showUnlockSuccess();

      if (btn) {
        btn.querySelector('.btn-text').style.display = '';
        btn.querySelector('.btn-loader').style.display = 'none';
        btn.disabled = false;
      }
    });
  },
};

/* ============================================
   PAGE-SPECIFIC MODULES (Dynamic Import)
   ============================================ */
async function initPageModules() {
  if (document.getElementById('comicViewer')) {
    try {
      const { initComic } = await import('./comic.js');
      initComic();
    } catch (e) {
      console.warn('Comic init failed:', e);
    }
  }
  if (document.getElementById('leafletMap')) {
    try {
      const { initMap } = await import('./mapa.js');
      initMap();
    } catch (e) {
      console.warn('Map init failed:', e);
    }
  }
  if (document.getElementById('heroMap')) {
    try {
      const { initHeroMapModule } = await import('./heroMap.js');
      initHeroMapModule();
    } catch (e) {
      console.warn('Hero map init failed:', e);
    }
  }
}

/* ============================================
   PAGE REINIT
   ============================================ */
export const PageReinit = {
  async run() {
    Navigation.init();
    CounterAnimation.init();
    CharCounter.init();
    TestimonyForm.init();
    ScrollReveal.init();
    await initPageModules();
    ScrollTrigger.refresh();
  },
};

/* ============================================
   BOOTSTRAP
   ============================================ */
export async function initApp() {
  injectComponents();
  initLenis();
  Navigation.init();
  CounterAnimation.init();
  ScrollReveal.init();
  CharCounter.init();
  TestimonyForm.init();
  await initPageModules();
}

// Auto-init if loaded as module
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initApp());
} else {
  initApp();
}
