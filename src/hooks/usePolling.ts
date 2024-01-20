import { useCallback, useEffect, useState } from 'react'
import { useMount, useUnmount, useInterval } from 'react-use'

export default function usePolling<T> (fn: () => Promise<{
  body: T,
  status: number,
  remainingInMinute: number
}>, callback: () => void) {
  const [remainingInMinute, setRemainingInMinute] = useState(1)
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | undefined>(undefined)
  const [body, setBody] = useState<T>()
  const [status, setStatus] = useState<number>(200)

  const request = useCallback(async () => {
    const { remainingInMinute, status, body } = await fn()
    callback()

    setRemainingInMinute(remainingInMinute)

    if (status === 200) {
      setBody(body)
    }

    setStatus(status)
  }, [callback, fn])

  useMount(request)

  useUnmount(() => {
    if (intervalId !== undefined) {
      clearInterval(intervalId)
    }
  })

  useInterval(request, 60000 / remainingInMinute)

  return { body, status }
}
