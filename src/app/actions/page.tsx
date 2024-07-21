import { Button } from '@/components/Button'
import { ActionsResponse } from '../api/actions/route'
import { ActionsList } from '@/components/ActionsList'

export const ActionsPage = async () => {
  const { actions }: ActionsResponse = await (
    await fetch(`${process.env.BASE_URL}/api/actions`)
  ).json()

  console.log('fetch goals', actions)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 pt-[calc(44px+1rem)] lg:p-24">
      <p className="bg-black text-gray-400 rounded-lg p-8 text-lg max-w-[640px]">
        So that&apos;s how it really was...
      </p>
      <ActionsList actions={actions} />
      <div className="flex gap-4 flex-wrap justify-center">
        <Button variant="yellow" href="/actions/add">
          Track New Action
        </Button>
      </div>
    </main>
  )
}

export default ActionsPage
