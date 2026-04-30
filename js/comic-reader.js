const TOTAL_PAGES = 13
const FLIP_MS = 650

let spread = 0
let isFlipping = false
let isMobile = false
let keyHandler = null

function $(id) { return document.getElementById(id) }

function checkMobile() { isMobile = window.innerWidth < 700 }

function totalSpreads() { return Math.ceil(TOTAL_PAGES / 2) }

function leftIndex() { return spread * 2 }

function rightIndex() { return spread * 2 + 1 }

function pageClass(index) {
  return index % 2 === 0 ? 'page-left' : 'page-right'
}

function renderSpread() {
  const viewer = $('comicViewer')
  if (!viewer) return
  const pages = [...viewer.querySelectorAll('.comic-page')]
  pages.forEach((p) => { p.style.display = 'none'; p.className = 'comic-page' })

  if (isMobile) {
    const page = pages[leftIndex()]
    if (page) { page.style.display = 'flex'; page.classList.add('page-left') }
  } else {
    const left = pages[leftIndex()]
    const right = pages[rightIndex()]
    if (left) { left.style.display = 'flex'; left.classList.add('page-left') }
    if (right) { right.style.display = 'flex'; right.classList.add('page-right') }
  }
}

function getMaxSpread() {
  return isMobile ? TOTAL_PAGES - 1 : totalSpreads() - 1
}

function flipForward() {
  if (isFlipping || spread >= getMaxSpread()) return
  isFlipping = true
  const viewer = $('comicViewer')
  if (!viewer) { isFlipping = false; return }
  const pages = [...viewer.querySelectorAll('.comic-page')]

  if (isMobile) {
    const cur = pages[spread]
    const next = pages[spread + 1]
    pages.forEach((p) => { p.style.display = 'none'; p.className = 'comic-page' })
    if (cur) { cur.style.display = 'flex'; cur.classList.add('anim-slide-out-left') }
    if (next) { next.style.display = 'flex'; next.classList.add('anim-slide-in-right') }
  } else {
    const curL = pages[leftIndex()]
    const curR = pages[rightIndex()]
    const nxtL = pages[leftIndex() + 2]
    const nxtR = pages[rightIndex() + 2]
    pages.forEach((p) => { p.style.display = 'none'; p.className = 'comic-page' })
    if (curL) { curL.style.display = 'flex'; curL.classList.add('page-left') }
    if (curR) { curR.style.display = 'flex'; curR.classList.add('page-right') }
    if (nxtL) { nxtL.style.display = 'flex'; nxtL.classList.add('page-left', 'behind') }
    if (nxtR) { nxtR.style.display = 'flex'; nxtR.classList.add('page-right', 'behind') }
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (curR) curR.classList.add('flip-to-left')
      if (curL) curL.classList.add('fade-out')
    }))
  }

  setTimeout(() => { spread++; isFlipping = false; renderSpread(); updateUI() }, FLIP_MS)
}

function flipBackward() {
  if (isFlipping || spread <= 0) return
  isFlipping = true
  const viewer = $('comicViewer')
  if (!viewer) { isFlipping = false; return }
  const pages = [...viewer.querySelectorAll('.comic-page')]

  if (isMobile) {
    const cur = pages[spread]
    const prev = pages[spread - 1]
    pages.forEach((p) => { p.style.display = 'none'; p.className = 'comic-page' })
    if (cur) { cur.style.display = 'flex'; cur.classList.add('anim-slide-out-right') }
    if (prev) { prev.style.display = 'flex'; prev.classList.add('anim-slide-in-left') }
  } else {
    const curL = pages[leftIndex()]
    const curR = rightIndex() < TOTAL_PAGES ? pages[rightIndex()] : null
    const prevL = pages[leftIndex() - 2]
    const prevR = pages[rightIndex() - 2]
    pages.forEach((p) => { p.style.display = 'none'; p.className = 'comic-page' })
    if (curL) { curL.style.display = 'flex'; curL.classList.add('page-left') }
    if (curR) { curR.style.display = 'flex'; curR.classList.add('page-right') }
    if (prevL) { prevL.style.display = 'flex'; prevL.classList.add('page-left', 'behind') }
    if (prevR) { prevR.style.display = 'flex'; prevR.classList.add('page-right', 'behind') }
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (curL) curL.classList.add('flip-to-right')
      if (curR) curR.classList.add('fade-out')
    }))
  }

  setTimeout(() => { spread--; isFlipping = false; renderSpread(); updateUI() }, FLIP_MS)
}

function updateUI() {
  const displayPage = isMobile ? spread + 1 : spread * 2 + 1
  const indicator = $('pageIndicator')
  if (indicator) {
    indicator.innerHTML = `Pag. <span>${displayPage}</span> / ${TOTAL_PAGES}`
  }

  const maxSpread = getMaxSpread()
  const btnPrev = $('btnPrev')
  const btnNext = $('btnNext')
  if (btnPrev) btnPrev.disabled = spread <= 0
  if (btnNext) btnNext.disabled = spread >= maxSpread

  document.querySelectorAll('.comic-thumb').forEach((th, idx) => {
    const active = isMobile ? idx === spread : (idx === leftIndex() || idx === rightIndex())
    th.classList.toggle('active', active)
  })
}

function hideHint() {
  const hint = $('comicHint')
  if (hint && hint.style.opacity !== '0') {
    hint.style.transition = 'opacity 0.4s ease'
    hint.style.opacity = '0'
    setTimeout(() => { if (hint) hint.style.display = 'none' }, 400)
  }
}

function buildThumbnails() {
  const container = $('comicThumbs')
  if (!container) return
  container.innerHTML = ''

  for (let i = 0; i < TOTAL_PAGES; i++) {
    const btn = document.createElement('button')
    btn.className = `comic-thumb${i === 0 ? ' active' : ''}`
    btn.setAttribute('aria-label', `Ir a pagina ${i + 1}`)
    btn.title = `Pagina ${i + 1}`

    const img = document.createElement('img')
    img.src = `comic/${i + 1}.png`
    img.alt = `Pag. ${i + 1}`
    img.loading = 'lazy'
    img.draggable = false
    btn.appendChild(img)

    btn.addEventListener('click', () => jumpToPage(i))
    container.appendChild(btn)
  }
}

function jumpToPage(targetPage) {
  if (isFlipping) return
  const targetSpread = isMobile ? targetPage : Math.floor(targetPage / 2)
  if (targetSpread === spread) return

  const dir = targetSpread > spread ? 'fwd' : 'bwd'
  const doFlip = () => {
    if (isFlipping) { setTimeout(doFlip, FLIP_MS + 60); return }
    if (dir === 'fwd' && spread < targetSpread) {
      flipForward(); setTimeout(doFlip, FLIP_MS + 60)
    } else if (dir === 'bwd' && spread > targetSpread) {
      flipBackward(); setTimeout(doFlip, FLIP_MS + 60)
    }
  }
  doFlip()
}

function bindNavigationButtons() {
  $('btnPrev')?.addEventListener('click', () => { flipBackward(); hideHint() })
  $('btnNext')?.addEventListener('click', () => { flipForward(); hideHint() })
}

function bindKeyboard() {
  if (keyHandler) document.removeEventListener('keydown', keyHandler)
  keyHandler = (e) => {
    if (!$('comicViewer')) {
      document.removeEventListener('keydown', keyHandler)
      keyHandler = null
      return
    }
    if (e.key === 'ArrowRight') { e.preventDefault(); flipForward(); hideHint() }
    if (e.key === 'ArrowLeft') { e.preventDefault(); flipBackward(); hideHint() }
  }
  document.addEventListener('keydown', keyHandler)
}

function bindTouch() {
  const viewer = $('comicViewer')
  viewer._tx = 0
  viewer.addEventListener('touchstart', (e) => { viewer._tx = e.touches[0].clientX }, { passive: true })
  viewer.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - (viewer._tx || 0)
    if (Math.abs(dx) < 40) return
    dx < 0 ? flipForward() : flipBackward()
    hideHint()
  }, { passive: true })
}

function bindFullscreen() {
  const btnFs = $('btnFullscreen')
  if (!btnFs) return
  btnFs.addEventListener('click', () => {
    const stage = document.querySelector('.comic-stage')
    if (!document.fullscreenElement) {
      stage?.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen()
    }
  })
}

function bindResize() {
  let timeout
  window.addEventListener('resize', () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      const wasMobile = isMobile
      checkMobile()
      if (wasMobile !== isMobile) {
        if (!isMobile) spread = Math.floor(spread / 2)
        else spread = spread * 2
        spread = Math.max(0, spread)
        renderSpread()
        updateUI()
      }
    }, 200)
  })
}

export function initComic() {
  const viewer = $('comicViewer')
  if (!viewer) return

  spread = 0
  isFlipping = false
  checkMobile()
  renderSpread()
  buildThumbnails()
  updateUI()
  bindNavigationButtons()
  bindKeyboard()
  bindTouch()
  bindFullscreen()
  bindResize()
}
