import * as jose from 'jose'
import { v4 as uuidv4 } from 'uuid'

const access_key = process.env.NEXT_PUBLIC_ACCESS_KEY;
const secret_key = process.env.NEXT_PUBLIC_SECRET_KEY;

async function generateHash(data: string) {
  const encoder = new TextEncoder();
  const buffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-512', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

export default async function Home() {
  const qs = new URLSearchParams();
  qs.append('markets', 'KRW-BTC,BTC-ETH');

  const query_hash = await generateHash(qs.toString());

  const payload = {
    access_key,
    nonce: uuidv4(),
    query_hash,
    query_hash_alg: 'SHA512'
  };

  const jws = await new jose.CompactSign(
    new TextEncoder().encode(JSON.stringify(payload)),
  )
    .setProtectedHeader({ alg: 'HS256' })
    .sign(new TextEncoder().encode(secret_key as string))

  const headers = new Headers()
  headers.append('Authorization', `Bearer ${jws}`)
  headers.append('Accept', 'application/json')

  const start = Date.now();
  const response = await fetch(`https://api.upbit.com/v1/orderbook?${qs.toString()}`, {
    headers
  })
  const end = Date.now();

  const data = await response.json();

  return (
    <main>
      <pre>
        {end - start}ms
      </pre>
      <pre>
        {response.headers.get('Remaining-Req')}
      </pre>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
