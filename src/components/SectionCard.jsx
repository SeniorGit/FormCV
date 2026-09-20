export function SectionCard({
  schema,
  summary,
  open,
  onToggleOpen,
  enabled = true,
  onToggleEnabled,
  onMove,
  canMoveUp,
  canMoveDown,
  children,
}) {
  const bodyId = `${schema.id}-body`
  const headingId = `${schema.id}-title`
  const required = Boolean(schema.required)

  return (
    <section className={`card${enabled ? '' : ' card--off'}`} aria-labelledby={headingId}>
      <div className="card-head">
        <h3 id={headingId} className="card-title">
          <button type="button" className="card-toggle" aria-expanded={open && enabled} aria-controls={bodyId} onClick={onToggleOpen}>
            <span className="chev" aria-hidden="true" />
            <span className="card-name">{schema.title}</span>
          </button>
        </h3>
        <span className={`badge ${required ? 'badge--req' : ''}`}>{required ? 'Required' : 'Optional'}</span>
        {summary && <span className="card-summary">{summary}</span>}

        {!required && (
          <div className="card-controls">
            <button
              type="button"
              className="btn btn--small"
              onClick={() => onMove(-1)}
              disabled={!canMoveUp}
              aria-label={`Move ${schema.title} up in the CV`}
              title="Move section up"
            >
              <span aria-hidden="true">↑</span>
            </button>
            <button
              type="button"
              className="btn btn--small"
              onClick={() => onMove(1)}
              disabled={!canMoveDown}
              aria-label={`Move ${schema.title} down in the CV`}
              title="Move section down"
            >
              <span aria-hidden="true">↓</span>
            </button>
            <label className="switch">
              <input type="checkbox" checked={enabled} onChange={(e) => onToggleEnabled(e.target.checked)} />
              <span>Include in CV</span>
            </label>
          </div>
        )}
      </div>

      <div id={bodyId} className="card-body" hidden={!open || !enabled}>
        {open && enabled && (
          <>
            {schema.description && <p className="section-note">{schema.description}</p>}
            {children}
          </>
        )}
      </div>

      {!enabled && (
        <p className="card-off-note">
          Hidden from your CV. Turn on “Include in CV” to add this section
          {schema.description ? ` — ${schema.description.charAt(0).toLowerCase()}${schema.description.slice(1)}` : '.'}
        </p>
      )}
    </section>
  )
}
