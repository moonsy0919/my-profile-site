# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

문시현의 개인 포트폴리오 사이트. 빌드 도구나 패키지 매니저 없이 순수 HTML/CSS/JS로 구성된 정적 단일 페이지 사이트입니다.

## 개발 방법

빌드 과정이 없습니다. `index.html`을 브라우저에서 직접 열거나 로컬 서버로 실행합니다:

```bash
# Python 로컬 서버
python3 -m http.server 8080

# VS Code Live Server 확장 사용 시
# index.html에서 우클릭 → "Open with Live Server"
```

린트 도구가 별도로 설정되어 있지 않습니다. 커밋 전 코드 스타일 규칙(`.claude/rules/code-style.md`)을 수동으로 확인하세요.

## 아키텍처

### 파일 구조
- `index.html` — 전체 페이지 마크업 (Hero, About, Skills, Projects, Contact, Footer 섹션 포함)
- `style.css` — 커스텀 CSS 클래스 및 CSS 변수 정의
- `main.js` — 모든 인터랙션 로직 (타이핑 애니메이션, 스크롤 효과, 아바타 업로드 등)
- `tailwind.config.js` — 미사용 (Tailwind 설정은 `index.html` 내 인라인 `<script>` 태그에 정의됨)

### CSS 이중 구조 주의
색상과 스타일이 두 곳에 나뉘어 정의되어 있습니다. 색상 변경 시 **둘 다** 수정해야 합니다:
1. `style.css` 상단의 CSS 변수 (`:root { --accent: #ea580c; ... }`)
2. `index.html`의 인라인 Tailwind 설정 (`tailwind.config = { theme: { extend: { colors: { ... } } } }`)

### JavaScript 패턴
`main.js`는 모듈 없이 단일 파일로 구성됩니다:
- `type()` — 재귀 setTimeout 기반 타이핑 애니메이션
- `IntersectionObserver` — `.fade-in-section` 요소의 스크롤 진입 시 `.visible` 클래스 토글
- 아바타 업로드 시 About 섹션과 Hero 섹션 두 곳의 이미지를 동시에 `FileReader`로 업데이트

## 프로젝트 규칙

`.claude/rules/` 폴더의 규칙을 따릅니다:
- **커밋**: 한글 메시지, `feature/기능명` 브랜치 형식
- **코드 스타일**: 스페이스 2칸 들여쓰기, camelCase 변수명, 동사로 시작하는 함수명, 한글 주석
