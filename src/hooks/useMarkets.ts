import all from '@/libs/v1/market/all'
import usePolling from '@/hooks/usePolling'

export default function useMarkets () {
  const { body, status } = usePolling(all)

  return body
}
