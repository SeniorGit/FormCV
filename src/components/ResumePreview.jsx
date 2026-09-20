import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ACCENTS } from '../data/sections'
import { paginate, samePages } from '../utils/paginate'
import { buildBlocks } from './resumeBlocks'

function groupBySection(blocks, indexes) {
  const groups = []
  for (const i of indexes) {
    const block = blocks[i]
    const last = groups[groups.length - 1]
    if (last && block.section && last.section === block.section) last.items.push(i)
    else groups.push({ section: block.section, title: block.title, items: [i] })
  }
  return groups
}

const Block = ({ block, index }) => (
  <div className={`blk blk--${block.kind}`} data-index={index} data-keep={block.keepWithNext ? '1' : undefined}>
    {block.node}
  </div>
)

export function ResumePreview({ resume, onPageCount }) {
  const blocks = useMemo(() => buildBlocks(resume), [resume])
  const measureRef = useRef(null)
  const [pages, setPages] = useState(() => [blocks.map((_, i) => i)])

  useLayoutEffect(() => {
    const measure = () => {
      const root = measureRef.current
      if (!root || root.offsetWidth === 0) return
      const scale = root.getBoundingClientRect().width / root.offsetWidth || 1
      const pageHeight = root.querySelector('.probe').getBoundingClientRect().height / scale
      if (pageHeight <= 0) return
      const items = [...root.querySelectorAll(':scope > .blk')].map((el) => ({
        h: el.getBoundingClientRect().height / scale,
        mt: parseFloat(getComputedStyle(el).marginTop) || 0,
        keepWithNext: el.dataset.keep === '1',
      }))
      const next = paginate(items, pageHeight)
      setPages((prev) => (samePages(prev, next) ? prev : next))
    }

    measure()
    document.fonts?.addEventListener?.('loadingdone', measure)
    document.fonts?.ready?.then(measure)
    return () => document.fonts?.removeEventListener?.('loadingdone', measure)
  }, [blocks])

  const pageCount = pages.length
  useEffect(() => {
    onPageCount?.(pageCount)
  }, [pageCount, onPageCount])

  const accent = ACCENTS.find((a) => a.id === resume.settings.accent) ?? ACCENTS[0]
  const safePages = pages.map((p) => p.filter((i) => i < blocks.length))

  return (
    <article
      className="resume"
      aria-label="CV preview"
      lang="en"
      data-density={resume.settings.density}
      style={{ '--accent': accent.value }}
    >
      <div className="measure" ref={measureRef} aria-hidden="true" inert>
        <div className="probe" />
        {blocks.map((block, i) => (
          <Block key={block.key} block={block} index={i} />
        ))}
      </div>

      {safePages.map((indexes, p) => (
        <div className="page" key={p} data-page={p + 1}>
          {groupBySection(blocks, indexes).map((group, g) => {
            const content = group.items.map((i) => <Block key={blocks[i].key} block={blocks[i]} index={i} />)
            return group.section ? (
              <section className="r-section" aria-label={group.title} key={`${group.section}-${g}`}>
                {content}
              </section>
            ) : (
              <Fragment key={`h-${g}`}>{content}</Fragment>
            )
          })}
        </div>
      ))}
    </article>
  )
}
