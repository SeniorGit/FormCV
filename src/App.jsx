import { useEffect, useMemo, useState } from 'react'
import { Editor } from './components/Editor'
import { PreviewPane } from './components/PreviewPane'
import { Toolbar } from './components/Toolbar'
import { createBlankResume, createSampleResume } from './data/defaultResume'
import { useResume } from './hooks/useResume'
import { downloadResume, printResume, readResumeFile } from './utils/export'
import { validateResume } from './utils/validation'

export default function App() {
  const { resume, dispatch, saveState } = useResume()
  const errors = useMemo(() => validateResume(resume), [resume])
  const errorCount = Object.keys(errors).length

  const [attempt, setAttempt] = useState(0)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (!status || status.tone === 'blocked') return undefined
    const t = setTimeout(() => setStatus(null), 5000)
    return () => clearTimeout(t)
  }, [status])

  const blocked = status?.tone === 'blocked' && errorCount > 0

  const handlePrint = () => {
    if (errorCount > 0) {
      setAttempt((n) => n + 1)
      setStatus({ tone: 'blocked' })
      return
    }
    setStatus(null)
    printResume(resume.personal.fullName)
  }

  const replace = (next, text) => {
    dispatch({ type: 'replace', resume: next })
    setStatus({ tone: 'ok', text })
  }

  const handleImport = async (file) => {
    try {
      replace(await readResumeFile(file), `Imported “${file.name}”.`)
    } catch (err) {
      setStatus({ tone: 'error', text: err.message })
    }
  }

  const handleReset = () => {
    if (window.confirm('Clear all CV content in this browser? Export it first if you want a backup.')) {
      replace(createBlankResume(), 'Started a blank CV.')
    }
  }

  const message = blocked
    ? { tone: 'error', text: `Fix ${errorCount} highlighted ${errorCount === 1 ? 'field' : 'fields'} in the form before printing.` }
    : status?.tone === 'blocked'
      ? null
      : status

  return (
    <div className="app">
      <Toolbar
        saveState={saveState}
        onPrint={handlePrint}
        onLoadSample={() => replace(createSampleResume(), 'Loaded the sample CV.')}
        onImport={handleImport}
        onExport={() => downloadResume(resume)}
        onReset={handleReset}
      />

      {message && (
        <p className={`banner banner--${message.tone}`} role={message.tone === 'error' ? 'alert' : 'status'}>
          {message.text}
        </p>
      )}

      <div className="workspace">
        <main className="editor-pane" id="editor">
          <h2 className="pane-title">Your details</h2>
          {resume.sample && (
            <div className="notice">
              <p>
                <strong>This is sample content.</strong> Replace it with your own information, or start with an empty CV.
              </p>
              <button type="button" className="btn" onClick={() => replace(createBlankResume(), 'Started a blank CV.')}>
                Start blank
              </button>
            </div>
          )}
          <Editor resume={resume} dispatch={dispatch} errors={errors} attempt={attempt} />
        </main>

        <aside className="preview-pane" id="preview" aria-label="CV preview">
          <PreviewPane resume={resume} dispatch={dispatch} />
        </aside>
      </div>
    </div>
  )
}
