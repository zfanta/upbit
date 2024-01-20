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
  const body = await response.json() as {
    market: string
    timestamp: number
    total_ask_size: number
    total_bid_size: number
    orderbook_units: {
      ask_price: number
      bid_price: number
      ask_size: number
      bid_size: number
    }[]
  }[]
  const remainingInMinute = getRemainingInMinute(response.headers.get('Remaining-Req'))

  return {
    status,
    body,
    remainingInMinute
  }
}
