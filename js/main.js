/**
 * main.js
 * Módulo principal: inicialización y coordinación de funciones.
 * Principios: Single Responsibility, Open/Closed
 */

'use strict';

// ─── NAVIGATION MODULE ───────────────────────────────────────────────
const Navigation = (() => {
    const toggle = document.getElementById('navToggle');
    const links = document.querySelector('.nav__links');

    const open = () => links?.classList.add('open');
    const close = () => links?.classList.remove('open');
    const toggleMenu = () => links?.classList.contains('open') ? close() : open();

    const init = () => {
        toggle?.addEventListener('click', toggleMenu);
        // Cierra al hacer click en un link
        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', close);
        });
    };

    return { init };
})();

// ─── COUNTER ANIMATION MODULE ─────────────────────────────────────────
const CounterAnimation = (() => {
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const animateCounter = (el, target, duration = 1800) => {
        const start = performance.now();
        const isInt = Number.isInteger(target);

        const step = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(easeOut(progress) * target);

            el.textContent = isInt ? value : value.toFixed(0);

            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target;
        };

        requestAnimationFrame(step);
    };

    const init = () => {
        const counters = document.querySelectorAll('.stat__number[data-target]');
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(({ isIntersecting, target }) => {
                if (!isIntersecting) return;
                const value = parseInt(target.dataset.target, 10);
                animateCounter(target, value);
                observer.unobserve(target);
            });
        }, { threshold: 0.5 });

        counters.forEach(el => observer.observe(el));
    };

    return { init };
})();

// ─── CHAR COUNTER MODULE ──────────────────────────────────────────────
const CharCounter = (() => {
    const init = () => {
        const textarea = document.getElementById('testimony');
        const counter = document.getElementById('charCount');
        if (!textarea || !counter) return;

        textarea.addEventListener('input', () => {
            const len = textarea.value.length;
            counter.textContent = len;
            counter.style.color = len > 450
                ? 'var(--color-red)'
                : 'var(--color-text-dim)';
        });
    };

    return { init };
})();

// ─── FORM VALIDATION MODULE ───────────────────────────────────────────
const FormValidator = (() => {
    const rules = {
        name: { required: true, label: 'nameError' },
        city: { required: true, label: 'cityError' },
        country: { required: true, label: 'countryError' },
        testimony: { required: true, min: 50, label: 'testimonyError' },
        consent: { checkbox: true, label: 'consentError' },
    };

    const showError = (id, msg) => {
        const el = document.getElementById(id);
        if (el) el.textContent = msg;
    };

    const clearErrors = () => {
        Object.values(rules).forEach(rule => {
            const el = document.getElementById(rule.label);
            if (el) el.textContent = '';
        });
    };

    const validate = (formData) => {
        let valid = true;
        clearErrors();

        if (!formData.name.trim()) {
            showError('nameError', 'Por favor ingresa un nombre o seudónimo.');
            valid = false;
        }

        if (!formData.city.trim()) {
            showError('cityError', 'Por favor ingresa tu ciudad o barrio.');
            valid = false;
        }

        if (!formData.country) {
            showError('countryError', 'Por favor selecciona tu país.');
            valid = false;
        }

        if (!formData.testimony.trim()) {
            showError('testimonyError', 'Por favor escribe tu testimonio.');
            valid = false;
        } else if (formData.testimony.trim().length < 50) {
            showError('testimonyError', 'Tu testimonio debe tener al menos 50 caracteres.');
            valid = false;
        }

        if (!formData.consent) {
            showError('consentError', 'Debes aceptar los términos para continuar.');
            valid = false;
        }

        return valid;
    };

    return { validate };
})();

// ─── TESTIMONY FORM MODULE ────────────────────────────────────────────
const TestimonyForm = (() => {
    const showUnlockSuccess = () => {
        const success = document.getElementById('unlockSuccess');
        if (!success) return;
        success.style.display = 'flex';
        success.style.animation = 'none';
        requestAnimationFrame(() => {
            success.style.opacity = '0';
            success.style.transition = 'opacity 0.5s ease';
            requestAnimationFrame(() => { success.style.opacity = '1'; });
        });
    };

    const addTestimonyCard = (data) => {
        const grid = document.getElementById('testimonialsGrid');
        if (!grid) return;

        const initials = data.name
            .split(' ')
            .map(w => w[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);

        const colors = ['#e63946', '#2a9d8f', '#f4a261', '#6c5ce7'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        const card = document.createElement('article');
        card.className = 'testimonial-card';
        card.innerHTML = `
      <div class="testimonial-card__header">
        <div class="testimonial-card__avatar" style="background:${color}">${initials}</div>
        <div>
          <strong>${escapeHtml(data.name)}</strong>
          <span>${escapeHtml(data.city)}</span>
        </div>
      </div>
      <p>"${escapeHtml(data.testimony.slice(0, 300))}${data.testimony.length > 300 ? '...' : ''}"</p>
      <div class="testimonial-card__tag">#FueraDeJuego #NuevoTestimonio</div>
    `;

        grid.prepend(card);
    };

    const escapeHtml = (str) =>
        str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#039;');

    const init = () => {
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

            // Simulate async submission
            const btn = document.getElementById('submitBtn');
            if (btn) {
                btn.querySelector('.btn-text').style.display = 'none';
                btn.querySelector('.btn-loader').style.display = 'block';
                btn.disabled = true;
            }

            await new Promise(r => setTimeout(r, 1500));

            addTestimonyCard(data);
            form.reset();
            document.getElementById('charCount').textContent = '0';
            showUnlockSuccess();
        });
    };

    return { init };
})();

// ─── SCROLL REVEAL MODULE ─────────────────────────────────────────────
const ScrollReveal = (() => {
    const init = () => {
        const elements = document.querySelectorAll(
            '.city-card, .chapter-card, .data-card, .testimonial-card, .flow-step, .character'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(({ isIntersecting, target }) => {
                if (isIntersecting) {
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0)';
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
            observer.observe(el);
        });
    };

    return { init };
})();

// ─── BOOTSTRAP ────────────────────────────────────────────────────────
const App = {
    init() {
        Navigation.init();
        CounterAnimation.init();
        CharCounter.init();
        TestimonyForm.init();
        ScrollReveal.init();
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());