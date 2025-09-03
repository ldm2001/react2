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
