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

## 2. 실행

```bash
$ docker compose up -d
```

<br >

## 3. API 명세

실행 후 http://localhost:9876/docs 에서 확인 가능

<br >

## 4. Task List

- [x] 프로젝트 환경 세팅
- [x] 실행 시 운영 계정, 일반 계정 생성
- [x] 로그인 API
- [x] 유저 권한 분리 (운영자, 일반 유저)
- [ ] 유저 잔여 하트 조회 API
- [ ] 유저 일반 하트 충전 API
- [ ] 유저 보너스 하트 충전 API
- [ ] 유저 하트 사용 API
- [ ] 유저 하트 충전 내역 조회 API
