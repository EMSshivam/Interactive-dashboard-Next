'use client'
import { gradients } from '@/theme/colors' 

export function Card({
  title,
  children,
  action,
  grad, 
  fitContent=false
}: {
  fitContent?:boolean
  grad?: keyof typeof gradients
  title: string
  children: React.ReactNode
  action?: React.ReactNode
}) {
  const gradientClass = gradients[grad ?? 'pinkPurple']

  return (
  <div
  className={`
    card card-equal p-4
    transition-transform duration-200 will-change-transform
    hover:scale-[1.02] md:hover:scale-[1.03]
    ${fitContent ? "!h-fit !min-h-0" : ""}
  `}
>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className={`h-5 w-[3px] rounded ${gradientClass}`} />
          <div className="card-title">{title}</div>
        </div>
        {action}
      </div>
      {children}
    </div>
  )
}