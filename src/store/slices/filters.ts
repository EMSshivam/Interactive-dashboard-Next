'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { FiltersState, SortDir, SortKey, Status, Category, DateRange } from '@/types'

const initialState: FiltersState = {
  statuses: [],
  categories: [],
  days: [],
  dateRange: '30d',
  search: '',
  sort: { key: 'dateISO', dir: 'desc' },
  page: 1,
  pageSize: 25,
}

const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleStatus(state, action: PayloadAction<Status>) {
      const s = action.payload
      state.page = 1
      state.statuses = state.statuses.includes(s) ? state.statuses.filter(x=>x!==s) : [...state.statuses, s]
    },
    toggleCategory(state, action: PayloadAction<Category>) {
      const c = action.payload
      state.page = 1
      state.categories = state.categories.includes(c) ? state.categories.filter(x=>x!==c) : [...state.categories, c]
    },
    toggleDay(state, action: PayloadAction<string>) {
      const d = action.payload
      state.page = 1
      state.days = state.days.includes(d) ? state.days.filter(x=>x!==d) : [...state.days, d]
    },
    setDateRange(state, action: PayloadAction<DateRange>) {
      state.page = 1
      state.dateRange = action.payload
      state.days = [] // reset specific-day selections when range changes
    },
    setSearch(state, action: PayloadAction<string>) {
      state.page = 1
      state.search = action.payload
    },
    setSort(state, action: PayloadAction<{ key: SortKey; dir?: SortDir }>) {
      state.sort = { key: action.payload.key, dir: action.payload.dir ?? (state.sort.dir === 'asc' ? 'desc':'asc') }
    },
    setPage(state, action: PayloadAction<number>) { state.page = action.payload },
    setPageSize(state, action: PayloadAction<number>) { state.pageSize = action.payload; state.page = 1 },
    clearAll(state) {
      state.statuses = []; state.categories = []; state.days = []; state.search = '';
      state.sort = { key: 'dateISO', dir: 'desc' }; state.page = 1; state.pageSize = 25; state.dateRange = '30d'
    },
    removeFilterChip(state, action: PayloadAction<{ type: 'status'|'category'|'day'; value: string }>) {
      if(action.payload.type === 'status') state.statuses = state.statuses.filter(s=>s!==action.payload.value)
      if(action.payload.type === 'category') state.categories = state.categories.filter(c=>c!==action.payload.value)
      if(action.payload.type === 'day') state.days = state.days.filter(d=>d!==action.payload.value)
      state.page = 1
    }
  }
})

export const { toggleStatus, toggleCategory, toggleDay, setDateRange, setSearch, setSort, setPage, setPageSize, clearAll, removeFilterChip } = slice.actions
export default slice.reducer
