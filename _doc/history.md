# 작업 이력 (History)

### 2025-12-23 10:45
- **작업 요약**: 이벤트 상세 조회 탭 기반 페이지 구현 및 수정 페이지 경로 변경
- **변경된 파일 목록**:
  - `src/app/(root)/event/[id]/page.tsx` (개편)
  - `src/app/(root)/event/[id]/edit/page.tsx` (신규 생성/이동)
- **주요 변경 사항**:
  - 이벤트 목록 클릭 시 이동하는 상세 페이지를 3개의 탭(이벤트 정보, 양식 목록, 계약 목록) 구조로 개편함.
  - '이벤트 정보' 탭에서 정보를 조회하고, 수정 버튼 클릭 시 별도의 수정 페이지(`/event/[id]/edit`)로 이동하도록 구현함.
  - 기존에 `[id]/page.tsx`에 있던 수정/삭제 폼 로직을 `[id]/edit/page.tsx`로 이동시키고, 수정 완료 후 다시 탭 기반 상세 페이지로 돌아오도록 경로를 조정함.
  - 탭 UI는 별도의 라이브러리 설치 없이 tailwind css를 사용하여 직접 구현함.

### 2025-12-23 09:44
- **작업 요약**: 누락된 의존성 패키지(@radix-ui/react-label) 설치
- **변경된 파일 목록**:
  - `package.json`
  - `package-lock.json`
- **주요 변경 사항**:
  - `Label` 컴포넌트에서 사용하는 `@radix-ui/react-label` 패키지가 누락되어 발생한 `Module not found` 오류를 해결하기 위해 해당 패키지를 설치함.

### 2025-12-23 09:32
- **작업 요약**: Event 페이지 생성 및 사이드바 메뉴 연결
- **변경된 파일 목록**:
  - `src/app/(root)/event/page.tsx` (신규 생성)
  - `src/components/layout/Sidebar.tsx`
- **주요 변경 사항**:
  - `(root)` 그룹 하위에 `event` 폴더를 생성하고 기본 이벤트 목록 페이지(`page.tsx`)를 구현함.
  - 사이드바 메뉴에서 기존 'Projects' 항목을 'Event'로 변경하고, 클릭 시 `/event` 경로로 이동하도록 수정함.

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

### 2025-12-23 10:05
- **작업 요약**: 이벤트 상세 조회, 수정, 삭제 기능 구현 및 목록 연동
- **변경된 파일 목록**:
  - `src/app/(root)/event/[id]/page.tsx` (신규 생성)
  - `src/app/(root)/event/page.tsx`
- **주요 변경 사항**:
  - 이벤트 목록에서 행을 클릭하면 해당 이벤트의 상세 정보를 수정할 수 있는 수정 페이지(`/event/[id]`)를 구현함.
  - 목록 페이지의 테이블 행에 `cursor-pointer` 스타일을 적용하고 클릭 시 상세 페이지로 이동하도록 설정함.
  - 수정 페이지에서는 기존 데이터를 불러와 폼에 채워주는 상세 조회 기능, 데이터 업데이트(PUT), 데이터 삭제(DELETE) 기능을 포함함.
  - `datetime-local` 입력 필드에 맞게 날짜 형식을 변환하는 유틸리티 로직 적용.

### 2025-12-23 09:58
- **작업 요약**: 누락된 shadcn/ui 컴포넌트 추가 및 모듈 참조 오류 수정
- **변경된 파일 목록**:
  - `src/components/ui/card.tsx` (신규 생성)
  - `src/components/ui/textarea.tsx` (신규 생성)
  - `src/components/ui/label.tsx` (신규 생성)
- **주요 변경 사항**:
  - 이벤트 등록 페이지에서 사용 중이었으나 실제 파일이 존재하지 않았던 `Card`, `Textarea`, `Label` 컴포넌트를 추가함.
  - "Module not found: Can't resolve '@/components/ui/card'" 등의 빌드 오류를 해결함.

### 2025-12-23 09:55
- **작업 요약**: 이벤트 등록 기능 구현 및 페이지 연결
- **변경된 파일 목록**:
- `src/app/(root)/event/page.tsx`
- `src/app/(root)/event/register/page.tsx` (신규 생성)
- **주요 변경 사항**:
- 이벤트 목록 화면 상단에 '이벤트 등록' 버튼을 추가하여 등록 페이지로 이동할 수 있도록 함.
- 이벤트 등록 페이지(`/event/register`)를 신규 생성하고, 제목, 장소, 시작/종료 일시, 설명을 입력받는 폼을 구현함.
- 백엔드 API `/api/v1/events` (POST) 연동을 통해 이벤트 등록 기능 구현.
- 등록 완료 후 목록 페이지로 리다이렉션 및 데이터 갱신 처리.

### 2025-12-23 09:47
- **작업 요약**: 이벤트 목록 조회 페이지 구현 및 관련 타입 정의
- **변경된 파일 목록**:
  - `src/types/event.ts` (신규 생성)
  - `src/app/(root)/event/page.tsx`
- **주요 변경 사항**:
  - `EventContent`, `EventListResponse`, `EventSearchParams` 등 이벤트 관련 API 명세에 따른 인터페이스 정의.
  - `/event` 경로의 이벤트 목록 페이지 구현.
  - 검색 조건 필터(ID, 이벤트 제목, 이벤트 장소) 구현 및 초기화 기능 추가.
  - 백엔드 API `/api/v1/events` 호출 연동 (페이지네이션 및 검색 파라미터 포함).
  - 테이블 형태의 목록 표시 및 페이지네이션 네비게이션 구현.
  - `localStorage`의 `accessToken`을 이용한 인증 헤더 추가 및 로딩/에러 처리 로직 구현.

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
