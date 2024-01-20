import all from '@/libs/v1/market/all'
import usePolling from '@/hooks/usePolling'
import { useMetric } from '@/components/metricProvider'
import { useCallback } from 'react'

export default function useMarkets () {
  const { increaseMarketAll, decreaseMarketAll } = useMetric()
  const callback = useCallback(() => {
    increaseMarketAll()
    setTimeout(() => {
      decreaseMarketAll()
    }, 1000)
  }, [decreaseMarketAll, increaseMarketAll])

  const { body, status } = usePolling(all, callback)

  return body
}
