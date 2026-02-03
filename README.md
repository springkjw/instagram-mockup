# Instagram Clone - 구름 풀스택 20회차 특강

프레임워크 없이 순수 HTML, CSS, JavaScript만으로 구현하는 인스타그램 스타일 모바일 웹 앱입니다.

## 완성본 미리보기

| 피드 | 프로필 | 탐색 |
|:---:|:---:|:---:|
| 스토리 가로 스크롤 | 유저 통계 + 바이오 | 실시간 검색 필터 |
| 좋아요/북마크 토글 | 3열 게시물 그리드 | 대형/소형 혼합 그리드 |
| 더블탭 하트 애니메이션 | 탭 전환 | alt 텍스트 기반 필터링 |

## 프로젝트 구조

```
instagram-mockup/
├── index.html              ← feed.html로 리다이렉트
├── feed.html               ← 메인 피드
├── profile.html            ← 프로필
├── explore.html            ← 탐색
├── css/
│   ├── reset.css           ← 브라우저 기본 스타일 초기화
│   ├── variables.css       ← 색상, 폰트, 간격 등 CSS 변수
│   ├── common.css          ← 헤더, 네비, 아바타 등 공통 스타일
│   ├── feed.css            ← 스토리 바, 게시물 카드 스타일
│   ├── profile.css         ← 프로필 통계, 게시물 그리드 스타일
│   └── explore.css         ← 검색바, 탐색 그리드 스타일
├── js/
│   ├── common.js           ← fetchJSON, 시간 포맷, 숫자 포맷
│   ├── feed.js             ← 스토리/게시물 렌더링, 좋아요/북마크
│   ├── profile.js          ← 프로필 렌더링, 게시물 그리드, 탭 전환
│   └── explore.js          ← 탐색 그리드 렌더링, 검색 필터링
├── data/
│   ├── users.json          ← 유저 Mock 데이터
│   ├── posts.json          ← 게시물 Mock 데이터
│   ├── stories.json        ← 스토리 Mock 데이터
│   └── explore.json        ← 탐색 Mock 데이터
└── components/
    ├── container.html      ← 공통 레이아웃 구조 데모
    └── post-card.html      ← 포스트 카드 컴포넌트 데모
```

## 데이터 설계

4개의 JSON 파일이 Mock 데이터 역할을 합니다.

```
users.json ◄── posts.json    (userId로 연결)
    ▲
    └────── stories.json     (userId로 연결)

explore.json                  (독립 데이터)
```

**데이터 흐름**: `fetch() → JSON 파싱 → forEach → createElement → DOM 렌더링`

## CSS 설계 전략

### 로딩 순서 (Cascade)

브라우저는 위에서 아래로 CSS를 읽으며, 나중에 읽힌 스타일이 우선합니다.

```
1) reset.css      → 브라우저 기본 스타일 제거
2) variables.css  → :root에 CSS 변수 선언
3) common.css     → 변수를 사용하는 공통 스타일
4) feed.css 등    → 페이지별 고유 스타일 (공통을 덮어씀)
```

### 모바일 컨테이너

```
┌─────────── 브라우저 전체 너비 ───────────┐
│                                           │
│   ┌─── container (max-width: 480px) ───┐  │
│   │  header (position: fixed, top)     │  │
│   │  ──────────────────────────────    │  │
│   │  콘텐츠 (스크롤 영역)              │  │
│   │  ──────────────────────────────    │  │
│   │  bottom-nav (position: fixed)      │  │
│   └────────────────────────────────────┘  │
│                                           │
└───────────────────────────────────────────┘
```

### 핵심 CSS 기법

| 기법 | 사용처 | 설명 |
|------|--------|------|
| `position: fixed` | 헤더, 하단 네비 | 스크롤해도 고정되는 앱 느낌 |
| CSS 변수 (`var()`) | 전체 | 색상/간격을 한 곳에서 관리 |
| `overflow-x: auto` | 스토리, 하이라이트 | 가로 스크롤 |
| 스토리 링 (3겹) | 스토리 아바타 | gradient → white padding → 이미지 |
| `aspect-ratio` | 게시물 이미지 | 1:1(피드), 4:5(프로필) 비율 고정 |
| `object-fit: cover` | 모든 이미지 | 비율 유지하며 영역 채움 |
| `grid: repeat(3, 1fr)` | 프로필, 탐색 | 3열 그리드 |
| `grid-column: span 2` | 탐색 대형 이미지 | 2칸 차지하는 대형 아이템 |
| `@keyframes` | 좋아요 바운스, 하트 | CSS 애니메이션 정의 |

## JS 아키텍처

### 데이터 흐름

```
DOMContentLoaded (HTML 파싱 완료)
     ↓
fetchJSON('data/posts.json')    ← async/await로 JSON 요청
     ↓
JSON 배열 수신
     ↓
forEach → createElement + innerHTML    ← 템플릿 리터럴로 HTML 생성
     ↓
DOM에 렌더링 완료
     ↓
이벤트 리스너 등록 (이벤트 위임)
```

### 이벤트 위임 패턴

개별 등록 대신 부모 컨테이너 1개에 리스너를 등록하고 `e.target.closest()`로 분기합니다.

```
클릭 → e.target.closest('[data-action]')
     → "like"     → classList.toggle + 카운트 증감 + 바운스 애니메이션
     → "bookmark" → classList.toggle
```

### 파일별 역할

| 파일 | 역할 |
|------|------|
| `common.js` | `fetchJSON()`, `getRelativeTime()`, `formatNumber()` 유틸리티 |
| `feed.js` | 스토리/게시물 렌더링 + 좋아요/북마크/더블탭 인터랙션 |
| `profile.js` | URL 파라미터(`?user=user1`) → 프로필 렌더링 + 게시물 그리드 + 탭 전환 |
| `explore.js` | 탐색 그리드 렌더링 + `input` 이벤트 기반 실시간 검색 필터 |

## 단계별 커리큘럼 (9단계)

```
──[1]──[2]──[3]──[4]──[5]──[6]──[7]──[8]──[9]──
 셋업  HTML  CSS   CSS   JS    JS   프로필 탐색 마무리
            기초  피드  기초  인터랙션
```

| Step | 주제 | 핵심 학습 | 파일 |
|------|------|-----------|------|
| 1 | 프로젝트 셋업 + HTML 구조 | 폴더 구조, DOCTYPE, 시맨틱 태그 | HTML 파일들 |
| 2 | 피드 HTML 마크업 | article/section, class 네이밍, aria-label 접근성 | `feed.html` |
| 3 | CSS 기초 (리셋/변수/레이아웃) | box-sizing, CSS 변수(:root, var()), position: fixed | `reset.css`, `variables.css`, `common.css` |
| 4 | 피드 CSS (스토리+카드) | 가로 스크롤, 그라디언트 스토리 링, aspect-ratio, object-fit | `feed.css` |
| 5 | JS 기초 (fetch+DOM) | async/await, try/catch, fetch, getElementById, 템플릿 리터럴 | `common.js`, `feed.js` |
| 6 | 피드 JS (인터랙션) | 이벤트 위임(closest), classList.toggle, @keyframes 애니메이션 | `feed.js` |
| 7 | 프로필 페이지 | CSS Grid(repeat(3,1fr)), URLSearchParams, Array.filter | `profile.css`, `profile.js` |
| 8 | 탐색 페이지 | grid-column: span 2, input 이벤트, trim/toLowerCase 검색 | `explore.css`, `explore.js` |
| 9 | 마무리 (반응형+배포) | DevTools 모바일 뷰, GitHub Pages 배포 | 전체 |

## 학습 포인트 요약

### HTML
- 시맨틱 태그 (`article`, `section`, `nav`, `header`, `main`)
- 접근성 (`aria-label` — 스크린 리더용 버튼 설명)
- `meta charset`, `meta viewport` (인코딩, 반응형)
- `link rel="preconnect"` (외부 서버 사전 연결)

### CSS
- CSS 변수 (`:root` 선언 → `var()` 사용)
- `*::before`, `*::after` (가상 요소 포함 리셋)
- `box-sizing: border-box` (padding 포함 크기 계산)
- Flexbox / CSS Grid 레이아웃
- `position: fixed` + `z-index` (헤더/네비 고정)
- `aspect-ratio`, `object-fit: cover` (이미지 비율)
- `@keyframes` + `animation` (CSS 애니메이션)

### JavaScript
- `async/await` + `try/catch` (비동기 에러 처리)
- `fetch()` → `.json()` (네트워크 요청)
- `document.getElementById()` (DOM 요소 탐색)
- `forEach`, `filter`, `map`, `join` (배열 메서드)
- 이벤트 위임 (`e.target.closest()`)
- `classList.toggle()` (클래스 토글)
- `URLSearchParams` (URL 쿼리 파라미터)
- `trim()`, `toLowerCase()` (문자열 정규화)
- 정규표현식 (`/\.0$/` — 패턴 매칭)
- `toLocaleDateString('ko-KR')` (날짜 포맷)
- `DOMContentLoaded` (DOM 준비 시점 감지)

## 실행 방법

이 프로젝트는 `fetch()`로 JSON 데이터를 불러오기 때문에 **로컬 서버**가 필요합니다.
`file://` 프로토콜로 직접 열면 CORS 에러가 발생합니다.

### 1. 프로젝트 클론

```bash
git clone https://github.com/springkjw/instagram-mockup.git
cd instagram-mockup
```

### 2-A. VS Code Live Server (권장)

1. VS Code에서 프로젝트 폴더 열기
2. 확장 탭에서 **Live Server** 검색 후 설치 (`ritwickdey.LiveServer`)
3. 좌측 하단 **Go Live** 클릭 또는 `index.html` 우클릭 → **Open with Live Server**
4. 브라우저가 자동으로 열림 (기본 `http://127.0.0.1:5500`)

### 2-B. Python 간이 서버

```bash
python3 -m http.server 8080
```

브라우저에서 `http://localhost:8080` 접속

### 2-C. Node.js (npx)

```bash
npx serve .
```

브라우저에서 `http://localhost:3000` 접속

### 서버 종료

터미널에서 `Ctrl + C`를 누르면 서버가 종료됩니다.

## 이미지 에셋

| 용도 | 소스 |
|------|------|
| 프로필 사진 | [pravatar.cc](https://pravatar.cc) (랜덤 아바타) |
| 게시물/탐색 이미지 | [picsum.photos](https://picsum.photos) (랜덤 사진) |
| 아이콘 | Feather Icons 스타일 인라인 SVG |
| 로고 | Google Fonts 'Pacifico' 폰트 |

인터넷 연결이 필요합니다 (외부 이미지 CDN 사용).

## 확장 과제 (보너스)

- 다크 모드 (CSS 변수 교체)
- localStorage로 좋아요/북마크 상태 유지
- 스켈레톤 로딩 UI
- IntersectionObserver 무한 스크롤
- 댓글 입력 기능
