import { AddActionPayload } from '@/models/Action'
import { sql } from '@vercel/postgres'
import { NextRequest } from 'next/server'
import { randomUUID } from 'crypto'

export async function POST(req: NextRequest) {
  const { title, timestamp, timestamp2, goals }: AddActionPayload =
    await req.json()
  const id = randomUUID()

  try {
    goals?.map(
      (goalId) => sql`INSERT INTO action_goals VALUES (${id}, ${goalId})`
    )

    sql`INSERT INTO actions VALUES (${id}, ${title}, ${timestamp}, ${Date.now()})`

    return Response.json({ id })
  } catch (error) {
    console.error('DB Error:', error)
    return new Response(JSON.stringify({ error: 'DB Error' }), { status: 500 })
  }
}
