import { cx } from '@/utils/cx'
import Link from 'next/link'
import { ComponentProps, FC, ReactNode } from 'react'

type Props = {
  href?: ComponentProps<typeof Link>['href']
  variant?: 'clean' | 'blue' | 'green' | 'gray' | 'red' | 'yellow' | 'link'
  buttonProps?: Omit<ComponentProps<'button'>, 'children' | 'onClick'>
  className?: string
} & Pick<ComponentProps<'button'>, 'children' | 'onClick'>

export const Button: FC<Props> = ({
  children,
  onClick,
  href,
  variant = 'gray',
  buttonProps,
  className,
}) => {
  const button = (
    <button
      type="button"
      onClick={onClick}
      {...buttonProps}
      className={cx(
        'font-medium tracking-wider',
        variant === 'blue' && 'border-sky-700 text-sky-400 hover:bg-sky-950',
        variant === 'green' &&
          'border-green-700 text-green-400 hover:bg-green-950',
        variant === 'gray' && 'border-gray-700 text-gray-400 hover:bg-gray-900',
        variant === 'red' && 'border-red-700 text-red-400 hover:bg-red-950',
        variant === 'yellow' &&
          'border-yellow-700 text-yellow-400 hover:bg-yellow-950',
        variant === 'link' && 'hover:underline px-2',
        !['clean', 'link'].includes(variant) &&
          'border-2 uppercase min-w-[320px] py-2 px-4 rounded-md',
        buttonProps?.className,
        !href && className
      )}
    >
      {children}
    </button>
  )

  if (href) {
    return (
      <Link href={href} className={className}>
        {button}
      </Link>
    )
  }

  return button
}
