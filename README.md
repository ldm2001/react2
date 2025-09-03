# 202030225 이동민 

## 2025-08-28

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

# Next.js와 `eslint.config.mjs`

* Next.js 14 이후로는 ESLint 9 호환성과 최신 권장 방식을 고려해 `eslint.config.mjs` 사용하는 방향으로 전환하고 있음

* 기존 `.eslintrc.json`도 여전히 지원되므로 필요 시 수동으로 만들어 사용하거나 점진적으로 마이그레이션하실 수 있음
```json
// .eslintrc.json
{
  "extends": "next",
  "rules": {
    "no-console": "warn"
  }
}
```
```js
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
