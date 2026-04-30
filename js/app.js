import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createLenis, getLenis } from './lenis.js'
import { injectComponents } from './components.js'
import { initNavigation } from './navigation.js'
import { initScrollReveal } from './scroll-reveal.js'
import { initCounters } from './counter.js'
import { initCharCounter } from './char-counter.js'
import { initTestimonyForm } from './testimony-form.js'

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

function initCommon() {
  initNavigation()
  initCounters()
  initScrollReveal()
  initCharCounter()
  initTestimonyForm()
}

export const reinit = async () => {
  initCommon()
  await loadPageModules()
  ScrollTrigger.refresh()
}

export async function initApp() {
  injectComponents()
  createLenis()
  initCommon()
  await loadPageModules()
}

export { getLenis }

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp)
} else {
  initApp()
}
