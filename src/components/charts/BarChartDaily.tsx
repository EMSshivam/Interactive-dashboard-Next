'use client'
import * as React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts'
import { chartGradient } from '@/theme/colors'
import { format, parseISO, compareAsc } from 'date-fns'
import ChartTooltip from './ChartTooltip'

type DayPoint = { date: string; value: number }

export function BarChartDaily({
  data,
  activeDays,
  onToggleDay,
  range,
}: {
  data: DayPoint[]
  activeDays: string[]
  onToggleDay: (d: string) => void
  range: '7d' | '30d' | 'all'
}) {
  const sorted = React.useMemo(
    () => [...data].sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date))),
    [data]
  )

  const filteredData = React.useMemo(() => {
    if (range === '7d') return sorted.slice(-7)
    if (range === '30d') return sorted.slice(-30)
    return sorted
  }, [sorted, range])

  const ticks = React.useMemo(() => {
    const step = range === '7d' ? 1 : range === '30d' ? 4 : 7
    const out: string[] = []
    for (let i = 0; i < filteredData.length; i += step) out.push(filteredData[i].date)
    const last = filteredData.at(-1)?.date
    if (last && out[out.length - 1] !== last) {
      const lastTickIdx = filteredData.findIndex(d => d.date === out[out.length - 1])
      const lastIdx = filteredData.length - 1
      if (lastTickIdx >= lastIdx - 2) out[out.length - 1] = last
      else out.push(last)
    }
    return out
  }, [filteredData, range])

  const [barSize, setBarSize] = React.useState(24)
  React.useEffect(() => {
    const n = filteredData.length || 1
    const containerWidth = Math.max(window.innerWidth * 0.7, 320)
    const possibleWidth = Math.floor(containerWidth / n) - 8
    setBarSize(Math.min(Math.max(possibleWidth, 4), 60))
  }, [filteredData.length, range])

  const barGap = range === '7d' ? 6 : range === '30d' ? 4 : 2
  const catGap = range === 'all' ? 10 : 20

  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null)

  return (
    <div className="w-full h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={filteredData}
          barSize={barSize}
          barGap={barGap}
          barCategoryGap={catGap}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="date"
            ticks={ticks}
            interval={0}
            tickMargin={10}
            tickFormatter={(iso) => format(parseISO(iso), 'M/d')}
            tick={{ fontSize: 12, fill: '#555', fontFamily: 'Inter, sans-serif' }}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12, fill: '#555', fontFamily: 'Inter, sans-serif' }}
          />

          <Tooltip
            content={<ChartTooltip mode="bar" />}
            wrapperStyle={{ outline: 'none' }}
            cursor={{ fill: '#D4D4D4' }}
          />

          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartGradient.from} />
              <stop offset="100%" stopColor={chartGradient.to} />
            </linearGradient>
          </defs>

          <Bar
            dataKey="value"
            fill="url(#g1)"
            onMouseMove={(_, index: number) => setHoverIndex(index)}
            onClick={(_, index) => onToggleDay(filteredData[index]?.date)}
            animationDuration={250}
          >
            {filteredData.map((d, i) => {
              const active = activeDays.includes(d.date)
              const hovered = i === hoverIndex
              return (
                <Cell
                  key={d.date}
                  cursor="pointer"
                  stroke={active || hovered ? '#111827' : undefined}
                  strokeWidth={active || hovered ? 2.5 : 0}
                />
              )
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}