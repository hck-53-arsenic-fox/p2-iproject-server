# NeighborHud API Documentation

## Endpoints :

List of available endpoints:

- `POST /users/register`

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
  "image": "string"
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
