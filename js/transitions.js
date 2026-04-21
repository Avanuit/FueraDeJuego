/**
 * transitions.js
 * Barba.js + GSAP transiciones fluidas y premium.
 */

'use strict';

// ─── OVERLAY SETUP ────────────────────────────────────────────────────
const TransitionOverlay = (() => {
    let overlay = null;

    const get = () => {
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'barba-overlay';
            document.body.appendChild(overlay);
        }
        return overlay;
    };

    return { get };
})();

// ─── NAV UPDATER ──────────────────────────────────────────────────────
const NavUpdater = {
    update(namespace) {
        const links = document.querySelectorAll('.nav__link');
        links.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href') || '';
            if (
                (namespace === 'home' && href === 'index.html') ||
                (namespace === 'historia' && href === 'historia.html') ||
                (namespace === 'personajes' && href === 'personajes.html') ||
                (namespace === 'mapa' && href === 'mapa.html') ||
                (namespace === 'comic' && href === 'comic.html') ||
                (namespace === 'testimonios' && href === 'testimonios.html')
            ) {
                link.classList.add('active');
            }
        });
    }
};

// ─── PAGE REINITIALIZER ───────────────────────────────────────────────
const PageReinit = {
    run() {
        if (typeof CounterAnimation !== 'undefined') CounterAnimation.init();
        if (typeof CharCounter !== 'undefined') CharCounter.init();
        if (typeof TestimonyForm !== 'undefined') TestimonyForm.init();
        if (typeof ScrollReveal !== 'undefined') ScrollReveal.init();
        if (typeof Navigation !== 'undefined') Navigation.init();
        if (typeof ComicReader !== 'undefined') ComicReader.init();
    }
};

// ─── BARBA INITIALIZATION ─────────────────────────────────────────────
const BarbaController = {
    init() {
        if (typeof barba === 'undefined') {
            console.warn('Barba.js no está disponible. Navegación normal activa.');
            return;
        }

        if (typeof gsap === 'undefined') {
            console.warn('GSAP no está disponible. Transiciones deshabilitadas.');
            return;
        }

        const overlay = TransitionOverlay.get();

        barba.init({
            prevent: ({ el }) => el.classList?.contains('no-barba'),
            // Timeout largo para evitar errores
            timeout: 10000,

            transitions: [{
                name: 'wipe-transition',

                leave({ current }) {
                    const done = this.async();

                    // Animación del contenido actual desapareciendo
                    gsap.to(current.container, {
                        opacity: 0,
                        y: -30,
                        duration: 0.4,
                        ease: 'power2.in',
                        onComplete: () => {
                            // Overlay sube desde abajo
                            gsap.fromTo(overlay,
                                { yPercent: 100 },
                                {
                                    yPercent: 0,
                                    duration: 0.5,
                                    ease: 'power4.inOut',
                                    onComplete: done
                                }
                            );
                        }
                    });
                },

                enter({ next }) {
                    const done = this.async();

                    // Scroll al inicio
                    window.scrollTo({ top: 0, behavior: 'instant' });

                    // Preparar nuevo contenido invisible
                    gsap.set(next.container, { opacity: 0, y: 30 });

                    // Overlay sube/sale por arriba
                    gsap.to(overlay, {
                        yPercent: -100,
                        duration: 0.5,
                        ease: 'power4.inOut',
                        onComplete: () => {
                            // Reset overlay para próxima transición
                            gsap.set(overlay, { yPercent: 100 });

                            // Fade-in del nuevo contenido
                            gsap.to(next.container, {
                                opacity: 1,
                                y: 0,
                                duration: 0.5,
                                ease: 'power2.out',
                                onComplete: done
                            });
                        }
                    });
                },

                after({ next }) {
                    NavUpdater.update(next.namespace);
                    PageReinit.run();
                }
            }]
        });

        // Reset overlay position
        gsap.set(overlay, { yPercent: 100 });
    }
};

// ─── BOOTSTRAP ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    BarbaController.init();
});