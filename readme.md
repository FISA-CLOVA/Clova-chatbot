# 🤖 NCP CLOVA 연동 챗봇 서비스 (Chatbot Project)

> **네이버 클라우드 플랫폼(NCP)의 CLOVA Chatbot API**를 활용하여 사용자와 실시간 대화가 가능한 웹 기반 채팅 서비스를 구현한 프로젝트입니다.

---

## ## 1. 프로젝트 주요 기능

* **초기 메시지 로드**: 페이지 접속 시 `/start` 엔드포인트를 호출하여 클로바 챗봇의 웰컴 메시지를 자동으로 불러옵니다.
* **실시간 대화 지원**: 사용자의 입력을 `/ask` 엔드포인트를 통해 챗봇에 전달하고 실시간 답변을 처리합니다.
* **사용자 편의 UI/UX**:
    * **자동 스크롤**: 새 메시지 생성 시 채팅창 하단으로 즉시 포커싱됩니다.
    * **스마트 시간 표기**: `now()` 함수를 통해 '오전/오후 HH:mm' 형식으로 메시지 시간을 기록합니다.
    * **한글 입력 최적화**: `isComposing` 상태 체크를 통해 한글 입력 시 엔터 키 중복 전송 문제를 방지했습니다.

---

## ## 2. 기술 스택 및 구조

| 분류 | 기술 | 상세 내용 |
| :--- | :--- | :--- |
| **Frontend** | **Vanilla JavaScript** | DOM 조작 및 Fetch API 기반 비동기 통신 |
| **Backend** | **Node.js (Express)** | 클라이언트와 NCP API 사이의 중계 서버 구축 |
| **API 통신** | **Superagent** | 서버 측에서 NCP CLOVA Chatbot API 호출 수행 |
| **보안/인증** | **Crypto-js** | HMAC SHA256 알고리즘 기반 API Signature 생성 |
| **환경 설정** | **Dotenv** | API URL 및 Secret Key 등 보안 민감 정보 관리 |

---

## ## 3. 설치 및 실행 방법

### ### 1) 필수 환경 변수 설정 (`.env`)
프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 아래 형식을 입력합니다. (보안을 위해 `.gitignore`에 등록되어 있습니다.)

```env
SECRET_KEY=여러분의_NCP_SECRET_KEY
INVOKE_URL=여러분의_CLOVA_INVOKE_URL
