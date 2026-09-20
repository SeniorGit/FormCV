import { SECTIONS } from '../data/sections'
import { entryHasContent, hasText, normalizeList } from '../utils/format'
import { DateRange, EntryTitle, Header, Link, Meta, Pipe, RichText, Time } from './resumeParts'

const live = (schema, list) => list.filter((e) => entryHasContent(schema, e))

const BUILDERS = {
  summary: (r) =>
    hasText(r.summary.text) ? [{ key: 'text', node: <RichText text={r.summary.text} /> }] : [],

  experience: (r) =>
    live(SECTIONS.experience, r.experience).map((e) => ({
      key: e.id,
      node: (
        <article className="r-entry">
          <div className="r-entry-head">
            <EntryTitle main={e.title} sub={e.company} />
            <DateRange start={e.start} end={e.end} current={e.current} />
          </div>
          {hasText(e.location) && <Meta>{e.location.trim()}</Meta>}
          <RichText text={e.description} bullets />
        </article>
      ),
    })),

  education: (r) =>
    live(SECTIONS.education, r.education).map((e) => ({
      key: e.id,
      node: (
        <article className="r-entry">
          <div className="r-entry-head">
            <EntryTitle main={e.degree} sub={e.institution} />
            <DateRange start={e.start} end={e.end} />
          </div>
          {hasText(e.location) && <Meta>{e.location.trim()}</Meta>}
          <RichText text={e.description} />
        </article>
      ),
    })),

  skills: (r) => {
    const rows = live(SECTIONS.skills, r.skills).filter((s) => hasText(s.items))
    if (!rows.length) return []
    return [
      {
        key: 'all',
        node: (
          <div className="r-skills">
            {rows.map((s) => (
              <p key={s.id}>
                {hasText(s.category) && <span className="r-strong">{s.category.trim()}: </span>}
                {normalizeList(s.items)}
              </p>
            ))}
          </div>
        ),
      },
    ]
  },

  projects: (r) =>
    live(SECTIONS.projects, r.projects).map((p) => ({
      key: p.id,
      node: (
        <article className="r-entry">
          <div className="r-entry-head">
            <EntryTitle main={p.name} sub={p.role} />
          </div>
          {hasText(p.technologies) && (
            <Meta>
              <span className="r-strong">Technologies: </span>
              {normalizeList(p.technologies)}
            </Meta>
          )}
          {(hasText(p.url) || hasText(p.github)) && (
            <Meta>
              <Pipe items={[hasText(p.url) && <Link url={p.url} />, hasText(p.github) && <Link url={p.github} />]} />
            </Meta>
          )}
          <RichText text={p.description} bullets />
        </article>
      ),
    })),

  certifications: (r) =>
    live(SECTIONS.certifications, r.certifications).map((c) => ({
      key: c.id,
      node: (
        <article className="r-entry">
          <div className="r-entry-head">
            <EntryTitle main={c.name} sub={c.issuer} />
            {hasText(c.issueDate) && (
              <p className="r-date">
                <Time value={c.issueDate} />
              </p>
            )}
          </div>
          {(hasText(c.expiryDate) || hasText(c.credentialId) || hasText(c.credentialUrl)) && (
            <Meta>
              <Pipe
                items={[
                  hasText(c.expiryDate) && (
                    <>
                      Expires <Time value={c.expiryDate} />
                    </>
                  ),
                  hasText(c.credentialId) && `Credential ID: ${c.credentialId.trim()}`,
                  hasText(c.credentialUrl) && <Link url={c.credentialUrl} />,
                ]}
              />
            </Meta>
          )}
        </article>
      ),
    })),

  awards: (r) =>
    live(SECTIONS.awards, r.awards).map((a) => ({
      key: a.id,
      node: (
        <article className="r-entry">
          <div className="r-entry-head">
            <EntryTitle main={a.title} sub={a.issuer} />
            {hasText(a.date) && (
              <p className="r-date">
                <Time value={a.date} />
              </p>
            )}
          </div>
          <RichText text={a.description} />
        </article>
      ),
    })),

  organizations: (r) =>
    live(SECTIONS.organizations, r.organizations).map((o) => ({
      key: o.id,
      node: (
        <article className="r-entry">
          <div className="r-entry-head">
            <EntryTitle main={o.role} sub={o.name} />
            <DateRange start={o.start} end={o.end} current={o.current} />
          </div>
          <RichText text={o.description} bullets />
        </article>
      ),
    })),

  custom: (r) =>
    hasText(r.custom.content) ? [{ key: 'content', node: <RichText text={r.custom.content} /> }] : [],
}

function sectionTitle(resume, id) {
  if (id === 'custom') return hasText(resume.custom.title) ? resume.custom.title.trim() : 'Additional Information'
  return SECTIONS[id].title
}

export function buildBlocks(resume) {
  const blocks = [
    { key: 'header', kind: 'header', section: null, title: '', keepWithNext: false, node: <Header personal={resume.personal} /> },
  ]

  for (const id of resume.layout.order) {
    if (!resume.layout.enabled[id]) continue
    const entries = BUILDERS[id](resume)
    if (!entries.length) continue

    const title = sectionTitle(resume, id)
    blocks.push({
      key: `${id}-heading`,
      kind: 'heading',
      section: id,
      title,
      keepWithNext: true,
      node: <h2 className="r-heading">{title}</h2>,
    })
    for (const e of entries) {
      blocks.push({ key: `${id}-${e.key}`, kind: 'entry', section: id, title, keepWithNext: false, node: e.node })
    }
  }

  return blocks
}
