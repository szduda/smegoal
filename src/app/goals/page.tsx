import { Button } from '@/components/Button'
import { GoalsList } from '@/components/GoalsList'
import { Goal } from '@/models/Goal'
import { sql } from '@vercel/postgres'

const locale = 'pl'

export default async function GoalsPage() {
  const { rows } =
    await sql`SELECT * FROM goals ORDER BY createdAt desc LIMIT 50;`
  const goals: Goal[] = rows.map((dbGoal) => ({
    id: dbGoal.id,
    title: dbGoal.title,
    codename:
      dbGoal.codename ||
      dbGoal.title
        .split(' ')
        .map((word: string) => word[0])
        .join(''),
    times: Number(dbGoal.times),
    per: dbGoal.per,
    createdAt: new Date(Number(dbGoal.createdat)).toLocaleDateString(locale),
  }))

  return (
    <main className="flex gap-4 min-h-screen flex-col items-center justify-between p-4 pt-[calc(44px+1rem)] lg:p-24">
      <p className="bg-black text-gray-400 rounded-lg p-8 text-lg max-w-[640px]">
        Quite ambitious, your goals seem.
      </p>
      <GoalsList goals={goals} />
      <div className="flex gap-4 flex-wrap justify-center">
        <Button variant="blue" href="/goals/add">
          Define New Goal
        </Button>
      </div>
    </main>
  )
}
