// app/blog/[slug]/page.tsx
import { posts } from "../posts";  // posts 배열이 정의된 파일에서 불러오기

// Post 타입 정의 (posts 배열 안의 객체 구조에 맞게 수정하세요)
type Post = {
  slug: string;
  title: string;
  content: string;
};

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;

  // slug에 맞는 포스트 찾기
  const post: Post | undefined = posts.find((p) => p.slug === slug);

  if (!post) {
    return <h1>포스트를 찾을 수 없습니다.</h1>;
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}

