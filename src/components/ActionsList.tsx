'use client'

import { Action } from '@/models/Action'
import { cx } from '@/utils/cx'
import { KebabIcon } from '@/components/icons/KebabIcon'
import { FC } from 'react'

type Props = {
  actions: Action[]
}

export const ActionsList: FC<Props> = ({ actions }) => {
  const groups = [...new Set(actions.map((a) => a.date))]
  return (
    <div className="flex flex-col justify-center gap-6 max-w-3xl">
      {groups.map((group) => (
        <div key={group} className="flex flex-col gap-2">
          <h2 className="text-xl font-bold tracking-widest">
            {group.substring(0, 5)}
          </h2>
          <div className="flex flex-1 flex-col items-between justify-center gap-2">
            {actions
              ?.filter((a) => a.date === group)
              .map(({ id, title, time }, index) => (
                <div
                  key={id + index}
                  className={cx(
                    'grid grid-cols-12 gap-2 p-1 rounded-md',
                    index % 2 ? 'bg-yellow-900/50' : 'bg-yellow-950/50',
                  )}
                >
                  <div className="col-span-2 py-2 pl-6 flex items-center">
                    {time.substring(0, 5)}
                  </div>
                  <div className="col-span-9 py-2">{title}</div>
                  <div className="flex items-center justify-end pr-2">
                    <button
                      className="p-2 opacity-25 h-min rounded-full hover:opacity-100 hover:bg-yellow-500/50"
                      onClick={() => null}
                    >
                      <KebabIcon />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
