# ENBI E Web API Documentation

## Endpoints :

### Endpoints
List of available endpoints:

- `POST /users/register`
- `POST /users/login`
- `POST /google-login`
- `GET /users/following`
- `PATCH /users/status`
- `POST /users/MidtransToken`
- `GET /users/:username`
- `POST /users/:PlayerId`


&nbsp;

## 1. POST /users/register

Description:
- Create a new user

Request:
- body:

```json
{
  "username": "string",
  "email":"string",
  "password":"string",
  "imgProfile":"string",
}
```
_Response (201 - Created)_

```json
{
    "message": "Your account has been created!",
    "data": {
        "id": 3,
        "username": "dua",
        "email": "dua@mail.com"
    }
}
```

_Response (400 - Error)_

```json
{
  "message": "Username is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Invalid email/password"
}
```
&nbsp;

## 2. POST /users/login

- body:

```json
{
  "email":"string",
  "password":"string""
}
```
_Response (200)_

```json
{
  "username": "string",
  "access_token": "string",
}
```

_Response (400 - Error)_

```json
{
  "message": "Email is email"
}
OR
{
  "message": "Password is password"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. POST /users/login-google

Request: 
 - Login google

_Response (200 - OK)_

```json
{
  "access_token": String,
}
```

&nbsp;

## 4. GET /users/following

Description:
- Get all users following (favorite player) from database

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
        "title": "Noroi The Curse",
        "synopsis": "Noroi The Curse adalah film horor dokumenter asal Jepang yang dibintangi oleh Jin Muraki. Tayang di ANTV pada Jumat (9/12/2022) pukul 23:30 WIB.",
        "trailerUrl": "https://www.youtube.com/watch?v=NyUFYC8zn9w",
        "imgUrl": "http://placekitten.com/200/300",
        "rating": 4,
        "genreId": 1,
        "authorId": 1
    }
]
```

&nbsp;

## 5. PATCH /users/status

Description:
- Edit status user from Regular to Pro

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
    "message": "Account with username satu upgraded to Pro Membership"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "User not found"
}
```

&nbsp; 

## 6. POST /users/MidtransToken

Description:
- Post midtrans token

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
    "token": "f8bf535c-5c50-47f6-9d5e-43f8c1ac1003",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/f8bf535c-5c50-47f6-9d5e-43f8c1ac1003"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

&nbsp; 

## 7. GET /users/:username

Description:
- Get user profile including user favorite player

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
    "id": 1,
    "username": "satu",
    "email": "satu@mail.com",
    "imgProfile": "http://placekitten.com/g/200/300",
    "status": "Regular",
    "createdAt": "2023-01-11T18:24:25.858Z",
    "Favorites": [
        {
            "id": 1,
            "UserId": 1,
            "PlayerId": 2,
            "Player": {
                "id": 2,
                "name": "Troy Brown Jr.",
                "teamName": "Los Angeles Lakers",
                "teamShort": "LAL",
                "playerNumber": 7,
                "height": "6'7",
                "weight": "215lbs",
                "birthDate": "July 28, 1988",
                "country": "USA",
                "experience": 4,
                "lastAttended": "Oregon",
                "age": 23,
                "imgUrl": "https://cdn.nba.com/headshots/nba/latest/1040x760/1628972.png",
                "logoUrl": "https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg"
            }
        }
    ]
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

&nbsp;

&nbsp; 

## 8. POST /users/:PlayerId

Description:
- Adding favorite player to User account / profile

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
  "message": "You've been followed this player"
}
```


_Response (400 - Bad request)_

```json
{
  "message": "Player not found"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

&nbsp;

## Global Error

_Response (401 - Unuthorized)_

```json
{
  "message": "Invalid Token, please login",
}
```
_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden, You are not authorize to access"
}
```
_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```
