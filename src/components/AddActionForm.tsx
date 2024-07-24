'use client'

import { FC, FormEvent, useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { cx } from '@/utils/cx'
import { Goal } from '@/models/Goal'
import { Action } from '@/models/Action'

type Props = {
  goals: Goal[]
}

const parseDate = (date: string) => {
  const [d, time] = date.split(', ')
  const [dd, MM, yyyy] = d.substring(0, 10).split('/')
  const dateString = `${yyyy}-${MM}-${dd}T${time.substring(0, 5)}:00`
  return Date.parse(dateString)
}

export const AddActionForm: FC<Props> = ({ goals }) => {
  const [status, setStatus] = useState('')
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [date2, setDate2] = useState('')
  const [isDateSpan, setIsDateSpan] = useState(false)
  const [actionGoals, setActionGoals] = useState<string[]>([])

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const parsedDate = parseDate(date)
    if (!Number.isInteger(parsedDate)) {
      console.error('Invalid date', date, parsedDate)
      setStatus('Error: invalid date')
      return
    }

    const parsedDate2 = isDateSpan ? parseDate(date2) : undefined
    if (typeof parsedDate2 !== 'undefined' && !Number.isInteger(parsedDate2)) {
      console.error('Invalid date', date2, parsedDate2)
      setStatus('Error: invalid date')
      return
    }

    const data = {
      title,
      timestamp: parsedDate,
      timestamp2: parsedDate2,
      goals: actionGoals,
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
    setDate2(new Date().toLocaleString().substring(0, 17))
  }, [])

  const valid =
    title.length > 2 &&
    date.length === 17 &&
    (!isDateSpan || date2.length === 17)

  return (
    <form className="flex flex-col flex-1 gap-12" onSubmit={submit}>
      <div className="flex gap-4 flex-col w-full max-w-[640px] flex-1 justify-center">
        <span>I did</span>
        <Input.TextArea
          placeholder="something"
          id="title"
          value={title}
          rows={3}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex gap-4 flex-col my-4">
          <div className="flex gap-4 items-center">
            <Button
              variant="clean"
              className="rounded-md p-3 w-24 border-2 border-dashed border-yellow-300/25 hover:bg-yellow-950"
              onClick={() => setIsDateSpan(!isDateSpan)}
            >
              {isDateSpan ? 'from' : 'on'}
            </Button>
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
          <div
            className={cx(
              'flex gap-4 items-center',
              !isDateSpan && 'opacity-0'
            )}
          >
            <div className="p-3 pl-7 w-24">to</div>
            <div className="flex gap-4 items-center">
              <Input
                placeholder="DD/MM/YYYY, HH:mm"
                maxLength={17}
                size={19}
                value={date2}
                onChange={(e) => setDate2(e.target.value)}
              />
            </div>
          </div>
        </div>
        <span>targeting my goals</span>
        <div className="flex flex-wrap gap-2">
          {goals.map(({ codename, id }) => (
            <Button
              key={id}
              variant="clean"
              className={cx(
                'rounded-full px-6 py-1 border-2 hover:border-sky-700/75 relative flex',
                actionGoals.includes(id)
                  ? 'border-sky-700/40'
                  : 'border-sky-700/30 text-white/50'
              )}
              onClick={() =>
                actionGoals.includes(id)
                  ? setActionGoals(actionGoals.filter((_id) => _id !== id))
                  : setActionGoals([...actionGoals, id])
              }
            >
              <div
                className={cx(
                  'transition-transform duration-300 ease-in-out',
                  actionGoals.includes(id) && '-translate-x-2'
                )}
              >
                {codename}
              </div>
              <span className="absolute right-2 text-sky-300">
                {actionGoals.includes(id) && '\u2714'}
              </span>
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <p
          className={cx(
            status === 'success' && 'text-green-300',
            status.startsWith('Error') && 'text-red-300',
            'min-h-6'
          )}
        >
          {status === 'success'
            ? 'Action saved.'
            : status.startsWith('Error')
            ? status
            : ''}
        </p>
        {status === 'success' ? (
          <Button variant="yellow" onClick={reset}>
            Track Another Action
          </Button>
        ) : (
          <>
            <Button
              variant="green"
              buttonProps={{ type: 'submit', disabled: !valid }}
            >
              Save
            </Button>
          </>
        )}
      </div>
    </form>
  )
}
