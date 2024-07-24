import { cx } from '@/utils/cx'
import { Component, ComponentProps, FC } from 'react'

const inputClasses = [
  'p-2 font-medium tracking-wide rounded-md border-2 focus:outline-none',
  'bg-gray-800 border-gray-800 focus:border-gray-600 hover:bg-gray-700',
]

export const Input = ({
  className,
  ...inputProps
}: ComponentProps<'input'>) => (
  <input
    className={cx(...inputClasses, className)}
    {...(inputProps as ComponentProps<'input'>)}
  />
)

export const TextArea = ({
  className,
  ...inputProps
}: ComponentProps<'textarea'>) => (
  <textarea
    className={cx(...inputClasses, className)}
    {...(inputProps as ComponentProps<'textarea'>)}
  />
)

Input.TextArea = TextArea
