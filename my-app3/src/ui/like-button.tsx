'use client'

import { useState } from 'react'
export default function LikeButton({ likes }: { likes: number }) {
  // Optimistic Update (낙관적 업데이트)
  // 클라이언트 전용 컴포넌트 - 초기 likes 값을 받아 로컬에서 즉시 반영
  // 서버에 저장하지 않고 단순히 UI 상에서 좋아요 수를 증가시키는 역할
  const [count, setCount] = useState(likes)
  const [isLiking, setIsLiking] = useState(false)

  const handleClick = async () => {
    if (isLiking) return
    // 낙관적 업데이트 
    setIsLiking(true)
    setCount((c) => c + 1)

    // 실제 저장 로직(API 호출 등)이 있다면 이곳에서 호출할 수 있음
    // 예: await fetch('/api/like', { method: 'POST', body: JSON.stringify({ id: 1 }) })

    // 예제에서는 짧은 지연 후 버튼 상태만 해제
    setTimeout(() => setIsLiking(false), 300)
  }

  return (
    <button onClick={handleClick} disabled={isLiking} aria-pressed={false}>
      👍 {count}
    </button>
  )
}
