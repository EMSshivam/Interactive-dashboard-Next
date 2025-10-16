'use client'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { setSearch } from '@/store/slices/filters'
import { selectFilters } from '@/store/selectors'
import { Search, X } from 'lucide-react'

export function SearchInput() {
  const f = useAppSelector(selectFilters)
  const d = useAppDispatch()

  return (
    <div
      className={`
        flex items-center gap-2
        rounded-xl
        border border-violet-300
        bg-white px-3 py-2
        shadow-sm
        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        w-[240px]
        focus-within:w-[360px]
        focus-within:border-violet-400
        focus-within:ring-4
        focus-within:ring-violet-300/40
      `}
    >
      <Search className="w-4 h-4 text-violet-500 shrink-0" />

      <input
        value={f.search}
        onChange={(e) => d(setSearch(e.target.value))}
        placeholder="Search by title or ID..."
        className="
          w-full text-sm text-gray-700
          placeholder-gray-400
          bg-transparent outline-none
        "
      />

      {f.search && (
        <button
          onClick={() => d(setSearch(''))}
          className="p-1 rounded-full hover:bg-violet-50 transition-colors"
          aria-label="Clear"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      )}
    </div>
  )
}