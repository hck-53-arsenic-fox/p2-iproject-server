# News API Documentation

## Endpoints :

List of available endpoints:

-   `POST /customer/register`
-   `POST /customer/login`
-   `GET /customer`
-   `GET /customer/categories`
-   `GET /customer/categories/:id`
-   `GET /customer/detail/:id`
-   `GET /customer/cost`
-   `GET /customer/province`
-   `GET /customer/city/:id`
-   `POST /customer/generate-midtrans-token`
-   `GET /customer/order`
-   `POST /cutomer/buy/:id`

&nbsp;

## 1. POST /customer/register

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
        "name": "string",
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

## 2. POST /customer/login

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
    "access_token": "string",
    "name": "string",
    "email": "string",
    "role": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "'Invalid email or password'"
}
```

&nbsp;

## 3. GET /customer

Description:

-   Get all news from database

_Response (200 - OK)_

```json
{
    "totalPage": 1,
    "data": [
        {
            "id": "integer",
            "name": "string",
            "size": "string",
            "stock": "integer",
            "description": "text",
            "price": "integer",
            "CategoryId": "integer",
            "imageUrl": "string",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ]
}
```

&nbsp;

## 4. GET /categories

Description:

-   Get all categories from database

Request:

_Response (200 - OK)_

```json
{
    "data": [
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

## 5. GET /categories/:id

Description:

-   Get all news by categories id

Request:

-   params:

```json
{
    "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "id": "integer",
    "name": "string",
    "createdAt": "date",
    "updatedAt": "date",
    "Products": [
        {
            "id": "integer",
            "name": "string",
            "size": "string",
            "stock": "integer",
            "description": "text",
            "price": "integer",
            "CategoryId": "integer",
            "imageUrl": "string",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ]
}
```

_Response (404 - Not Found)_

```json
{
    "message": "error not found"
}
```

&nbsp;

## 6. GET /customer/detail/:id

Description:

-   Get product by id from database

Request:

-   headers:
    ``

-   params:

```json
{
    "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "id": "integer",
    "name": "string",
    "size": "string",
    "stock": "integer",
    "description": "text",
    "price": "integer",
    "CategoryId": "integer",
    "imageUrl": "string",
    "createdAt": "date",
    "updatedAt": "date",
    "Category": {
        "id": "integer",
        "name": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

&nbsp;

## 7. GET /customer/cost

Description:

-   Get cost from 3 party api raja ongkir

Request:

-   headers:

```json
{
    "access_token": "string",
    "key": "string"
}
```

-   body:

```json
{
    "origin": "501",
    "destination": "114",
    "weight": "1700",
    "courier": "jne"
}
```

_Response (200 - OK)_

```json
{
    "rajaongkir": {
        "query": {
            "origin": "501",
            "destination": "114",
            "weight": 1700,
            "courier": "jne"
        },
        "status": {
            "code": 200,
            "description": "OK"
        },
        "origin_details": {
            "city_id": "501",
            "province_id": "5",
            "province": "DI Yogyakarta",
            "type": "Kota",
            "city_name": "Yogyakarta",
            "postal_code": "55000"
        },
        "destination_details": {
            "city_id": "114",
            "province_id": "1",
            "province": "Bali",
            "type": "Kota",
            "city_name": "Denpasar",
            "postal_code": "80000"
        },
        "results": [
            {
                "code": "jne",
                "name": "Jalur Nugraha Ekakurir (JNE)",
                "costs": [
                    {
                        "service": "OKE",
                        "description": "Ongkos Kirim Ekonomis",
                        "cost": [
                            {
                                "value": 38000,
                                "etd": "4-5",
                                "note": ""
                            }
                        ]
                    },
                    {
                        "service": "REG",
                        "description": "Layanan Reguler",
                        "cost": [
                            {
                                "value": 44000,
                                "etd": "2-3",
                                "note": ""
                            }
                        ]
                    },
                    {
                        "service": "SPS",
                        "description": "Super Speed",
                        "cost": [
                            {
                                "value": 349000,
                                "etd": "",
                                "note": ""
                            }
                        ]
                    },
                    {
                        "service": "YES",
                        "description": "Yakin Esok Sampai",
                        "cost": [
                            {
                                "value": 98000,
                                "etd": "1-1",
                                "note": ""
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
```

&nbsp;

## 8. GET /customer/provinces

Request:

-   headers:

```json
{
    "access_token": "string",
    "key": "string"
}
```

-   query:

```json
{
    "id": "integer"
}
```

_Response (200 - Ok)_

```json
{
    "rajaongkir": {
        "query": {
            "id": "12"
        },
        "status": {
            "code": 200,
            "description": "OK"
        },
        "results": {
            "province_id": "12",
            "province": "Kalimantan Barat"
        }
    }
}
```

_Response (400 - Bad Request)_

```json
{
    "rajaongkir": {
        "status": {
            "code": 400,
            "description": "Invalid key."
        }
    }
}
```

&nbsp;

## 9. GET /city/:id

Description:

-   Get all city with province id from raja ongkir

Request:

-   headers:

```json
{
    "access_token": "string",
    "key": "string"
}
```

_Response (200 - OK)_

````json
{
    "data": [
        {
            "city_id": "27",
            "province_id": "2",
            "province": "Bangka Belitung",
            "type": "Kabupaten",
            "city_name": "Bangka",
            "postal_code": "33212"
        },
        {
            "city_id": "28",
            "province_id": "2",
            "province": "Bangka Belitung",
            "type": "Kabupaten",
            "city_name": "Bangka Barat",
            "postal_code": "33315"
        },
        {
            "city_id": "29",
            "province_id": "2",
            "province": "Bangka Belitung",
            "type": "Kabupaten",
            "city_name": "Bangka Selatan",
            "postal_code": "33719"
        },
        {
            "city_id": "30",
            "province_id": "2",
            "province": "Bangka Belitung",
            "type": "Kabupaten",
            "city_name": "Bangka Tengah",
            "postal_code": "33613"
        },
        {
            "city_id": "56",
            "province_id": "2",
            "province": "Bangka Belitung",
            "type": "Kabupaten",
            "city_name": "Belitung",
            "postal_code": "33419"
        },
        {
            "city_id": "57",
            "province_id": "2",
            "province": "Bangka Belitung",
            "type": "Kabupaten",
            "city_name": "Belitung Timur",
            "postal_code": "33519"
        },
        {
            "city_id": "334",
            "province_id": "2",
            "province": "Bangka Belitung",
            "type": "Kota",
            "city_name": "Pangkal Pinang",
            "postal_code": "33115"
        }
    ]
}```

&nbsp;

## 10. POST /customer/buy/:id

Request:
-   headers:

```json
{
    "access_token": "string",
    "userid": "string"
}
````

-   body:

```json
{
    "message": "berhasil melakukan checkout"
}
```

_Response (201 - Created)_

```json
{
    "order": {}
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
