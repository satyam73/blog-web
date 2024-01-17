import { useEffect } from 'react'

export function useDebounceEffect(
  callback,
  waitTime = 800,
  deps,
) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      callback.apply(undefined, deps)
    }, waitTime)

    return () => {
      clearTimeout(timeout)
    }
  }, deps)
}
