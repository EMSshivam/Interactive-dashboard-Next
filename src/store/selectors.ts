import type { RootState, Row, Status, Category } from '@/types'
import { format, subDays, isAfter } from 'date-fns'

export const selectFilters = (s: RootState) => s.filters

export function selectRowsAll(rows: Row[]) { return rows }

export function computeBuckets(rows: Row[]) {
  const statusCounts: Record<Status, number> = { 'New':0, 'In Progress':0, 'Completed':0, 'Blocked':0 }
  const categoryCounts: Record<Category, number> = { 'A':0, 'B':0, 'C':0, 'D':0 }
  const byDay = new Map<string, number>()
  rows.forEach(r => {
    statusCounts[r.status]++
    categoryCounts[r.category]++
    const day = format(new Date(r.dateISO), 'yyyy-MM-dd')
    byDay.set(day, (byDay.get(day) || 0) + 1)
  })
  const daily = Array.from(byDay.entries()).sort((a,b)=>a[0].localeCompare(b[0])).map(([date, value])=>({ date, value }))
  return { statusCounts, categoryCounts, daily }
}

export function filterRows(rows: Row[], state: RootState) {
  const f = state.filters
  const start = f.dateRange === '7d' ? subDays(new Date(), 7) : f.dateRange === '30d' ? subDays(new Date(), 30) : null
  const search = f.search.trim().toLowerCase()

  return rows.filter(r => {
    if (f.statuses.length && !f.statuses.includes(r.status)) return false
    if (f.categories.length && !f.categories.includes(r.category)) return false
    if (start && !isAfter(new Date(r.dateISO), start)) return false
    if (f.days.length) {
      const day = r.dateISO.slice(0,10)
      if (!f.days.includes(day)) return false
    }
    if (search) {
      const hay = (r.title + ' ' + r.id).toLowerCase()
      if (!hay.includes(search)) return false
    }
    return true
  })
}

export function sortRows(rows: Row[], key: 'id'|'title'|'category'|'status'|'dateISO'|'amount', dir: 'asc'|'desc') {
  const mul = dir === 'asc' ? 1 : -1
  return [...rows].sort((a:any,b:any)=> (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0) * mul)
}
