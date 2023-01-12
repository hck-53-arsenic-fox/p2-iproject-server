# Blog API Documentation - Customer

## Deployed Server:

- resoria-backend-production.up.railway.app

## Endpoints :

List of available endpoints:

- `POST /users/register`
- `POST /users/login`
- `GET /resorts/posts`
- `GET /resorts/id`
- `POST /resorts/`

&nbsp;

## 1. POST /users/register

Request:

- body:

```json
{
  "email": "string",
  "name": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "name": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /users/register

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
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /courses

Description:

- Get all resorts from database

_Response (200 - OK)_

```json
[
      {
        "id": 1,
        "title": "Tranquility Base Hotel & Casino",
        "price": 700000,
        "description": "A place where you can enjoy your stay and spend your money!",
        "location": "Kebayoran Baru, Jakarta Selatan",
        "geometry": {
            "type": "Point",
            "coordinates": [
                106.79833581810604,
                -6.24501016331349
            ]
        },
        "imageUrl": "https://media.istockphoto.com/id/1213840216/photo/luxury-travel-romantic-couple-in-beach-hotel.jpg?b=1&s=612x612&w=0&k=20&c=io3av54KBbpkMIv8yKOIwINbA-NPfZ9PE3Ee5AaE1CA=",
        "UserId": 1,
        "createdAt": "2023-01-12T04:15:56.169Z",
        "updatedAt": "2023-01-12T04:15:56.169Z",
        "User": {
            "id": 1,
            "username": "faldi",
            "email": "faldi@mail.com",
            "password": "$2b$10$4hzRNpPjAsENOvCEHUxliu3FFm9UW6zWyeYx46Aix4menpQUSJ0GK",
            "createdAt": "2023-01-12T04:15:56.013Z",
            "updatedAt": "2023-01-12T04:15:56.013Z"
        }
    },
  ...,
]
```

&nbsp;

## 4. POST /resorts/:id

Description:

- Create new resorts

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
  "id": 2,
  "UserId": 1,
  "CourseId": 2,
  "status": "Uncompleted",
  "Course": {
    "title": "REST API",
    "instructor": "Edison",
    "day": "Wednesday,Friday",
    "imageUrl": "https://billwerk.io/wp-content/uploads/sites/2/2019/05/icons-restapi-350x350.png"
  }
}
```

&nbsp;
