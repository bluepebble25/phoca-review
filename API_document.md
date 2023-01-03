# API 문서

## 목차

1. [REST Resource: Card](#rest-resource-card)
2. [Methods](#methods)
3. 메소드 설명
   - [1. getAllCards](#1-getallcards)
   - [2. getCard](#2-getcard)
   - [3. createCard](#3-createcard)
   - [4. updateCard](#4-updatecard)
   - [5. deleteCard](#5-deletecard)

## REST Resource: Card

```
{
  "id": number,
  "title": string,
  "author": string,
  "front": {
    object (FaceInfo)
  },
  "back": {
    object (FaceInfo)
  },
  "date": "2022-12-31 17:30:22"
}
```

| Fields | Type              | Description                                |
| ------ | ----------------- | ------------------------------------------ |
| id     | number            | 카드 식별자(id)                            |
| title  | string            | 카드 제목                                  |
| author | string            | 작가 혹은 감독 이름                        |
| front  | object (FaceInfo) | 앞면의 정보                                |
| back   | object (FaceInfo) | 뒷면의 정보                                |
| date   | string            | “yyyy-MM-dd HH:mm:ss” 형식의 카드 생성일자 |

### FaceInfo

카드에는 양쪽면이 있는데(front, back) FaceInfo는 각 면에 들어갈 정보들을 가지고 있다.

```
{
  "content": string,
  "background": {
	  object (BgOption)
  },
  "font": { "color": string }
}
```

| Fields     | Type              | Description                                                                  |
| ---------- | ----------------- | ---------------------------------------------------------------------------- |
| content    | string            | 카드 내용                                                                    |
| background | object (BgOption) | 카드 배경 옵션                                                               |
| font       | object            | 폰트 옵션. .현재는 색 설정 옵션밖에 없다. 색은 black, white 둘 중 하나 선택. |

### BgOption

옵션은 필수이며 셋 중 하나만 선택할 수 있다.

| Fields   | Type   | Description                                                                                        |
| -------- | ------ | -------------------------------------------------------------------------------------------------- |
| color    | string | 카드의 색깔. 미리 정해진 6가지 컬러 이름 혹은 Hex Color Code (ex - #FFFFFF)로 값을 설정할 수 있다. |
| gradient | string | 미리 정해진 5가지 그라디언트의 이름 중 하나를 설정할 수 있다.                                      |
| image    | string | 이미지가 서버에 저장된 파일명 ex) cloud1234.jpg                                                    |

### Example

```json
{
  "id": 1,
  "title": "Faust",
  "author": "Johann Wolfgang von Goethe",
  "front": {
    "content": "This is content",
    "background": { "color": "black" },
    "font": { "color": "white" }
  },
  "back": {
    "content": "Also this is content",
    "background": { "image": "cloud123456.png" },
    "font": { "color": "black" }
  },
  "date": "2022-12-31 17:30:22"
}
```

## Methods

| requests    | method | URI                   |
| ----------- | ------ | --------------------- |
| getAllCards | GET    | GET /api/cards        |
| getCard     | GET    | GET /api/cards/:id    |
| createCard  | POST   | POST /api/cards       |
| updateCard  | POST   | POST /api/cards/:id   |
| deleteCard  | DELETE | DELETE /api/cards/:id |

## 1. getAllCards

카드들을 가져온다.

### HTTP request

`GET /api/cards`

### Query parameters

| Parameters | Type   | Description                                                                                                          |
| ---------- | ------ | -------------------------------------------------------------------------------------------------------------------- |
| limit      | number | 가져올 카드의 최대 개수. default 값은 16. maximum은 32                                                               |
| page       | number | 카드를 한 번 가져오는 단위를 1페이지라고 할 때, 몇 번째 페이지를 가져올지에 대한 속성. 없다면 1 페이지부터 가져온다. |

### Request body

Request body는 비어있어야 함.

### Response body

성공한다면 Response body는 다음과 같은 구조의 JSON 데이터를 포함하고 있다.

```
{
	"message": "ok",
	"cards": [
		object (Card)
	],
	"nextPage": number,
	"totalNum": number
}
```

| Fields   | Type          | Description                         |
| -------- | ------------- | ----------------------------------- |
| cards[]  | object (Card) | 카드 목록                           |
| nextPage | number        | 다음 페이지의 인덱스                |
| totalNum | number        | 폴더에 저장되어 있는 카드의 총 개수 |

```json
{
  "message": "Parameter in the wrong format. The limit and page parameters must be numeric."
}
```

### Status code

| Status Code | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| 200         | 성공                                                         |
| 400         | 잘못된 요청 (ex - 잘못된 형식의 쿼리 파라미터를 입력한 경우) |
| 500         | 서버 내부 error                                              |

## 2. getCard

카드의 상세 정보를 가져온다.

### HTTP request

`GET /api/cards/:id`

### Path parameter

| Parameters | Type   | Description              |
| ---------- | ------ | ------------------------ |
| id         | number | 가져올 카드의 식별자(id) |

### Request body

Request body는 비어있어야 함.

### Response body

성공한다면 Response body는 Card의 인스턴스를 포함하고 있다.

```json
{
  "message": "ok",
  "result": {
    "id": 1,
    "title": "Faust",
    "author": "Johann Wolfgang von Goethe",
    "front": {
      "content": "This is content",
      "background": { "color": "black" },
      "font": { "color": "white" }
    },
    "back": {
      "content": "Also this is content",
      "background": { "image": "cloud123456.png" },
      "font": { "color": "black" }
    },
    "date": "2022-12-31 17:30:22"
  }
}
```

```json
{
  "message": "id must be a number"
}
```

```json
{
  "message": "Can't find a card with that id"
}
```

### Status code

| Status Code | Description                                      |
| ----------- | ------------------------------------------------ |
| 200         | 성공                                             |
| 400         | 잘못된 요청(ex - 잘못된 형식의 id를 입력한 경우) |
| 404         | 카드를 찾을 수 없음                              |
| 500         | 서버 내부 error                                  |

## 3. createCard

카드를 새로 생성한다.

### HTTP request

`POST /api/cards`

### Request body

전송 형식은 form-data

formData 형식으로 다음 두 가지 필드를 append해서 전송해야 한다.

file 부분은 옵션이다.

| Field | Description                                                                                                                                                                        |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| file  | 이미지 파일들을 file이라는 이름으로 formData에 추가한다.                                                                                                                           |
| data  | Card 양식에 맞춰 json 형태로 카드 정보를 담는다. 단 background.image 필드의 값은 해당 면에 배경 이미지를 첨부할 예정이면 “파일명”, 첨부하지 않을거라면 “” (빈 문자열)을 줘야 한다. |

### Response body

```json
{
  "message": "ok",
  "result": {
    "id": 1,
    "title": "Faust",
    "author": "Johann Wolfgang von Goethe",
    "front": {
      "content": "This is content",
      "background": { "color": "black" },
      "font": { "color": "white" }
    },
    "back": {
      "content": "Also this is content",
      "background": { "image": "cloud123456.png" },
      "font": { "color": "black" }
    },
    "date": "2022-12-31 17:30:22"
  }
}
```

```json
{
  "message": "There may be  missing fields or fields with the wrong data type."
}
```

### Status code

| Status Code | Description                                     |
| ----------- | ----------------------------------------------- |
| 201         | 카드 생성 성공                                  |
| 400         | 데이터 중 누락된 것이 있거나 타입이 잘못되었음. |
| 500         | 서버 내부 error                                 |

## 4. updateCard

카드 정보를 수정한다.

### HTTP request

`POST /api/cards/:id`

PUT으로 전송하지 않는 이유는 HTML Form은 PUT, DELETE, PATCH를 지원하지 않기 때문이다. Multipart/form-data 타입으로 리소스를 수정하고 싶다면 POST로 보낼 수 밖에 없다.

### Path parameter

| Parameters | Type   | Description              |
| ---------- | ------ | ------------------------ |
| id         | number | 삭제할 카드의 식별자(id) |

### Request body

전송 형식은 form-data

formData 형식으로 다음 두 가지 필드를 append해서 전송해야 한다.

- 변경

| Field | Description                                                                                                                                                                                                           |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| file  | 이미지 파일들을 file이라는 이름으로 formData에 추가한다.                                                                                                                                                              |
| data  | Card 양식에 맞춰 json 형태로 카드 정보를 담는다. 단, 모든 필드는 필수이며, 파일이 수정되지 않고 그대로라면 파일명을 그대로 담는다. 배경이미지를 삭제하고 싶다면 해당 면의 image 필드를 빈 문자열(””)로 설정하면 된다. |

### Response body

성공한다면 Response body는 변경에 성공한 카드의 정보를 Card 인스턴스 형태로 포함하고 있다.

```json
{
  "message": "ok",
  "result": {
    "id": 1,
    "title": "Faust",
    "author": "Johann Wolfgang von Goethe",
    "front": {
      "content": "This is content",
      "background": { "color": "black" },
      "font": { "color": "white" }
    },
    "back": {
      "content": "Also this is content",
      "background": { "image": "cloud123456.png" },
      "font": { "color": "black" }
    },
    "date": "2022-12-31 17:30:22"
  }
}
```

```json
{
  "message": "There may be  missing fields or fields with the wrong data type."
}
```

```json
{
  "message": "Can't find a card with that id"
}
```

### Status code

| Status Code | Description                                      |
| ----------- | ------------------------------------------------ |
| 200         | 성공                                             |
| 400         | 잘못된 요청(ex - 잘못된 형식의 id를 입력한 경우) |
| 404         | 카드를 찾을 수 없음                              |
| 500         | 서버 내부 error                                  |

## 5. deleteCard

카드를 삭제한다.

### HTTP request

`DELETE /api/cards/:id`

### Path parameter

| Parameters | Type   | Description              |
| ---------- | ------ | ------------------------ |
| id         | number | 삭제할 카드의 식별자(id) |

### Request body

Request body는 비어있어야 함.

### Response body

성공한다면 Response body는 삭제에 성공한 Card의 인스턴스를 포함하고 있다.

```json
{
  "message": "ok",
  "result": {
    "id": 1,
    "title": "Faust",
    "author": "Johann Wolfgang von Goethe",
    "front": {
      "content": "This is content",
      "background": { "color": "black" },
      "font": { "color": "white" }
    },
    "back": {
      "content": "Also this is content",
      "background": { "image": "cloud123456.png" },
      "font": { "color": "black" }
    },
    "date": "2022-12-31 17:30:22"
  }
}
```

```json
{
  "message": "id must be a number"
}
```

```json
{
  "message": "Can't find a card with that id"
}
```

### Status code

| Status Code | Description                                      |
| ----------- | ------------------------------------------------ |
| 200         | 성공                                             |
| 400         | 잘못된 요청(ex - 잘못된 형식의 id를 입력한 경우) |
| 404         | 카드를 찾을 수 없음                              |
| 500         | 서버 내부 error                                  |

## 이미지 불러오는 법

이미지 불러오는 방법

React에서

src=`http://localhost:5000/uploads/images/ + ${파일명}`

URL 예시

`http://localhost:5000/uploads/images/1667810833244_bird.jpg`
