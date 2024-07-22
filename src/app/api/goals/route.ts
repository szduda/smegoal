import { Goal } from '@/models/Goal'
import { sql } from '@vercel/postgres'
import { NextRequest } from 'next/server'
import { randomUUID } from 'crypto'

export async function POST(req: NextRequest) {
  const { title, times, per }: Goal = await req.json()
  const id = randomUUID()

  try {
    sql`INSERT INTO goals VALUES (${id}, ${title}, ${times}, ${per}, ${Date.now()})`
    return Response.json({ id })
  } catch (error) {
    console.error('DB Error:', error)
    return new Response(JSON.stringify({ error: 'DB Error' }), { status: 500 })
  }
}
