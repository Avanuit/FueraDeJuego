export function initCharCounter() {
  const textarea = document.getElementById('testimony')
  const counter = document.getElementById('charCount')
  if (!textarea || !counter) return

  textarea.addEventListener('input', () => {
    const len = textarea.value.length
    counter.textContent = len
    counter.style.color = len > 450 ? 'var(--accent)' : 'var(--text-dim)'
  })
}
