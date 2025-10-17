'use client'

import { useState } from 'react'
export default function LikeButton({ likes }: { likes: number }) {
  // Optimistic Update(낙관적 업데이트)
  // 서버의 응답을 기다리지 않고, UI를 즉시 변경하여 즉각적인 사용자 경험을 제공합니다.
  const [count, setCount] = useState(likes)
  const [isLiking, setIsLiking] = useState(false)

  const handleClick = async () => {
    if (isLiking) return
    setIsLiking(true)
    setCount((c) => c + 1)

    // 여기서는 짧은 지연 후 like 상태를 해제합니다.
    setTimeout(() => setIsLiking(false), 300)
  }

  return (
    <button onClick={handleClick} disabled={isLiking} aria-pressed={false}>
      👍 {count}
    </button>
  )
}
