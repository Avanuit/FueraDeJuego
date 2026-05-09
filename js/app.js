import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createLenis, getLenis } from './lenis.js'
import { injectComponents } from './components.js'
import { initNavigation } from './navigation.js'
import { initCharCounter } from './char-counter.js'
import { initTestimonyForm } from './testimony-form.js'
import { initPageAnimations, killPageAnimations, refreshAnimations } from './animations/index.js'
import './theme.js'

gsap.registerPlugin(ScrollTrigger)

const PAGE_MODULES = [
  { id: 'comicViewer', path: './comic-reader.js', init: 'initComic' },
  { id: 'leafletMap', path: './leaflet-map.js', init: 'initLeafletMap' },
  { id: 'heroMap', path: './hero-map.js', init: 'initHeroMap' },
]

async function loadPageModules() {
  for (const { id, path, init } of PAGE_MODULES) {
    if (!document.getElementById(id)) continue
    try {
      const mod = await import(path)
      mod[init]()
    } catch (e) {
      console.warn(`Module ${init} failed:`, e)
    }
  }
}

function getNamespace() {
  const container = document.querySelector('[data-barba-namespace]')
  if (container) return container.dataset.barbaNamespace
  if (document.querySelector('.digital-hero')) return 'digital'
  return 'home'
}

function initCommon() {
  initNavigation()
  initCharCounter()
  initTestimonyForm()
}

export const reinit = async () => {
  initCommon()
  await loadPageModules()
  const namespace = getNamespace()
  await initPageAnimations(namespace)
  ScrollTrigger.refresh()
}

export async function initApp() {
  injectComponents()
  createLenis()
  initCommon()
  await loadPageModules()
  const namespace = getNamespace()
  await initPageAnimations(namespace)
  ScrollTrigger.refresh()
}

export { getLenis, killPageAnimations }

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp)
} else {
  initApp()
}
