import Lenis from 'lenis'
import { ScrollTrigger } from './animation-engine.js'

let instance = null
let _rafId = 0

export function createLenis() {
  destroyLenis()
  instance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })
  instance.on('scroll', ScrollTrigger.update)

  function raf(time) {
    instance.raf(time)
    _rafId = requestAnimationFrame(raf)
  }
  _rafId = requestAnimationFrame(raf)

  return instance
}

export function getLenis() {
  return instance
}

export function destroyLenis() {
  if (instance) {
    instance.destroy()
    instance = null
  }
  if (_rafId) {
    cancelAnimationFrame(_rafId)
    _rafId = 0
  }
}
