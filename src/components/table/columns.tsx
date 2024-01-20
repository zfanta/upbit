'use client'

import { ColumnDef } from '@tanstack/react-table'

export type Data = {
  id: string
  name: string
  orderbook0: string
  orderbook1: string
  orderbook2: string
  orderbook3: string
  orderbook4: string
}

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'orderbook0',
    header: 'Orderbook',
  },
  {
    accessorKey: 'orderbook1',
    header: 'Orderbook',
  },
  {
    accessorKey: 'orderbook2',
    header: 'Orderbook',
  },
  {
    accessorKey: 'orderbook3',
    header: 'Orderbook',
  },
  {
    accessorKey: 'orderbook4',
    header: 'Orderbook',
  },
]
