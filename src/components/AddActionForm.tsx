'use client'

import { FormEvent, useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

export const AddActionForm = () => {
  const [status, setStatus] = useState('')
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const [d, time] = date.split(', ')
    const [dd, MM, yyyy] = d.substring(0, 10).split('/')
    const dateString = `${yyyy}-${MM}-${dd}T${time.substring(0, 5)}:00`
    const parsedDate = Date.parse(dateString)
    if (!Number.isInteger(parsedDate)) {
      console.error('Invalid date', date, dateString, parsedDate)
      setStatus('Error: invalid date')
      return
    }

    const data = {
      title,
      timestamp: parsedDate,
    }

    console.debug('goal submitting', data)

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/actions`, {
      method: 'POST',
      body: JSON.stringify(data),
    })

    if (res.ok) {
      const { id } = await res.json()
      setStatus('success')
      console.debug('goal submitted', id)
    } else {
      setStatus(`Error ${res.status}`)
      console.debug('goal not submitted')
    }
  }

  const reset = () => {
    setStatus('')
    setTitle('')
  }

  useEffect(() => {
    setDate(new Date().toLocaleString().substring(0, 17))
  }, [])

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
        {status === 'success' ? (
          <Button variant="yellow" buttonProps={{ onClick: reset }}>
            Track Another Action
          </Button>
        ) : (
          <>
            {status.startsWith('Error') && status}
            <Button variant="green">Save</Button>
          </>
        )}
      </div>
    </form>
  )
}
