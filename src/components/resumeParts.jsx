import { dateToIso, displayUrl, formatDate, hasText, normalizeUrl, parseText, phoneHref } from '../utils/format'

export function RichText({ text, bullets = false }) {
  const blocks = parseText(text, { bullets })
  if (!blocks.length) return null
  return (
    <div className="r-rich">
      {blocks.map((b, i) =>
        b.type === 'ul' ? (
          <ul key={i}>
            {b.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        ) : (
          <p key={i}>{b.text}</p>
        ),
      )}
    </div>
  )
}

export function Time({ value }) {
  return <time dateTime={dateToIso(value)}>{formatDate(value)}</time>
}

export function DateRange({ start, end, current }) {
  const hasStart = hasText(start)
  const hasEnd = !current && hasText(end)
  if (!hasStart && !hasEnd && !current) return null
  return (
    <p className="r-date">
      {hasStart && <Time value={start} />}
      {hasStart && (hasEnd || current) && ' – '}
      {current ? <span>Present</span> : hasEnd && <Time value={end} />}
    </p>
  )
}

export function Link({ url }) {
  return <a href={normalizeUrl(url)}>{displayUrl(url)}</a>
}

export function EntryTitle({ main, sub }) {
  return (
    <h3 className="r-entry-title">
      {hasText(main) && <span className="r-strong">{main}</span>}
      {hasText(main) && hasText(sub) && <span className="r-sep"> — </span>}
      {hasText(sub) && <span className="r-sub">{sub}</span>}
    </h3>
  )
}

export function Meta({ children }) {
  return <p className="r-meta">{children}</p>
}

export function Pipe({ items }) {
  const shown = items.filter(Boolean)
  return shown.map((item, i) => (
    <span key={i}>
      {i > 0 && <span className="r-bar"> | </span>}
      {item}
    </span>
  ))
}

const ONE_ROW_LIMIT = 92

export function Header({ personal }) {
  const { fullName, title, email, phone, location, linkedin, github, portfolio } = personal
  const reach = [
    hasText(email) && { text: email.trim(), node: <a href={`mailto:${email.trim()}`}>{email.trim()}</a> },
    hasText(phone) && { text: phone.trim(), node: <a href={phoneHref(phone)}>{phone.trim()}</a> },
    hasText(location) && { text: location.trim(), node: <span>{location.trim()}</span> },
  ].filter(Boolean)
  const profiles = [linkedin, github, portfolio]
    .filter(hasText)
    .map((url) => ({ text: displayUrl(url), node: <Link url={url} /> }))

  const size = (items) => items.reduce((n, item) => n + item.text.length + 3, 0)
  const rows = size([...reach, ...profiles]) <= ONE_ROW_LIMIT ? [[...reach, ...profiles]] : [reach, profiles]

  return (
    <header className="r-header">
      <h1 className="r-name">{hasText(fullName) ? fullName.trim() : <span className="resume-ph">Your Name</span>}</h1>
      {hasText(title) && <p className="r-title">{title.trim()}</p>}
      {rows
        .filter((row) => row.length > 0)
        .map((row, r) => (
          <ul className="r-contact" key={r}>
            {row.map((item, i) => (
              <li key={i}>{item.node}</li>
            ))}
          </ul>
        ))}
    </header>
  )
}

