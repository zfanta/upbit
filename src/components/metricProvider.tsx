'use client'

import { createContext, useContext, ReactNode, useState, useMemo } from 'react'

interface MetricContext {
  'marketAll': number
  increaseMarketAll: () => void
  decreaseMarketAll: () => void
  orderbook: number
  increaseOrderbook: () => void
  decreaseOrderbook: () => void
}

const metricContext = createContext<MetricContext | undefined>(undefined)

export function useMetric () {
  return useContext(metricContext) ?? {
    'marketAll': 0,
    increaseMarketAll: () => {},
    decreaseMarketAll: () => {},
    orderbook: 0,
    increaseOrderbook: () => {},
    decreaseOrderbook: () => {},
  }
}

export default function MetricProvider (props: { children: ReactNode }) {
  const [marketAll, setMarketAll] = useState(0)
  const [orderbook, setOrderbook] = useState(0)

  const providerValue = useMemo(() => ({
    marketAll,
    increaseMarketAll: () => {
      setMarketAll(prev => prev + 1)
    },
    decreaseMarketAll: () => {
      setMarketAll(prev => prev - 1)
    },
    orderbook,
    increaseOrderbook: () => {
      setOrderbook(prev => prev + 1)
    },
    decreaseOrderbook: () => {
      setOrderbook(prev => prev - 1)
    },
  }), [marketAll, orderbook])

  return <metricContext.Provider value={providerValue}>{props.children}</metricContext.Provider>
}
