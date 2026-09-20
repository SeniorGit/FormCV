import { OPTIONAL_SECTIONS, PERSONAL } from '../data/sections'
import {
  dateOrder,
  entryHasContent,
  hasText,
  isValidDate,
  isValidEmail,
  isValidPhone,
  isValidUrl,
} from './format'

function checkField(field, value) {
  if (field.type === 'checkbox') return ''
  if (!hasText(value)) return field.required && field.key === 'fullName' ? 'Enter your full name.' : ''
  switch (field.type) {
    case 'email':
      return isValidEmail(value) ? '' : 'Enter a valid email address, e.g. name@example.com.'
    case 'tel':
      return isValidPhone(value) ? '' : 'Enter a valid phone number (at least 6 digits).'
    case 'url':
      return isValidUrl(value) ? '' : 'Enter a valid web address, e.g. example.com/you.'
    case 'month':
      return isValidDate(value) ? '' : 'Use the format YYYY-MM, e.g. 2024-03.'
    default:
      return ''
  }
}

function checkRange(schema, values, add, path) {
  const range = schema.dateRange
  if (!range || (range.current && values[range.current])) return
  const a = dateOrder(values[range.start])
  const b = dateOrder(values[range.end])
  if (a !== null && b !== null && b < a) {
    const endLabel = range.endLabel || 'End date'
    const startLabel = (range.startLabel || 'Start date').toLowerCase()
    add(`${path}.${range.end}`, `${endLabel} is before the ${startLabel}.`)
  }
}

export function validateResume(resume) {
  const errors = {}
  const add = (path, message) => {
    if (!errors[path]) errors[path] = message
  }

  for (const field of PERSONAL.fields) {
    const value = resume.personal[field.key]
    if (field.key === 'email' && !hasText(value)) add('personal.email', 'Enter your email address.')
    else {
      const msg = checkField(field, value)
      if (msg) add(`personal.${field.key}`, msg)
    }
  }

  for (const id of resume.layout.order) {
    if (!resume.layout.enabled[id]) continue
    const schema = OPTIONAL_SECTIONS.find((s) => s.id === id)

    if (schema.kind === 'list') {
      for (const entry of resume[id]) {
        if (!entryHasContent(schema, entry)) continue
        const base = `${id}.${entry.id}`
        for (const field of schema.fields) {
          const msg = checkField(field, entry[field.key])
          if (msg) add(`${base}.${field.key}`, msg)
        }
        if (!hasText(entry[schema.primary])) {
          const primary = schema.fields.find((f) => f.key === schema.primary)
          add(`${base}.${schema.primary}`, `Add a ${primary.label.toLowerCase()} for this entry, or remove it.`)
        }
        checkRange(schema, entry, add, base)
      }
    } else if (id === 'custom') {
      const { title, content } = resume.custom
      if (hasText(content) && !hasText(title)) add('custom.title', 'Give this section a title.')
    }
  }

  return errors
}
