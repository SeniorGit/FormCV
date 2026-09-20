import { useEffect, useReducer, useRef, useState } from 'react'
import { createSampleResume } from '../data/defaultResume'
import { SECTIONS, emptyEntry } from '../data/sections'
import { loadResume, saveResume } from '../utils/storage'

function move(list, index, dir) {
  const target = index + dir
  if (index < 0 || target < 0 || target >= list.length) return list
  const next = [...list]
  ;[next[index], next[target]] = [next[target], next[index]]
  return next
}

const edited = (state, patch) => ({ ...state, ...patch, sample: false })

function reducer(state, a) {
  switch (a.type) {
    case 'replace':
      return a.resume

    case 'setting':
      return { ...state, settings: { ...state.settings, [a.key]: a.value } }

    case 'patchObject':
      return edited(state, { [a.section]: { ...state[a.section], [a.key]: a.value } })

    case 'addEntry':
      return edited(state, { [a.section]: [...state[a.section], emptyEntry(SECTIONS[a.section], a.values)] })

    case 'patchEntry':
      return edited(state, {
        [a.section]: state[a.section].map((e) => (e.id === a.id ? { ...e, [a.key]: a.value } : e)),
      })

    case 'removeEntry':
      return edited(state, { [a.section]: state[a.section].filter((e) => e.id !== a.id) })

    case 'moveEntry': {
      const list = state[a.section]
      return edited(state, { [a.section]: move(list, list.findIndex((e) => e.id === a.id), a.dir) })
    }

    case 'setEnabled':
      return edited(state, { layout: { ...state.layout, enabled: { ...state.layout.enabled, [a.section]: a.enabled } } })

    case 'moveSection':
      return edited(state, {
        layout: { ...state.layout, order: move(state.layout.order, state.layout.order.indexOf(a.section), a.dir) },
      })

    default:
      return state
  }
}

export function useResume() {
  const [resume, dispatch] = useReducer(reducer, undefined, () => loadResume() ?? createSampleResume())
  const [saveState, setSaveState] = useState('saved')
  const latest = useRef(resume)
  const firstRun = useRef(true)

  useEffect(() => {
    latest.current = resume
    if (firstRun.current) {
      firstRun.current = false
      return undefined
    }
    setSaveState('saving')
    const timer = setTimeout(() => setSaveState(saveResume(resume) ? 'saved' : 'error'), 400)
    return () => clearTimeout(timer)
  }, [resume])

  useEffect(() => {
    const flush = () => saveResume(latest.current)
    window.addEventListener('pagehide', flush)
    return () => window.removeEventListener('pagehide', flush)
  }, [])

  return { resume, dispatch, saveState }
}
