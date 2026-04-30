let mapInstance = null

const CITIES = [
  {
    coords: [31.69, -106.42],
    color: '#FF2A00',
    size: 22,
    popup: `
      <h4>Lucia Hernandez</h4>
      <div class="popup-location">Anapra, Ciudad Juarez</div>
      <p style="margin:0 0 6px;">Calles de tierra, el estadio brillando al fondo. Su barrio se desmorona por la especulacion inmobiliaria.</p>
      <div class="popup-stat">Aumento de renta: <strong>+240%</strong></div>
      <div class="popup-stat">Familias desplazadas: <strong>12/20</strong></div>
    `,
  },
  {
    coords: [33.96, -118.35],
    color: '#FFD600',
    size: 26,
    popup: `
      <h4>Marcus Washington</h4>
      <div class="popup-location">Inglewood, Los Angeles</div>
      <p style="margin:0 0 6px;">Donde su familia lavaba ropa, ahora hay condominios de $3,000/mes. Su comunidad afroamericana ha sido borrada.</p>
      <div class="popup-stat">Negocios cerrados: <strong>-68%</strong></div>
      <div class="popup-stat">Renta: <strong>$900 → $2,800</strong></div>
    `,
  },
  {
    coords: [49.27, -123.12],
    color: '#00E5FF',
    size: 22,
    popup: `
      <h4>Aiyana Thunderbird</h4>
      <div class="popup-location">Nacion Squamish, Vancouver</div>
      <p style="margin:0 0 6px;">Las excavadoras avanzan sobre territorio ancestral Squamish. Su abuela, guardiana de la memoria oral, ve como su voz queda sepultada.</p>
      <div class="popup-stat">Territorio afectado: <strong>34 ha</strong></div>
      <div class="popup-stat">Familias reubicadas: <strong>89</strong></div>
    `,
  },
]

const HOST_CITIES = [
  [32.77, -96.79, 'Dallas'],
  [29.76, -95.36, 'Houston'],
  [33.74, -84.38, 'Atlanta'],
  [40.81, -74.07, 'New York/NJ'],
  [42.36, -71.05, 'Boston'],
  [39.95, -75.16, 'Philadelphia'],
  [25.76, -80.19, 'Miami'],
  [47.60, -122.33, 'Seattle'],
  [37.77, -122.41, 'San Francisco'],
  [39.73, -104.99, 'Kansas City'],
  [45.50, -73.56, 'Montreal'],
  [43.65, -79.38, 'Toronto'],
  [19.43, -99.13, 'Ciudad de Mexico'],
  [20.67, -103.35, 'Guadalajara'],
  [25.67, -100.31, 'Monterrey'],
]

const CONNECTIONS = [
  { from: 0, to: 1, color: '#FF2A00' },
  { from: 1, to: 2, color: '#FFD600' },
  { from: 0, to: 2, color: '#00E5FF', opacity: 0.4 },
]

function createMarkerIcon(color, size) {
  return L.divIcon({
    className: 'pulse-marker',
    html: `<div style="width:${size}px;height:${size}px;background:${color};border:2px solid rgba(255,255,255,0.9);box-shadow:0 0 12px ${color}80;"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 4],
  })
}

function createSmallIcon() {
  return L.divIcon({
    className: '',
    html: '<div style="width:8px;height:8px;background:rgba(255,255,255,0.5);border:1px solid rgba(255,255,255,0.3);"></div>',
    iconSize: [8, 8],
    iconAnchor: [4, 4],
    popupAnchor: [0, -6],
  })
}

function buildMap() {
  const mapEl = document.getElementById('leafletMap')
  if (!mapEl) return
  if (mapInstance) {
    mapInstance.remove()
    mapInstance = null
  }

  mapInstance = L.map('leafletMap', {
    center: [37, -105],
    zoom: 4,
    minZoom: 3,
    maxZoom: 12,
    zoomControl: true,
    scrollWheelZoom: true,
  })

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(mapInstance)

  const markers = CITIES.map((city) => {
    const marker = L.marker(city.coords, { icon: createMarkerIcon(city.color, city.size) })
      .addTo(mapInstance)
      .bindPopup(city.popup)
    return marker
  })

  CONNECTIONS.forEach(({ from, to, color, opacity = 0.5 }) => {
    L.polyline([CITIES[from].coords, CITIES[to].coords], {
      color,
      weight: 1.5,
      dashArray: '8,8',
      opacity,
    }).addTo(mapInstance)
  })

  HOST_CITIES.forEach(([lat, lng, name]) => {
    L.marker([lat, lng], { icon: createSmallIcon() })
      .addTo(mapInstance)
      .bindPopup(`<h4>${name}</h4><div class="popup-location">Ciudad sede FIFA 2026</div>`)
  })

  requestAnimationFrame(() => mapInstance.invalidateSize())
}

export function initLeafletMap() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(buildMap))
  } else {
    requestAnimationFrame(buildMap)
  }
}
