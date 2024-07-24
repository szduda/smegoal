import { cx } from '@/utils/cx'
import { ComponentProps, FC } from 'react'

type Props = ComponentProps<'select'>

export const Select: FC<Props> = ({ className, ...props }) => (
  <select
    className={cx(
      'p-2 font-medium tracking-wide bg-gray-800 rounded-md border-2 border-gray-800 focus:outline-none focus:border-gray-600 hover:bg-gray-700 cursor-pointer',
      className
    )}
    {...props}
  />
)
