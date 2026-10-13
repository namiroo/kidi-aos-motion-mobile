# 보험개발원 모바일 AOS · 모션 화면 뷰어

보험개발원 대물보상 모바일 AOS의 모션 아이콘 6종을 실제 화면에 얹어 폰에서 확인하는 페이지입니다.

## 🔗 보기

**https://namiroo.github.io/kidi-aos-motion-mobile/**

| 페이지 | 링크 | 내용 |
|---|---|---|
| 모바일 화면 | https://namiroo.github.io/kidi-aos-motion-mobile/ | 6개 화면을 실제 앱처럼 폰에서 확인 |
| 로딩 애니메이션 | https://namiroo.github.io/kidi-aos-motion-mobile/loading.html | 접수조회 화면 가운데 60px 흰 원 배지 안에 로딩 로고 재생 (Figma 2594:22011·22013) — 심볼만 / 로고+AOS 전환, 검색·다시 보기로 재생 |
| 모션 프리뷰 | https://namiroo.github.io/kidi-aos-motion-mobile/preview.html | 모션 아이콘 6종 확인 — 재생 속도(1× · 0.5× · 0.25×) · 키프레임만 보기 · 화면 적용 · 타이밍 표 |

- 로그인 없이 누구나 열 수 있습니다. 링크를 아는 사람만 접근하도록 검색 노출은 막아 두었습니다(`noindex`).
- **폰** — 실제 앱처럼 화면 전체를 씁니다. 헤더는 위, 버튼은 아래에 고정되고 가운데 본문만 필요할 때 스크롤됩니다. 좌우로 밀어 다른 화면으로 이동하고, 화면을 탭하면 현재 위치(점·화면 ID)가 잠깐 표시됩니다.
- **PC** — 폰 크기 프레임 안에 표시되고, 아래 화살표 버튼이나 키보드 ← → 로 이동합니다.
- 어느 해상도에서도 브라우저 주소창·툴바를 뺀 실제 보이는 높이에 맞춰 배치됩니다.

## 화면 구성

| # | 화면 ID | 모션 | 상황 |
|---|---|---|---|
| 1 | UI_CM_05_014 | 모래 (hourglass) | 인증 대기 |
| 2 | UI_CM_05_015 | 조회실패 (search-fail) | 본인확인 실패 |
| 3 | UI_CM_02_009 | 잠금 (lock) | 간편로그인 잠김 |
| 4 | UI_CM_02_014 | 계정 (account) | 휴면 계정 |
| 5 | UI_CM_02_015 | 재시도 (retry) | 비밀번호 변경 안내 |
| 6 | UI_CM_03_006 | 완료 (complete) | 회원가입 신청 접수 |

화면은 이미지가 아니라 Figma `🎨 모바일 AOS` 시안의 수치(헤더 56 · 버튼 48/라운드 8 · 푸터 패딩 14/16/20 · 텍스트 크기·행간·색상)로 짠 HTML/CSS 입니다. 상태바(가상 status bar)는 넣지 않았습니다. 일러스트 자리(180×180)에서 모션 스프라이트를 프레임 단위로 재생하며, 프레임별 길이는 `motion/icons/*.json` 의 `frameDurationsMs` 를 그대로 따릅니다.

## 파일

```
index.html            화면 마크업·스타일·재생 로직 (화면 문구는 SCREENS 배열)
preview.html          모션 프리뷰 (이미지 내장 단일 파일, 원본: 02. 디자인/motion/preview/preview.html)
img/*-sprite.webp     모션 스프라이트 시트
loading.html          로딩 애니메이션 화면 적용 데모 (접수조회)
img/loading/*.svg     로딩 로고 애니메이션 (배경 투명, 생성: 04.바이브코딩/kidi_aos_mobile_260903/_build_loading.py)
robots.txt            검색 노출 차단
```

## 수정·반영

1. 문구·버튼이 바뀌면 `index.html` 의 `SCREENS` 배열(헤더 · 제목 · 설명 · 버튼)을 고칩니다. 공통 스타일은 상단 `:root` 토큰에 있습니다.
2. 커밋 후 `main` 에 push 하면 1분 안팎으로 위 링크에 반영됩니다.

```bash
git add -A && git commit -m "화면 갱신" && git push
```

> 고객사(보험개발원) 시안이 포함된 공개 저장소입니다. 외부 공유 범위에 유의하고, 필요가 끝나면 저장소를 비공개로 돌리거나 삭제하세요.
