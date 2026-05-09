const instances = new Map()

function wrapCharsAndWords(el, opts) {
  const original = el.innerHTML
  const text = el.textContent
  const chars = []
  const words = []
  const lines = []

  const frag = document.createDocumentFragment()
  const textNodes = []

  function processNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent
      let wordBuffer = ''

      for (let i = 0; i < text.length; i++) {
        const ch = text[i]

        if (ch === ' ' || ch === '\n' || ch === '\t') {
          if (wordBuffer) {
            const wordSpan = document.createElement('span')
            wordSpan.className = opts.wordsClass || 'word'
            wordSpan.style.display = 'inline-block'
            wordSpan.style.overflow = 'hidden'

            const innerWord = document.createElement('span')
            innerWord.style.display = 'inline-block'

            for (const c of wordBuffer) {
              const charSpan = document.createElement('span')
              charSpan.className = opts.charsClass || 'char'
              charSpan.style.display = 'inline-block'
              charSpan.textContent = c
              innerWord.appendChild(charSpan)
              chars.push(charSpan)
            }

            wordSpan.appendChild(innerWord)
            words.push(wordSpan)
            frag.appendChild(wordSpan)
            wordBuffer = ''
          }

          const space = document.createElement('span')
          space.innerHTML = '&nbsp;'
          space.style.display = 'inline-block'
          space.style.width = '0.25em'
          frag.appendChild(space)
        } else {
          wordBuffer += ch
        }
      }

      if (wordBuffer) {
        const wordSpan = document.createElement('span')
        wordSpan.className = opts.wordsClass || 'word'
        wordSpan.style.display = 'inline-block'
        wordSpan.style.overflow = 'hidden'

        const innerWord = document.createElement('span')
        innerWord.style.display = 'inline-block'

        for (const c of wordBuffer) {
          const charSpan = document.createElement('span')
          charSpan.className = opts.charsClass || 'char'
          charSpan.style.display = 'inline-block'
          charSpan.textContent = c
          innerWord.appendChild(charSpan)
          chars.push(charSpan)
        }

        wordSpan.appendChild(innerWord)
        words.push(wordSpan)
        frag.appendChild(wordSpan)
        wordBuffer = ''
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const clone = node.cloneNode(false)

      if (node.tagName === 'BR') {
        frag.appendChild(clone)
        return
      }

      for (const child of node.childNodes) {
        const childFrag = document.createDocumentFragment()
        processElementChild(child, clone, opts, chars, words)
      }

      frag.appendChild(clone)
    }
  }

  function processElementChild(node, parent, opts, chars, words) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent
      let wordBuffer = ''

      for (let i = 0; i < text.length; i++) {
        const ch = text[i]

        if (ch === ' ' || ch === '\n' || ch === '\t') {
          if (wordBuffer) {
            const wordSpan = document.createElement('span')
            wordSpan.className = opts.wordsClass || 'word'
            wordSpan.style.display = 'inline-block'
            wordSpan.style.overflow = 'hidden'

            const innerWord = document.createElement('span')
            innerWord.style.display = 'inline-block'

            for (const c of wordBuffer) {
              const charSpan = document.createElement('span')
              charSpan.className = opts.charsClass || 'char'
              charSpan.style.display = 'inline-block'
              charSpan.textContent = c
              innerWord.appendChild(charSpan)
              chars.push(charSpan)
            }

            wordSpan.appendChild(innerWord)
            words.push(wordSpan)
            parent.appendChild(wordSpan)
            wordBuffer = ''
          }

          const space = document.createElement('span')
          space.innerHTML = '&nbsp;'
          space.style.display = 'inline-block'
          space.style.width = '0.25em'
          parent.appendChild(space)
        } else {
          wordBuffer += ch
        }
      }

      if (wordBuffer) {
        const wordSpan = document.createElement('span')
        wordSpan.className = opts.wordsClass || 'word'
        wordSpan.style.display = 'inline-block'
        wordSpan.style.overflow = 'hidden'

        const innerWord = document.createElement('span')
        innerWord.style.display = 'inline-block'

        for (const c of wordBuffer) {
          const charSpan = document.createElement('span')
          charSpan.className = opts.charsClass || 'char'
          charSpan.style.display = 'inline-block'
          charSpan.textContent = c
          innerWord.appendChild(charSpan)
          chars.push(charSpan)
        }

        wordSpan.appendChild(innerWord)
        words.push(wordSpan)
        parent.appendChild(wordSpan)
        wordBuffer = ''
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const clone = node.cloneNode(false)
      for (const child of node.childNodes) {
        processElementChild(child, clone, opts, chars, words)
      }
      parent.appendChild(clone)
    }
  }

  for (const child of el.childNodes) {
    processNode(child)
  }

  el.innerHTML = ''
  el.appendChild(frag)

  const instance = {
    chars,
    words,
    lines,
    original,
    el,
    revert() {
      el.innerHTML = original
      instances.delete(el)
    },
  }

  instances.set(el, instance)
  return instance
}

export function splitText(selector, opts = {}) {
  const els = typeof selector === 'string'
    ? document.querySelectorAll(selector)
    : [selector]

  const results = []

  for (const el of els) {
    if (instances.has(el)) {
      results.push(instances.get(el))
      continue
    }

    const type = opts.type || 'chars'
    const instance = wrapCharsAndWords(el, opts)
    results.push(instance)
  }

  return results.length === 1 ? results[0] : results
}

export function revertAll() {
  for (const [, instance] of instances) {
    instance.el.innerHTML = instance.original
  }
  instances.clear()
}
