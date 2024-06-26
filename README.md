# ThingsFlow 사전과제

## 1. 환경

- Node: v20.11.0 (LTS)
- PostgreSQL: latest
- Docker v20.10.21

### 계정 정보

- 운영 계정

  - ID: admin@thigsflow.com
  - PW: 1234

- 일반 계정

  - ID: test@thigsflow.com
  - PW: 1234

<br >

## 2. 구조

- src
  - auth: 로그인, 유저 정보 조회
  - user: 유저 정보 조회
  - heart: 일반 하트 충전, 사용
  - bonusHeart: 보너스 하트 충전, 사용
  - history: 하트 충전 내역 조회
  - common: 공통 모듈
  - database: 데이터베이스 모듈

### 2-1. ERD

![ERD](./assets/cover.png)

## 3. 실행

```bash
$ docker compose up -d
```

<br >

## 4. API 명세

- http://localhost:9876/docs (Document)
- http://localhost:9876/swagger (Swagger)

<br >

## 5. 에러 코드

- TF001: 잘못된 이메일 형식입니다.
- TF002: 잘못된 비밀번호 형식입니다.
- TF003: 존재하지 않는 계정입니다.
- TF004: 존재하지 않는 이메일입니다. 이메일을 확인해 주세요.

- TF400: 권한이 없습니다.
- TF440: 하트 충전은 정수형이어야 합니다.
- TF441: 하트 충전은 0보다 커야 합니다.
- TF442: 보너스 하트 유효 시작 시간은 종료 시간 이전이여야 합니다.
- TF443: 보너스 하트 유효 종료 시간은 현재 시간 이후여야 합니다.
- TF444: 잔여 하트가 부족합니다.
- TF445: 하트 사용은 0보다 커야 합니다.
- TF446: 하트 사용은 정수형이여야 합니다.

- TF554: 잘못된 요청입니다.
- TF555: 서버 오류입니다. 관리자에게 문의주세요

## 6. Todo List

- [x] 프로젝트 환경 세팅
- [x] 실행 시 운영 계정, 일반 계정 생성
- [x] 로그인 API
- [x] 유저 권한 분리 (운영자, 일반 유저)
- [x] 유저 잔여 하트 조회 API
- [x] 유저 일반 하트 충전 API
- [x] 유저 보너스 하트 충전 API
- [x] 유저 하트 사용 API
- [x] 유저 하트 충전 내역 조회 API
- [x] 테스트 케이스 작성
- [ ] 로그
