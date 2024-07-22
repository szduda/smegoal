export const PERS: Record<string, string> = {
  lifetime: 'in my life',
  year: 'every year',
  month: 'every month',
  week: 'every week',
  day: 'every day',
  until: 'until',
}

export type PerPeriod = keyof typeof PERS

export type Goal = {
  id: string
  title: string
  times: number
  per: PerPeriod
  createdAt: string
}
