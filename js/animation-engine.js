// ──────────────────────────────────────────────
// Vanilla animation engine — replaces GSAP subset
// ──────────────────────────────────────────────
const _transforms = /* @__PURE__ */ new WeakMap()
const _running = /* @__PURE__ */ new Set()
const _rafId = { current: 0 }
let _tickerCb = null

// ── easing ────────────────────────────────────
function parseEase(raw) {
  if (typeof raw === 'function') return raw
  if (typeof raw !== 'string') return (t) => t
  const m = raw.match(/^(\w+(?:\.\w+)?)(?:\(([^)]*)\))?$/)
  if (!m) return (t) => t
  const [, name, argsStr] = m
  const args = argsStr ? argsStr.split(',').map((s) => parseFloat(s.trim())) : []
  switch (name) {
    case 'none': return (t) => t
    case 'power1.out': return (t) => 1 - Math.pow(1 - t, 1)
    case 'power2.in': return (t) => t * t
    case 'power2.out': return (t) => 1 - Math.pow(1 - t, 2)
    case 'power2.inOut': return (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    case 'power3.in': return (t) => t * t * t
    case 'power3.out': return (t) => 1 - Math.pow(1 - t, 3)
    case 'power3.inOut': return (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    case 'power4.inOut': return (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
    case 'expo.out': return (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
    case 'expo.inOut': return (t) => t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2
    case 'back.out': { const c = args[0] || 1.7; return (t) => 1 + c * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2) }
    case 'back.in': { const c = args[0] || 1.7; return (t) => c * t * t * t - c * t * t }
    case 'elastic.out': {
      const a = args[0] || 1
      const p = args[1] || 0.3
      return (t) => { if (t === 0 || t === 1) return t; const s = p / 4; return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1 }
    }
    default: return (t) => t
  }
}

// ── value helpers ─────────────────────────────
const TR = ['x', 'y', 'z', 'scale', 'scaleX', 'scaleY', 'rotation', 'rotationX', 'rotationY', 'rotationZ', 'xPercent', 'yPercent']
const TR_DEFAULTS = { scale: 1, scaleX: 1, scaleY: 1 }
const TR_UNIT = { x: 'px', y: 'px', xPercent: '%', yPercent: '%', rotation: 'deg', rotationX: 'deg', rotationY: 'deg', rotationZ: 'deg' }

function isTr(p) { return TR.includes(p) }

function parseVal(v) {
  if (typeof v === 'number') return { n: v, u: '' }
  if (typeof v !== 'string') return { n: 0, u: '' }
  const m = v.match(/^([+-]?\d*\.?\d+)\s*(px|%|em|rem|vh|vw|deg|ms|s)?$/)
  return m ? { n: parseFloat(m[1]), u: m[2] || '' } : { n: 0, u: '' }
}

function lerp(a, b, t) { return a + (b - a) * t }

// ── clip-path interpolation ──────────────────
function interpClip(from, to, p) {
  if (typeof from !== 'string' || typeof to !== 'string') return to
  const iRe = /^inset\(([^)]+)\)$/i
  const cRe = /^circle\(([^)]+)\)$/i
  const fi = from.match(iRe)
  const ti = to.match(iRe)
  if (fi && ti) {
    const fp = fi[1].split(/\s+/).map(parseVal)
    const tp = ti[1].split(/\s+/).map(parseVal)
    const r = fp.map((f, i) => { const t = tp[i] || f; return lerp(f.n, t.n, p) + t.u }).join(' ')
    return `inset(${r})`
  }
  const fc = from.match(cRe)
  const tc = to.match(cRe)
  if (fc && tc) {
    const fv = parseVal(fc[1].split(/\s+/)[0])
    const tv = parseVal(tc[1].split(/\s+/)[0])
    const rv = lerp(fv.n, tv.n, p) + tv.u
    const rest = tc[1].replace(/^[^\s]+/, '').trim()
    return rest ? `circle(${rv} ${rest})` : `circle(${rv})`
  }
  return p >= 1 ? to : from
}

// ── get computed state ────────────────────────
function getState(el) {
  let s = _transforms.get(el)
  if (!s) { s = {}; _transforms.set(el, s) }
  return s
}

function buildTransform(el) {
  const s = getState(el)
  const parts = []
  if (s.z !== undefined && s.z !== 0) parts.push(`translateZ(${s.z}px)`)
  const tx = (s.x || 0) + ((s.xPercent || 0) * (el.offsetWidth || 0)) / 100
  const ty = (s.y || 0) + ((s.yPercent || 0) * (el.offsetHeight || 0)) / 100
  if (tx !== 0 || ty !== 0) parts.push(`translate(${tx}px,${ty}px)`)
  if (s.scale !== undefined && s.scale !== 1) parts.push(`scale(${s.scale})`)
  if (s.scaleX !== undefined && s.scaleX !== 1) parts.push(`scaleX(${s.scaleX})`)
  if (s.scaleY !== undefined && s.scaleY !== 1) parts.push(`scaleY(${s.scaleY})`)
  if (s.rotation !== undefined && s.rotation !== 0) parts.push(`rotate(${s.rotation}deg)`)
  if (s.rotationX !== undefined && s.rotationX !== 0) parts.push(`rotateX(${s.rotationX}deg)`)
  if (s.rotationY !== undefined && s.rotationY !== 0) parts.push(`rotateY(${s.rotationY}deg)`)
  if (s.rotationZ !== undefined && s.rotationZ !== 0) parts.push(`rotateZ(${s.rotationZ}deg)`)
  if (s._gpu) parts.push('translate3d(0,0,0)')
  return parts.join(' ')
}

function applyState(el, prop, val) {
  if (isTr(prop)) {
    const s = getState(el)
    s[prop] = val
  } else if (prop === 'transformPerspective') {
    el.style.perspective = typeof val === 'number' ? val + 'px' : val
  } else if (prop === 'force3d') {
    if (val) getState(el)._gpu = true
  }
}

function flushTransform(el) {
  const t = buildTransform(el)
  el.style.transform = t || ''
}

function setStyle(el, prop, val) {
  if (prop === 'textContent') { el.textContent = val; return }
  if (prop === 'force3d' || prop === 'clearProps' || prop === 'transformPerspective') return
  if (prop === 'borderLeftColor') { el.style.borderLeftColor = val; return }
  if (prop === 'backgroundColor') { el.style.backgroundColor = val; return }
  if (prop === 'strokeDasharray') { el.setAttribute('stroke-dasharray', val); return }
  if (prop === 'strokeDashoffset') { el.setAttribute('stroke-dashoffset', val); return }
  if (prop === 'width') { el.style.width = typeof val === 'number' ? val + 'px' : val; return }
  if (prop === 'scaleX') { el.style.transform = `scaleX(${val})`; return }
  if (prop === 'clipPath') { el.style.clipPath = val; return }
  if (prop === 'xPercent') {
    const n = typeof val === 'number' ? val : parseFloat(val)
    const s = getState(el); s.xPercent = isNaN(n) ? 0 : n; flushTransform(el); return
  }
  if (prop === 'opacity') { el.style.opacity = val; return }
  if (prop === 'y') { const s = getState(el); s.y = typeof val === 'number' ? val : parseFloat(val) || 0; flushTransform(el); return }
  if (prop === 'x') { const s = getState(el); s.x = typeof val === 'number' ? val : parseFloat(val) || 0; flushTransform(el); return }
  if (prop === 'visibility') { el.style.visibility = val; return }
  applyState(el, prop, val)
  flushTransform(el)
}

function setProps(el, props) {
  const needsFlush = Object.keys(props).some(isTr)
  for (const [k, v] of Object.entries(props)) {
    if (k === 'clearProps') continue
    setStyle(el, k, v)
  }
  if (needsFlush) flushTransform(el)
}

function getCur(el, prop) {
  if (prop === 'textContent') return { n: parseFloat(el.textContent) || 0, u: '' }
  if (prop === 'opacity') { const v = parseFloat(getComputedStyle(el).opacity); return { n: isNaN(v) ? 1 : v, u: '' } }
  if (prop === 'width') { const v = getComputedStyle(el).width; return parseVal(v) }
  if (prop === 'scaleX') {
    const s = getState(el)
    if (s.scaleX !== undefined) return { n: s.scaleX, u: '' }
    const m = getComputedStyle(el).transform
    if (m && m !== 'none') {
      const match = m.match(/matrix\(([^)]+)\)/)
      if (match) return { n: parseFloat(match[1].split(',')[0]) || 1, u: '' }
    }
    return { n: 1, u: '' }
  }
  if (prop === 'scale') { const s = getState(el); return { n: s.scale !== undefined ? s.scale : 1, u: '' } }
  if (prop === 'rotation') { const s = getState(el); return { n: s.rotation || 0, u: 'deg' } }
  if (prop === 'rotationX') { const s = getState(el); return { n: s.rotationX || 0, u: 'deg' } }
  if (prop === 'rotationY') { const s = getState(el); return { n: s.rotationY || 0, u: 'deg' } }
  if (prop === 'rotationZ') { const s = getState(el); return { n: s.rotationZ || 0, u: 'deg' } }
  if (prop === 'y') { const s = getState(el); return { n: s.y || 0, u: 'px' } }
  if (prop === 'x') { const s = getState(el); return { n: s.x || 0, u: 'px' } }
  if (prop === 'xPercent') { const s = getState(el); return { n: s.xPercent || 0, u: '%' } }
  if (prop === 'yPercent') { const s = getState(el); return { n: s.yPercent || 0, u: '%' } }
  if (prop === 'borderLeftColor') return getComputedStyle(el).borderLeftColor
  if (prop === 'clipPath') return getComputedStyle(el).clipPath || 'none'
  if (prop === 'strokeDasharray') return el.getAttribute('stroke-dasharray') || '0'
  if (prop === 'strokeDashoffset') return el.getAttribute('stroke-dashoffset') || '0'
  return parseVal(getComputedStyle(el)[prop])
}

// ── interpolation between two values ──────────
function interpVal(from, to, prop, p) {
  if (prop === 'clipPath') return interpClip(from, to, p)
  if (prop === 'borderLeftColor' || prop === 'backgroundColor') return p >= 1 ? to : from
  if (prop === 'strokeDasharray' || prop === 'strokeDashoffset') return typeof from === 'number' ? lerp(from, to, p) : to
  if (typeof from === 'string' || typeof to === 'string') return p >= 1 ? to : from
  return lerp(from, to, p)
}

function formatVal(val, unit) { return unit ? val + unit : val }

// ── Tween ─────────────────────────────────────
class Tween {
  constructor(target, fromVars, vars) {
    this.target = target
    this.delay = vars.delay || 0
    this.duration = vars.duration || 0.5
    this.ease = parseEase(vars.ease || 'power2.out')
    this._elapsed = -this.delay
    this._killed = false
    this.onComplete = vars.onComplete || null
    this.onUpdate = vars.onUpdate || null
    this._snap = vars.snap || {}
    this.stagger = null

    this._props = {}
    const animProps = { ...vars }
    delete animProps.delay
    delete animProps.duration
    delete animProps.ease
    delete animProps.onComplete
    delete animProps.onUpdate
    delete animProps.snap
    delete animProps.scrollTrigger
    delete animProps.force3d
    delete animProps.clearProps
    delete animProps.transformPerspective
    delete animProps.stagger

    for (const [prop, toVal] of Object.entries(animProps)) {
      const cur = fromVars && prop in fromVars
        ? (typeof fromVars[prop] === 'function' ? fromVars[prop]() : fromVars[prop])
        : getCur(target, prop)
      const curN = typeof cur === 'object' ? cur.n : cur
      const curU = typeof cur === 'object' ? cur.u : ''
      const toParsed = typeof toVal === 'function' ? toVal() : toVal
      const toP = typeof toParsed === 'object' && !Array.isArray(toParsed) ? toParsed : parseVal(toParsed)
      const toN = typeof toP === 'object' ? toP.n : toP
      const unit = (typeof toP === 'object' && toP.u) ? toP.u : curU

      const fromN = typeof cur === 'object' ? cur.n : (typeof cur === 'string' ? null : cur)

      this._props[prop] = {
        fromN: fromN !== null ? fromN : cur,
        toN,
        unit,
        fromRaw: typeof cur === 'object' ? formatVal(cur.n, cur.u) : cur,
        toRaw: typeof toParsed === 'object' ? formatVal(toParsed.n, toParsed.u) : toParsed,
        numeric: fromN !== null && typeof toN === 'number',
      }
    }

    this._isObj = !(target instanceof Element || target instanceof HTMLElement)
    if (this._isObj) {
      this._objFrom = {}
      for (const [prop, info] of Object.entries(this._props)) {
        this._objFrom[prop] = info.fromN
      }
    }
  }

  progress(p) {
    if (this._killed) return
    const ep = Math.max(0, Math.min(1, this.ease(p)))
    if (this._isObj) {
      for (const [prop, info] of Object.entries(this._props)) {
        const val = lerp(info.fromN, info.toN, ep)
        this.target[prop] = this._snap[prop] ? Math.round(val) : val
      }
      if (this.onUpdate) this.onUpdate()
      return
    }

    const el = this.target
    if (Array.isArray(el)) {
      return  // handled via stagger separately
    }
    for (const [prop, info] of Object.entries(this._props)) {
      if (info.numeric) {
        const val = lerp(info.fromN, info.toN, ep)
        const snapped = this._snap[prop] ? Math.round(val) : val
        setStyle(el, prop, snapped + info.unit)
      } else if (prop === 'clipPath' || prop === 'borderLeftColor' || prop === 'backgroundColor') {
        setStyle(el, prop, interpVal(info.fromRaw, info.toRaw, prop, ep))
      } else {
        setStyle(el, prop, info.toRaw)
      }
    }
    flushTransform(el)
    if (this.onUpdate) this.onUpdate()
  }

  tick(dt) {
    if (this._killed) return true
    this._elapsed += dt
    const isDelaying = this._elapsed < 0
    if (isDelaying) return false
    const dur = this.duration || 0.001
    const p = Math.min(1, Math.max(0, this._elapsed / dur))
    this.progress(p)
    if (p >= 1) {
      if (this.onComplete) this.onComplete()
      return true
    }
    return false
  }

  kill() {
    this._killed = true
  }

  reset() {
    this._elapsed = -this.delay
  }
}

// ── Timeline ──────────────────────────────────
class Timeline {
  constructor(vars = {}) {
    this._children = []
    this._delay = vars.delay || 0
    this._elapsed = -this._delay
    this._killed = false
    this.onComplete = vars.onComplete || null
    this._st = vars.scrollTrigger || null
    this.duration = 0
  }

  to(target, vars, pos) { return this._add(target, null, vars, pos) }
  fromTo(target, from, vars, pos) { return this._add(target, from, vars, pos) }

  _add(target, from, vars, pos) {
    const tween = new Tween(target, from, vars)
    let startTime = this.duration
    if (pos !== undefined) {
      if (typeof pos === 'number') startTime = pos
      else if (pos === '<') startTime = this.duration - (this._children.length ? this._children[this._children.length - 1].tween.duration : 0)
      else if (typeof pos === 'string') {
        const m = pos.match(/^([+-])=(\d*\.?\d+)$/)
        if (m) {
          const sign = m[1] === '+' ? 1 : -1
          const offset = parseFloat(m[2])
          startTime = this.duration + sign * offset
        }
      }
    }
    this._children.push({ tween, startTime })
    this.duration = Math.max(this.duration, startTime + tween.delay + tween.duration)
    return this
  }

  progress(p) {
    if (this._killed) return
    const totalDur = this.duration || 0.001
    const time = p * totalDur
    for (const { tween, startTime } of this._children) {
      const t = time - startTime
      if (t >= -tween.delay) {
        tween._elapsed = t
        tween.progress(Math.min(1, Math.max(0, (t + tween.delay) / (tween.duration || 0.001))))
      }
    }
  }

  tick(dt) {
    if (this._killed) return true
    this._elapsed += dt
    const dur = this.duration || 0.001
    let allDone = true
    for (const { tween, startTime } of this._children) {
      if (!tween._killed) {
        const t = this._elapsed - startTime
        if (t >= -tween.delay) {
          tween._elapsed = t
          const done = tween.tick(0)
          if (!done && t >= 0) allDone = false
        } else {
          allDone = false
        }
      }
    }
    if (allDone && this._elapsed >= dur) {
      if (this.onComplete) this.onComplete()
      return true
    }
    return false
  }

  kill() {
    this._killed = true
    for (const { tween } of this._children) tween.kill()
  }

  reset() {
    this._elapsed = -(this._delay || 0)
    for (const { tween } of this._children) tween.reset()
  }
}

// ── ticker ────────────────────────────────────
function ensureTicker() {
  if (_rafId.current) return
  let last = performance.now()
  function frame(now) {
    const dt = (now - last) / 1000
    last = now
    if (_tickerCb) _tickerCb(now)
    const toRemove = []
    for (const t of _running) {
      if (t.tick(dt)) toRemove.push(t)
    }
    for (const t of toRemove) _running.delete(t)
    if (_running.size > 0 || _tickerCb) {
      _rafId.current = requestAnimationFrame(frame)
    } else {
      _rafId.current = 0
    }
  }
  _rafId.current = requestAnimationFrame(frame)
}

// ── ScrollTrigger ─────────────────────────────
const _stAll = /* @__PURE__ */ new Set()
let _stScrollBound = false

function _ensureSTScroll() {
  if (_stScrollBound) return
  _stScrollBound = true
  let ticking = false
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        for (const st of _stAll) {
          if (st._onScroll) st._onScroll()
        }
        ticking = false
      })
      ticking = true
    }
  }, { passive: true })
}

function _parseStartEnd(raw, trigger) {
  if (!raw) return () => 0
  const parts = raw.split(' ')
  const tPart = parts[0] || 'top'
  const vPart = parts[1] || 'bottom'

  return () => {
    if (!trigger || !trigger.getBoundingClientRect) return 0
    const rect = trigger.getBoundingClientRect()
    const vh = window.innerHeight

    let triggerY
    if (tPart === 'top') triggerY = rect.top + window.scrollY
    else if (tPart === 'bottom') triggerY = rect.bottom + window.scrollY
    else if (tPart === 'center') triggerY = rect.top + rect.height / 2 + window.scrollY
    else triggerY = rect.top + rect.height * (parseFloat(tPart) / 100) + window.scrollY

    let viewportShift
    if (vPart === 'top') viewportShift = 0
    else if (vPart === 'bottom') viewportShift = vh
    else if (vPart === 'center') viewportShift = vh / 2
    else viewportShift = vh * (parseFloat(vPart) / 100)

    return triggerY - viewportShift
  }
}

class ScrollTrigger {
  constructor(vars) {
    this.vars = vars
    this.trigger = typeof vars.trigger === 'string' ? document.querySelector(vars.trigger) : vars.trigger
    this.once = vars.once !== false
    this._fired = false
    this._anim = vars.animation || null
    this._onEnter = vars.onEnter || null
    this._onLeave = vars.onLeave || null
    this._persistent = vars._persistent || false
    this._scrub = vars.scrub || 0
    this._getStart = _parseStartEnd(vars.start, this.trigger)
    this._getEnd = _parseStartEnd(vars.end, this.trigger)
    this._boundScroll = null

    _ensureSTScroll()
    this._boundScroll = () => this._onScroll()
    _stAll.add(this)
  }

  _onScroll() {
    if (!this.trigger) return
    const scrollY = window.scrollY || window.pageYOffset
    const start = this._getStart()
    const end = this._getEnd ? this._getEnd() : start + window.innerHeight

    if (this._scrub && this._anim) {
      const range = end - start
      if (range <= 0) return
      const progress = Math.max(0, Math.min(1, (scrollY - start) / range))
      this._anim.progress(progress)
      return
    }

    // non-scrub: fire onEnter when scroll passes start
    if (!this._fired && scrollY >= start) {
      this._fired = true
      if (this._onEnter) this._onEnter()
      if (this._anim) {
        this._anim.reset()
        _running.add(this._anim)
        ensureTicker()
      }
    }

    if (this._fired && this._onLeave && scrollY > end && !this._left) {
      this._left = true
      this._onLeave()
    }
  }

  kill() {
    if (this._anim && this._anim.kill) this._anim.kill()
    _stAll.delete(this)
  }

  static create(vars) {
    const st = new ScrollTrigger({
      trigger: vars.trigger,
      start: vars.start,
      end: vars.end,
      once: vars.once,
      scrub: vars.scrub,
      onEnter: vars.onEnter,
      onLeave: vars.onLeave,
      _persistent: vars._persistent,
    })
    return st
  }

  static getAll() { return [..._stAll] }
  static refresh() {
    for (const st of _stAll) {
      if (st._onScroll) st._onScroll()
    }
  }
  static update() {
    for (const st of _stAll) {
      if (st._scrub && st._onScroll) st._onScroll()
    }
  }
}

// ── gsap object ───────────────────────────────
const gsap = {
  set(el, props) {
    if (Array.isArray(el)) { el.forEach((e) => this.set(e, props)); return }
    if (el instanceof NodeList) { el.forEach((e) => this.set(e, props)); return }
    setProps(el, props)
  },

  to(target, vars) {
    if (vars.scrollTrigger) {
      const stCfg = vars.scrollTrigger
      const animVars = { ...vars }
      delete animVars.scrollTrigger
      const tween = new Tween(target, null, animVars)

      const onEnter = stCfg.scrub ? null : () => {
        tween.reset()
        _running.add(tween)
        ensureTicker()
      }
      new ScrollTrigger({
        trigger: stCfg.trigger,
        start: stCfg.start,
        end: stCfg.end,
        once: stCfg.once,
        scrub: stCfg.scrub,
        onEnter,
        _persistent: stCfg._persistent,
        animation: stCfg.scrub ? tween : null,
      })
      return tween
    }
    const tween = new Tween(target, null, vars)
    _running.add(tween)
    ensureTicker()
    return tween
  },

  fromTo(target, fromVars, toVars) {
    if (Array.isArray(target) || target instanceof NodeList) {
      const items = Array.from(target)
      const staggerCfg = toVars.stagger
      const tweens = []

      const toVarsCopy = { ...toVars }
      const stagger = staggerCfg
      delete toVarsCopy.stagger
      delete toVarsCopy.scrollTrigger

      items.forEach((el, i) => {
        const vars = { ...toVarsCopy }
        if (stagger) {
          if (typeof stagger === 'object' && stagger.each) {
            vars.delay = (toVars.delay || 0) + i * stagger.each
          } else if (typeof stagger === 'number') {
            vars.delay = (toVars.delay || 0) + i * stagger
          }
        }
        const t = new Tween(el, fromVars, vars)
        tweens.push(t)
      })

      if (toVars.scrollTrigger) {
        const stCfg = toVars.scrollTrigger
        const onEnter = () => {
          tweens.forEach((t) => { t.reset(); _running.add(t) })
          ensureTicker()
        }
        new ScrollTrigger({
          trigger: stCfg.trigger,
          start: stCfg.start,
          end: stCfg.end,
          once: stCfg.once,
          scrub: stCfg.scrub,
          onEnter,
          _persistent: stCfg._persistent,
        })
        return tweens
      }

      tweens.forEach((t) => { _running.add(t) })
      ensureTicker()
      return tweens
    }

    if (typeof target === 'object' && !(target instanceof Element)) {
      const tween = new Tween(target, fromVars, toVars)
      _running.add(tween)
      ensureTicker()
      return tween
    }

    if (toVars.scrollTrigger) {
      const stCfg = toVars.scrollTrigger
      const tween = new Tween(target, fromVars, toVars)

      const onEnter = stCfg.scrub ? null : () => {
        tween.reset()
        _running.add(tween)
        ensureTicker()
      }
      new ScrollTrigger({
        trigger: stCfg.trigger,
        start: stCfg.start,
        end: stCfg.end,
        once: stCfg.once,
        scrub: stCfg.scrub,
        onEnter,
        _persistent: stCfg._persistent,
        animation: stCfg.scrub ? tween : null,
      })
      return tween
    }

    const tween = new Tween(target, fromVars, toVars)
    _running.add(tween)
    ensureTicker()
    return tween
  },

  timeline(vars = {}) {
    const tl = new Timeline(vars)
    if (vars.scrollTrigger) {
      const stCfg = vars.scrollTrigger
      const onEnter = () => {
        tl.reset()
        _running.add(tl)
        ensureTicker()
      }
      new ScrollTrigger({
        trigger: stCfg.trigger,
        start: stCfg.start,
        end: stCfg.end,
        once: stCfg.once,
        onEnter,
        _persistent: stCfg._persistent,
      })
      return tl
    }
    _running.add(tl)
    ensureTicker()
    return tl
  },

  registerPlugin() {},

  context(fn) {
    const animations = new Set()
    const prevRunning = new Set(_running)
    fn()
    for (const a of _running) {
      if (!prevRunning.has(a)) animations.add(a)
    }
    return {
      revert() {
        for (const a of animations) {
          if (a.kill) a.kill()
          _running.delete(a)
        }
      },
      add(a) { if (a) animations.add(a) },
    }
  },

  ticker: {
    add(fn) { _tickerCb = fn },
    lagSmoothing() {},
  },

  utils: {
    random(min, max) {
      return Math.random() * (max - min) + min
    },
  },

  getProperty(el, prop) {
    if (prop === 'textContent') return parseFloat(el.textContent) || 0
    return el.textContent
  },
}

export default gsap
export { ScrollTrigger, gsap }
