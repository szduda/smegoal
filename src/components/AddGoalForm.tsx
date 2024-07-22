'use client'

import { FormEvent, useState } from 'react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { PERS } from '@/models/Goal'

export const AddGoalForm = () => {
  const [status, setStatus] = useState('')
  const [title, setTitle] = useState('')
  const [times, setTimes] = useState('1')
  const [per, setPer] = useState('lifetime')

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = {
      title,
      times: Number.parseInt(times),
      per,
    }

    console.debug('goal submitting', data)

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/goals`, {
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

  return (
    <form className="flex flex-col flex-1 gap-12" onSubmit={submit}>
      <div className="flex gap-4 flex-col w-full max-w-[320px] flex-1 justify-center">
        <span>I want to</span>
        <Input
          placeholder="do something"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex gap-4 items-center">
          <Input
            placeholder="1"
            size={4}
            value={times}
            onChange={(e) =>
              Number.isInteger(Number(e.target.value)) &&
              setTimes(e.target.value)
            }
          />
          <span>time{Number(times) > 1 ? 's' : ''}</span>
          <Select value={per} onChange={(e) => setPer(e.target.value)}>
            {Object.keys(PERS).map((option) => (
              <option key={option} value={option}>
                {PERS[option]}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-green-300 min-h-6">
          {status === 'success' ? 'Goal saved.' : ''}
        </p>
        {!status && <Button variant="green">Save</Button>}
        {status === 'success' && (
          <Button variant="blue" buttonProps={{ onClick: reset }}>
            Add Another Goal
          </Button>
        )}
      </div>
    </form>
  )
}
