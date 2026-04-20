# truve - 뮤지컬 티켓팅 서비스

> 공정하고 편리한 뮤지컬 티켓팅 플랫폼

[![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

---

## 프로젝트 소개

**truve**는 뮤지컬 공연 티켓을 예매할 수 있는 웹 서비스입니다.  
가상 대기열 시스템을 통해 공정한 티켓팅 환경을 제공하며, PixiJS 기반의 인터랙티브 좌석 배치도와 Toss Payments 연동 결제 시스템을 지원합니다.

🔗 **서비스 URL**: [https://www.truve.site](https://www.truve.site)

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| 좌석 배치도 | PixiJS (WebGL 2D 렌더러) |
| 상태 관리 | Zustand |
| 서버 상태 | React Query |
| 결제 | Toss Payments SDK v2 |
| HTTP 클라이언트 | Axios |

---

## 주요 기능

### 공연 조회
- 전체 공연 목록 조회 및 필터링
- 공연 상세 정보 조회 (출연진, 일정, 장소)
- 캘린더 기반 관람일 선택
- 회차별 캐스팅 일정 조회

### 멤버십 가입
- 아티스트별 멤버십 구독
- Toss Payments 정기 결제

### 팬 포스트
- 아티스트 팬 커뮤니티 포스트
- 관람평 작성 및 태그 선택
- 좋아요 / 댓글 기능

### 티켓팅
- **가상 대기열 시스템**: 공정한 티켓팅을 위한 대기열 관리
- **캡차 인증**: 매크로 방지를 위한 캡차 검증
- **실시간 대기 순서**: 폴링 방식으로 실시간 대기 현황 표시

### 좌석 선택
- **PixiJS WebGL 기반 좌석 배치도**: 고성능 2D 렌더링
- **구역별 색상 구분**: VIP / R / S / A석 등급별 시각화
- **인터랙티브 UI**: hover, 선택, 비활성화 상태 표시
- **최대 4석 선택**: 결제하기 버튼 클릭 시 일괄 선점 API 호출
- **Heartbeat**: 좌석 선점 세션 자동 연장 (3분 주기)
- **ResizeObserver**: 화면 크기에 맞는 반응형 캔버스 스케일링

### 결제
- **Toss Payments SDK v2** 연동
- **카드 결제 / 무통장 입금** 지원
- 결제 흐름: 예매 생성 → 결제 준비 → Toss 결제 → 결제 승인
- 0원 결제 방어 로직

### 예매 관리
- 예매 목록 / 상세 조회
- 좌석별 부분 취소 지원
- 취소 수수료 실시간 조회
- 예매 취소 완료 후 환불 정보 표시

---

## 📁 폴더 구조

```
src/
├── app/                        # Next.js App Router 페이지
│   ├── (app)/                  # 레이아웃 적용 페이지
│   │   ├── mypage/bookings/    # 예매 내역 / 상세 / 취소
│   │   ├── my/profile/         # 마이페이지 / 프로필
│   │   ├── my/membership/      # 마이페이지 / 멤버십
│   │   ├── my/favorite/        # 마이페이지 / 좋아요 목록
│   │   ├── artists             # 아티스트 페이지
│   │   ├── privacy-policy      # 개인정보 수집 및 이용 약관 동의
│   │   ├── search              # 검색
│   │   ├── terms               # 전자금융거래, 서비스 이용 약관
│   │   └── shows/[showId]/     # 공연 상세 / 좌석 선택
│   ├── payments/               # 결제 / 성공 / 실패
│   ├── (auth)/                 # 인증
│   │   ├── (auth)/Oauth        # Oauth 2.0 소셜 로그인
│   │   ├── (auth)/signin/      # 로그인
│   │   └── (auth)/signup/      # 회원가입
│   ├── (chat)/                 # 실시간 채팅
├── features/                   # FSD 기반 기능별 모듈
│   ├── auth/                   # 인증 (로그인/회원가입)
│   ├── mypage/                 # 예매 내역 서비스
│   ├── payments/               # 결제 서비스
│   ├── artist/                 # 아티스트
│   ├── chat/                   # 실시간 채팅
│   ├── home/                   # 메인 화면
│   ├── my/                     # 마이 페이지
│   ├── mypage/                 # 마이 페이지 / 예매 내역
│   ├── search/                 # 검색바
│   ├── show/                   # 공연 / 좌석 관련
│   │   ├── hooks/              # useGetSeats, useSeatSelection 등
│   │   ├── services/           # seatService, showService 등
│   │   └── ui/                 # SeatCanvas, SeatMap, SeatPanel 등
│   └── ticketing/              # 대기열 / 티켓팅 스토어
│
├── shared/                     # 공통 모듈
│   ├── api/                    # axios 인스턴스 / endpoints
│   ├── stores/                 # 전역 스토어
│   ├── constants/              # 고정 상수 및 텍스트 정의
│   ├── data/                   # 아티스트 리스트, 목업 데이터
│   ├── hooks/                  # 캐러셀 페이지네이션, 사이드바, 모바일 여부 판단 취소 수수료 실시간 조회
│   ├── schemas/                # 회원가입, 로그인 스키마
│   ├── ui/                     # ui 화면
│   ├── utils/                  # 유틸 함수
│   └── types/                  # 공통 타입 정의
- 예매 취소 완료 후 환불 정보 표시
```
---

## 실행 방법

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm run start

# 린트 검사
npm run lint
```

---

## 브랜치 전략

```
main        # 프로덕션 배포 브랜치 (Vercel 자동 배포)
dev         # 개발 통합 브랜치
feat/#n-*   # 기능 개발 브랜치
```

- `feat/*` → `dev` PR & Merge
- `dev` → `main` GitHub Actions 자동 동기화 → Vercel 자동 배포

---

## 팀 구성

| 역할 | 담당 |
|------|------|
| Frontend | 박영준, 한성우, 배예진 |
| Backend | 김도현, 김예은, 양승희 |

---

## 관련 링크

- 서비스: [https://www.truve.site](https://www.truve.site)
- API 문서: [[https://api.truve.site:8080/swagger-ui/index.html](http://api.truve.site:8080/swagger-ui/index.html?urls.primaryName=02-Payment+Service)]([https://api.truve.site:8080/swagger-ui/index.html](http://api.truve.site:8080/swagger-ui/index.html?urls.primaryName=02-Payment+Service))
