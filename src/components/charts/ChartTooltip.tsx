'use client'
import * as React from 'react'
import type { TooltipProps } from 'recharts'
import { parseISO, format } from 'date-fns'

type Mode = 'donut' | 'bar'

export default function ChartTooltip(
  props: TooltipProps<number, string> & { mode: Mode; total?: number }
) {
  const { active, payload, label, mode, total } = props
  if (!active || !payload || payload.length === 0) return null

  const v = Number(payload[0]?.value ?? 0)
  let title = ''
  let subtitle = ''
  let dot: string | undefined

  if (mode === 'donut') {
    const name = payload[0]?.name ?? ''
    const pct = total ? ((v / total) * 100).toFixed(1) : undefined
    dot = payload[0]?.payload?.fill || payload[0]?.color
    title = name
    subtitle = pct ? `${v.toLocaleString()} (${pct}%)` : v.toLocaleString()
  } else {
    const d = typeof label === 'string' ? label : String(label ?? '')
    title = d ? format(parseISO(d), 'PP') : ''
    subtitle = `${v} items`
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-lg">
      <div className="mb-0.5 flex items-center gap-2">
        {dot ? <span className="h-2.5 w-2.5 rounded-full" style={{ background: dot }} /> : null}
        <div className="text-[13px] font-semibold text-gray-900">{title}</div>
      </div>
      <div className="text-xs text-gray-600">{subtitle}</div>
    </div>
  )
}