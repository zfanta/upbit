'use client'

import useMarkets from '@/hooks/useMarkets'
import useOrderbook from '@/hooks/useOrderbook'

export default function Home () {
  const markets = useMarkets()
  const orderbook = useOrderbook(markets?.map(market => market.market) ?? ['KRW-BTC'])

  return (
    <main>
      <pre>
        {JSON.stringify(markets, null, 2)}
      </pre>
      <pre>
        {JSON.stringify(orderbook, null, 2)}
      </pre>
    </main>
  )
}
