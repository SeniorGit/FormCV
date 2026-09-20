import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { OPTIONAL_SECTIONS, PERSONAL, SECTIONS, SKILL_CATEGORY_SUGGESTIONS } from '../data/sections'
import { entryHasContent } from '../utils/format'
import { FieldGrid } from './Field'
import { RepeatableSection } from './RepeatableSection'
import { SectionCard } from './SectionCard'
import { FormContext, fieldId } from './formContext'

function describe(resume, id) {
  const schema = SECTIONS[id]
  if (id === 'personal') return resume.personal.fullName.trim()
  if (schema.kind === 'list') {
    const n = resume[id].filter((e) => entryHasContent(schema, e)).length
    return n ? `${n} ${n === 1 ? 'entry' : 'entries'}` : ''
  }
  if (id === 'summary') return resume.summary.text.trim() ? `${resume.summary.text.trim().length} characters` : ''
  if (id === 'custom') return resume.custom.title.trim()
  return ''
}

function SkillQuickAdd({ skills, dispatch }) {
  const used = new Set(skills.map((s) => s.category.trim().toLowerCase()))
  const missing = SKILL_CATEGORY_SUGGESTIONS.filter((c) => !used.has(c.toLowerCase()))
  if (!missing.length) return null
  return (
    <div className="quick-add" role="group" aria-label="Add a common skill category">
      <span className="quick-add-label">Quick add:</span>
      {missing.map((category) => (
        <button
          key={category}
          type="button"
          className="btn btn--link"
          onClick={() => dispatch({ type: 'addEntry', section: 'skills', values: { category } })}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export function Editor({ resume, dispatch, errors, attempt }) {
  const [open, setOpen] = useState({ personal: true })
  const [touched, setTouched] = useState(() => new Set())
  const errorsRef = useRef(errors)
  const showAll = attempt > 0

  useEffect(() => {
    errorsRef.current = errors
  })

  useEffect(() => {
    if (!attempt) return
    const paths = Object.keys(errorsRef.current)
    if (!paths.length) return
    setOpen((o) => ({ ...o, ...Object.fromEntries(paths.map((p) => [p.split('.')[0], true])) }))
    requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(fieldId(paths[0]))?.focus()))
  }, [attempt])

  const touch = useCallback((path) => setTouched((prev) => (prev.has(path) ? prev : new Set(prev).add(path))), [])
  const form = useMemo(
    () => ({ errors, touch, isShown: (path) => showAll || touched.has(path) }),
    [errors, touch, showAll, touched],
  )

  const toggle = (id) => setOpen((o) => ({ ...o, [id]: !o[id] }))
  const { order, enabled } = resume.layout

  return (
    <FormContext.Provider value={form}>
      <datalist id="skill-categories">
        {SKILL_CATEGORY_SUGGESTIONS.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>

      <SectionCard schema={PERSONAL} summary={describe(resume, 'personal')} open={Boolean(open.personal)} onToggleOpen={() => toggle('personal')}>
        <p className="section-note">Fields marked * are required. Everything else is optional.</p>
        <FieldGrid
          fields={PERSONAL.fields}
          values={resume.personal}
          pathPrefix="personal"
          onChange={(key, value) => dispatch({ type: 'patchObject', section: 'personal', key, value })}
        />
      </SectionCard>

      {order.map((id, index) => {
        const schema = OPTIONAL_SECTIONS.find((s) => s.id === id)
        return (
          <SectionCard
            key={id}
            schema={schema}
            summary={describe(resume, id)}
            open={Boolean(open[id])}
            onToggleOpen={() => toggle(id)}
            enabled={enabled[id]}
            onToggleEnabled={(on) => {
              dispatch({ type: 'setEnabled', section: id, enabled: on })
              if (on) setOpen((o) => ({ ...o, [id]: true }))
            }}
            onMove={(dir) => dispatch({ type: 'moveSection', section: id, dir })}
            canMoveUp={index > 0}
            canMoveDown={index < order.length - 1}
          >
            {schema.kind === 'list' ? (
              <RepeatableSection schema={schema} items={resume[id]} dispatch={dispatch}>
                {id === 'skills' && <SkillQuickAdd skills={resume.skills} dispatch={dispatch} />}
              </RepeatableSection>
            ) : (
              <FieldGrid
                fields={schema.fields}
                values={resume[id]}
                pathPrefix={id}
                onChange={(key, value) => dispatch({ type: 'patchObject', section: id, key, value })}
              />
            )}
          </SectionCard>
        )
      })}
    </FormContext.Provider>
  )
}
