import { sanitizeResume } from './sanitize'

const KEY = 'cv-generator:resume:v1'

export function loadResume() {
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? sanitizeResume(JSON.parse(raw)) : null
  } catch {
    return null
  }
}

export function saveResume(resume) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(resume))
    return true
  } catch {
    return false
  }
}
