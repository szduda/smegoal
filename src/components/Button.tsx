import { cx } from '@/utils/cx'
import Link from 'next/link'
import { ComponentProps, FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
  href?: ComponentProps<typeof Link>['href']
  variant?: 'blue' | 'green' | 'gray' | 'red' | 'yellow' | 'link'
  buttonProps?: Omit<ComponentProps<'button'>, 'children'>
  className?: string
}

export const Button: FC<Props> = ({
  children,
  href,
  variant = 'gray',
  buttonProps,
  className,
}) => {
  const button = (
    <button
      {...buttonProps}
      className={cx(
        'px-4 py-2 font-medium rounded-md tracking-wider',
        variant === 'blue' && 'border-sky-700 text-sky-400 hover:bg-sky-950',
        variant === 'green' &&
          'border-green-700 text-green-400 hover:bg-green-950',
        variant === 'gray' && 'border-gray-700 text-gray-400 hover:bg-gray-900',
        variant === 'red' && 'border-red-700 text-red-400 hover:bg-red-950',
        variant === 'yellow' &&
          'border-yellow-700 text-yellow-400 hover:bg-yellow-950',
        variant === 'link' ? 'hover:underline' : 'border-2 uppercase min-w-[320px]',
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
