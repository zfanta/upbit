import usePolling from '@/hooks/usePolling'
import orderbook from '@/libs/v1/orderbook'
import { useCallback } from 'react'

export default function useOrderbook (markets: string[]) {
  const fn = useCallback(() => orderbook(markets), [markets])
  const { body, status } = usePolling(fn)

  return body
}
