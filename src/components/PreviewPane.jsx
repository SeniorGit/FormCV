import { useCallback, useDeferredValue, useLayoutEffect, useRef, useState } from 'react'
import { ACCENTS, DENSITIES } from '../data/sections'
import { ResumePreview } from './ResumePreview'

const PAGE_WIDTH_PX = (210 / 25.4) * 96
const GUTTER_PX = 32

function Choice({ legend, children }) {
  return (
    <fieldset className="choice">
      <legend>{legend}</legend>
      {children}
    </fieldset>
  )
}

export function PreviewPane({ resume, dispatch }) {
  const deferred = useDeferredValue(resume)
  const [pageCount, setPageCount] = useState(1)
  const [scale, setScale] = useState(1)
  const [docHeight, setDocHeight] = useState(0)
  const viewportRef = useRef(null)
  const docRef = useRef(null)

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const doc = docRef.current
    const update = () => {
      setScale(Math.min(1, Math.max(0.3, (viewport.clientWidth - GUTTER_PX) / PAGE_WIDTH_PX)))
      setDocHeight(doc.offsetHeight)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(viewport)
    ro.observe(doc)
    return () => ro.disconnect()
  }, [])

  const handlePageCount = useCallback((n) => setPageCount(n), [])
  const { accent, density } = resume.settings

  return (
    <>
      <div className="preview-toolbar">
        <div>
          <h2 className="pane-title">Preview</h2>
          <p className="pane-sub" role="status">
            A4 · {pageCount} {pageCount === 1 ? 'page' : 'pages'}
          </p>
        </div>
        <div className="preview-options">
          <Choice legend="Density">
            <div className="seg">
              {DENSITIES.map((d) => (
                <label key={d.id}>
                  <input
                    type="radio"
                    name="density"
                    value={d.id}
                    checked={density === d.id}
                    onChange={() => dispatch({ type: 'setting', key: 'density', value: d.id })}
                  />
                  <span>{d.label}</span>
                </label>
              ))}
            </div>
          </Choice>
          <Choice legend="Accent">
            <div className="swatches">
              {ACCENTS.map((a) => (
                <label key={a.id} title={a.label}>
                  <input
                    type="radio"
                    name="accent"
                    value={a.id}
                    checked={accent === a.id}
                    onChange={() => dispatch({ type: 'setting', key: 'accent', value: a.id })}
                  />
                  <span className="swatch" style={{ background: a.value }} />
                  <span className="sr-only">{a.label}</span>
                </label>
              ))}
            </div>
          </Choice>
        </div>
      </div>

      <div className="preview-viewport" ref={viewportRef}>
        <div className="sheet-scaler" style={{ width: PAGE_WIDTH_PX * scale, height: docHeight * scale }}>
          <div className="sheet-doc" ref={docRef} style={{ transform: `scale(${scale})` }}>
            <ResumePreview resume={deferred} onPageCount={handlePageCount} />
          </div>
        </div>
      </div>
    </>
  )
}
