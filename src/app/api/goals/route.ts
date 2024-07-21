import { Goal } from '@/models/Goal'

export type GoalsResponse = {
  goals: Goal[]
}

export async function GET() {
  // const res = await fetch('', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY,
  //   },
  // })
  // const data = await res.json()

  const goals = [
    { id: '3dj30', title: 'Phycisal excercises', times: 2, per: 'week' },
    {
      id: '1230',
      title:
        'Test some longer title and see how it wraps, probably add ellipsis at the end. Or maybe not, maybe wrapping is fine.',
      times: 2,
      per: 'week',
    },
    { id: '4jG0C', title: 'Djembe practice', times: 3, per: 'week' },
    { id: 'Zz2b6', title: 'Kitty grooming', times: 1, per: 'month' },
    {
      id: 'dOJ85',
      title: 'Visit Guinee or Senegambia',
      times: 1,
      per: 'lifetime',
    },
  ]

  return Response.json({ goals })
}
