const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function parseDate(value) {
  if (typeof value !== 'string') return null
  const m = value.trim().match(/^(\d{4})(?:-(0[1-9]|1[0-2])(?:-\d{2})?)?$/)
  if (!m) return null
  return { year: Number(m[1]), month: m[2] ? Number(m[2]) : null }
}

export function isValidDate(value) {
  return !value || parseDate(value) !== null
}

export function formatDate(value) {
  if (!value) return ''
  const d = parseDate(value)
  if (!d) return value.trim()
  return d.month ? `${MONTHS[d.month - 1]} ${d.year}` : String(d.year)
}

export function dateToIso(value) {
  const d = parseDate(value)
  if (!d) return undefined
  return d.month ? `${d.year}-${String(d.month).padStart(2, '0')}` : String(d.year)
}

export function dateOrder(value) {
  const d = parseDate(value)
  return d ? d.year * 12 + (d.month ?? 1) : null
}

export function normalizeUrl(value) {
  const v = (value || '').trim()
  if (!v) return ''
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(v) ? v : `https://${v}`
}

export function isValidUrl(value) {
  const v = (value || '').trim()
  if (!v) return true
  if (/\s/.test(v)) return false
  try {
    const { hostname, protocol } = new URL(normalizeUrl(v))
    return (protocol === 'http:' || protocol === 'https:') && /^[^.]+(\.[^.]+)+$/.test(hostname)
  } catch {
    return false
  }
}

export function displayUrl(value) {
  return (value || '')
    .trim()
    .replace(/^[a-z][a-z0-9+.-]*:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/\/+$/, '')
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((value || '').trim())
}

export function isValidPhone(value) {
  const digits = (value || '').replace(/\D/g, '')
  return digits.length >= 6 && digits.length <= 16
}

export function phoneHref(value) {
  return `tel:${(value || '').replace(/[^\d+]/g, '')}`
}

const BULLET_MARKER = /^\s*(?:[-*•▪‣–]|\d+[.)])\s+/

export function parseText(text, { bullets = false } = {}) {
  const blocks = []
  for (const raw of (text || '').split(/\r?\n/)) {
    const line = raw.trim()
    if (!line) continue
    const marked = BULLET_MARKER.test(raw)
    if (bullets || marked) {
      const item = raw.replace(BULLET_MARKER, '').trim()
      if (!item) continue
      const last = blocks[blocks.length - 1]
      if (last && last.type === 'ul') last.items.push(item)
      else blocks.push({ type: 'ul', items: [item] })
    } else {
      blocks.push({ type: 'p', text: line })
    }
  }
  return blocks
}

export function normalizeList(value) {
  return (value || '')
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .join(', ')
}

export function hasText(value) {
  return typeof value === 'string' && value.trim() !== ''
}

export function entryHasContent(schema, entry) {
  return schema.fields.some((f) => f.type !== 'checkbox' && hasText(entry[f.key]))
}

export function slugify(value) {
  return (
    (value || '')
      .normalize('NFKD')
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase() || 'cv'
  )
}
