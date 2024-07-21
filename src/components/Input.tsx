import { cx } from '@/utils/cx'
import { ComponentProps, FC } from 'react'

type Props = ComponentProps<'input'>

export const Input: FC<Props> = (props) => (
  <input
    className={cx(
      'p-2 font-medium tracking-wide rounded-md border-2 focus:outline-none',
      'bg-gray-800 border-gray-800 focus:border-gray-600 hover:bg-gray-700'
    )}
    {...props}
  />
)
