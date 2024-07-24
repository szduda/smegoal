import { AddActionForm } from '@/components/AddActionForm'
import { Goal } from '@/models/Goal'
import { sql } from '@vercel/postgres'

export default async function AddActionPage() {
  const { rows } =
    await sql`SELECT * FROM goals ORDER BY createdAt desc LIMIT 50;`
  const goals: Goal[] = rows.map((dbGoal) => ({
    id: dbGoal.id,
    codename:
      dbGoal.codename ||
      dbGoal.title
        .split(' ')
        .map((word: string) => word[0].toUpperCase() + word.substring(1, 3))
        .join(''),
  }))

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 pt-[calc(44px+1rem)] lg:py-16 lg:px-24">
      <p className="bg-black text-gray-400 rounded-lg p-8 text-lg max-w-[640px]">
        Tell me more about that...
      </p>
      <AddActionForm goals={goals} />
    </main>
  )
}
