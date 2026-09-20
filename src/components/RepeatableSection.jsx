import { FieldGrid } from './Field'

export function RepeatableSection({ schema, items, dispatch, children }) {
  const previewKey = schema.previewKey || schema.primary

  return (
    <div className="entries">
      {schema.note && <p className="section-note">{schema.note}</p>}

      {items.length === 0 && <p className="empty">No {schema.plural} added yet.</p>}

      {items.map((item, i) => {
        const name = item[previewKey]?.trim()
        const headingId = `${item.id}-heading`
        return (
          <div className="entry" role="group" aria-labelledby={headingId} key={item.id}>
            <div className="entry-head">
              <h4 id={headingId}>
                {schema.itemLabel} {i + 1}
                {name && <span className="entry-name"> · {name}</span>}
              </h4>
              <div className="entry-actions">
                <button
                  type="button"
                  className="btn btn--small"
                  disabled={i === 0}
                  onClick={() => dispatch({ type: 'moveEntry', section: schema.id, id: item.id, dir: -1 })}
                  aria-label={`Move ${schema.itemLabel} ${i + 1} up`}
                  title="Move up"
                >
                  <span aria-hidden="true">↑</span>
                </button>
                <button
                  type="button"
                  className="btn btn--small"
                  disabled={i === items.length - 1}
                  onClick={() => dispatch({ type: 'moveEntry', section: schema.id, id: item.id, dir: 1 })}
                  aria-label={`Move ${schema.itemLabel} ${i + 1} down`}
                  title="Move down"
                >
                  <span aria-hidden="true">↓</span>
                </button>
                <button
                  type="button"
                  className="btn btn--small btn--danger"
                  onClick={() => dispatch({ type: 'removeEntry', section: schema.id, id: item.id })}
                  aria-label={`Remove ${schema.itemLabel} ${i + 1}`}
                >
                  Remove
                </button>
              </div>
            </div>
            <FieldGrid
              fields={schema.fields}
              values={item}
              pathPrefix={`${schema.id}.${item.id}`}
              onChange={(key, value) => dispatch({ type: 'patchEntry', section: schema.id, id: item.id, key, value })}
            />
          </div>
        )
      })}

      <div className="entries-footer">
        <button type="button" className="btn btn--add" onClick={() => dispatch({ type: 'addEntry', section: schema.id })}>
          <span aria-hidden="true">+ </span>Add {schema.itemLabel}
        </button>
        {children}
      </div>
    </div>
  )
}
