'use client'

import { Goal, PERS } from '@/models/Goal'
import { cx } from '@/utils/cx'
import { KebabIcon } from '@/components/icons/KebabIcon'
import { FC } from 'react'

const parseTimes = (times: number) => {
  if (times === 1) {
    return 'once'
  }

  if (times === 2) {
    return 'twice'
  }

  return `${times} times`
}

type Props = {
  goals: Goal[]
}

export const GoalsList: FC<Props> = ({ goals }) => (
  <div className="flex flex-1 flex-col items-between justify-center gap-2 max-w-3xl">
    {goals?.map(({ id, title, times, per, createdAt }, index) => (
      <div
        key={id}
        className={cx(
          'grid grid-cols-12 gap-2 p-1 rounded-md',
          index % 2 ? 'bg-sky-900/50' : 'bg-sky-950/50'
        )}
      >
        <div className="col-span-2 py-2 pl-2 text-white/40 tracking-widest">{createdAt}</div>
        <div className="col-span-6 py-2 pl-6 text-white/75">{title}</div>
        <div className="col-span-3 py-2 flex items-center justify-end text-white/75">
          {parseTimes(times)} {PERS[per]}
        </div>
        <div className="flex items-center justify-end pr-2">
          <button
            className="p-2 opacity-25 h-min rounded-full hover:opacity-100 hover:bg-sky-500/50"
            onClick={() => null}
          >
            <KebabIcon />
          </button>
        </div>
      </div>
    ))}
  </div>
)
