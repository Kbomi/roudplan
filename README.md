<p align="center">
  <img src="public/logo.png" width="96" alt="하루시계 로고" />
</p>

<h1 align="center">하루시계</h1>

<p align="center">
  손그림 감성의 원형 시계로 하루를 계획하고 기록하는 웹 앱
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-111111?style=flat-square&amp;logo=nextdotjs" />
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&amp;logo=react&amp;logoColor=111111" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&amp;logo=typescript&amp;logoColor=white" />
  <img alt="No Login" src="https://img.shields.io/badge/Login-Not_required-8BC34A?style=flat-square" />
</p>

하루시계는 로그인이나 서버 저장 없이 바로 사용할 수 있습니다. 완성한 결과물은 PNG 이미지로 저장하거나 프린트해 보관합니다.

![하루시계 미리보기](public/clock-image.png)

## 서비스 개요

하루시계는 24시간을 원형 시계 형태로 나누어 생활 패턴을 시각화하는 도구입니다. 파스텔 컬러, 손그림 느낌의 SVG 필터, 귀여운 스티커를 조합해 SNS나 프린트물로 공유하기 좋은 결과물을 만드는 데 초점을 둡니다.

| 항목 | 내용 |
| --- | --- |
| 프로젝트명 | 생활계획표, roundplan |
| 서비스명 | 하루시계 |
| 컨셉 | 손그림 감성의 원형 시계 기반 계획/기록 웹 앱 |
| 저장 방식 | 로그인 없음, 서버 저장 없음, 이미지 저장/프린트 중심 |
| 주요 채널 | 육아 인스타, 맘카페, 자기계발 SNS, 초등생 부모 커뮤니티 |

## 주요 기능

- 24시간 원형 시계 미리보기
- 30분 단위의 시작/종료 시간 입력
- 활동 이름과 카테고리별 파스텔 컬러 선택
- 추가한 구간의 수정, 삭제, 전체 초기화
- 스티커 추가, 드래그 이동, 크기 조절, 삭제
- 하루기록표와 아기냠냠표의 자동 한 줄 총평
- PNG 이미지 내보내기
- 프린트용 화면 출력
- 모바일 저장/공유 흐름 대응

## 세 가지 템플릿

| 탭 | 용도 | 대표 카테고리 |
| --- | --- | --- |
| 생활계획표 | 방학 계획, 일과표, 아이 생활 루틴 만들기 | 수면, 식사, 공부, 여가, 운동, 이동 |
| 하루기록표 | 오늘 하루를 돌아보고 SNS에 공유하기 | 수면, 식사, 일/공부, 여가, 운동, 카페/휴식 |
| 아기냠냠표 | 수유, 이유식, 낮잠 등 아기 하루 루틴 기록 | 수유, 이유식, 낮잠, 밤잠, 목욕, 기저귀, 놀이 |

## 사용 흐름

1. 상단 탭에서 만들고 싶은 템플릿을 선택합니다.
2. 이름을 입력하면 결과물 제목에 반영됩니다.
3. 시작 시간, 종료 시간, 활동 이름, 색상을 선택해 구간을 추가합니다.
4. 필요한 경우 스티커를 올리고 위치와 크기를 조정합니다.
5. 완성된 원형 시계를 이미지로 저장하거나 프린트합니다.

## 기술 스택

| 영역 | 기술 |
| --- | --- |
| Framework | Next.js 16 |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS 4, CSS Variables, inline style |
| Graphic | SVG, custom arc math, sketch filter |
| Export | modern-screenshot |
| Tooling | ESLint, npm |

## 프로젝트 구조

```text
src/
  app/
    life-plan/       생활계획표 페이지
    daily-record/    하루기록표 페이지
    baby-feed/       아기냠냠표 페이지
  components/
    Clock/           원형 시계와 스티커 오버레이
    Editor/          편집 화면 조합
    Panel/           구간 입력, 목록, 스티커 트레이
    ActionBar/       초기화, 프린트, 이미지 내보내기
    Header/          탭 네비게이션
  constants/         탭, 카테고리, 색상, 스티커 데이터
  hooks/             구간/스티커 상태 관리
  utils/             시계 계산, 총평 생성, 이미지 내보내기
  types/             공통 타입
```

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열면 `/life-plan` 페이지로 이동합니다.

## 스크립트

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | ESLint 검사 |

## 구현 메모

- 홈 경로(`/`)는 기본 서비스인 `/life-plan`으로 리다이렉트됩니다.
- 내보내기 대상은 `clock-export-area` DOM이며, UI 버튼과 광고 영역은 이미지 캡처에서 제외됩니다.
- iOS 환경에서는 캔버스 변환 흐름을 사용해 이미지 저장 안정성을 높입니다.
- 모바일에서는 프린트 버튼을 숨기고, 저장/공유 흐름을 우선합니다.
- 서버 저장 없이 동작하므로 완성본은 사용자가 직접 이미지 또는 출력물로 보관합니다.
