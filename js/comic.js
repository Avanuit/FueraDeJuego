/**
 * comic.js
 * Lector de cómic con animación de volteo de página.
 * Implementación propia en CSS 3D + JS — sin dependencias externas.
 * Compatible con Barba.js: expone ComicReader.init() globalmente.
 */

'use strict';

const ComicReader = (() => {

    const TOTAL_PAGES   = 6;
    const FLIP_DURATION = 700; // ms

    let currentPage = 0;
    let isFlipping  = false;
    let isMobile    = false;
    let initialized = false;

    const $ = (id) => document.getElementById(id);

    const checkMobile = () => { isMobile = window.innerWidth < 700; };

    // ── Renderizar páginas visibles ───────────────────────────────
    const renderPages = () => {
        const viewer = $('comicViewer');
        if (!viewer) return;
        const pages = [...viewer.querySelectorAll('.comic-page')];

        pages.forEach(p => {
            p.style.display = 'none';
            p.className = 'comic-page';
        });

        if (isMobile) {
            const cur = pages[currentPage];
            if (cur) { cur.style.display = 'flex'; cur.classList.add('visible'); }
        } else {
            const left  = pages[currentPage];
            const right = pages[currentPage + 1];
            if (left)  { left.style.display  = 'flex'; left.classList.add('visible'); }
            if (right) { right.style.display = 'flex'; right.classList.add('visible-right'); }
        }
    };

    // ── Avanzar página ────────────────────────────────────────────
    const flipForward = () => {
        if (isFlipping) return;
        const step    = isMobile ? 1 : 2;
        const maxPage = TOTAL_PAGES - step;
        if (currentPage >= maxPage) return;

        isFlipping = true;
        const viewer = $('comicViewer');
        if (!viewer) { isFlipping = false; return; }
        const pages = [...viewer.querySelectorAll('.comic-page')];

        const outL = pages[currentPage];
        const outR = !isMobile ? pages[currentPage + 1] : null;
        const inL  = pages[currentPage + step];
        const inR  = !isMobile ? pages[currentPage + step + 1] : null;

        pages.forEach(p => { p.style.display = 'none'; p.className = 'comic-page'; });

        if (outL) { outL.style.display = 'flex'; outL.classList.add('flip-out-left'); }
        if (outR) { outR.style.display = 'flex'; outR.classList.add('flip-out-right'); }
        if (inL)  { inL.style.display  = 'flex'; inL.classList.add('flip-in-right-prep'); }
        if (inR)  { inR.style.display  = 'flex'; inR.classList.add('flip-in-left-prep'); }

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (inL) { inL.classList.remove('flip-in-right-prep'); inL.classList.add('flip-in-right'); }
                if (inR) { inR.classList.remove('flip-in-left-prep');  inR.classList.add('flip-in-left'); }
            });
        });

        setTimeout(() => {
            currentPage += step;
            isFlipping = false;
            renderPages();
            updateUI();
        }, FLIP_DURATION);
    };

    // ── Retroceder página ─────────────────────────────────────────
    const flipBackward = () => {
        if (isFlipping || currentPage <= 0) return;

        isFlipping = true;
        const step  = isMobile ? 1 : 2;
        const prev  = currentPage - step;
        const viewer = $('comicViewer');
        if (!viewer) { isFlipping = false; return; }
        const pages = [...viewer.querySelectorAll('.comic-page')];

        const outL = pages[currentPage];
        const outR = !isMobile ? pages[currentPage + 1] : null;
        const inL  = pages[prev];
        const inR  = !isMobile ? pages[prev + 1] : null;

        pages.forEach(p => { p.style.display = 'none'; p.className = 'comic-page'; });

        if (outL) { outL.style.display = 'flex'; outL.classList.add('flip-back-out-left'); }
        if (outR) { outR.style.display = 'flex'; outR.classList.add('flip-back-out-right'); }
        if (inL)  { inL.style.display  = 'flex'; inL.classList.add('flip-back-in-left-prep'); }
        if (inR)  { inR.style.display  = 'flex'; inR.classList.add('flip-back-in-right-prep'); }

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (inL) { inL.classList.remove('flip-back-in-left-prep');  inL.classList.add('flip-back-in-left'); }
                if (inR) { inR.classList.remove('flip-back-in-right-prep'); inR.classList.add('flip-back-in-right'); }
            });
        });

        setTimeout(() => {
            currentPage = prev;
            isFlipping = false;
            renderPages();
            updateUI();
        }, FLIP_DURATION);
    };

    // ── Actualizar UI ─────────────────────────────────────────────
    const updateUI = () => {
        const indicator = $('pageIndicator');
        if (indicator) {
            indicator.innerHTML = `Pág. <span>${currentPage + 1}</span> / ${TOTAL_PAGES}`;
        }

        const step    = isMobile ? 1 : 2;
        const maxPage = TOTAL_PAGES - step;
        const btnPrev = $('btnPrev');
        const btnNext = $('btnNext');
        if (btnPrev) btnPrev.disabled = currentPage <= 0;
        if (btnNext) btnNext.disabled = currentPage >= maxPage;

        document.querySelectorAll('.comic-thumb').forEach((th, idx) => {
            const active = isMobile
                ? idx === currentPage
                : (idx === currentPage || idx === currentPage + 1);
            th.classList.toggle('active', active);
        });
    };

    // ── Construir miniaturas ──────────────────────────────────────
    const buildThumbnails = () => {
        const container = $('comicThumbs');
        if (!container) return;
        container.innerHTML = '';

        for (let i = 0; i < TOTAL_PAGES; i++) {
            const btn = document.createElement('button');
            btn.className = `comic-thumb${i === 0 ? ' active' : ''}`;
            btn.setAttribute('aria-label', `Ir a página ${i + 1}`);
            btn.title = `Página ${i + 1}`;

            const img = document.createElement('img');
            img.src = `comic/${i + 1}.png`;
            img.alt = `Pág. ${i + 1}`;
            img.loading = 'lazy';
            img.draggable = false;
            btn.appendChild(img);

            const targetIdx = i;
            btn.addEventListener('click', () => {
                if (isFlipping) return;
                const step   = isMobile ? 1 : 2;
                const target = isMobile ? targetIdx : (targetIdx % 2 === 0 ? targetIdx : targetIdx - 1);
                if (target === currentPage) return;

                const direction = target > currentPage ? 'fwd' : 'bwd';
                const doFlip = () => {
                    if (isFlipping) { setTimeout(doFlip, FLIP_DURATION + 60); return; }
                    if (direction === 'fwd' && currentPage < target) {
                        flipForward(); hideHint(); setTimeout(doFlip, FLIP_DURATION + 60);
                    } else if (direction === 'bwd' && currentPage > target) {
                        flipBackward(); hideHint(); setTimeout(doFlip, FLIP_DURATION + 60);
                    }
                };
                doFlip();
            });

            container.appendChild(btn);
        }
    };

    // ── Ocultar hint ──────────────────────────────────────────────
    const hideHint = () => {
        const hint = $('comicHint');
        if (hint && hint.style.opacity !== '0') {
            hint.style.transition = 'opacity 0.4s ease';
            hint.style.opacity = '0';
            setTimeout(() => { if (hint) hint.style.display = 'none'; }, 400);
        }
    };

    // ── Keydown handler con referencia para poder removerlo ───────
    let _keyHandler = null;

    // ── Inicializar ───────────────────────────────────────────────
    const init = () => {
        const viewer = $('comicViewer');
        if (!viewer) return; // No estamos en comic.html

        // Reset de estado al reiniciar (Barba)
        currentPage = 0;
        isFlipping  = false;
        initialized = true;

        checkMobile();
        renderPages();
        buildThumbnails();
        updateUI();

        // ── Botones (clonar para limpiar listeners previos) ──
        ['btnPrev', 'btnNext'].forEach(id => {
            const el = $(id);
            if (!el) return;
            const clone = el.cloneNode(true);
            el.parentNode.replaceChild(clone, el);
        });
        $('btnPrev')?.addEventListener('click', () => { flipBackward(); hideHint(); });
        $('btnNext')?.addEventListener('click', () => { flipForward();  hideHint(); });

        // ── Teclado ──
        if (_keyHandler) document.removeEventListener('keydown', _keyHandler);
        _keyHandler = (e) => {
            if (!$('comicViewer')) {
                document.removeEventListener('keydown', _keyHandler);
                _keyHandler = null;
                return;
            }
            if (e.key === 'ArrowRight') { e.preventDefault(); flipForward();  hideHint(); }
            if (e.key === 'ArrowLeft')  { e.preventDefault(); flipBackward(); hideHint(); }
        };
        document.addEventListener('keydown', _keyHandler);

        // ── Swipe táctil ──
        viewer.addEventListener('touchstart', (e) => {
            viewer._touchX = e.touches[0].clientX;
        }, { passive: true });
        viewer.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].clientX - (viewer._touchX || 0);
            if (Math.abs(dx) < 40) return;
            dx < 0 ? flipForward() : flipBackward();
            hideHint();
        }, { passive: true });

        // ── Fullscreen ──
        const btnFs = $('btnFullscreen');
        if (btnFs) {
            const newFs = btnFs.cloneNode(true);
            btnFs.parentNode.replaceChild(newFs, btnFs);
            newFs.addEventListener('click', () => {
                const stage = document.querySelector('.comic-stage');
                !document.fullscreenElement
                    ? stage?.requestFullscreen().catch(() => {})
                    : document.exitFullscreen();
            });
        }

        // ── Resize ──
        let _resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(_resizeTimer);
            _resizeTimer = setTimeout(() => {
                const wasMobile = isMobile;
                checkMobile();
                if (wasMobile !== isMobile) {
                    if (!isMobile && currentPage % 2 !== 0) currentPage--;
                    renderPages();
                    updateUI();
                }
            }, 200);
        });
    };

    return { init };
})();

// ─── BOOTSTRAP ────────────────────────────────────────────────────────
// Carga directa de la página (sin Barba)
document.addEventListener('DOMContentLoaded', () => {
    ComicReader.init();
});
