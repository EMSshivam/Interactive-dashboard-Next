import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  const file = path.join(process.cwd(), 'public', 'data', 'rows.json')
  const txt = await fs.readFile(file, 'utf-8')
  const rows = JSON.parse(txt)
  return NextResponse.json(rows)
}
