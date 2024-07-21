import { Button } from '@/components/Button'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 pt-[calc(44px+1rem)] lg:p-24">
      <p className="bg-black text-gray-400 rounded-lg p-8 text-lg max-w-[640px]">
        My precious time...
        <br />
        Nobody will take it away from me ever again.
        <br />
        Nobody.
        <br />
        Not even... YOU.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Button variant="blue" href="/goals/add">
          Define Goal
        </Button>
        <Button variant="yellow" href="actions/add">
          Report Action
        </Button>
      </div>
    </main>
  )
}
