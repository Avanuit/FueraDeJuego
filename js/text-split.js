// ──────────────────────────────────────────────
// Text Split — Fuera de Juego
// Lightweight vanilla text splitter (chars / words / lines)
// Compatible API with the original; enhanced for lines
// ──────────────────────────────────────────────

const instances = /* @__PURE__ */ new Map()

function wrapChars(node, charsClass) {
  const text = node.textContent
  if (!text) return []

  const span = document.createElement('span')
  span.className = charsClass || 'char'
  span.style.display = 'inline-block'
  span.style.willChange = 'transform, opacity'

  const chars = []
  for (const char of text) {
    const clone = span.cloneNode(false)
    clone.textContent = char === ' ' ? '\u00A0' : char
    chars.push(clone)
  }

  const wrapper = document.createElement('span')
  wrapper.style.display = 'inline'
  chars.forEach((c) => wrapper.appendChild(c))

  return { wrapper, chars }
}

function wrapWords(node, wordsClass) {
  const text = node.textContent
  if (!text) return []

  const words = text.split(/(\s+)/).filter(Boolean)
  const wordSpan = document.createElement('span')
  wordSpan.className = wordsClass || 'word'
  wordSpan.style.display = 'inline-block'
  wordSpan.style.overflow = 'hidden'
  wordSpan.style.verticalAlign = 'top'

  const wordEls = []
  const wrapper = document.createElement('span')
  wrapper.style.display = 'inline'

  words.forEach((word) => {
    if (/^\s+$/.test(word)) {
      const space = document.createTextNode(' ')
      wrapper.appendChild(space)
      return
    }
    const clone = wordSpan.cloneNode(false)
    clone.textContent = word
    wordEls.push(clone)
    wrapper.appendChild(clone)
  })

  return { wrapper, words: wordEls }
}

function wrapLines(el, wordsClass, charsClass) {
  // First wrap words, then detect lines by offsetTop
  const wordResult = wrapWords(el, wordsClass)
  const tempContainer = document.createElement('div')
  tempContainer.style.position = 'absolute'
  tempContainer.style.visibility = 'hidden'
  tempContainer.style.width = getComputedStyle(el).width
  tempContainer.appendChild(wordResult.wrapper.cloneNode(true))
  document.body.appendChild(tempContainer)

  const tempWords = tempContainer.querySelectorAll('.' + (wordsClass || 'word'))
  const lines = []
  let currentLine = []
  let currentTop = null

  tempWords.forEach((word) => {
    const top = word.offsetTop
    if (currentTop === null || Math.abs(top - currentTop) < 2) {
      currentLine.push(word.textContent)
    } else {
      lines.push(currentLine.join(' '))
      currentLine = [word.textContent]
    }
    currentTop = top
  })
  if (currentLine.length) lines.push(currentLine.join(' '))

  document.body.removeChild(tempContainer)

  // Now build line wrappers
  const lineSpan = document.createElement('span')
  lineSpan.className = 'line'
  lineSpan.style.display = 'block'
  lineSpan.style.overflow = 'hidden'

  const lineEls = []
  const wrapper = document.createElement('span')
  wrapper.style.display = 'inline'

  lines.forEach((lineText) => {
    const clone = lineSpan.cloneNode(false)
    const inner = document.createElement('span')
    inner.style.display = 'inline-block'
    inner.textContent = lineText
    clone.appendChild(inner)
    lineEls.push(clone)
    wrapper.appendChild(clone)
  })

  return { wrapper, lines: lineEls, words: [], chars: [] }
}

function processNode(node, type, charsClass, wordsClass) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (type === 'chars') {
      const result = wrapChars(node, charsClass)
      return { wrapper: result.wrapper, chars: result.chars }
    }
    if (type === 'words') {
      const result = wrapWords(node, wordsClass)
      return { wrapper: result.wrapper, words: result.words }
    }
    return { wrapper: document.createTextNode(node.textContent) }
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    const clone = node.cloneNode(false)
    const childChars = []
    const childWords = []

    Array.from(node.childNodes).forEach((child) => {
      const result = processNode(child, type, charsClass, wordsClass)
      clone.appendChild(result.wrapper)
      if (result.chars) childChars.push(...result.chars)
      if (result.words) childWords.push(...result.words)
    })

    return { wrapper: clone, chars: childChars, words: childWords }
  }

  return { wrapper: node.cloneNode(false) }
}

export function splitText(selector, opts = {}) {
  const el = typeof selector === 'string' ? document.querySelector(selector) : selector
  if (!el) return null

  const key = el
  if (instances.has(key)) {
    return instances.get(key)
  }

  const {
    type = 'chars',
    charsClass = 'char',
    wordsClass = 'word',
  } = opts

  // Save original HTML for revert
  const original = el.innerHTML

  let chars = []
  let words = []
  let lines = []

  if (type === 'lines') {
    const result = wrapLines(el, wordsClass, charsClass)
    el.innerHTML = ''
    el.appendChild(result.wrapper)
    lines = result.lines
  } else {
    const result = processNode(el, type, charsClass, wordsClass)
    el.innerHTML = ''
    el.appendChild(result.wrapper)
    chars = result.chars || []
    words = result.words || []
  }

  const instance = {
    el,
    chars,
    words,
    lines,
    original,
    revert() {
      el.innerHTML = original
      instances.delete(key)
    },
  }

  instances.set(key, instance)
  return instance
}

export function revertAll() {
  instances.forEach((instance) => {
    instance.el.innerHTML = instance.original
  })
  instances.clear()
}

export function getInstances() {
  return Array.from(instances.values())
}
