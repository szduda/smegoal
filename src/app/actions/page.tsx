import { Button } from '@/components/Button'
import { ActionsList } from '@/components/ActionsList'
import { Action } from '@/models/Action'
import { sql } from '@vercel/postgres'

const locale = 'pl'

export default async function ActionsPage() {
  const { rows } =
    await sql`SELECT * FROM actions ORDER BY timestamp desc LIMIT 50;`

  const actions: Action[] = rows.map((dbAction) => {
    const timestamp = Number(dbAction.timestamp)
    return {
      id: dbAction.id,
      title: dbAction.title,
      timestamp,
      createdAt: new Date(Number(dbAction.createdat)).toDateString(),
      date: new Date(timestamp).toLocaleDateString(locale),
      time: new Date(timestamp).toLocaleTimeString(locale),
    }
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 pt-[calc(44px+1rem)] lg:p-24">
      <p className="bg-black text-gray-400 rounded-lg p-8 text-lg max-w-[640px]">
        So that&apos;s how it really was...
      </p>
      <ActionsList actions={actions || []} />
      <div className="flex gap-4 flex-wrap justify-center">
        <Button variant="yellow" href="/actions/add">
          Track New Action
        </Button>
      </div>
    </main>
  )
}
