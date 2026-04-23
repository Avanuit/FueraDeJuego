/**
 * comic.js
 * Lector de cómic — animación de volteo tipo libro real.
 * Al avanzar: la página derecha gira hacia la izquierda (como pasar hoja).
 * Al retroceder: la página izquierda gira hacia la derecha.
 * Sin librerías externas. Compatible con Barba.js.
 */

'use strict';

const ComicReader = (() => {

    const TOTAL_PAGES   = 13;   // Total de páginas del cómic
    const FLIP_MS       = 650;  // Duración animación ms

    let spread      = 0;    // Índice del par visible (0 = págs 0-1, 1 = págs 2-3, ...)
    let isFlipping  = false;
    let isMobile    = false;
    let _keyHandler = null;

    const $ = (id) => document.getElementById(id);
    const checkMobile = () => { isMobile = window.innerWidth < 700; };

    // Número de spreads (pares) en desktop
    const totalSpreads = () => Math.ceil(TOTAL_PAGES / 2);   // 6 spreads para 12 págs

    // Índice de página izquierda del spread actual
    const leftIdx  = () => spread * 2;
    const rightIdx = () => spread * 2 + 1;

    // ── Renderizar el spread actual (sin animación) ───────────────
    const renderSpread = () => {
        const viewer = $('comicViewer');
        if (!viewer) return;
        const pages = [...viewer.querySelectorAll('.comic-page')];

        // Ocultar todas
        pages.forEach(p => { p.style.display = 'none'; p.className = 'comic-page'; });

        if (isMobile) {
            // Móvil: una sola página = leftIdx del spread
            const p = pages[leftIdx()];
            if (p) { p.style.display = 'flex'; p.classList.add('page-left'); }
        } else {
            // Desktop: par izquierda + derecha
            const pL = pages[leftIdx()];
            const pR = pages[rightIdx()];
            if (pL) { pL.style.display = 'flex'; pL.classList.add('page-left'); }
            if (pR) { pR.style.display = 'flex'; pR.classList.add('page-right'); }
        }
    };

    // ── Animación avanzar: la hoja derecha se voltea hacia la izq ─
    const flipForward = () => {
        if (isFlipping) return;
        const maxSpread = isMobile ? TOTAL_PAGES - 1 : totalSpreads() - 1;
        if (spread >= maxSpread) return;

        isFlipping = true;
        const viewer = $('comicViewer');
        if (!viewer) { isFlipping = false; return; }
        const pages = [...viewer.querySelectorAll('.comic-page')];

        if (isMobile) {
            // Móvil: página actual sale por izquierda, siguiente entra por derecha
            const curP  = pages[spread];
            const nextP = pages[spread + 1];

            pages.forEach(p => { p.style.display = 'none'; p.className = 'comic-page'; });

            if (curP)  { curP.style.display  = 'flex'; curP.classList.add('anim-slide-out-left'); }
            if (nextP) { nextP.style.display = 'flex'; nextP.classList.add('anim-slide-in-right'); }

            setTimeout(() => {
                spread++;
                isFlipping = false;
                renderSpread();
                updateUI();
            }, FLIP_MS);

        } else {
            // Desktop: la hoja derecha del spread actual gira hacia la izquierda,
            // revelando las dos páginas del siguiente spread.
            const curL  = pages[leftIdx()];
            const curR  = pages[rightIdx()];   // esta es la que "voltea"
            const nxtL  = pages[leftIdx() + 2];
            const nxtR  = pages[rightIdx() + 2];

            pages.forEach(p => { p.style.display = 'none'; p.className = 'comic-page'; });

            // Mostrar spread actual
            if (curL) { curL.style.display = 'flex'; curL.classList.add('page-left'); }
            if (curR) { curR.style.display = 'flex'; curR.classList.add('page-right'); }

            // Pre-mostrar siguiente spread detrás (invisible por el z-index)
            if (nxtL) { nxtL.style.display = 'flex'; nxtL.classList.add('page-left', 'behind'); }
            if (nxtR) { nxtR.style.display = 'flex'; nxtR.classList.add('page-right', 'behind'); }

            // Dar un frame para que el navegador pinte el estado inicial
            requestAnimationFrame(() => requestAnimationFrame(() => {
                // La hoja derecha gira hacia la izquierda (flip de libro)
                if (curR) curR.classList.add('flip-to-left');
                // La izquierda actual se desvanece suavemente
                if (curL) curL.classList.add('fade-out');
            }));

            setTimeout(() => {
                spread++;
                isFlipping = false;
                renderSpread();
                updateUI();
            }, FLIP_MS);
        }
    };

    // ── Animación retroceder: la hoja izquierda se voltea a la der ─
    const flipBackward = () => {
        if (isFlipping) return;
        if (spread <= 0) return;

        isFlipping = true;
        const viewer = $('comicViewer');
        if (!viewer) { isFlipping = false; return; }
        const pages = [...viewer.querySelectorAll('.comic-page')];

        if (isMobile) {
            const curP  = pages[spread];
            const prevP = pages[spread - 1];

            pages.forEach(p => { p.style.display = 'none'; p.className = 'comic-page'; });

            if (curP)  { curP.style.display  = 'flex'; curP.classList.add('anim-slide-out-right'); }
            if (prevP) { prevP.style.display = 'flex'; prevP.classList.add('anim-slide-in-left'); }

            setTimeout(() => {
                spread--;
                isFlipping = false;
                renderSpread();
                updateUI();
            }, FLIP_MS);

        } else {
            const curL  = pages[leftIdx()];
            const curR  = rightIdx() < TOTAL_PAGES ? pages[rightIdx()] : null;
            const prevL = pages[leftIdx() - 2];
            const prevR = pages[rightIdx() - 2];

            pages.forEach(p => { p.style.display = 'none'; p.className = 'comic-page'; });

            if (curL) { curL.style.display = 'flex'; curL.classList.add('page-left'); }
            if (curR) { curR.style.display = 'flex'; curR.classList.add('page-right'); }

            if (prevL) { prevL.style.display = 'flex'; prevL.classList.add('page-left', 'behind'); }
            if (prevR) { prevR.style.display = 'flex'; prevR.classList.add('page-right', 'behind'); }

            requestAnimationFrame(() => requestAnimationFrame(() => {
                // La hoja izquierda gira hacia la derecha
                if (curL) curL.classList.add('flip-to-right');
                if (curR) curR.classList.add('fade-out');
            }));

            setTimeout(() => {
                spread--;
                isFlipping = false;
                renderSpread();
                updateUI();
            }, FLIP_MS);
        }
    };

    // ── Actualizar indicador, botones y miniaturas ────────────────
    const updateUI = () => {
        const dispPage = isMobile ? spread + 1 : spread * 2 + 1;
        const indicator = $('pageIndicator');
        if (indicator) {
            indicator.innerHTML = `Pág. <span>${dispPage}</span> / ${TOTAL_PAGES}`;
        }

        const maxSpread = isMobile ? TOTAL_PAGES - 1 : totalSpreads() - 1;
        const btnPrev = $('btnPrev');
        const btnNext = $('btnNext');
        if (btnPrev) btnPrev.disabled = spread <= 0;
        if (btnNext) btnNext.disabled = spread >= maxSpread;

        // Miniaturas
        document.querySelectorAll('.comic-thumb').forEach((th, idx) => {
            const active = isMobile
                ? idx === spread
                : (idx === leftIdx() || idx === rightIdx());
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

            const targetPage = i;
            btn.addEventListener('click', () => {
                if (isFlipping) return;
                const targetSpread = isMobile ? targetPage : Math.floor(targetPage / 2);
                if (targetSpread === spread) return;

                const dir = targetSpread > spread ? 'fwd' : 'bwd';
                const doFlip = () => {
                    if (isFlipping) { setTimeout(doFlip, FLIP_MS + 60); return; }
                    if (dir === 'fwd' && spread < targetSpread) {
                        flipForward(); setTimeout(doFlip, FLIP_MS + 60);
                    } else if (dir === 'bwd' && spread > targetSpread) {
                        flipBackward(); setTimeout(doFlip, FLIP_MS + 60);
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

    // ── Inicializar ───────────────────────────────────────────────
    const init = () => {
        const viewer = $('comicViewer');
        if (!viewer) return;

        // Reset
        spread     = 0;
        isFlipping = false;
        checkMobile();
        renderSpread();
        buildThumbnails();
        updateUI();

        // Botones — clonar para limpiar listeners anteriores
        ['btnPrev', 'btnNext'].forEach(id => {
            const el = $(id);
            if (!el) return;
            const clone = el.cloneNode(true);
            el.parentNode.replaceChild(clone, el);
        });
        $('btnPrev')?.addEventListener('click', () => { flipBackward(); hideHint(); });
        $('btnNext')?.addEventListener('click', () => { flipForward();  hideHint(); });

        // Teclado
        if (_keyHandler) document.removeEventListener('keydown', _keyHandler);
        _keyHandler = (e) => {
            if (!$('comicViewer')) { document.removeEventListener('keydown', _keyHandler); _keyHandler = null; return; }
            if (e.key === 'ArrowRight') { e.preventDefault(); flipForward();  hideHint(); }
            if (e.key === 'ArrowLeft')  { e.preventDefault(); flipBackward(); hideHint(); }
        };
        document.addEventListener('keydown', _keyHandler);

        // Swipe táctil
        viewer.addEventListener('touchstart', (e) => { viewer._tx = e.touches[0].clientX; }, { passive: true });
        viewer.addEventListener('touchend',   (e) => {
            const dx = e.changedTouches[0].clientX - (viewer._tx || 0);
            if (Math.abs(dx) < 40) return;
            dx < 0 ? flipForward() : flipBackward();
            hideHint();
        }, { passive: true });

        // Fullscreen
        const btnFs = $('btnFullscreen');
        if (btnFs) {
            const clone = btnFs.cloneNode(true);
            btnFs.parentNode.replaceChild(clone, btnFs);
            clone.addEventListener('click', () => {
                const stage = document.querySelector('.comic-stage');
                !document.fullscreenElement
                    ? stage?.requestFullscreen().catch(() => {})
                    : document.exitFullscreen();
            });
        }

        // Resize
        let _rt;
        window.addEventListener('resize', () => {
            clearTimeout(_rt);
            _rt = setTimeout(() => {
                const wasMobile = isMobile;
                checkMobile();
                if (wasMobile !== isMobile) {
                    // Recalcular spread para mantener posición aproximada
                    if (!isMobile) spread = Math.floor(spread / 2);
                    else           spread = spread * 2;
                    spread = Math.max(0, spread);
                    renderSpread();
                    updateUI();
                }
            }, 200);
        });
    };

    return { init };
})();

document.addEventListener('DOMContentLoaded', () => { ComicReader.init(); });
