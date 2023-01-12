List of User Endpoints:

- `POST /register`
- `POST /login`
- `POST /login-google`
- `PATCH /upgrade`
- `POST /midtrans`
- `GET /newsTechnology`
- `GET /newsPolitics`
- `GET /newsBusiness`
- `GET /newsSports`
- `GET /newsTechnology/:id`
- `GET /newsPolitics/:id`
- `GET /newsBusiness/:id`
- `GET /newsSports/:id`

## 1. POST /register

Request:

- body

```json
 {
    "email" : STRING,
    "password" : STRING,
    "status": STRING,
}
```

_Response (201 - Created)_

```json
{
    "email" : STRING,
    "password" : STRING,
    "status": STRING,
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Must be Email format"
}
OR
{
  "message": "Email already taken"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body

```json
{
  "email": STRING,
  "password": STRING
}
```

_Response (200 - OK)_

```json
{
  "access_token": STRING,
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email or Password"
}
```

&nbsp;

## 3. POST /login-google

Request:

- Sign in by Google Account

_Response (200 - OK)_

```json
{
  "access_token": STRING,
}
```

&nbsp;

## 4. PATCH /upgrade

Request:

- headers

```json
{
  "access_token": STRING
}
```

- params

```json
{
  "id": INTEGER
}
```

- body:

```json
{
  "status": STRING,
}
```

_Response (200 - OK)_

```json
{
  "message": "${foundUser.email} success updated status into ${status}"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "User not Found"
}
```

&nbsp;

## 5. POST /midtrans

Request:

- headers

```json
{
  "access_token": STRING,
  "serverKey": STRING,
}
```

_Response (200 - OK)_

```json
[
  {
    "token": STRING,
    "redirect_url": STRING
  }
]
```

&nbsp;

## 6. GET /newsTechnology

Request:

- headers

```json
{
  "access_token": STRING,
}
```

- params

```json
{
  "apiKey": STRING,
}
```

_Response (200 - OK)_

```json
[
  {
    "source": {
        "id": INTEGER,
        "name": STRING
    },
    "author": STRING,
    "title": STRING,
    "description": STRING,
    "url": STRING,
    "urlToImage": STRING,
    "publishedAt": DATE,
    "content": STRING
  }
]
```

&nbsp;

## 7. GET /newsPolitics

Request:

- headers

```json
{
  "access_token": STRING,
}
```

- params

```json
{
  "apiKey": STRING,
}
```

_Response (200 - OK)_

```json
[
  {
    "source": {
        "id": INTEGER,
        "name": STRING
    },
    "author": STRING,
    "title": STRING,
    "description": STRING,
    "url": STRING,
    "urlToImage": STRING,
    "publishedAt": DATE,
    "content": STRING
  }
]
```

&nbsp;

## 8. GET /newsBusiness

Request:

- headers

```json
{
  "access_token": STRING,
}
```

- params

```json
{
  "apiKey": STRING,
}
```

_Response (200 - OK)_

```json
[
  {
    "source": {
        "id": INTEGER,
        "name": STRING
    },
    "author": STRING,
    "title": STRING,
    "description": STRING,
    "url": STRING,
    "urlToImage": STRING,
    "publishedAt": DATE,
    "content": STRING
  }
]
```

&nbsp;

## 9. GET /newsSports

Request:

- headers

```json
{
  "access_token": STRING,
}
```

- params

```json
{
  "apiKey": STRING,
}
```

_Response (200 - OK)_

```json
[
  {
    "source": {
        "id": INTEGER,
        "name": STRING
    },
    "author": STRING,
    "title": STRING,
    "description": STRING,
    "url": STRING,
    "urlToImage": STRING,
    "publishedAt": DATE,
    "content": STRING
  }
]
```

&nbsp;

## 10. GET /newsTechnology/:id

Request:

- headers

```json
{
  "access_token": STRING,
}
```

- params

```json
{
  "apiKey": STRING,
}
```

_Response (200 - OK)_

```json
[
  {
    "source": {
        "id": INTEGER,
        "name": STRING
    },
    "author": STRING,
    "title": STRING,
    "description": STRING,
    "url": STRING,
    "urlToImage": STRING,
    "publishedAt": DATE,
    "content": STRING
  }
]
```

&nbsp;

## 11. GET /newsPolitics/:id

Request:

- headers

```json
{
  "access_token": STRING,
}
```

- params

```json
{
  "apiKey": STRING,
}
```

_Response (200 - OK)_

```json
[
  {
    "source": {
        "id": INTEGER,
        "name": STRING
    },
    "author": STRING,
    "title": STRING,
    "description": STRING,
    "url": STRING,
    "urlToImage": STRING,
    "publishedAt": DATE,
    "content": STRING
  }
]
```

&nbsp;

## 12. GET /newsBusiness/:id

Request:

- headers

```json
{
  "access_token": STRING,
}
```

- params

```json
{
  "apiKey": STRING,
}
```

_Response (200 - OK)_

```json
[
  {
    "source": {
        "id": INTEGER,
        "name": STRING
    },
    "author": STRING,
    "title": STRING,
    "description": STRING,
    "url": STRING,
    "urlToImage": STRING,
    "publishedAt": DATE,
    "content": STRING
  }
]
```

&nbsp;

## 13. GET /newsSports/:id

Request:

- headers

```json
{
  "access_token": STRING,
}
```

- params

```json
{
  "apiKey": STRING,
}
```

_Response (200 - OK)_

```json
[
  {
    "source": {
        "id": INTEGER,
        "name": STRING
    },
    "author": STRING,
    "title": STRING,
    "description": STRING,
    "url": STRING,
    "urlToImage": STRING,
    "publishedAt": DATE,
    "content": STRING
  }
]
```

&nbsp;

_Response (401 - Unauthorized)_

```json
{
  "message": "Please login first!"
}
```

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

_Response (401 - Unauthorize)_

```json
{
  "message": "Invalid Token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```