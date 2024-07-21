'use client'

import { FormEvent, useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

export const AddActionForm = () => {
  const [status, setStatus] = useState<'' | 'success'>('')
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [timestamp, setTimestamp] = useState(Date.now())

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = {
      title,
      timestamp,
    }

    setStatus('success')
    console.log('action submit', data)
  }

  const reset = () => {
    setStatus('')
    setTitle('')
  }

  useEffect(() => {
    setDate(new Date(timestamp).toLocaleString().substring(0, 17))
  }, [timestamp])

  return (
    <form className="flex flex-col flex-1 gap-12" onSubmit={submit}>
      <div className="flex gap-4 flex-col w-full max-w-[320px] flex-1 justify-center">
        <span>I want to track that I</span>
        <Input
          placeholder="did something"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex gap-4 items-center">
          <span>on</span>
          <div className="flex gap-4 items-center">
            <Input
              placeholder="DD/MM/YYYY, HH:mm"
              maxLength={17}
              size={19}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-green-300 min-h-6">
          {status === 'success' ? 'Action saved.' : ''}
        </p>
        {!status && <Button variant="green">Save</Button>}
        {status === 'success' && (
          <Button variant="yellow" buttonProps={{ onClick: reset }}>
            Track Another Action
          </Button>
        )}
      </div>
    </form>
  )
}
