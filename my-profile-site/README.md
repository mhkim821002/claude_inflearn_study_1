# 김민형 프로필 웹사이트

보안 엔지니어 / 아키텍트 김민형의 개인 프로필 사이트입니다.
바닐라 HTML · CSS · JavaScript + Tailwind CSS(CDN)로 만들었으며 **빌드 단계가 없습니다**.

## 실행 방법

`index.html`을 브라우저에서 직접 열거나, 정적 서버로 서빙하세요:

```bash
python -m http.server 8000   # 이후 http://localhost:8000 접속
```

## 구조

```
my-profile-site/
├── index.html       # 전체 마크업 + Tailwind 인라인 설정
├── css/styles.css    # Tailwind 보완(네온 글로우, 스크롤 리빌, 컴포넌트 클래스)
└── js/app.js         # 모바일 네비, 부드러운 스크롤, 스크롤 리빌, 연도 주입
```

## 디자인

- **다크 사이버 테마**: 어두운 배경 + 네온 액센트
- **색상**: 블루(`#3b82f6`) → 퍼플(`#8b5cf6`) 그라데이션(메인), 그린(`#34d399`) 보조 포인트
- 색상을 바꾸려면 `index.html`의 `tailwind.config > colors`(accent/accent2/accent3)와
  `css/styles.css`의 해당 hex 값을 함께 수정하세요.

## 내용 수정 (직접 채우기)

샘플로 채워진 부분은 자유롭게 본인 정보로 교체하세요. `index.html`에서:

- **소개(About)**: `<!-- 위 소개 문구는 샘플입니다 ... -->` 주석 위 문단
- **Skills**: 각 `.skill-card`의 배지 목록
- **Projects**: `<!-- 아래 프로젝트는 샘플입니다 ... -->` 아래 카드 3개
- **연락처(Contact)**:
  - 이메일은 `mailto:d96383@gmail.com`로 설정됨
  - GitHub / LinkedIn 링크의 `USERNAME` 부분을 본인 사용자명으로 교체
    (해당 줄에 `<!-- TODO: USERNAME ... -->` 주석 있음)

## 특징

- 반응형 (모바일 햄버거 메뉴 포함)
- 접근성: `aria-expanded` / `aria-label` 토글, `prefers-reduced-motion` 존중
- 외부 라이브러리 의존성 없음 (Tailwind는 CDN)
