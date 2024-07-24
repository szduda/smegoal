import { Goal } from './Goal'

export type Action = {
  id: string
  title: string
  timestamp: number
  timestamp2?: number
  goals?: Goal[]
  date: string
  time: string
  date2?: string
  time2?: string
  createdAt: string
}

export type AddActionPayload = {
  title: string
  timestamp: number
  timestamp2?: number
  goals?: string[]
}
