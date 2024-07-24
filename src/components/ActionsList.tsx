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
          <h2 className="text-xl font-bold tracking-widest text-white/50">
            {group.substring(0, group.lastIndexOf('.'))}
          </h2>
          <div className="flex flex-1 flex-col items-between justify-center gap-2">
            {actions
              ?.filter((a) => a.date === group)
              .map(({ id, title, time, time2, date, date2, goals }, index) => (
                <div
                  key={id + index}
                  className={cx(
                    'grid grid-cols-12 gap-2 p-1 rounded-md',
                    index % 2 ? 'bg-yellow-900/50' : 'bg-yellow-950/50'
                  )}
                >
                  <div className="col-span-3 py-2 pl-4 flex items-center text-sm text-white/50">
                    {time.substring(0, time.lastIndexOf(':'))}
                    {time2
                      ? ` - ${`${
                          date2 && date2 !== date
                            ? date2.substring(0, date2.lastIndexOf('.'))
                            : ''
                        } `}${time.substring(0, time.lastIndexOf(':'))}`
                      : ''}
                  </div>
                  <div className="col-span-6 py-2 text-white/75">{title}</div>
                  <div className="col-span-2 py-2 text-white/75 flex flex-wrap gap-1 items-center">
                    {goals?.map((g) => (
                      <div
                        key={g.codename}
                        className="px-2 rounded-full bg-sky-700/75 h-min"
                      >
                        {g.codename}
                      </div>
                    ))}
                  </div>
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
