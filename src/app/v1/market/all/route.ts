import { NextResponse } from 'next/server'

export async function GET () {
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Connection', 'keep-alive')

  const response = await fetch('https://api.upbit.com/v1/market/all', { headers })
  const body = await response.text()

  const responseHeaders = new Headers(response.headers)
  responseHeaders.delete('Content-Encoding')

  return new NextResponse(body, {
    headers: responseHeaders
  })
}
