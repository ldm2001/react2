import LikeButton from '@/ui/like-button'
// import { getPost } from '@/lib/data' 대신 데이터를 직접 가져옴
import { posts } from '@/lib/data'
import { notFound } from 'next/navigation'

// 포스트에서는 다음 코드를 본문에서 작성했지만 한 줄로 하는 것이 더 명확
// export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // posts에서 slug에 해당하는 포스트를 찾음
  // getPost 대신 all posts 배열에서 찾음
  const post = posts.find((p) => p.id == id)

  if (!post) {
    notFound()
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <main>
        {/* ... */}
        <LikeButton likes={post.likes} />
      </main>
    </div>
  )
}
