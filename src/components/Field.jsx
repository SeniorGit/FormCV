import { fieldId, useFormContext } from './formContext'

function Label({ id, field }) {
  return (
    <label htmlFor={id}>
      {field.label}
      {field.required && (
        <>
          <span className="req" aria-hidden="true">
            {' '}
            *
          </span>
          <span className="sr-only"> (required)</span>
        </>
      )}
    </label>
  )
}

function Counter({ value, counter }) {
  const n = value.trim().length
  const off = n > 0 && (n < counter.min || n > counter.max)
  return (
    <span className={off ? 'counter counter--off' : 'counter'}>
      {n} characters · aim for {counter.min}–{counter.max}
    </span>
  )
}

export function Field({ path, field, value, onChange, disabled = false }) {
  const { errors, isShown, touch } = useFormContext()
  const id = fieldId(path)
  const error = isShown(path) ? errors[path] : ''
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const hasHint = Boolean(field.hint || field.counter)
  const describedBy = [hasHint && hintId, error && errorId].filter(Boolean).join(' ') || undefined
  const wide = field.span === 2 ? ' field--wide' : ''

  if (field.type === 'checkbox') {
    return (
      <div className={`field field--check${wide}`}>
        <label className="check">
          <input type="checkbox" id={id} checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
          <span>{field.label}</span>
        </label>
      </div>
    )
  }

  const shared = {
    id,
    value: value ?? '',
    disabled,
    placeholder: field.placeholder,
    'aria-invalid': error ? 'true' : undefined,
    'aria-required': field.required ? 'true' : undefined,
    'aria-describedby': describedBy,
    onChange: (e) => onChange(e.target.value),
    onBlur: () => touch(path),
  }

  return (
    <div className={`field${wide}`}>
      <Label id={id} field={field} />
      {field.type === 'textarea' ? (
        <textarea {...shared} rows={field.rows || 4} />
      ) : (
        <input
          {...shared}
          type={field.type}
          autoComplete={field.autoComplete}
          list={field.list}
          {...(field.type === 'month' ? { pattern: '\\d{4}(-\\d{2})?', title: 'YYYY-MM', placeholder: 'YYYY-MM' } : {})}
        />
      )}
      {hasHint && (
        <p className="hint" id={hintId}>
          {field.hint}
          {field.counter && <Counter value={value ?? ''} counter={field.counter} />}
        </p>
      )}
      {error && (
        <p className="error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
}

export function FieldGrid({ fields, values, pathPrefix, onChange }) {
  return (
    <div className="field-grid">
      {fields.map((field) => (
        <Field
          key={field.key}
          path={`${pathPrefix}.${field.key}`}
          field={field}
          value={values[field.key]}
          disabled={Boolean(field.disabledWhen && values[field.disabledWhen])}
          onChange={(v) => onChange(field.key, v)}
        />
      ))}
    </div>
  )
}
