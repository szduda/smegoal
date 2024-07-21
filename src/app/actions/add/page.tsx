import { AddActionForm } from '@/components/AddActionForm'

export default function AddActionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 pt-[calc(44px+1rem)] lg:p-24">
      <p className="bg-black text-gray-400 rounded-lg p-8 text-lg max-w-[640px]">
        Tell me more about that...
      </p>
      <AddActionForm />
    </main>
  )
}
