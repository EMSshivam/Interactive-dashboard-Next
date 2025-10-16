'use client'
import * as React from 'react'
import type { Row } from '@/types'

export function useRows(){
  const [rows, setRows] = React.useState<Row[]|null>(null)
  React.useEffect(()=>{
    (async()=>{
      const res = await fetch('/api/rows', { cache: 'no-store' })
      const j = await res.json()
      setRows(j as Row[])
    })()
  }, [])
  return rows
}
