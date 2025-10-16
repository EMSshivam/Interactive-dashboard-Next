export type Status = 'New' | 'In Progress' | 'Completed' | 'Blocked'
export type Category = 'A' | 'B' | 'C' | 'D'
export type DateRange = '7d' | '30d' | 'all'
export type SortKey = 'id' | 'title' | 'category' | 'status' | 'dateISO' | 'amount'
export type SortDir = 'asc' | 'desc'

export interface Row {
  id: string
  title: string
  category: Category
  status: Status
  amount: number
  dateISO: string
}

export interface FiltersState {
  statuses: Status[]
  categories: Category[]
  days: string[]
  dateRange: DateRange
  search: string
  sort: { key: SortKey; dir: SortDir }
  page: number
  pageSize: number
}

export interface RootState {
  filters: FiltersState
}
