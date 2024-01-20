import usePolling from '@/hooks/usePolling'
import orderbook from '@/libs/v1/orderbook'
import { useCallback } from 'react'
import { useMetric } from '@/components/metricProvider'

export default function useOrderbook (markets: string[]) {
  const fn = useCallback(() => orderbook(markets), [markets])
  const { increaseOrderbook, decreaseOrderbook } = useMetric()
  const callback = useCallback(() => {
    increaseOrderbook()
    setTimeout(() => {
      decreaseOrderbook()
    }, 1000)
  }, [decreaseOrderbook, increaseOrderbook])

  const { body, status } = usePolling(fn, callback)

  return body
}
