import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cx } from '@/utils/cx'
import { Button } from '@/components/Button'
import { ReactNode } from 'react'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'smegoal',
  description: 'Track your actions and see if you move towards your goals.',
}

type Props = {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={cx(inter.className, 'bg-black')}>
        <header className="bg-gray-900 flex justify-between items-center fixed top-0 w-full">
          <div className="flex-1">
            <Button
              variant="link"
              href="/goals"
              className="text-sky-400 hover:text-sky-500 lg:hidden"
            >
              Goals
            </Button>
          </div>
          <Link href="/">
            <h1 className="text-xl font-bold tracking-widest p-2">Smegoal</h1>
          </Link>
          <div className="flex flex-1 justify-end">
            <Button
              variant="link"
              href="/goals"
              className="text-sky-400 hover:text-sky-500 hidden lg:block"
            >
              Goals
            </Button>
            <Button
              variant="link"
              href="/actions"
              className="text-yellow-300 hover:text-yellow-400"
            >
              Actions
            </Button>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
