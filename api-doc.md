# NeighborHud API Documentation

## Endpoints :

List of available endpoints:

- `POST /users/register`
- `POST /users/login`
- `GET /users`
- `GET /users/search`
- `GET /bills`
- `PATCH /bills/:id`
- `GET /generateMidtrans/:id`

&nbsp;

## 1. POST /users/register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "homeNumber": "string",
  "image": "file"
}
```

_Response (201 - OK)_

```json
{
  "user": {
    "id": "integer",
    "username": "string",
    "email": "string",
    "password": "string",
    "homeNumber": "string",
    "image": "string",
    "updatedAt": "string",
    "createdAt": "string"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Image cannot be empty"
}
OR
{
  "message": "Image cannot null"
}
OR
{
  "message": "Home Number cannot be empty"
}
OR
{
  "message": "Home Number cannot null"
}
OR
{
  "message": "Username cannot be empty"
}
OR
{
  "message": "Username cannot null"
}
OR
{
    "message": "Email must be unique"
}
OR
{
  "message": "Email cannot be empty"
}
OR
{
  "message": "Email cannot null"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "password cannot be empty"
}
OR
{
  "message": "password cannot null"
}
OR
{
  "message": "Password only allow with alphanumeric characters"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 2. POST /users/login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email Required"
}
OR
{
  "message": "Password Required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 3. GET /users

Request:

- Headers
  ```json
  {
    "access_token": "string"
  }
  ```

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "username": "string",
    "email": "string",
    "homeNumber": "string",
    "image": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Unauthenticated"
}
OR
{
    "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 4. GET /users/search

Request:

- Headers
  ```json
  {
    "access_token": "string"
  }
  ```
- Query

```json
{
  "name": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "username": "string",
    "email": "string",
    "password": "string",
    "homeNumber": "string",
    "image": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Unauthenticated"
}
OR
{
    "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 5. GET /bills

Request:

- Headers
  ```json
  {
    "access_token": "string"
  }
  ```

_Response (200 - OK)_

```json
{
  "userBill": [
    {
      "id": "integer",
      "UserId": "integer",
      "BillId": "integer",
      "status": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "User": {
        "id": "integer",
        "username": "string",
        "email": "string",
        "password": "string",
        "homeNumber": "string",
        "image": "string",
        "createdAt": "string",
        "updatedAt": "string"
      },
      "Bill": {
        "id": "integer",
        "month": "string",
        "amount": "integer",
        "description": "string",
        "createdAt": "string",
        "updatedAt": "string"
      }
    }
  ]
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Unauthenticated"
}
OR
{
    "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 6. PATCH /bills/:id

_Response (200 - OK)_

```json
{
  "message": "string"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 7. POST /generateMidtrans/:id

Request:

- Headers
  ```json
  {
    "access_token": "string"
  }
  ```

_Response (200 - OK)_

```json
{
  "midtransToken": {
    "token": "string",
    "redirect_url": "string"
  },
  "userId": "integer"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Unauthenticated"
}
OR
{
    "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;
