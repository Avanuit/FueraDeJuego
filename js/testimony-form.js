import gsap from 'gsap'
import { createValidator } from './form-validator.js'

const VALIDATION_RULES = [
  {
    field: 'name',
    errorId: 'nameError',
    validate: (v) => !v.trim() ? 'Por favor ingresa un nombre o seudonimo.' : null,
  },
  {
    field: 'city',
    errorId: 'cityError',
    validate: (v) => !v.trim() ? 'Por favor ingresa tu ciudad o barrio.' : null,
  },
  {
    field: 'country',
    errorId: 'countryError',
    validate: (v) => !v ? 'Por favor selecciona tu pais.' : null,
  },
  {
    field: 'testimony',
    errorId: 'testimonyError',
    validate: (v) => {
      if (!v.trim()) return 'Por favor escribe tu testimonio.'
      if (v.trim().length < 50) return 'Tu testimonio debe tener al menos 50 caracteres.'
      return null
    },
  },
  {
    field: 'consent',
    errorId: 'consentError',
    validate: (v) => !v ? 'Debes aceptar los terminos para continuar.' : null,
  },
]

const AVATAR_COLORS = ['#FF2A00', '#00E5FF', '#FFD600', '#888888']

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function initialsFromName(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function randomAvatarColor() {
  return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)]
}

function showUnlockSuccess() {
  const success = document.getElementById('unlockSuccess')
  if (!success) return
  success.style.display = 'flex'
  gsap.fromTo(success, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' })
  gsap.fromTo(success.querySelector('.unlock-success__content'),
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, delay: 0.15, ease: 'power2.out' }
  )
}

function createTestimonyCard(data) {
  const truncated = data.testimony.slice(0, 300)
  const ellipsis = data.testimony.length > 300 ? '...' : ''

  const card = document.createElement('article')
  card.className = 'testimonial-card'
  card.innerHTML = `
    <div class="testimonial-card__header">
      <div class="testimonial-card__avatar" style="background:${randomAvatarColor()}">${initialsFromName(data.name)}</div>
      <div>
        <strong>${escapeHtml(data.name)}</strong>
        <span>${escapeHtml(data.city)}</span>
      </div>
    </div>
    <p>"${escapeHtml(truncated)}${ellipsis}"</p>
    <div class="testimonial-card__tag">#FueraDeJuego #NuevoTestimonio</div>
  `
  return card
}

function addTestimonyCard(card) {
  const grid = document.getElementById('testimonialsGrid')
  if (!grid) return
  grid.prepend(card)
  gsap.fromTo(card, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
}

function setButtonLoading(btn, isLoading) {
  if (!btn) return
  btn.querySelector('.btn-text').style.display = isLoading ? 'none' : ''
  btn.querySelector('.btn-loader').style.display = isLoading ? 'block' : 'none'
  btn.disabled = isLoading
}

function readFormData() {
  return {
    name: document.getElementById('name')?.value || '',
    city: document.getElementById('city')?.value || '',
    country: document.getElementById('country')?.value || '',
    testimony: document.getElementById('testimony')?.value || '',
    consent: document.getElementById('consent')?.checked || false,
  }
}

function resetCharCounter() {
  const counter = document.getElementById('charCount')
  if (counter) counter.textContent = '0'
}

const validator = createValidator(VALIDATION_RULES)

export function initTestimonyForm() {
  const form = document.getElementById('testimonyForm')
  if (!form) return

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = readFormData()
    if (!validator.validate(data)) return

    const btn = document.getElementById('submitBtn')
    setButtonLoading(btn, true)

    await new Promise((r) => setTimeout(r, 1500))

    addTestimonyCard(createTestimonyCard(data))
    form.reset()
    resetCharCounter()
    showUnlockSuccess()

    setButtonLoading(btn, false)
  })
}
