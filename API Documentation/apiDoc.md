# Restaurant App

## Endpoints

### 1. User

- POST /register
- POST /login
- POST /google-login

### 2. Game

- GET /games
- GET /games/:slug
- POST /games/:slug
- POST /midtrans-token

### 3. Transaction

- GET /transactions

---

## 1. POST /register

### Description

- Register

### Request

- body

```json
{
  "email": "string",
  "password": "string"
}
```

### Response

- 201 Created

```json
{ "access_token": "string", "email": "string" }
```

- 400 Bad Request

```json
{ "message": "Please enter your email" }
```

OR

```json
{ "message": "Please enter your password" }
```

OR

```json
{ "message": "Please use a different email" }
```

OR

```json
{ "message": "Invalid email format" }
```

OR

```json
{ "message": "Password length must be between 5 and 32 characters" }
```

---

## 2. POST /login

### Description

- Login

### Request

- body

```json
{
  "email": "string",
  "password": "string"
}
```

### Response

- 200 OK

```json
{ "access_token": "string", "email": "string" }
```

- 400 Bad Request

```json
{ "message": "Please enter your email" }
```

OR

```json
{ "message": "Please enter your password" }
```

- 401 Unauthorized

```json
{ "message": "Incorrect email or password" }
```

---

## 3. POST /google-login

### Description

- Google login

### Request

- headers

### Response

- 200 OK

```json
{ "access_token": "string", "email": "string" }
```

---

## 4. GET /games

### Description

- Get games

### Response

- 200 OK

```json
[
  {
    "id": "integer",
    "name": "string",
    "slug": "string",
    "background_image": "string"
  },
  {
    "...": "..."
  }
]
```

---

## 5. POST /games/:slug

### Description

- Get game details

### Request

- headers

### Response

- 200 OK

```json
[
  {
    "id": "integer",
    "name": "string",
    "description": "string",
    "slug": "string",
    "background_image": "string"
  },
  {
    "...": "..."
  }
]
```

---

## 6. POST /midtrans-token

### Description

- Generate transaction token

### Response

- 200 OK

```json
{
  "token": "string",
  "redirect_url": "string"
}
```

- 401 JsonWebTokenError

```json
{ "message": "Invalid token" }
```

- 401 Unauthorized

```json
{ "message": "You don't have access" }
```

---

## 7. POST /games/:slug

### Description

- Buy game

### Response

- 200 OK

```json
{
  "message": "You now own this game"
}
```

- 401 JsonWebTokenError

```json
{ "message": "Invalid token" }
```

- 401 Unauthorized

```json
{ "message": "You don't have access" }
```

---

## Global

### Response

- 500 Internal Server Error

```json
{ "message": "Internal server error" }
```

---
