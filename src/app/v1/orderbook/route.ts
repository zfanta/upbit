import { NextRequest, NextResponse } from 'next/server'
import { queryHash } from '@/libs/crypto'
import { v4 as uuidv4 } from 'uuid'
import * as jose from 'jose'

export async function GET (request: NextRequest) {
  const query = request.nextUrl.searchParams

  const query_hash = await queryHash(query)

  const payload = {
    access_key: process.env.ACCESS_KEY,
    nonce: uuidv4(),
    query_hash,
    query_hash_alg: 'SHA512'
  }

  const jws = await new jose.CompactSign(new TextEncoder().encode(JSON.stringify(payload)))
    .setProtectedHeader({ alg: 'HS256' })
    .sign(new TextEncoder().encode(process.env.SECRET_KEY))

  const headers = new Headers()
  headers.append('Authorization', `Bearer ${jws}`)
  headers.append('Accept', 'application/json')
  headers.append('Connection', 'keep-alive')

  const response = await fetch(`https://api.upbit.com/v1/orderbook?${query.toString()}`, {
    headers
  })

  const body = await response.text()

  const responseHeaders = new Headers(response.headers)
  responseHeaders.delete('Content-Encoding')

  return new NextResponse(body, {
    headers: responseHeaders
  })
}
