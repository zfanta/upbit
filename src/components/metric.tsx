import { useMetric } from '@/components/metricProvider'

export default function Metric () {
  const { marketAll, orderbook } = useMetric()

  return (
    <div>
      <div>/market/all: {marketAll} requests/s</div>
      <div>/orderbook: {orderbook} requests/s</div>
    </div>
  )
}
