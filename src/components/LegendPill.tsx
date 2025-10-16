'use client'
export function LegendPill({ color, label, sub, active, onClick }:{ color: string; label: string; sub?: string; active?: boolean; onClick?: ()=>void }){
  return (
    <button onClick={onClick} className={`flex items-center gap-2 rounded-md px-2 py-1 text-sm ${active ? 'bg-gray-100' : ''}`}>
      <span className="legend-dot" style={{ backgroundColor: color }} />
      <span>{label}</span>
      {sub && <span className="text-gray-500"> {sub}</span>}
    </button>
  )
}
