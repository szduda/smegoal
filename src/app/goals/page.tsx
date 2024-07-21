import { Button } from '@/components/Button'
import { GoalsResponse } from '../api/goals/route'
import { GoalsList } from '@/components/GoalsList'

export const GoalsPage = async () => {
  const { goals }: GoalsResponse = await (
    await fetch(`${process.env.BASE_URL}/api/goals`)
  ).json()

  console.log('fetch goals', goals)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 pt-[calc(44px+1rem)] lg:p-24">
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

export default GoalsPage
