export function getRemainingInMinute (remaining: string | null) {
  if (remaining === null) {
    return 1
  }

  const min = parseInt(remaining.match(/min=(\d*)/)?.[1] ?? '600')
  const sec = parseInt(remaining.match(/sec=(\d*)/)?.[1] ?? '9')

  return Math.min(min, sec * 60)
}
