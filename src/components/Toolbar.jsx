import { useRef } from 'react'

const SAVE_LABEL = {
  saved: 'Saved in this browser',
  saving: 'Saving…',
  error: 'Not saved — browser storage is unavailable',
}

export function Toolbar({ saveState, onPrint, onLoadSample, onImport, onExport, onReset }) {
  const fileRef = useRef(null)
  const menuRef = useRef(null)

  const run = (fn) => () => {
    if (menuRef.current) menuRef.current.open = false
    fn()
  }

  return (
    <header className="toolbar">
      <div className="toolbar-brand">
        <h1>CV Generator</h1>
        <p className={`save-state save-state--${saveState}`} role="status">
          {SAVE_LABEL[saveState]}
        </p>
      </div>

      <div className="toolbar-actions">
        <a className="btn preview-jump" href="#preview">
          Jump to preview
        </a>

        <details className="menu" ref={menuRef}>
          <summary className="btn">Data</summary>
          <div className="menu-panel">
            <button type="button" onClick={run(onLoadSample)}>
              Load sample CV
            </button>
            <button type="button" onClick={run(() => fileRef.current?.click())}>
              Import from file…
            </button>
            <button type="button" onClick={run(onExport)}>
              Export to file
            </button>
            <button type="button" className="menu-danger" onClick={run(onReset)}>
              Clear everything
            </button>
          </div>
        </details>

        <input
          ref={fileRef}
          type="file"
          accept=".json,application/json"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) onImport(file)
            e.target.value = ''
          }}
        />

        <button type="button" className="btn btn--primary" onClick={onPrint}>
          Print / Save as PDF
        </button>
      </div>
    </header>
  )
}
