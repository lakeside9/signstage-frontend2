# 작업 이력 (History)

### 2025-12-22 23:17
- **작업 요약**: 사이드바 토글 기능 추가 및 사용자 정보/로그아웃 버튼 헤더 이동
- **변경된 파일 목록**:
  - `src/app/(root)/layout.tsx`
  - `src/components/layout/Header.tsx`
  - `src/components/layout/Sidebar.tsx`
  - `src/app/(root)/dashboard/page.tsx`
- **주요 변경 사항**:
  - 사이드바를 열고 닫을 수 있는 토글 기능을 루트 레이아웃에 추가.
  - 대시보드 페이지에 노출되던 로그인 사용자 정보와 로그아웃 버튼을 상단 헤더(`Header.tsx`)로 이동하여 모든 페이지에서 접근 가능하도록 개선.
  - 헤더에 사이드바 토글을 위한 햄버거 메뉴 버튼 추가.
  - `Header.tsx`를 클라이언트 컴포넌트로 전환하여 인증 상태 관리 및 로그아웃 기능 구현.
  - 사이드바 접힘/펼침 시의 부드러운 애니메이션 효과 적용.

### 2025-12-22 23:14
- **작업 요약**: 라우트 그룹 명칭 변경 ((dashboard) -> (root))
- **변경된 파일 목록**:
  - `src/app/(dashboard)/` (삭제/이동)
  - `src/app/(root)/` (생성/이동)
- **주요 변경 사항**:
  - 대시보드 레이아웃과 페이지를 포함하던 `(dashboard)` 라우트 그룹 폴더를 더 범용적인 명칭인 `(root)`로 변경.
  - 서비스의 기본이 되는 레이아웃 구조를 (root) 그룹에서 관리하도록 구조 조정.

### 2025-12-22 23:18
- **작업 요약**: 대시보드 레이아웃 경로 오류 수정
- **변경된 파일 목록**:
  - `src/app/(dashboard)/layout.tsx` (위치 이동)
  - `src/app/(dashboard/)/` (삭제)
- **주요 변경 사항**:
  - 잘못 생성된 경로 `src/app/(dashboard/)/layout.tsx`를 정식 라우트 그룹 경로인 `src/app/(dashboard)/layout.tsx`로 이동하여 대시보드 페이지에 레이아웃이 적용되지 않던 문제 해결.
  - 중복되거나 잘못 생성된 디렉토리 정리.

### 2025-12-22 23:15
- **작업 요약**: 대시보드 공통 레이아웃(Header, Sidebar) 구현 및 구조 개편
- **변경된 파일 목록**:
  - `src/app/(dashboard)/layout.tsx` (신규 생성)
  - `src/app/(dashboard)/dashboard/page.tsx` (이동 및 수정)
  - `src/components/layout/Header.tsx` (신규 생성)
  - `src/components/layout/Sidebar.tsx` (신규 생성)
- **주요 변경 사항**:
  - 상단 헤더, 좌측 메뉴, 중앙 콘텐츠 영역으로 구성된 대시보드 전용 레이아웃 시스템 구축.
  - `(dashboard)` 라우트 그룹을 생성하여 하위 모든 페이지가 동일한 레이아웃을 공유하도록 설정.
  - 기존 `src/app/dashboard/page.tsx`를 `(dashboard)` 그룹 내부로 이동하고, 개별 페이지에 포함되어 있던 중복 헤더/네비게이션 코드를 제거하여 콘텐츠 영역에 집중하도록 수정.
  - 레이아웃 구성 요소를 `src/components/layout` 하위의 독립 컴포넌트로 분리하여 유지보수성 향상.

### 2025-12-22 23:05
- **작업 요약**: 로그인 및 회원가입 페이지 공통 레이아웃 분리
- **변경된 파일 목록**:
  - `src/app/(auth)/layout.tsx` (신규 생성)
  - `src/app/(auth)/login/page.tsx` (이동 및 수정)
  - `src/app/(auth)/register/page.tsx` (이동 및 수정)
- **주요 변경 사항**:
  - `login`과 `register` 페이지에서 공통적으로 사용하던 배경 및 중앙 정렬 컨테이너를 `(auth)` 경로 그룹의 레이아웃으로 분리.
  - 기존 `src/app/login`과 `src/app/register` 폴더를 `src/app/(auth)` 하위로 이동하여 구조적 일관성 확보.
  - 각 페이지 컴포넌트에서 중복된 레이아웃 래퍼 제거 및 구조 단순화.

### 2025-12-22 23:01
- **작업 요약**: 로그인 페이지 이메일, 비밀번호 필드 레이블 표시
- **변경된 파일 목록**:
  - `src/app/login/page.tsx`
- **주요 변경 사항**:
  - 기존에 `sr-only` 클래스로 숨겨져 있던 이메일과 비밀번호 필드의 `label`을 화면에 표시되도록 수정.
  - 레이블과 입력 필드 사이의 간격 조정을 위해 `space-y-1.5` 클래스 적용.
  - 레이블 텍스트 스타일 지정 (`text-sm font-medium text-gray-700`).

### 2025-12-22 22:55
- **작업 요약**: 회원가입 페이지 비밀번호 확인 필드 추가 및 유효성 검사 구현
- **변경된 파일 목록**:
  - `src/app/register/page.tsx`
- **주요 변경 사항**:
  - 비밀번호를 다시 입력하여 비교할 수 있는 "비밀번호 확인" 필드(`confirmPassword`) 추가.
  - `handleSubmit` 함수 내에 입력된 두 비밀번호가 일치하는지 확인하는 유효성 검사 로직 추가.
  - 비밀번호 불일치 시 "비밀번호가 일치하지 않습니다." 에러 메시지 출력 처리.

### 2025-12-22 22:58
- **작업 요약**: 로그인 페이지 버튼 레이아웃 정렬 수정
- **변경된 파일 목록**:
  - `src/app/login/page.tsx`
- **주요 변경 사항**:
  - 로그인 버튼이 컨테이너 우측으로 벗어나는 문제 해결을 위해 `w-full` 클래스를 `flex-1`로 변경.
  - '취소'와 '로그인' 버튼이 부모 컨테이너 너비를 초과하지 않고 균등하게 공간을 차지하도록 조정.

### 2025-12-22 22:52
- **작업 요약**: 로그인 페이지 버튼 배치 수정 및 회원가입 링크 변경
- **변경된 파일 목록**:
  - `src/app/login/page.tsx`
- **주요 변경 사항**:
  - 기존 세로 배열이었던 로그인 버튼과 기타 버튼들의 배치를 수정.
  - '취소' 버튼과 '로그인' 버튼을 가로로 나란히 배치(`flex gap-4`).
  - '회원가입' 버튼을 제거하고, 하단에 텍스트 형태의 회원가입 링크 추가.
  - Next.js `Link` 컴포넌트를 사용하여 회원가입 페이지(`/register`) 연결.

### 2025-12-22 22:48
- **작업 요약**: 회원가입 페이지 버튼 배열 수정 및 로그인 링크 추가
- **변경된 파일 목록**:
  - `src/app/register/page.tsx`
- **주요 변경 사항**:
  - '회원가입' 버튼 단일 구성을 '취소'와 '회원가입' 버튼이 나란히 배치되도록 수정 (Flexbox 적용).
  - 버튼 하단에 로그인 페이지로 이동할 수 있는 링크("이미 계정이 있으신가요? 로그인으로 이동") 추가.
  - Next.js `Link` 컴포넌트를 사용하여 클라이언트 사이드 네비게이션 적용.

### 2025-12-22 22:45
- **작업 요약**: 회원가입 화면 구현 및 관련 타입 정의
- **변경된 파일 목록**:
  - `src/types/auth.ts`
  - `src/app/register/page.tsx` (신규 생성)
- **주요 변경 사항**:
  - `SignupRequest`, `SignupResponse` 타입을 추가하여 회원가입 관련 인터페이스 정의.
  - `/register` 경로에 회원가입 페이지 구현.
  - 입력 필드: 이메일(userId), 사용자명(userNm), 비밀번호(password), 이용약관 동의(termsAgreeYn), 이벤트 동의(eventAgreeYn).
  - 백엔드 API `/api/v1/user/signup` 호출 연동.
  - 필수 항목 유효성 검사 및 에러 메시지 처리.
  - 회원가입 성공 시 알림 후 로그인 페이지로 리다이렉션 처리.

### 2025-12-22 22:40
- **작업 요약**: 로그인 화면에 취소 및 회원가입 이동 버튼 추가
- **변경된 파일 목록**:
  - `src/app/login/page.tsx`
- **주요 변경 사항**:
  - 로그인 폼 하단에 '취소' 버튼과 '회원가입' 버튼 추가.
  - '취소' 클릭 시 브라우저 이전 페이지로 이동(`router.back()`).
  - '회원가입' 클릭 시 `/register` 경로로 이동.
  - shadcn/ui의 `Button` 컴포넌트 `outline` 변형을 사용하여 시각적 계층 구조 형성.

### 2025-12-22 21:55
- **작업 요약**: Next.js 및 shadcn/ui 기본 프로젝트 구성
- **변경된 파일 목록**:
  - `src/` (Next.js 소스 코드 생성)
  - `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs` (설정 파일 생성)
  - `components.json` (shadcn/ui 설정)
  - `src/components/ui/button.tsx` (shadcn 버튼 컴포넌트 추가)
  - `src/app/page.tsx` (기본 페이지 수정)
- **주요 변경 사항**:
  - Next.js 15+ (App Router, TypeScript, Tailwind CSS) 환경 구축
  - shadcn/ui 초기화 및 `button` 컴포넌트 추가
  - 프로젝트 메인 페이지 구성

### 2025-12-22 22:10
- **작업 요약**: Next.js 실행 오류(Cannot find module '../server/require-hook') 수정
- **변경된 파일 목록**:
  - `package.json`
  - `package-lock.json`
- **주요 변경 사항**:
  - `next` 및 `eslint-config-next` 버전을 최신 안정 버전으로 업데이트하고 의존성을 재설치하여 모듈 참조 오류 해결.
  - `node_modules`를 삭제 후 재설치하여 손상된 의존성 트리 복구.
  - `npm run dev`를 통해 서버 정상 기동 확인.

### 2025-12-22 22:16
- **작업 요약**: 로그인 기능 구현
- **변경된 파일 목록**:
  - `src/components/ui/input.tsx` (신규 생성)
  - `src/app/login/page.tsx` (신규 생성)
- **주요 변경 사항**:
  - 로그인 폼을 위한 `Input` 공통 컴포넌트 추가.
  - `/login` 경로의 로그인 페이지 구현.
  - `userId`(이메일), `password` 입력 필드 및 유효성 검사 로직 추가.
  - `http://localhost:8080/api/v1/user/login` 백엔드 API와 연동된 로그인 요청 기능 구현.
  - 로그인 성공/실패 시의 사용자 알림 처리.

### 2025-12-22 22:35
- **작업 요약**: 로그인 API 호출 방식 개선 및 에러 핸들링 보강
- **변경된 파일 목록**:
  - `next.config.ts`
  - `.env.local` (신규 생성)
  - `src/app/login/page.tsx`
- **주요 변경 사항**:
  - CORS 문제 방지 및 API 경로 유연성 확보를 위해 Next.js `rewrites` 기능을 이용한 프록시 설정 추가.
  - API 베이스 URL을 환경 변수(`NEXT_PUBLIC_API_URL`)로 관리하도록 개선.
  - `Failed to fetch` 오류 발생 시 서버 연결 상태를 확인하도록 구체적인 에러 메시지 제공.

### 2025-12-22 22:30
- **작업 요약**: 대시보드 페이지 생성 및 로그인 성공 시 리다이렉션 경로 수정
- **변경된 파일 목록**:
  - `src/app/dashboard/page.tsx` (신규 생성)
  - `src/app/login/page.tsx`
- **주요 변경 사항**:
  - `/dashboard` 경로에 사용자 정보 표시 및 로그아웃 기능이 포함된 대시보드 페이지 구현.
  - 로그인 성공 시 리다이렉션 대상을 기존 `/`에서 `/dashboard`로 변경.
  - 대시보드 접근 시 `localStorage`의 토큰 및 사용자 정보 존재 여부를 확인하는 간단한 인증 체크 로직 추가.

### 2025-12-22 22:25
- **작업 요약**: 로그인 API 응답 타입 정의 및 성공 처리 로직 개선
- **변경된 파일 목록**:
  - `src/types/auth.ts` (신규 생성)
  - `src/app/login/page.tsx`
- **주요 변경 사항**:
  - 로그인 API의 성공 응답 형식(`status`, `message`, `data`)에 맞춘 `LoginResponse` 인터페이스 정의.
  - 로그인 성공 시 `accessToken`, `refreshToken`, 사용자 정보를 `localStorage`에 저장하는 로직 추가.
  - 로그인 성공 후 메인 페이지(`/`)로 자동 리다이렉션되도록 `useRouter` 적용.

### 2025-12-22 21:48
- **작업 요약**: 향후 작업 내용 자동 기록을 위한 가이드라인 설정
- **변경된 파일 목록**:
  - `.junie/guidelines.md` (신규 생성)
  - `_doc/history.md` (신규 생성)
- **주요 변경 사항**:
  - 프로젝트 루트에 `.junie/guidelines.md` 파일을 생성하여, 모든 작업 완료 후 `_doc/history.md`에 내용을 작성하도록 하는 규칙을 추가함.
  - 향후 Junie는 이 가이드라인을 참조하여 작업 내용을 자동으로 기록하게 됨.
