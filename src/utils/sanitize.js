import { ACCENTS, DENSITIES, OPTIONAL_SECTIONS, PERSONAL } from '../data/sections'
import { STORAGE_VERSION, createBlankResume } from '../data/defaultResume'
import { uid } from './id'

const str = (v) => (typeof v === 'string' ? v : '')

function pickFields(schema, src) {
  const out = {}
  for (const f of schema.fields) {
    out[f.key] = f.type === 'checkbox' ? src?.[f.key] === true : str(src?.[f.key])
  }
  return out
}

export function sanitizeResume(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new Error('This file does not contain CV data.')
  }
  const out = createBlankResume()

  out.version = STORAGE_VERSION
  out.sample = input.sample === true

  const accent = input.settings?.accent
  const density = input.settings?.density
  if (ACCENTS.some((a) => a.id === accent)) out.settings.accent = accent
  if (DENSITIES.some((d) => d.id === density)) out.settings.density = density

  out.personal = pickFields(PERSONAL, input.personal)

  for (const schema of OPTIONAL_SECTIONS) {
    const src = input[schema.id]
    if (schema.kind === 'list') {
      out[schema.id] = Array.isArray(src)
        ? src.slice(0, 100).map((e) => ({
            id: typeof e?.id === 'string' && e.id ? e.id : uid(),
            ...pickFields(schema, e),
          }))
        : []
    } else {
      out[schema.id] = pickFields(schema, src)
    }
  }

  const ids = OPTIONAL_SECTIONS.map((s) => s.id)
  const requested = Array.isArray(input.layout?.order) ? input.layout.order : []
  const order = requested.filter((id, i) => ids.includes(id) && requested.indexOf(id) === i)
  out.layout.order = [...order, ...ids.filter((id) => !order.includes(id))]

  for (const id of ids) {
    if (typeof input.layout?.enabled?.[id] === 'boolean') out.layout.enabled[id] = input.layout.enabled[id]
  }

  return out
}
