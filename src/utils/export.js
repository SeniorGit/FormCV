import { slugify } from './format'
import { sanitizeResume } from './sanitize'

export async function printResume(fullName) {
  if (document.fonts?.ready) await document.fonts.ready
  const previous = document.title
  document.title = fullName?.trim() ? `${fullName.trim()} - CV` : 'CV'
  const restore = () => {
    document.title = previous
    window.removeEventListener('afterprint', restore)
  }
  window.addEventListener('afterprint', restore)
  window.print()
}

export function downloadResume(resume) {
  const blob = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `cv-${slugify(resume.personal.fullName)}.json`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export async function readResumeFile(file) {
  let data
  try {
    data = JSON.parse(await file.text())
  } catch {
    throw new Error('That file is not valid JSON.')
  }
  return sanitizeResume(data)
}
