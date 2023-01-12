# News API Documentation

## Endpoints :

List of available endpoints:

-   `POST /news`
-   `GET /news`
-   `PUT /news/:id`
-   `PATCH /news/:id`
-   `DELETE /news/:id`
-   `GET /news/:id`
-   `GET /categories`
-   `GET /histories`
-   `POST /users/register`
-   `POST /users/login`
-   `POST /users/google-login`

&nbsp;

## 1. POST /news

Request:

-   body:

```json
{
    "title": "string",
    "content": "text",
    "imgUrl": "string",
    "authorId": "text",
    "categoryId": "string"
}
```

_Response (201 - Created)_

```json
{
    "data": {
        "id": "integer",
        "title": "string",
        "content": "text",
        "imgUrl": "string",
        "authorId": "integer",
        "categoryId": "integer",
        "updatedAt": "date",
        "createdAt": "date"
    }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "title is required"
}
OR
{
  "message": "content is required"
}
OR
{
  "message": "category is required"
}
OR
{
  "message": "Invalid url format"
}
```

&nbsp;

## 2. GET /news

Description:

-   Get all news from database

Request:

-   headers:

```json
{
    "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "data": [
        {
            "id": "integer",
            "title": "string",
            "content": "string",
            "imgUrl": "string",
            "categoryId": "integer",
            "authorId": "integer",
            "createdAt": "date",
            "updatedAt": "date",
            "author": {
                "id": "integer",
                "username": "string",
                "email": "string",
                "role": "string",
                "phoneNumber": "string",
                "address": "string",
                "createdAt": "date",
                "updatedAt": "date"
            },
            "category": {
                "id": "integer",
                "name": "string",
                "createdAt": "date",
                "updatedAt": "date"
            }
        }
    ]
}
```

&nbsp;

## 3. PUT /news/:id

Description:

-   Update news by id

Request:

-   headers:

```json
{
    "access_token": "string"
}
```

-   params:

```json
{
    "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "message": "update succes"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "category is required"
}
OR
{
  "message": "content is required"
}
OR
{
  "message": "title is required"
}
OR
{
  "message": "Invalid url format"
}
```

&nbsp;

## 4. PATCH /news/:id

Description:

-   Update status by id

Request:

-   headers:

```json
{
    "access_token": "string"
}
```

-   params:

```json
{
    "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "message": "update status succes"
}
```

&nbsp;

## 5. DELETE /news/:id

Description:

-   Delete news by id

Request:

-   headers:

```json
{
    "access_token": "string"
}
```

-   params:

```json
{
    "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "message": "Pemilihan Kepala Desa succes to delete"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "error not found"
}
```

&nbsp;

## 6. GET /news/:id

Description:

-   Get news by id from database

Request:

-   headers:

```json
{
    "access_token": "string"
}
```

-   params:

```json
{
    "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "data": {
        "id": "integer",
        "title": "string",
        "content": "string",
        "imgUrl": "string",
        "categoryId": "integer",
        "authorId": "integer",
        "createdAt": "date",
        "updatedAt": "date",
        "author": {
            "id": "integer",
            "username": "string",
            "email": "string",
            "role": "string",
            "phoneNumber": "string",
            "address": "string",
            "createdAt": "date",
            "updatedAt": "date"
        },
        "category": {
            "id": "integer",
            "name": "string",
            "createdAt": "date",
            "updatedAt": "date"
        }
    }
}
```

&nbsp;

## 7. GET /categories

Description:

-   Get all categories from database

Request:

-   headers:

```json
{
    "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "data": [
        {
            "id": "integer",
            "name": "string",
            "createdAt": "date",
            "updatedAt": "date"
        },
        {
            "id": "integer",
            "name": "string",
            "createdAt": "date",
            "updatedAt": "date"
        },
        {
            "id": "integer",
            "name": "string",
            "createdAt": "date",
            "updatedAt": "date"
        },
        {
            "id": "integer",
            "name": "string",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ]
}
```

&nbsp;

## 8. POST /categories

Request:

-   body:

```json
{
    "name": "string"
}
```

_Response (201 - Created)_

```json
{
    "data": {
        "id": "integer",
        "name": "string",
        "updatedAt": "date",
        "createdAt": "date"
    }
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "category name is required"
}
```

&nbsp;

## 9. GET /histories

Description:

-   Get all histories from database

Request:

-   headers:

```json
{
    "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "data": [
        {
            "id": "integer",
            "title": "string",
            "description": "string",
            "updatedBy": "string",
            "createdAt": "date",
            "updatedAt": "date"
        },
        {
            "id": "integer",
            "title": "string",
            "description": "string",
            "updatedBy": "string",
            "createdAt": "date",
            "updatedAt": "date"
        },
        {
            "id": "integer",
            "title": "string",
            "description": "string",
            "updatedBy": "string",
            "createdAt": "date",
            "updatedAt": "date"
        },
        {
            "id": "integer",
            "title": "string",
            "description": "string",
            "updatedBy": "string",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ]
}
```

&nbsp;

## 10. POST /users/register

Request:

-   body:

```json
{
    "usrename": "string",
    "email": "string",
    "password": "string",
    "phoneNumber": "string",
    "address": "string"
}
```

_Response (201 - Created)_

```json
{
    "user": {
        "id": "integer",
        "username": "string",
        "email": "string",
        "password": "string",
        "phoneNumber": "string",
        "address": "string",
        "role": "string",
        "updatedAt": "date",
        "createdAt": "date"
    }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email address already in use!"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "email is required"
}
OR
{
  "message": "password is requireed"
}
OR
{
  "message": "minimum password is 5"
}
```

&nbsp;

## 11. POST /users/login

Request:

-   body:

```json
{
    "email": "string",
    "password": "string"
}
```

_Response (201 - Created)_

```json
{
    "access": "string",
    "username": "string",
    "email": "string",
    "role": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "'Invalid username, email or password'"
}
```

&nbsp;

## 12. POST /users/google-login

Request:

-   headers:

```json
{
    "email": "string",
    "password": "string"
}
```

_Response (201 - Created)_

```json
{
    "access_token": "string",
    "fullName": "string",
    "userId": "integer"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "'Invalid username, email or password'"
}
```

&nbsp;

## 13. POST /pub/google-login

Request:

-   headers:

```json
{
    "email": "string",
    "password": "string"
}
```

_Response (201 - Created)_

```json
{
    "access_token": "string",
    "fullName": "string",
    "userId": "integer"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "'Invalid username, email or password'"
}
```

&nbsp;

## 14. POST /pub/register

Request:

-   headers:

```json
{
    "email": "string",
    "password": "string"
}
```

_Response (201 - Created)_

```json
{
    "user": {
        "id": "integer",
        "username": "string",
        "email": "string",
        "password": "string",
        "phoneNumber": "string",
        "address": "string",
        "role": "string",
        "updatedAt": "date",
        "createdAt": "date"
    }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email address already in use!"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "email is required"
}
OR
{
  "message": "password is requireed"
}
OR
{
  "message": "minimum password is 5"
}
```

&nbsp;

## 15. GET /pub

Description:

-   Get all news from database

_Response (200 - OK)_

```json
[
    {
        "id": "integer",
        "title": "string",
        "content": "string",
        "imgUrl": "string",
        "categoryId": "integer",
        "authorId": "integer",
        "status": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
]
```

&nbsp;

## 16. GET /pub/favorite

Description:

-   Get all favorite news from database

_Response (200 - OK)_

Request:

-   headers:

```json
{
    "access_token": "string"
}
```

```json
{
    "id": "integer",
    "title": "string",
    "content": "string",
    "imgUrl": "string",
    "categoryId": "integer",
    "authorId": "integer",
    "status": "string",
    "createdAt": "date",
    "updatedAt": "date"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
    "message": "you don't have access"
}
```

_Response (500 - Internal Server Error)_

```json
{
    "message": "Internal server error"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "'Invalid username, email or password'"
}
```
