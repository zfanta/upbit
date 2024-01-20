'use client'

import useMarkets from '@/hooks/useMarkets'
import useOrderbook from '@/hooks/useOrderbook'
import { DataTable } from '@/components/table/data-table'
import { useMemo } from 'react'
import { columns, Data } from '@/components/table/columns'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MetricProvider from '@/components/metricProvider'
import Metric from '@/components/metric'

export default function Home () {
  const markets = useMarkets()
  const orderbook = useOrderbook(markets?.map(market => market.market) ?? ['KRW-BTC'])
  const data = useMemo(() => {
    const currencyMap = new Map<string, Data[]>()

    if (markets === undefined || orderbook === undefined) {
      return currencyMap
    }

    const marketMap = new Map<string, typeof markets[number]>()
    markets.forEach(market => marketMap.set(market.market, market))

    const oderbookMap = new Map<string, typeof orderbook[number]>()
    orderbook.forEach(orderbook => oderbookMap.set(orderbook.market, orderbook))

    markets.forEach(market => {
      const currency = market.market.split('-')[0]
      if (!currencyMap.has(currency)) {
        currencyMap.set(currency, [])
      }

      currencyMap.get(currency)?.push({
        id: market.market,
        name: `${market.korean_name}(${market.english_name})`,
        orderbook0: `${oderbookMap.get(market.market)?.orderbook_units[0].ask_price}/${oderbookMap.get(market.market)?.orderbook_units[0].bid_price}`,
        orderbook1: `${oderbookMap.get(market.market)?.orderbook_units[1].ask_price}/${oderbookMap.get(market.market)?.orderbook_units[1].bid_price}`,
        orderbook2: `${oderbookMap.get(market.market)?.orderbook_units[2].ask_price}/${oderbookMap.get(market.market)?.orderbook_units[2].bid_price}`,
        orderbook3: `${oderbookMap.get(market.market)?.orderbook_units[3].ask_price}/${oderbookMap.get(market.market)?.orderbook_units[3].bid_price}`,
        orderbook4: `${oderbookMap.get(market.market)?.orderbook_units[4].ask_price}/${oderbookMap.get(market.market)?.orderbook_units[4].bid_price}`,
      })
    })

    return currencyMap
  }, [markets, orderbook])

  return (
    <main className="container mx-auto py-10">
      <Metric />
      <Tabs defaultValue="krw">
        <TabsList>
          <TabsTrigger value="krw">KRW</TabsTrigger>
          <TabsTrigger value="btc">BTC</TabsTrigger>
          <TabsTrigger value="usdt">USDT</TabsTrigger>
        </TabsList>
        <TabsContent value="krw">
          <DataTable columns={columns} data={data.get('KRW') ?? []} />
        </TabsContent>
        <TabsContent value="btc">
          <DataTable columns={columns} data={data.get('BTC') ?? []} />
        </TabsContent>
        <TabsContent value="usdt">
          <DataTable columns={columns} data={data.get('USDT') ?? []} />
        </TabsContent>
      </Tabs>
    </main>
  )
}
