# 202030225 이동민 

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
