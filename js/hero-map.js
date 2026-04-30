let heroMapInstance = null

const CITIES = {
  juarez: {
    name: 'Anapra, Ciudad Juarez',
    coords: [31.69, -106.42],
    color: '#FF2A00',
    char: 'Lucia',
    desc: 'Calles de tierra, el estadio brillando al fondo. Su barrio se desmorona por la especulacion inmobiliaria.',
    stat: 'Aumento de renta: +240%',
  },
  inglewood: {
    name: 'Inglewood, Los Angeles',
    coords: [33.96, -118.35],
    color: '#FFD600',
    char: 'Marcus',
    desc: 'Donde su familia lavaba ropa, ahora hay condominios de $3,000/mes. Su comunidad afroamericana ha sido borrada.',
    stat: 'Renta: $900 → $2,800',
  },
  vancouver: {
    name: 'Nacion Squamish, Vancouver',
    coords: [49.27, -123.12],
    color: '#00E5FF',
    char: 'Aiyana',
    desc: 'Las excavadoras avanzan sobre territorio ancestral Squamish. Su abuela, guardiana de la memoria oral, ve como su voz queda sepultada.',
    stat: 'Territorio afectado: 34 ha',
  },
}

const CONNECTIONS = [
  { from: 'vancouver', to: 'inglewood', color: '#FF2A00' },
  { from: 'inglewood', to: 'juarez', color: '#FFD600' },
  { from: 'vancouver', to: 'juarez', color: '#00E5FF', opacity: 0.3 },
]

function createMarkerIcon(color) {
  return L.divIcon({
    className: 'hero-map-marker',
    html: `<div style="width:18px;height:18px;background:${color};border:2px solid #fff;box-shadow:0 0 0 2px ${color}40;"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -12],
  })
}

function highlightCard(key) {
  document.querySelectorAll('.city-card').forEach((card) => {
    card.classList.toggle('city-card--active', card.dataset.city === key)
  })
}

function buildPopupHtml(city) {
  return `
    <div style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">${city.name}</div>
    <div style="font-family:var(--font-display);font-weight:800;font-size:1rem;color:var(--text);margin-bottom:4px;">${city.char}</div>
    <div style="font-size:0.8rem;color:var(--text-muted);line-height:1.4;margin-bottom:6px;">${city.desc}</div>
    <div style="font-family:var(--font-mono);font-size:0.7rem;color:${city.color};font-weight:700;">${city.stat}</div>
  `
}

function setupHeroMap() {
  const container = document.getElementById('heroMap')
  if (!container || typeof L === 'undefined') return

  if (heroMapInstance) {
    heroMapInstance.remove()
    heroMapInstance = null
  }

  heroMapInstance = L.map('heroMap', {
    center: [37, -105],
    zoom: 4,
    minZoom: 3,
    maxZoom: 12,
    zoomControl: false,
    scrollWheelZoom: false,
    attributionControl: false,
  })

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(heroMapInstance)

  const markers = {}

  Object.entries(CITIES).forEach(([key, city]) => {
    const marker = L.marker(city.coords, { icon: createMarkerIcon(city.color) }).addTo(heroMapInstance)
    marker.bindPopup(buildPopupHtml(city), { className: 'hero-popup' })

    marker.on('click', () => {
      highlightCard(key)
      const card = document.querySelector(`.city-card[data-city="${key}"]`)
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })

    markers[key] = marker
  })

  CONNECTIONS.forEach(({ from, to, color, opacity = 0.4 }) => {
    L.polyline([CITIES[from].coords, CITIES[to].coords], {
      color,
      weight: 1,
      dashArray: '6,6',
      opacity,
    }).addTo(heroMapInstance)
  })

  document.querySelectorAll('.city-card').forEach((card) => {
    const key = card.dataset.city
    if (!key || !CITIES[key]) return

    card.addEventListener('mouseenter', () => {
      highlightCard(key)
      heroMapInstance.flyTo(CITIES[key].coords, 6, { duration: 1.2 })
      if (markers[key]) markers[key].openPopup()
    })

    card.addEventListener('mouseleave', () => {
      document.querySelectorAll('.city-card').forEach((c) => c.classList.remove('city-card--active'))
      heroMapInstance.flyTo([37, -105], 4, { duration: 1.2 })
      if (markers[key]) markers[key].closePopup()
    })
  })

  setTimeout(() => heroMapInstance.invalidateSize(), 300)
}

export function initHeroMap() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupHeroMap)
  } else {
    setupHeroMap()
  }
}
