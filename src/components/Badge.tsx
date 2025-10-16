'use client'
import { statusColors, categoryColors } from '@/theme/colors'

export function Badge({
  type,
  value,
}: {
  type: 'status' | 'category'
  value: string
}) {
  const color = type === 'status' ? statusColors[value] : categoryColors[value]

  return (
    <span
      className="
        inline-flex items-center justify-center
        px-3 py-[2px]
        rounded-full text-sm font-medium
        border border-current
        bg-opacity-10
        select-none
      "
      style={{
        color,
        borderColor: color,
        backgroundColor: `${color}1A`,
      }}
    >
      {value}
    </span>
  )
}