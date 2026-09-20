export function paginate(items, pageHeight, tolerance = 1) {
  const pages = [[]]
  let used = 0

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    let page = pages[pages.length - 1]

    let needed = (page.length ? item.mt : 0) + item.h
    if (item.keepWithNext && i + 1 < items.length) needed += items[i + 1].mt + items[i + 1].h

    if (page.length && used + needed > pageHeight + tolerance) {
      page = []
      pages.push(page)
      used = 0
    }

    used += (page.length ? item.mt : 0) + item.h
    page.push(i)
  }

  return pages
}

export function samePages(a, b) {
  return a.length === b.length && a.every((page, i) => page.length === b[i].length && page.every((v, j) => v === b[i][j]))
}
