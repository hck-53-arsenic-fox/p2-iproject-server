# IKIAA API Documentaion

## Endpoints:

List of available endpoints:

    - `POST /register`
    - `POST /login`
    - `POST /google`
    - `GET /artworks`
    - `GET /exhibitions`
    - `POST /generate-midtrans-token/:eventId`
    - `POST /transaction/:eventId`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "email": "string (required)",
  "password": "string (required)"
}
```

Response (201 - Created)

```json
{
  "id": "integer",
  "email": "string"
}
```

Response (400 - Bad Request)

```json
{
"message": [
"Email is required"
]
}
OR
{
"message": [
"Password is required"
]
}
```

## 2. POST /login

Request:

- body:

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

Response (200 - OK)

```json
{
  "id": "integer",
  "access_token": "string",
  "email": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email or password is required"
}
Response (401 - Unauthorized)
{
  "message": "Invalid email or password"
}
```

## 3. POST /google

Request:

- head:

```json
{
  "google_auth_token": "string"
}
```

Response (201 - Created) -OR- Response (200 - OK)

```json
{
  "access_token": "string",
  "username": "string",
  "id": "integer"
}
```

## 4.GET /artworks

Request:

- headers:

  ```json
  {
    "access_token": "string"
  }
  ```

_Response (200 - OK)_

```json
{
  "pagination": {
    "total": 118967,
    "limit": 100,
    "offset": 100,
    "total_pages": 1190,
    "current_page": 2,
    "prev_url": "https://api.artic.edu/api/v1/artworks?page=1&limit=100",
    "next_url": "https://api.artic.edu/api/v1/artworks?page=3&limit=100"
  },
  "data": [
    {
      "id": 31509,
      "imgUrl": "https://www.artic.edu/iiif/2/10b46328-99fd-2eac-6ad8-9b9869c8bcd6/full/843,/0/default.jpg",
      "title": "Le Tombeau de Voltaire (Voltaire's Tomb) (Furnishing Fabric)",
      "artist": "Pierre Dubern et Cie.",
      "description": "Cotton, plain weave; copperplate printed"
    }
  ]
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 5.GET /exhibitions

Description:

- Get all exhibitions from database

Request:

- headers:

  ```json
  {
    "access_token": "string"
  }
  ```

  _Response (200 - OK)_

  ```json
  [
    {
      "id": 1,
      "title": "Nothing",
      "artist": "FAZA FIRNANDA",
      "description": "Nothing",
      "image": "Nothing",
      "date": "2023-09-09T00:00:00.000Z",
      "price": 25000,
      "createdAt": "2023-01-11T15:02:48.590Z",
      "updatedAt": "2023-01-11T15:02:48.590Z"
    }
  ]
  ```

&nbsp;

## 6.POST /generate-midtrans-token/:eventId

Description:

- Get all categories from database

Request:

- headers:

  ```json
  {
    "access_token": "string"
  }
  ```

- params :

  ```json
  {
    "eventId": "integer"
  }
  ```

  _Response (200 - OK)_

  ```json
  {
    "token": "string",
    "redirect_url": "string"
  }
  ```

&nbsp;

## 7.POST /transaction/:eventId

Description:

- Create Transaction with id exhibitions

Request:

- headers:

  ```json
  {
    "access_token": "string"
  }
  ```

- params:

  ```json
  {
    "eventId": "integer (required)"
  }
  ```

  _Response (500 - Internal Server Error)_

  ```json
  {
    "message": "Internal server error"
  }
  ```

&nbsp;

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "message": "Unauthenticated"
  }
  ```

## Global Error

Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```
