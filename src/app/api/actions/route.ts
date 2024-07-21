import { Action } from '@/models/Action'

const locale = 'pl'

export type ActionsResponse = {
  actions: Action[]
}

export async function GET() {
  // const res = await fetch('', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY,
  //   },
  // })
  // const data = await res.json()
  const actions = [
    { id: '3dj30', title: 'Phycisal excercises', timestamp: 20347239487 },
    {
      id: '1230',
      title:
        'Test some longer title and see how it wraps, probably add ellipsis at the end. Or maybe not, maybe wrapping is fine.',
      timestamp: 20345139487,
    },
    { id: '4jG0C', title: 'Djembe practice', timestamp: 190235108237 },
    { id: 'Zz2b6', title: 'Kitty grooming', timestamp: 190228108237 },
    {
      id: 'dOJ85',
      title: 'Visit Guinee or Senegambia',
      timestamp: 190218438237,
    },
  ].map((action) => ({
    ...action,
    date: new Date(action.timestamp).toLocaleDateString(locale),
    time: new Date(action.timestamp).toLocaleTimeString(locale),
  }))

  return Response.json({ actions })
}
