import { Button } from '@/components/Button'
import { ActionsList } from '@/components/ActionsList'
import { Action } from '@/models/Action'
import { sql } from '@vercel/postgres'

const locale = 'pl'

export default async function ActionsPage() {
  const query = await sql`
  SELECT  a.id, a.title, a.timestamp, a.timestamp2, a.createdat, g.goals
  FROM    actions a
  LEFT JOIN  (
    SELECT    ag.action_id AS id, array_agg(g.codename) AS goals
    FROM      action_goals ag
    JOIN      goals g  ON g.id = ag.goal_id
    GROUP BY  ag.action_id
  ) g USING (id);`

  const actions: Action[] = query.rows.map((row) => {
    const timestamp = Number(row.timestamp)
    const timestamp2 = Number(row.timestamp2)

    return {
      id: row.id,
      title: row.title,
      timestamp,
      timestamp2,
      createdAt: new Date(Number(row.createdat)).toDateString(),
      date: new Date(timestamp).toLocaleDateString(locale),
      time: new Date(timestamp).toLocaleTimeString(locale),
      ...(timestamp2 && {
        date2: new Date(timestamp2).toLocaleDateString(locale),
      }),
      ...(timestamp2 && {
        time2: new Date(timestamp2).toLocaleTimeString(locale),
      }),
      goals: row.goals?.map((codename: string) => ({ codename })) ?? [],
    }
  })

  return (
    <main className="flex gap-8 min-h-screen flex-col items-center justify-between p-4 pt-[calc(44px+1rem)] lg:p-16">
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
