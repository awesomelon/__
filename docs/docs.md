## Login

`로그인 API v1`

- **URL**

  `/v1/api/auth/login`

- **Method:**

  `POST`

- **Data Params**

  | 필드명   | 설명     | 타입   | 필수여부 |
  | -------- | -------- | ------ | -------- |
  | email    | 이메일   | string | o        |
  | password | 비밀번호 | string | o        |

- **Response**

  | 필드명       | 설명         | 타입   | 필수여부 |
  | ------------ | ------------ | ------ | -------- |
  | access_token | ACCESS_TOKEN | string | o        |

<br>

- **example**

  ```javascript
  Axios.post(`${URL}`, {
    email: 'string',
    password: 'string',
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
  ```

  ```json
  // Response
  {
    "access_token": "string"
  }
  ```

---

## Profile

`프로필 조회 API v1`

- **URL**

  `/v1/api/auth/profile`

- **Method:**

  `GET`

- **headers**

  | 필드명        | 설명         | 타입   | 필수여부 |
  | ------------- | ------------ | ------ | -------- |
  | Authorization | ACCESS_TOKEN | string | o        |

- **Response**

  | 필드명 | 설명           | 타입   | 필수여부 | 비고              |
  | ------ | -------------- | ------ | -------- | ----------------- |
  | id     | 유저 ID        | number | o        |                   |
  | email  | 유저 이메일    | string | o        |                   |
  | role   | 유저 권한      | number | o        | 0:관리자, 1: 일반 |
  | heart  | 유저 보유 하트 | number | o        |                   |

 <br>

- **example**

  ```javascript
  Axios.get(`${URL}`, {
    headers: {
      Authorization: `bearer ${ACCESS_TOKEN}`,
    },
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
  ```

  ```json
  // Response
  {
    "id": "유저 ID",
    "email": "유저 EMAIL",
    "role": 1,
    "heart": 30
  }
  ```

---

## HeartCharge

`일반 하트 충전 API v1`

- **Role**
  `일반 유저`

- **URL**

  `/v1/api/heart/normal/charging`

- **Method:**

  `POST`

- **headers**

  | 필드명        | 설명         | 타입   | 필수여부 |
  | ------------- | ------------ | ------ | -------- |
  | Authorization | ACCESS_TOKEN | string | o        |

- **Data Params**

  | 필드명 | 설명   | 타입 | 필수여부 |
  | ------ | ------ | ---- | -------- |
  | amount | 충전량 | int  | o        |

- **Response**

  | 필드명      | 설명           | 타입    | 필수여부 |
  | ----------- | -------------- | ------- | -------- |
  | id          | 일반 하트 ID   | number  | o        |
  | createdAt   | 생성일         | Date    | o        |
  | updatedAt   | 수정일         | Date    | o        |
  | isDeleted   | 삭제 여부      | boolean | o        |
  | totalAmount | 일반 하트 총량 | number  | o        |
  | userId      | 유저 ID        | number  | o        |

- **example**

```javascript
Axios.post(
  `${URL}`,
  {
    amount: 10,
  },
  {
    headers: {
      Authorization: `bearer ${ACCESS_TOKEN}`,
    },
  },
)
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err.response.data);
  });
```

```json
// response
{
  "id": 2,
  "createdAt": "2024-02-01T02:58:41.903Z",
  "updatedAt": "2024-02-01T03:06:21.261Z",
  "isDeleted": false,
  "totalAmount": 30,
  "userId": 2
}
```

---

## BonusHeartCharge

`보너스 하트 충전 API v1`

- **Role**
  `관리자 유저`

- **URL**

  `/v1/api/heart/bonus/charging`

- **Method:**

  `POST`

- **Data Params**
  | 필드명 | 설명 | 타입 | 필수여부 | 비고 |
  | ------ |--- | --- | --- | --- |
  | amount | 충전량 | number | o |
  | userId | 유저 ID | number | o | 충전 시킬 유저 ID |
  | expiredStartAt | 유효 시작 기간 | Date | o | UTC |
  | expiredEndAt | 유효 종료 기간 | Date | o | UTC |

- **Response**

  | 필드명         | 설명             | 타입    | 필수여부 |
  | -------------- | ---------------- | ------- | -------- |
  | id             | 보너스 하트 ID   | number  | o        |
  | createdAt      | 생성일           | Date    | o        |
  | updatedAt      | 수정일           | Date    | o        |
  | expiredStartAt | 유효 시작 기간   | Date    | o        |
  | expiredEndAt   | 유효 종료 기간   | Date    | o        |
  | isDeleted      | 삭제 여부        | boolean | o        |
  | totalAmount    | 보너스 하트 총량 | number  | o        |
  | userId         | 유저 ID          | number  | o        |
  | adminId        | 관리자 ID        | number  | o        |

- **example**

```javascript
Axios.post(
  `${URL}`,
  {
    userId: 2,
    expiredStartAt: '2024-02-01T10:58:53.981Z',
    expiredEndAt: '2024-02-01T10:58:53.981Z',
    amount: 100,
  },
  {
    headers: {
      Authorization: `bearer ${ACCESS_TOKEN}`,
    },
  },
)
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err.response.data);
  });
```

```json
// response
{
  "id": 1,
  "createdAt": "2024-02-01T03:02:54.286Z",
  "updatedAt": "2024-02-01T03:02:54.286Z",
  "isDeleted": false,
  "totalAmount": 100,
  "userId": 2,
  "adminId": 1,
  "expiredStartAt": "2024-02-01T10:58:53.981Z",
  "expiredEndAt": "2024-02-01T10:58:53.981Z"
}
```

---

## UseHeart

`하트 사용 API v1`

- **URL**

  `/v1/api/heart/use`

- **Method:**

  `POST`

- **Data Params**
  | 필드명 | 설명 | 타입 | 필수여부 | 추가 |
  | ------ |--- | --- | --- | --- |
  | amount | 사용 하트량 | number | o

- **Response**

  | 필드명      | 설명           | 타입   | 필수여부 |
  | ----------- | -------------- | ------ | -------- |
  | totalAmount | 남은 하트 총량 | number | o        |

- **example**

```javascript
Axios.post(
  `${URL}`,
  {
    amount: 10,
  },
  {
    headers: {
      Authorization: `bearer ${ACCESS_TOKEN}`,
    },
  },
)
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err.response.data);
  });
```

```json
// response
{
  "totalAmount": 20
}
```

---

## History

`하트 충전 내역 조회 API v1`

- **URL**

  `/v1/api/history`

- **Method:**

  `GET`

- **Data Params**
  | 필드명 | 설명 | 타입 | 필수여부 | 비고 |
  | ------ |--- | --- | --- | --- |
  | skip | SKIP | number | o |default: 0
  | limit | LIMIT | number | o |default: 10

- **Response**

  | 필드명     | 설명        | 타입                  | 필수여부 |
  | ---------- | ----------- | --------------------- | -------- |
  | totalCount | 리스트 수   | number                | o        |
  | items      | 내역 리스트 | ResponseHistoryItem[] | o        |

- **ResponseHistoryItem**
  | 필드명 | 설명 | 타입 | 필수여부 |
  | -------------- | ---------------- | ------- | -------- |
  | id | History ID | number | o |
  | createdAt | 생성일 | Date | o |
  | updatedAt | 수정일 | Date | o |
  | expiredStartAt | 보너스 하트 유효 시작 기간 | Date | x |
  | expiredEndAt | 보너스 하트 유효 종료 기간 | Date | x |
  | isDeleted | 삭제 여부 | boolean | o |
  | amount | 하트 사용 및 충전량 | number | o |
  | userId | 유저 ID | number | o |
  | adminId | 관리자 ID | number | x |
  | isUse | 하트 사용/충전 구분 | boolean | o |

- **example**

```javascript
Axios.get(`${URL}`, {
  params: {
    skip: 0,
    limit: 10,
  },
  headers: {
    Authorization: `bearer ${ACCESS_TOKEN}`,
  },
})
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err.response.data);
  });
```

```json
// response
{
  "totalCount": 1,
  "items": [
    {
      "id": 27,
      "createdAt": "2024-02-01T03:06:21.249Z",
      "updatedAt": "2024-02-01T03:06:21.249Z",
      "isDeleted": false,
      "amount": 10,
      "userId": 2,
      "adminId": null,
      "type": "heart",
      "expiredStartAt": null,
      "expiredEndAt": null,
      "isUse": false
    }
  ]
}
```

---

## **Error Response:**

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
