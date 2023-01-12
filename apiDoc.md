# KPP API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /profile`
- `POST /subscription`
- `POST /generate-midtrans-token`
- `GET /fighters`
- `GET /events`
- `GET /logs`
- `GET /youtube`
- `GET /fighters/:id`

&nbsp;

# 1. POST /register

Request: 

- body:

```json
{
    "username": "string",
    "email": "string",
    "password": "string"
}
```

_Response (201 - Created)_

```json
{
    "id": "integer",
    "username": "string",
    "password": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email has been used"
}
OR
{
  "message": "Email cannot be empty"
}
OR
{
  "message": "Username cannot be empty"
}
OR
{
  "message": "Password cannot be empty"
}
OR
{
  "message": "Please use format email"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```
_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email has been used"
}
OR
{
  "message": "Email cannot be empty"
}
OR
{
  "message": "Password cannot be empty"
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

## 3. GET /profile

request:

- headers:

```json
{
  "access_token": "<your access token>"
}
```

_Response (200 - OK)_

```json
{
    "id": "integer",
    "username": "string",
    "email": "string",
    "password": "string",
}
```

_Response (401 - JsonWebTokenError)_

```json
{
  "message": "Invalid Token"
}
```

_Response (500 - Internal Server Error)_

```json
{ 
    "message": "Internal Server Error" 
}
```