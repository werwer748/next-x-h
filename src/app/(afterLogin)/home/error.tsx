//* 공식문서에서 가져온 에러 컴포넌트
'use client' // Error components must be Client Components

import {useEffect} from 'react'

/**
 * 서버컴포넌트의 에러에 사용된다.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}