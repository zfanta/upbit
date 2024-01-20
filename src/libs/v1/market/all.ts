import { getRemainingInMinute } from '@/libs/http'

export default async function all () {
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Connection', 'keep-alive')

  const response = await fetch('http://localhost:3000/v1/market/all', { headers })

  const status = response.status
  const remainingInMinute = getRemainingInMinute(response.headers.get('Remaining-Req'))

  return {
    status,
    body: await response.json() as {
      market: string
      korean_name: string
      english_name: string
      market_warning: 'NONE' | 'CAUTION'
    }[],
    remainingInMinute
  }
}
