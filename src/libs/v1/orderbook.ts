import { getRemainingInMinute } from '@/libs/http'

export default async function orderbook (markets: string[]) {
  const query = new URLSearchParams()
  query.append('markets', markets.join(','))

  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Connection', 'keep-alive')

  const response = await fetch(`http://localhost:3000/v1/orderbook?${query.toString()}`, {
    headers
  })

  const status = response.status
  const body = await response.json()
  const remainingInMinute = getRemainingInMinute(response.headers.get('Remaining-Req'))

  return {
    status,
    body,
    remainingInMinute
  }
}
