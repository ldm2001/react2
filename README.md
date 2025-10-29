# 202030225 이동민 

## 2025-10-29

### TypeScript의 유니온 타입(Union Type)이란

* '|'(파이프)로 여러 타입을 연결해서 "이 값은 각각의 타입 중 하나가 될 수 있다"는 것을 지정
* 코드에서 문자열 리터럴 유니온 타입의 경우 state 값으로 'Light' 또는 'dark'만 설정할 수 있어 코드 자동완성과 타입 안정성이 향상

###  외부(서드 파티) 컴포넌트

* 클라이언트 전용 기능에 의존하는 외부 컴포넌트를 사용하는 경우 해당 컴포넌트를 클라리언트 컴포넌트에 래핑하면 예상대로 작동하는지 확인할 수 있음
* 예를 들어 `<Carousel />` 은 `acme-carousel` 패키지에서 불러올 수 있음
* 이 컴포넌트는 `useState`를 사용하지만 `"use client"` 지시문은 없음
* 클라이언트에서 `<Carousel />`을 사용하면 예상대로 작동
* 그러나 서버 컴포넌트 내에서 직접 사용하려고 하면 오류가 발생
*  Next.js가 `<Carousel />`이 클라이언트 전용 기능을 사용하고 있다는 것을 알지 못하기 때문
* 이 문제를 해결하려면 클라이언트 전용 기능에 의존하는 외부 컴포넌트를 자체 클라이언트 컴포넌트로 래핑할 수 있음
```TypeScript
// page.tsx (Server Component)
import Carousel from './CarouselWrapper'

export default function Page() {
  return (
    <div>
      {/* Works, since Carousel is a Client Component */}
      <Carousel />
    </div>
  )
}
```

### 환경 변수 노출 예방

* 자바스크립트 모듈은 서버 및 클라이언트 컴포넌트 모듈 간에 공유될 수 있음
- 이는 실수로 서버 전용 코드를 클라이언트로 가져올 수도 있다는 뜻

```TypeScript
// lib/data.ts
export async function getData() {
  const res = await fetch('https://external-service.com/data', {
    headers: {
      authorization: process.env.API_KEY,
    },
  });

  return res.json();
}
```
### Fetching Data (데이터 가져오기)

* 서버 컴포넌트에서 데이터를 가져올 수 있는 방법
  * 1. fetch API
  * 2. ORM 또는 데이터베이스

* 데이터를 가져오려면 fetch API를 사용하여 컴포넌트를 비동기식 함수로 변환하고 다음 fetch 호출을 기다림

```ts
// app/blog/page.tsx
export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

### 클라이언트 컴포넌트

* 클라이언트 컴포넌트에서 데이터를 가져오는 방법에는 두 가지가 있음
  * React의 **`use` Hook**
  * **SWR** 또는 **React Query**와 같은 통신 라이브러리

* React의 **`use` Hook**을 사용해서 서버에서 클라이언트로 데이터를 스트리밍함
* 서버 컴포넌트에서 데이터를 먼저 `fetch()`하고, 그 결과(`promise`)를 클라이언트 컴포넌트에 `prop`으로 전달
* 서버 컴포넌트는 `async`가 가능하기 때문에 `await fetch()`도 사용할 수 있음
* 하지만 클라이언트 컴포넌트에서는 `async`가 불가능하기 때문에 직접 `fetch`가 불가능
* 이런 이유로 서버에서 `fetch`한 결과를 `prop`으로 넘기고 클라이언트에서는 **`use(promise)`를 써서 데이터를 가져옴

## 2025-10-22

### 서버 및 클라이언트 컴포넌트 인터리빙

* 인터리빙(Interleaving)은 일반적으로 여러 데이터 블록이나 비트를 섞어서 전송하거나 처리하여 오류 발생 시 성능을 최적화하는 기술
* 특히 데이터 통신이나 버스트 오류(연속적인 오류)를 줄이고 오류 정정 코드를 효과적으로 사용하기 위해 버스트 오류를 분산시키기 위해 사용
* 프론트엔드나 문서에서는 서버 컴포넌트와 클라이언트 컴포넌트가 섞여서(interleaved) 존재하는 것을 의미
    * server_component를 client_component의 prop로 통해 전달할 수 있음
    * 이를 통해 client_component 내에서 server에서 렌더링된 Ui를 시각적으로 중첩할 수 있음
    * <ClientComponent>의 공간(slot)을 만드로 children을 개념으로 패턴이 일반적임

```typescript
import ClientComponent from './ClientComponent'

export default function Page() {
  return (
    <ClientComponent>
      <ServerComponent />
    </ClientComponent>
  )
}
```

### Context란 무엇인가?

* Next.js에서 Context는 React의 Context API를 사용하여 컴포넌트 사이에 데이터를 공유하는 메커니즘을 의미
* 부모 컴포넌트에서 자식 컴포넌트로 직접 props를 전달하지 않고도 특정 데이터를 필요한 컴포넌트에서 쉽게 접근하고 사용할 수 있도록 도와줌

### [ Context의 주요 특징 ]

* 전역 상태 관리
  * Context를 사용하면 애플리케이션 전체에서 공유해야 하는 데이터를 중앙 집중적으로 관리할 수 있음 (예: 사용자 정보, 테마 설정 등)
* props drilling 문제 해결
  * 컴포넌트 계층이 깊을 때, 각 컴포넌트를 props를 계속 전달받아 하는 번거로움을 줄여줌
  * Context를 사용하면 필요한 컴포넌트에서 바로 데이터를 가져올 수 있으므로 코드의 가독성을 높이고 유지 보수 용이
* 리액트 컴포넌트에서 사용
  * Context는 리액트에서 제공하는 기능이기 때문에 Next.js에서도 리액트 컴포넌트를 사용하여 구현

### Context provider (컨텍스트 제공자)

* 리액트 Context는 일반적으로 아래 테마처럼 전역 상태를 공유하는데 사용
* 그러나 서버 컴포넌트에서는 리액트 Context가 지원되지 않음
* Context를 사용하려면 children을 허용하는 클라이언트 컴포넌트로 만들어야 함

```typescript
'use client'

import { createContext } from 'react'

export const ThemeContext = createContext({})

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
}
```



## 2025-10-17

### 서버와 클라이언트 소개

* 기본으로 레이아웃과 페이지는 서버 컴포넌트
* 서버에서 데이터를 가져와 UI의 일부를 렌더링할 수 있고, 선택적으로 결과를 캐시한 후 클라이언트로 스트리밍할 수 있음
* 상호작용이나 브라우저 API가 필요한 경우 클라이언트 컴포넌트를 사용하여 기능을 계층화 할 수 있음

### 서버와 클라이언트 사용

* 서버 및 클라이언트 컴포넌트를 사용하면 사용하는 사례에 따라 각각의 환경에서 필요한 로직을 실행할 수 있음

* 다음과 같은 항목이 필요할 경우에는 클라이언트 컴포넌트를 사용
    * `state`및 `event handler` 예: `onClick`, `onChange`
    * `Lifecycle logic` 예: `useEffect`
    * 브라우저 사용 API 예: `localStorage`, `window` 등
    * 사용자 정의 Hook

* 다음과 같은 항목이 필요할 경우에는 서버 컴포넌트를 사용
    * 서버의 DB 혹은 API에서 데이터를 가져오는 경우 사용
    * API 키, 토큰 및 기타 보안 데이터를 클라이언트에 노출하지 않고 사용
    * 브라우저로 전송되는 자바스크립트의 양을 줄이고 싶을 때 사용
    * 컨텐츠가 포함된 첫번쨰 페인트(First Contentful Paint_FCP)를 개선하고 컨텐츠를 클라이언트에 점진적으로 스트링밍 함

```TypeScript
// app/posts/[id]/page.tsx
import LikeButton from '@/ui/like-button'
import { getPost } from '@/lib/posts'

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <LikeButton likes={post.likes} />
    </div>
  )
}
```
* 예를 들어 <Page> 컴포넌트는 게시물에 대한 데이터를 가져와서 클라이언트 측 상호 작용을 처리하는 <LikeButton>에 props로 전달하는 서버 컴포넌트

```TypeScript
// ui/like-button.tsx
'use client'

import { useState } from 'react'

export default function LikeButton({ likes }: { likes: number }) {
  const [count, setCount] = useState(likes)
}
```
* ui/like-button은 클라이언트 컴포넌이기 때문에 use client를 사용

### Optimistic Update (낙관적 업데이트)

* 사용자의 이벤트(예: 좋아요 버튼 클릭)가 발생하면 서버 응답을 기다리지 않고 클라이언트(브라우저)를 즉시 변경(업데이트)함
* 서버에 보낸 요청의 성공을 낙관(optimistic)한다고 가정해서, 먼저 화면에 변화를 보여줌
* 서버에서 응답이 없으면 UI를 원래 상태로 되돌림(rollback)
* 네트워크 지연 등 상황에서도 앱이 빠르게 반응하도록 느끼게 하는 것이 목적

* 장점 
    * 서버 응답 속도와 관계없이 즉각적인 피드백을 제공하여 사용자 경험을 향상시킴
    * 네트워크 상태가 나쁘거나 응답 시간이 길어도 사용자가 체감하는 속도가 빠름

* 단점
    * 서버에서 오류가 발생하면 사용자에게는 잠시 동안 잘못된 정보가 표시될 수 있음
    * 오류 발생시 복구(rollback) 로직이 필요

### Pessimistic Update (비관적 업데이트)

* 이벤트가 발생하면 먼저 서버에 요청을 보내고 서버에서 성공 응답을 받은 후에 클라이언트의 UI를 업데이트 함

* 장점
    * 서버의 응답을 기반으로 하기 때문에 데이터의 일관성이 보장
    * 오류가 발생할 가능성이 낮고 잘못된 정보가 표시될 염려가 없음

* 단점
    * 사용자는 서버의 응답을 기다려야 하므로 응답이 늦어지면 사용자 경험이 저하될 수 있음
    * 특히 네트워크 지연이 발생할 경우 체감 속도가 느려짐

### Null 병합 연산자 (Nullish Coalescing Operator)

* 왼쪽 피연산자가 null 또는 undefined이면 오른쪽 값을 반환하고 그렇지 않으면 왼쪽 값을 그대로 반환

### or 연산자(`||`)와는 어떤 차이가 있을까?

* or 연산자는 falsy 값(`false`, `0`, `""`, `null`, `undefined` 등)을 모두 오른쪽 값으로 대체

### Next.js에서 서버와 클라이언트 컴포넌트는 어떻게 작동할까?

### 서버 컴포넌트의 작동

* 서버에서 Next.js는 React의 API 사용하여 렌더링 조정
* 렌더링 작업은 개별 콘텐츠 세그먼트 별 묶음(Chunk)으로 나뉨 (layout 및 page)
* 서버 컴포넌트는 RSC Payload(React Server Component Payload)라는 특수한 데이터 형식으로 전송
- 클라이언트 컴포넌트 와 RSC Payload는 HTML을 미리 렌더링(prerender)하는 사용

### React Server Component Payload (RSC) 
* RSC 페이로드는 렌더링된 React server component 트리의 암축된 바이너리 표현
* 클라이언트에서 리액트가 브라우저의 DOM에 업데이트 하는데 사용

### RSC(RSC Payload)는 Json인가? 바이너리인가?

* 과거: Json 기반 
    * RSC 초기에는 JSON 형식의 문자열로 데이터를 전달
    * 예 : `{ type: "component", props: { title: "Hello" } }`

* 현재: 바이너리 형식으로 최적화
    * 최신 리액트, 특히 Next.js App Router는 RSC payload를 compact binary format으로 전송
    * JSON이 아니며 리액트 전용 이진 포맷으로 스트림(stream)을 통해 전달
    * 이 방식은 Json보다 용량이 작고 빠르게 전송할 수 있음

### 클라이언트 컴포넌트의 작동(첫 번째 load)

* HTML은 사용자에게 경로(라우팅 페이지)의 비대화형 미리보기를 즉시 보여주는데 사용
* RSC 페이로드는 클라이언트와 서버 컴포넌트 트리를 조정하는데 사용
* 자바스크립트는 클라이언트 컴포넌트를 hydration하고 애플리케이션을 대화형으로 만드는데 사용
  > Hydration: 이벤트 핸들러를 DOM에 연결하여 정적 HTML을 인터랙티브하게 만드는 React의 프로세스

### 후속 네비게이션

* 후속 탐색을 할 때 RSC 페이로드는 즉시 탐색할 수 있도록 prefetch 및 cache 됨
* 클라이언트 컴포넌트는 서버에서 렌더링된 HTML 없이 전적으로 클라이언트에서 렌더링 됨

### 클라이언트 컴포넌트 사용

* 파일의 맨 위 즉 import문 위에 `"use client"` 지시문을 추가하여 클라이언트 컴포넌트를 생성할 수 있음
* `"use client"`는 서버와 클라이언트 모듈 트리 사이의 경계를 선언하는 데 사용
* 파일에 `"use client"`로 표시된 해당 파일의 모든 import와 자식 컴포넌트는 클라이언트 번들의 일부로 간주
* 즉 클라이언트 대상으로 하는 모든 컴포넌트에 이 지시문을 추가할 필요가 없음

```TypeScript
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>{count} likes</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

### JS bundle 크기 줄이기

* 클라이언트 자바스크립트 번들의 크기를 줄이면 바의 큰 부분을 클라이언트 컴포넌트로 표시하는 대신 특정 컴포넌트에 `"use client"`를 추가
* 예를 들어 다른 메뉴의 <Layout> component는 로고와 링크와 같은 정적 요소가 대부분이지만 대화형 검색창이 포함
* <Search />는 대화형이기 때문에 클라이언트 컴포넌트가 되어 하지만 나머지 레이아웃은 서버 컴포넌트로 유지할 수 있음

### 서버에서 클라이언트 서버로 데이터 전달

* 다른 방법으로는 use Hook을 사용하여 서버 컴포넌트에서 클라이언트 컴포넌트로 데이터를 스트리밍할 수도 있음
* 알아두면 좋은 정보: 클라이어트 컴포넌트에 전달되는 Props는 리액트로 직렬화가 가능해야 함

### 직렬화(serialization)란 무엇인가?

* 일반적으로는 메모리에 있는 복잡한 데이터를 바이트의 연속 형태로 변환하는 과정
* 즉 자바스크립트의 객체나 배열처럼 구조가 있는 데이터를 파일로 저장하거나 네트워크로 전송하기 쉽게 만드는 과정
* 리액트나 Next.js 같은 프레임워크는 컴포넌트의 상태나 트리 구조를 서버에서 직렬화하여 클라이언트로 전송하고 클라이언트에서 역직렬화 하는 과정을 자주 수행


## 2025-10-01

### Client-side transitions (클라이언트 측 전환)

* 일반적으로 서버 렌더링 페이지로 이동하면 전체 페이지가 로드 됨 
  > 이로 인해 state가 삭제되고 스크롤 위치가 재설정되며 상호작용 차단 

* Next.js는 <Link> 컴포넌트를 사용하는 클라이언트 측 전환을 통해 이를 방지 
* 공유 레이아웃과 UI를 유지
* 현재 페이지를 미리 가져온 로딩 상태 또는 사용 가능한 경우 새 페이지로 바꿈
* 클라이언트 측 전환은 서버에서 렌더링된 앱을 클라이언트에서 렌더링된 앱처럼 느껴지게 하는 요소

### 전환을 느리게 만드는 요인은 무엇일까요?

* Next.js는 최적화를 통해 네비게이션 속도가 빠르고 반응성이 뛰어남

### generateStaticParams가 없는 경우와 있는 경우 비교

### generateStaticParams가 없는 경우

* Next.js는 slug 값을 빌드 타임에는 모르는 상태
> 따라서 slug 페이지에 접속하면 Next.js가 서버에서 요청 할 때마다 해당 페이지를 동적으로 렌더링하며 빌드의 결과물로 HTML 파일은 생성되지 않음

### generateStaticParams가 있는 경우

* Next.js에 빌드 타임에 생성할 slug 목록을 알려줄 수 있음
> 이 경우에는 지정한 slug에 대해서는 정적 HTML + JSON이 빌드 타임에 생성되어 최초 접근 시 SSR이 필요 없이 미리 만들어진 페이지 제공

### 느린 네트워크

* 네트워크가 느리거나 불안한 경우 사용자가 링크를 클릭하기 전에 프리페칭이 완료되지 않을 수 있음

### 프리페칭 비활성화

* <Link> 컴포넌트에서 prefetch prop을 false로 설정하여 프레페치를 사용하지 않도록 선택할 수 있음
> 이는 대량의 링크 목록을 렌더링할 때 불필요한 리소스 사용을 방지하는데 유용

### Hydration이 완료되지 않음

* <Link>는 클라이언트 컴포넌트이기 때문에 라우팅 페이지를 프리페치하기 전엔 하이드레이션 해야 함
* 초기 방문 시 대용량 자바스크립트  번들로 인해 하이드레이션이 지연되어 프레페칭이 바로 시작되지 않을 수 있음

### Examples - 네이티브 히스토리 API

* Next.js를 사용하면 기본 `window.history.pushState` 및 `window.history.replaceState` 메서드를 사용하여 페이지를 다시 로드하지 않고도 브라우저의 기록 스택을 업데이트할 수 있음

* `pushState` 및 `replaceState` 호출은 Next.js 라우터에 통합되어 `usePathname` 및 `useSearchParams`와 동기화할 수 있음

* `window.history.pushState`
    - 이 것을 사용하여 브라우저의 기록 스택에 새 항목을 추가할 수 있음
    - 사용자는 이전 상태로 돌아갈 수 있음
    - 예를 들어 제품 목록을 정렬할 수 있음

* `window.history.replaceState`
    - 브라우저의 기록 스택에서 현재 항목을 바꾸려면 이 기능을 사용
    - 사용자는 이전 상태로 돌아갈 수 없음
    - 예를 들어 애플리케이션의 로케일을 전환하는 경우

## 2025-09-24

### searchParams란?

* URL의 쿼리 문자열을 읽는 방법
* 예시: `/products?category=shoes&page=2`
* 여기서 `category=shoes`, `page=2`가 search parameters
* App Router에서 searchParams은 다음과 같이 사용 가능

```javascript
export default function ProductsPage({ searchParams }) {
return <p>카테고리: {searchParams.category}</p>;
}
```
* searchParams은 컴포넌트의 props로 전달되며 내부적으로는 URLSearchParams처럼 작동

### 왜 "동적 렌더링"이 되는가?

* Next.js에서 페이지는 크게 정적 또는 동적으로 렌더링될 수 있음
* `searchParams`는 요청이 들어와야만 값을 알 수 있기 때문에 Next.js는 이 페이지를 정적으로 미리 생성할 수 없고 요청이 올 때마다 새로 렌더링해야 함
*  해당 페이지는 자동으로 동적 렌더링으로 처리

### Linking between pages (페이지 간 연결)

* <Link> 컴포넌트를 사용하여 경로 사이를 탐색  
* <Link>는 HTML `<a>` 태그를 확장하여 prefetching 및 client-side navigation 기능을 제공하는 Next.js의 기본제공 컴포넌트 
> Prefetching은 사용자가 해당 경로로 이동되기 전에 백그라운드에서 선택 경로를 미리 로딩하는 프로세스  

### Server Rendering
 
* Next.js에서 레이아웃과 페이지는 기본적으로 리액트 서버 컴포넌트
* 초기 네비게이션 및 후속 네비게이션 할 떄 서버 컴포넌트 페이로드는 클라이언트로 전송되기 전에 서버에서 생성

### 정적 렌더링

* 빌드 시점이나 재검증 중에 발생하며 결과는 캐시 됨

### 동적 렌더링

* 클라이언트 요청에 대한 응답으로 요청 시점에 발생

### Prefetching

* 프리페칭은 사용자가 해당 경로로 이동하기 전에 백그라운드에서 해당 경로를 로드하는 프로세스

### Streaming

* 스트리밍을 사용하면 서버가 전체 경로가 렌더링 될 떄까지 기다리지 않고 동적 경로의 일부가 준비되는 즉시 클라이언트에 전송할 수 있음
* 즉 페이지의 일부가 아직 로드 중이더라도 사용자는 더 빨리 콘텐츠를 볼 수 있음

## 2025-09-17

### git checkout vs git switch 차이

* `checkout`은 브랜치를 이동하고 파일도 바꿀 수 있음 이 때문에 실수할 위험성이 있음

* `switch`는 브랜치만 이동할 수 있기 때문에 안전하게 사용할 수 있음

### 새 branch를 만드는 3가지 방법

```bash
# 1. 브랜치를 만들고 바로 해당 브랜치로 이동 (권장)
$ git switch -c <branch-name>

# 2. 브랜치를 만들고 바로 해당 브랜치로 이동
$ git checkout -b <branch-name>

# 3. 브랜치를 만들기만 하고, 현재 브랜치에 머무름
$ git branch <branch-name>
```

### 1. Next.js 페이지 만들기

* Next.js는 파일 시스템 기반 라우팅을 사용 

* 이는 폴더 구조를 통해 웹사이트의 경로가 자동으로 생성된다는 의미

* *페이지(Page): 특정 경로에 해당하는 고유한 UI

### 기본 페이지 생성 방법

페이지를 만들려면, `app` 디렉터리 안에 `page.js` 또는 `page.tsx` 파일을 생성하고 그 안에 React 컴포넌트를 작성한 후 `default export` 해야 함

```tsx
// app/page.tsx
export default function Page() {
  return <h1>Hello, Next.js!</h1>;
}
```
### 레이아웃(Layout) 만들기

* 레이아웃은 여러 페이지에서 공유되는 공통 UI

* 레이아웃은 페이지 이동 시에도 상태와 상호작용을 그대로 유지하며 다시 렌더링되지 않아 사용자 경험을 향상시킴

### 기본 레이아웃 생성 방법

1.  `layout.js` 또는 `layout.tsx` 파일 생성
    레이아웃을 적용하고 싶은 경로의 폴더에 `layout.tsx` 파일을 생성 
2.  React 컴포넌트 `default export`
    파일 안에서 React 컴포넌트를 만들고 `default export` 함

3.  `children` prop 받기
    레이아웃 컴포넌트는 반드시 **`children` prop**을 인자로 받아야 함 이 `children` prop에는 페이지나 다른 레이아웃 컴포넌트가 들어오게 됨

### URL 세그먼트의 이해

* 중첩 라우트는 다중 URL 세그먼트로 구성된 라우트

### [slug]의 이해 

* slug는 사이트의 특정 페이지를 쉽게 읽을 수 있는 형태로 식별하는 url의 일부
* 데이터 소스가 크다면 .find는 0(n)이므로 DB 쿼리로 바꿔야함

### 동적 세그먼트 만들기

* 동적 세그먼트를 사용하면 데이터에서 생성된 경로를 만들 수 있음

###  검색 매개변수를 사용한 렌더링

* 서버 컴포넌트 `page`에서는 **`searchParams`** prop을 사용하여 URL의 검색 매개변수에 접근할 수 있음
* `searchParams` prop을 사용하면 해당 페이지는 요청 시점에 렌더링되는 동적 렌더링으로 처리
* 클라이언트 컴포넌트에서는 `useSearchParams` Hook을 사용하여 검색 매개변수를 읽을 수 있음




## 2025-09-10

### Folder and file conventions (폴더 및 파일 규칙)

### 최상위 폴더 (Top-level folders)

* 최상위 폴더는 애플리케이션의 코드와 정적 자산을 구성하는 데 사용

### Folder and file conventions (폴더 및 파일 규칙)

### 최상위 파일 (Top-level files)

* 최상위 파일은 애플리케이션 구성, 종속성 관리, 미들웨어 실행, 모니터링 도구 통합, 환경 변수 정의에 사용

### 동적 라우팅 (Dynamic routes)

| 문법 | 설명 (한글) | 설명 (영문) |
|------|-------------|-------------|
| `[folder]`     | 동적 라우팅 세그먼트 | Dynamic route segment |
| `[...folder]`  | 포괄 라우팅 세그먼트 | Catch-all route segment |
| `[[...folder]]`| 선택 가능한 포괄 라우팅 세그먼트 | Optional catch-all route segment |

---

### 라우팅 그룹 및 비공개 폴더 (Route Groups and private folders)

| 문법 | 설명 (한글) | 설명 (영문) |
|------|-------------|-------------|
| `(folder)` | 라우팅에 영향을 주지 않고 그룹화 | Group routes without affecting routing |
| `_folder`  | 해당 폴더 및 자식 세그먼트 라우팅에서 제외 | Opt folder and all child segments out of routing |

---

### 병렬 및 차단 라우팅 (Parallel and Intercepted Routes)

| 문법 | 설명 (한글) | 설명 (영문) |
|------|-------------|-------------|
| `@folder`     | 명명된 슬롯 | Named slot |
| `(.)folder`   | 동일 레벨에서 가로채기 | Intercept same level |
| `(..)folder`  | 한 레벨 위에서 가로채기 | Intercept one level above |
| `(..)(..)folder` | 두 레벨 위에서 가로채기 | Intercept two levels above |
| `(...)folder` | 루트에서 가로채기 | Intercept from root |

# Folder and file conventions (폴더 및 파일 규칙)

## 메타데이터 파일 규칙 (Metadata file conventions)

### 앱 아이콘 (App icons)

| 파일명 | 확장자 | 설명 (한글) | 설명 (영문) |
|--------|--------|-------------|-------------|
| `favicon`      | .ico | 파비콘 파일 | Favicon file |
| `icon`         | .ico .jpg .jpeg .png .svg | 앱 아이콘 파일 | App Icon file |
| `icon`         | .js .ts .tsx | 생성된 앱 아이콘 | Generated App Icon |
| `apple-icon`   | .jpg .jpeg .png | Apple 앱 아이콘 파일 | Apple App Icon file |
| `apple-icon`   | .js .ts .tsx | 생성된 Apple 앱 아이콘 | Generated Apple App Icon |

---

### Open Graph 및 Twitter 이미지 (Open Graph and Twitter images)

| 파일명 | 확장자 | 설명 (한글) | 설명 (영문) |
|--------|--------|-------------|-------------|
| `opengraph-image` | .jpg .jpeg .png .gif | Open Graph 이미지 파일 | Open Graph image file |
| `opengraph-image` | .js .ts .tsx | 생성된 Open Graph 이미지 | Generated Open Graph image |
| `twitter-image`   | .jpg .jpeg .png .gif | Twitter 이미지 파일 | Twitter image file |
| `twitter-image`   | .js .ts .tsx | 생성된 Twitter 이미지 | Generated Twitter image |

---

### SEO

| 파일명 | 확장자 | 설명 (한글) | 설명 (영문) |
|--------|--------|-------------|-------------|
| `sitemap` | .xml | 사이트맵 파일 | Sitemap file |
| `sitemap` | .js .ts | 생성된 사이트맵 | Generated Sitemap |
| `robots`  | .txt | Robots 파일 | Robots file |
| `robots`  | .js .ts | 생성된 Robots 파일 | Generated Robots file |

### Open Graph Protocol

* 웹사이트나 페이스북, 인스타그램, X(트위터), 카카오톡 등에 링크를 전달할 때 **미리보기**를 생성하는 프로토콜 

* 페이스북이 주도하는 표준화 규칙으로, 대부분의 SNS 플랫폼에서 활용되고 있음 

* 모든 플랫폼이 동일한 방식으로 오픈 그래프를 처리하는 것은 아님

* 웹페이지의 메타 태그에 선언

[코로케이션] Colocation: 파일 및 폴더를 기능별로 그룹화하여 프로젝트의 구조를 명확하게 정의

### 2.Organizing your project

`app` 디렉토리의 파일은 기본적으로 안전하게 코로케이션(co-location) 될 수 있으므로, 비공개 폴더는 불필요. 하지만 다음과 같은 경우에는 유용하게 사용할 수 있음

* UI 로직과 라우팅 로직을 분리

* 프로젝트와 Next.js 생태계 전반에서 내부 파일을 일관되게 구성

* 코드 편집기에서 파일을 정렬하고 그룹화합

* 향후 Next.js 파일 규칙과 관련된 잠재적인 이름 충돌을 방지

### 알아두면 좋은 정보

* 프레임워크 규칙은 아니지만 동일한 밑줄(`_`) 패턴을 사용하여 비공개 폴더 외부의 파일을 "비공개"로 표시하는 것도 고려할 수 있음

* 폴더 이름 앞에 `%5F`(밑줄의 URL 인코딩 형태)를 접두사로 붙여 밑줄로 시작하는 URL 세그먼트를 만들 수 있음

* 비공개 폴더를 사용하지 않는 경우, 예상치 못한 이름 충돌을 방지하기 위해 Next.js의 **특수 파일 규칙**을 아는 것이 좋음

[라우팅 그룹] Route groups
* 폴더를 괄호로 묶어 라우팅 그루을 만들 수 있음

### src 디렉토리 사용하기 

Next.js에서는 선택적으로 src 디렉토리를 사용하여 애플리케이션의 소스 코드를 프로젝트 설정 파일과 분리할 수 있음

**코드 분리**: `app` 라우터와 같은 모든 소스 코드를 `src` 폴더 안에 배치하여, `package.json`이나 `next.config.js` 같은 최상위 설정 파일들과 명확하게 구분할 수 있음

**선택 사항**: 이 구조는 필수가 아니며 개발자의 선호에 따라 적용할 수 있음

[기능 또는 라우팅 별로 프로젝트 파일 분활] 
* 이 전략은 전역적으로 공유되는 애플리케이션 코드를 app 디렉토리 루트에 저장하고 보다 구테적인 애플맄케이션 코드를 이를 사용하는 라우팅 세그먼트로 분활



## 2025-09-03

### Installation

[IDE 플러그인]

* Next.js에는 사용자 정의 TypeScript 플러그인과 유형 검사기가 포함되어 있음

* VS Code 및 다른 코드 편집기에서 고급 타입 검사와 자동 완성에 사용할 수 있음

### 옵션 설명

* **Strict**: Next.js의 기본 ESLint 구성과 더욱 엄격한 Core Web Vitals 규칙 세트를 포함 ESLint를 처음 설정하는 개발자에게 권장되는 구성

* **Base**: Next.js의 기본 ESLint 구성을 포함

* **Cancel**: 구성을 건너뜀 사용자 지정 ESLint 구성을 설정하려면 이 옵션을 선택

### 설치와 생성

* Strict 또는 Base를 선택하면 Next.js가 자동으로 eslint와 eslint-config-next를 애플리케이션 의존성으로 설치

* 선택한 설정을 포함하는 .eslintrc.json 파일을 프로젝트 루트 디렉터리에 생성

* 이제 next lint를 실행할 때마다 ESLint가 실행되어 오류를 찾아냄
    - Web Vitals: 구글이 제시하는 웹 품질 평가 지표

### 임포트 및 모듈의 절대 경로 별칭 설정

* Next.js에는 `tsconfig.json` 및 `jsconfig.json` 파일의 "paths" 및 "baseUrl" 옵션에 대한 지원이 내장되어 있음

* 이 옵션을 사용하면 프로젝트 디렉터리를 절대 경로로 별칭 처리하여 모듈을 더 쉽고 깔끔하게 가져올 수 있음

```ts
// Before
import { Button } from '../../../../../components/button'

// After
import { Button } from 'components/button'
```

* 별칭으로 import를 구성하려면 `tsconfig.json` 또는 `jsconfig.json` 파일에 baseUrl 옵션을 추가

```json
{
  "compilerOptions": {
    "baseUrl": "src"
  }
}
```

### baseUrl + paths를 활용한 경로 별칭

* baseUrl을 설정하는 것 외에도 "paths" 옵션을 사용하여 모듈 경로를 별칭(alias)으로 사용하실 수 있음

* 예를 들어 아래 구성은 `@/components/*`를 `components/*`에, `@/styles/*`를 `styles/*`에 매핑
```json
{
  "compilerOptions": {
    "baseUrl": "src/",
    "paths": {
      "@/styles/*": ["styles/*"],
      "@/components/*": ["components/*"]
    }
  }
}
```

* "paths"의 각 항목은 baseUrl 경로를 기준으로 상대적

### 자동 생성되는 항목

* 강의에서는 프로젝트를 자동 생성해서 사용

* 다음은 프로젝트를 자동 생성할 때 함께 만들어지는 항목입니다.

* `package.json`에 scripts 자동 추가 / public 디렉터리 생성

* TypeScript(선택): `tsconfig.json` 파일 생성

* ESLint 설정(선택): `.eslintrc.json` 대신 `eslint.config.mjs` 파일 생성

* Tailwind CSS(선택)

* src 디렉터리 사용(선택)

* App Router(선택): `app/layout.tsx`, `app/page.tsx` 파일 생성

* Turbopack(선택)

* import alias(선택): `tsconfig.json`에 "paths" 자동 생성

* 수동으로 프로젝트를 만들 때 추가로 해야 하는 작업들을 자동으로 처리해줌

### Core Web Vitals

* **LCP (Largest Contentful Paint)**: 뷰포트 내에서 가장 큰 페이지 요소(큰 텍스트 블록, 이미지 또는 비디오)를 표시하는 데 걸리는 시간
    - 뷰포트: 웹페이지 사용자가 별도의 스크롤 동작 없이 볼 수 있는 영역

* **FID (First Input Delay)**: 사용자가 웹페이지와 상호작용을 시도한 첫 순간부터 페이지가 실제로 응답하기까지의 시간

* **CLS (Cumulative Layout Shift)**: 방문자에게 콘텐츠가 얼마나 불안정하게 보이는지를 측정하는 지표 페이지에서 갑작스런 레이아웃 변경이 얼마나 발생하는지(레이아웃 이동, layout shift의 빈도/규모)를 측정

### 실습에 사용할 프로젝트를 생성

* 공식 문서에서는 기본 패키지 관리자로 pnpm을 사용

* 원하시는 패키지 관리자 탭을 클릭하면 각자의 설치/생성 명령을 확인하실 수 있음

* 아래 명령으로 프로젝트를 생성

* 명령을 실행하면 아래와 같은 8개의 선택 항목이 나옴
```bash
# npm
npx create-next-app@latest

# pnpm
pnpm dlx create-next-app@latest

# yarn
yarn create next-app

# bun
bun create next-app@latest
```

### 선택 항목 (8가지)

1. 프로젝트 이름을 입력
2. TypeScript 사용 여부를 선택
3. ESLint 사용 여부를 선택
4. Tailwind CSS 사용 여부를 선택
5. src/ 디렉터리 사용 여부를 선택
6. App Router를 사용할지 선택
7. import alias를 사용할지 선택
8. alias 문자열을 지정 (기본값: @/)

### .eslintrc.json vs eslint.config.mjs

* JSON(.eslintrc.json)은 주석, 변수, 조건문을 사용할 수 없어 복잡한 규칙 구성에 제약이 있음

* mjs는 ESLint가 새롭게 도입한 ESM(ECMAScript 모듈) 기반 구성 방식

* 확장자 .mjs는 "module JavaScript"를 뜻 

* ESLint v9 이상 권장 방식이며 코드처럼 변수/함수/조건문을 활용해 유연하게 설정할 수 있음

* 여러 구성 파일을 임포트해서 재사용/모듈화하기 쉬움

* 프로젝트 규모가 커질수록 유지보수에 유리

### Next.js와 `eslint.config.mjs`

* Next.js 14 이후로는 ESLint 9 호환성과 최신 권장 방식을 고려해 `eslint.config.mjs` 사용하는 방향으로 전환하고 있음

* 기존 `.eslintrc.json`도 여전히 지원되므로 필요 시 수동으로 만들어 사용하거나 점진적으로 마이그레이션하실 수 있음
```
// .eslintrc.json
{
  "extends": "next",
  "rules": {
    "no-console": "warn"
  }
}
```
```
// eslint.config.mjs
import next from "eslint-config-next";

export default [
  next(),
  {
    rules: {
      "no-console": "warn",
    },
  },
];
```

### pnpm

* pnpm은 효율적인 NPM의 약자로 고성능 Node 패키지 매니저입니다

* npm, yarn과 같은 목적의 패키지 관리자이지만 디스크 공간 낭비, 복잡한 의존성 관리, 느린 설치 속도 문제를 개선하기 위해 개발됨

1. 하드 링크(Hard Link) 기반의 저장 공간 효율

   * 패키지를 한 번만 설치해 글로벌 저장소에 보관하고 각 프로젝트의 node_modules에는 해당 패키지로 가는 하드 링크(또는 심볼릭 링크)를 생성

2. 빠른 설치 속도(Performant)

   * 이미 설치된 패키지를 재사용하므로 초기 설치뿐 아니라 의존성 설치 및 업데이트 시에도 더 빠름

3. 엄격하고 효율적인 의존성 관리

   * 선언된 의존성만 사용하도록 강제하는 등 관리가 체계적이고 안정적

4. 다른 패키지 매니저의 비효율 개선

   * 공간, 속도, 관리 측면의 비효율을 줄이는 데 초점이 맞춰져 있음

### Hard link vs. Symbolic link(Soft link)

* pnpm의 특징 중 하나는 하드 링크를 사용해 디스크 공간을 효율적으로 사용할 수 있다는 점

* 탐색기에서 npm 프로젝트와 pnpm 프로젝트의 node_modules 용량을 비교해 보시면 차이를 확인하실 수 있음

### 하드 링크(Hard link)

우리가 파일이라고 부르는 것은 크게 두 부분으로 나뉨

1. Directory Entry

   * 파일 이름과 해당 inode 번호를 매칭하는 정보가 들어 있는 특수한 엔트리

2. inode

* 파일(또는 디렉터리)에 대한 모든 메타데이터를 저장하는 구조체

* 디렉터리 엔트리에 있는 원본과 하드 링크는 같은 inode를 참조하므로 데이터 블록을 100% 공유

* 따라서 원본/하드 링크 중 하나를 삭제해도 이름만 지워질 뿐이며 link count가 0이 되지 않는 한 실제 데이터는 남아 있음

* pnpm은 전역 store에 저장된 패키지와 node_modules/.pnpm에 있는 항목이 동일 파일을 하드 링크로 참조하도록 함

* 탐색기에서 node_modules의 용량이 npm과 비슷해 보이는 이유는 하드 링크가 겉보기엔 복사본처럼 보이지만 실제로는 같은 데이터 블록을 공유하기 때문

* pnpm으로 패키지를 설치하면 전역 store에 한 번만 저장
  ```
  Windows: C:\Users\<user>\AppData\Local\pnpm-store\
  ```

* 결과적으로 **실제 디스크 사용량은 중복되지 않음

### 심볼릭 링크(소프트 링크)

* inode를 공유하지 않고 대상 파일의 경로 문자열만 저장하는 특수 파일

* 심볼릭 링크를 열면 내부에 적힌 경로를 따라가 원본 파일을 찾음

* 원본이 삭제되면 심볼릭 링크는 끊어진 경로가 되어 더 이상 사용할 수 없음

* 윈도우의 바로 가기와 유사하게 생각면 됨 
