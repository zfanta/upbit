'use client'

import useMarkets from '@/hooks/useMarkets'
import useOrderbook from '@/hooks/useOrderbook'
import { DataTable } from '@/components/table/data-table'
import { useMemo } from 'react'
import { columns } from '@/components/table/columns'

export default function Home () {
  const markets = useMarkets()
  const orderbook = useOrderbook(markets?.map(market => market.market) ?? ['KRW-BTC'])
  const data = useMemo(() => {
    if (markets === undefined || orderbook === undefined) return []

    const marketMap = new Map<string, typeof markets[number]>()
    markets.forEach(market => marketMap.set(market.market, market))

    const oderbookMap = new Map<string, typeof orderbook[number]>()
    orderbook.forEach(orderbook => oderbookMap.set(orderbook.market, orderbook))

    return markets.map((market) => ({
      id: market.market,
      name: `${market.korean_name}(${market.english_name})`,
      orderbook0: `${oderbookMap.get(market.market)?.orderbook_units[0].ask_price}/${oderbookMap.get(market.market)?.orderbook_units[0].bid_price}`,
      orderbook1: `${oderbookMap.get(market.market)?.orderbook_units[1].ask_price}/${oderbookMap.get(market.market)?.orderbook_units[1].bid_price}`,
      orderbook2: `${oderbookMap.get(market.market)?.orderbook_units[2].ask_price}/${oderbookMap.get(market.market)?.orderbook_units[2].bid_price}`,
      orderbook3: `${oderbookMap.get(market.market)?.orderbook_units[3].ask_price}/${oderbookMap.get(market.market)?.orderbook_units[3].bid_price}`,
      orderbook4: `${oderbookMap.get(market.market)?.orderbook_units[4].ask_price}/${oderbookMap.get(market.market)?.orderbook_units[4].bid_price}`,
    }))
  }, [markets, orderbook])

  return (
    <main>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  )
}
