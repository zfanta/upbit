export async function queryHash (query: URLSearchParams) {
  const buffer = new TextEncoder().encode(query.toString())
  const hashBuffer = await crypto.subtle.digest('SHA-512', buffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')
}
