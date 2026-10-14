# 보험개발원 모바일 AOS · 모션 · 로딩 · Skeleton 공유

보험개발원 대물보상 모바일 AOS 의 **모션 아이콘 · 로딩 애니메이션 · Skeleton UI** 를 폰과 PC 에서 바로 확인하는 공유 페이지입니다.

최종 갱신 2026-10-14

## 🔗 바로 보기

| 페이지 | 링크 | 소스 (GitHub) |
|---|---|---|
| **로딩 애니메이션** (최종안) | https://namiroo.github.io/kidi-aos-motion-mobile/loading.html | [loading.html](loading.html) |
| **Skeleton 개발 가이드** | https://namiroo.github.io/kidi-aos-motion-mobile/skeleton/ | [skeleton/](skeleton/) |
| 모션 화면 6종 | https://namiroo.github.io/kidi-aos-motion-mobile/ | [index.html](index.html) |
| 모션 프리뷰 | https://namiroo.github.io/kidi-aos-motion-mobile/preview.html | [preview.html](preview.html) |

- 로그인 없이 누구나 열 수 있습니다. 검색 노출은 막아 두었습니다(`noindex` · `robots.txt`) — 링크를 아는 사람만 접근합니다.
- 저장소 `main` 브랜치 루트(`/`)가 그대로 위 주소로 배포됩니다. push 후 1분 안팎이면 반영됩니다.

---

## 1. 로딩 애니메이션 — 최종안

**https://namiroo.github.io/kidi-aos-motion-mobile/loading.html**

접수조회 화면 가운데에 로딩 배지가 **끝나지 않고 계속 반복**됩니다. (2026-10-14 최종: 심볼+AOS 배지)

| 항목 | 값 |
|---|---|
| 파일 | [`img/loading/loading-logo-badge.gif`](img/loading/loading-logo-badge.gif) — [직접 링크](https://namiroo.github.io/kidi-aos-motion-mobile/img/loading/loading-logo-badge.gif) |
| 형태 | 흰 원 배지 안에 심볼(M) + AOS 글자(정지) · 원 테두리 없음 · 원 바깥 투명 |
| 화면 표시 크기 | **56 × 56** · 화면 정중앙 · 그림자 없음 · 배경 딤 없음 |
| 원본 크기 | 512 × 512 (고해상도 화면 대응) |
| 모션 | M 획이 오른쪽 위 링 속으로 들어감 → 링이 스피너처럼 회전 → M 이 링에서 다시 뻗어 나옴 |
| 주기 | 2.4초, 무한 반복 (GIF loop 0) |
| Figma | `🎨 모바일 AOS` › Loading (2593:20317) · 배지 2594:22013 |

적용 예

```html
<div class="loading" role="status">
  <img src="loading-logo-badge.gif" width="56" height="56" alt="">
  <span class="sr-only">불러오는 중</span>
</div>
```

- 로딩 중에는 뒤 화면 터치를 막고, 스크린리더에는 "불러오는 중"을 알립니다.
- 같은 모션의 Lottie(JSON)·WebP·SVG 는 원본 폴더(`02. 디자인/motion/loading/output/`)에 있습니다. `img/loading/loading-mark-badge.gif`(심볼만) 와 `*.svg` 는 비교 단계에서 쓴 이전 파일입니다.

## 2. Skeleton 개발 가이드

**https://namiroo.github.io/kidi-aos-motion-mobile/skeleton/** — 퍼블리셔·개발자 전달용

- 원칙 · 토큰 · Primitive / Pattern 코드 · 대표 화면 4종(홈 · 목록 · 상세 · 폼) · 상태 전환 데모
- 실제로 쓸 CSS : [`skeleton/css/skeleton.css`](skeleton/css/skeleton.css) (`sk-` 접두사)
- Figma : `🗂️ Component` › Design System / Skeleton (2599:1198) · `🎨 모바일 AOS` › Skeleton UI_01~04
- 화면 예시는 퍼블리싱 저장소의 **마지막 커밋본** CSS·아이콘을 담았습니다(작업 중 변경 제외)

## 3. 모션 화면 6종

**https://namiroo.github.io/kidi-aos-motion-mobile/**

| # | 화면 ID | 모션 | 상황 |
|---|---|---|---|
| 1 | UI_CM_05_014 | 모래 (hourglass) | 인증 대기 |
| 2 | UI_CM_05_015 | 조회실패 (search-fail) | 본인확인 실패 |
| 3 | UI_CM_02_009 | 잠금 (lock) | 간편로그인 잠김 |
| 4 | UI_CM_02_014 | 계정 (account) | 휴면 계정 |
| 5 | UI_CM_02_015 | 재시도 (retry) | 비밀번호 변경 안내 |
| 6 | UI_CM_03_006 | 완료 (complete) | 회원가입 신청 접수 |

- **폰** — 실제 앱처럼 화면 전체. 헤더는 위, 버튼은 아래 고정, 가운데 본문만 스크롤. 좌우로 밀어 화면 이동, 탭하면 현재 위치(점·화면 ID)가 잠깐 표시
- **PC** — 폰 크기 프레임 + 아래 화살표 버튼 · 키보드 ← →
- 화면은 Figma 수치(헤더 56 · 버튼 48/라운드 8 · 푸터 패딩 14/16/20 · 글자 크기·행간·색)로 짠 HTML/CSS 이고, 가상 상태바는 넣지 않았습니다
- 일러스트 자리(180×180)에서 모션 스프라이트를 프레임 단위로 재생 — 프레임 길이는 `motion/icons/*.json` 의 `frameDurationsMs`
- [모션 프리뷰](https://namiroo.github.io/kidi-aos-motion-mobile/preview.html) 는 재생 속도(1× · 0.5× · 0.25×) · 키프레임만 보기 · 타이밍 표를 함께 봅니다

---

## 파일

```
loading.html                          로딩 애니메이션 최종안 데모 (접수조회 + 56×56 배지, 무한 반복)
img/loading/loading-logo-badge.gif    로딩 애니메이션 최종 파일 (심볼+AOS)
img/loading/loading-mark-badge.gif    이전안 (심볼만)
img/loading/*.svg                     비교 단계 이전 파일
skeleton/                             Skeleton 개발 가이드
  index.html                          가이드
  css/skeleton.css                    개발용 CSS
  screens/sk_*.html                   대표 화면 4종
  www/                                화면이 쓰는 퍼블 CSS·아이콘 (커밋본)
index.html                            모션 화면 6종 (화면 문구는 SCREENS 배열)
img/*-sprite.webp                     모션 스프라이트 시트
preview.html                          모션 프리뷰 (이미지 내장 단일 파일)
robots.txt                            검색 노출 차단
```

## 수정 · 반영

원본은 모두 `작업 폴더 › 2607_보험개발원 › 02. 디자인 › motion/` 에 있고, 이 저장소는 공유본입니다.

| 대상 | 원본에서 할 일 | 이 저장소에서 할 일 |
|---|---|---|
| 로딩 애니메이션 | `motion/loading/` 에서 `python3 _build_loading.py` | `output/loading-logo-badge.gif` 를 `img/loading/` 에 복사 |
| Skeleton 가이드 | `motion/skeleton/` 에서 `python3 _build_skeleton.py --pages` | (스크립트가 `skeleton/` 을 바로 갱신) |
| 모션 화면 문구 | — | `index.html` 의 `SCREENS` 배열 수정 |

그다음 커밋 · 푸시하면 1분 안팎으로 링크에 반영됩니다.

```bash
git add -A && git commit -m "갱신 내용" && git push
```

> ⚠️ 고객사(보험개발원) 시안이 포함된 **공개 저장소**입니다. 외부 공유 범위에 유의하고, 필요가 끝나면 비공개로 돌리거나 삭제하세요.
