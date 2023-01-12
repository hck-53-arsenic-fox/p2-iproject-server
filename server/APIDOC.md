## Endpoints CUSTOMER

List of Available Endpoints:

- `POST /register`
- `POST /login`
- `POST /googleSignIn`
- `GET /room`
- `GET /room/:id`
- `GET /transactions`
- `POST /transactions/:room`
- `PATCH /transactions/:id`
- `POST /createMidtransToken/:price`

### POST /register

#### Description

- create data user for Customer

#### Request

- body:

  ```json
  {
  "email": string,
  "password": string,
  }
  ```

#### Response

_200 - OK_

```json
{
 {
    "id" : integer,
    "email": string,
  }
}
```

_400 - Bad Request_

```json
{
"SequelizeValidationError"
"message": "email is Required!" OR,
"message": "email cannot be empty" OR,
"message": "password is Required!" OR,
"message": "password cannot be empty" OR,
"message": "Minimum 5 characters required in password" OR,
"message": "Email is not valid"
}
OR
{
"SequelizeConstrainError"
"message": "Email address already in use!"
}
```

## POST /login

Description:

- login user

#### Request

- body:

```json
{
  "email": "string@string.com",
  "password": "string"
}
```

#### Response

_200 - OK_

```json
{
  "access_token": access_token,
  "email": String,
}
```

_400 - Bad Request_

```json
{
  "message": "Email and password are required"
}
```

_401 - Invalid Credentials_

- Body
  ```json
  {
    "message": "Invalid Email or Password"
  }
  ```

_401 - JsonWebTokenError_

- Body
  ```json
  {
    "message": "Login First"
  }
  ```

## POST /googleSignIn

Description:

- login user with account google

#### Request

- body:

```json
{
  "email": "string@string.com"
}
```

#### Response

_200 - OK_

```json
{
  "access_token": access_token,
  "email": String,
}
```

### GET /room

Description:

- Get all room from database

#### Response

_200 - OK_

```json
 [
    {
        "id": Integer,
        "name": String,
        "imageUrl": String,
        "description": String,
        "createdAt": Date,
        "updatedAt": Date
    },
    ...
 ]
```

### GET /room/:id

#### Description

- Get room data detail by ID

#### Response

_200 - OK_

- Body
  ```json
  {
        "id": Integer,
        "name": String,
        "imageUrl": String,
        "description": String,
        "createdAt": Date,
        "updatedAt": Date
    },
  ```

_404 - Not Found_

```json
{
  "message": "Data Not Found"
}
```

## GET /transactions

Description:

- Get all transactions from database

#### Request

- headers :

  ```json
  {
  "access_token": access_token
  }
  ```

#### Response

_200 - OK_

```json
[
    {
        "id": Integer,
        "status": String,
        "UserId": Integer,
        "RoomId": Integer,
        "createdAt": Date,
        "updatedAt": Date,
        "Room": {
            "id": Integer,
            "name": String,
            "imageUrl": String,
            "description": String,
            "createdAt": Date,
            "updatedAt": Date
        },
        "IdentityUser": {
            "id": Integer,
            "image": String,
            "phoneNumber": Integer,
            "TransactionId": Integer,
            "createdAt": Date,
            "updatedAt": Date
        }
    },
    ...
]
```

_401 - Unauthorized / JsonWebTokenError_

- Body
  ```json
  {
    "message": "Login First"
  }
  ```

## POST /transactions/:room

#### Request

- params :

  ```json
  {
  "room": integer
  }
  ```

#### Response

_201 - Created_

```json
{
    "transaction": {
        "data": {
            "id": Integer,
            "status": String,
            "UserId": Integer,
            "RoomId": Integer,
            "createdAt": Date,
            "updatedAt": Date,
        },
        "room": {
            "id": Integer,
            "name": String,
            "imageUrl": String,
            "description": String,
            "createdAt": Date,
            "updatedAt": Date
        }
    }
}
```

_400 - AlreadyExists_

```json
{
  "message": "Please complete your payment first in your cart!"
}
```

_401 - Unauthorized / JsonWebTokenError_

- Body
  ```json
  {
    "message": "Login First"
  }
  ```

_404 - Not Found_

```json
{
  "message": "Data Not Found"
}
```


## PATCH /transactions/:id

#### Request

- params :

  ```json
  {
  "id": integer
  }
  ```

#### Response

_201 - Created_

```json
{
    "message" : "success payment"
}
```

_401 - Unauthorized / JsonWebTokenError_

- Body
  ```json
  {
    "message": "Login First"
  }
  ```

_403 - Forbidden_

```json
{
  "message": "the server understands the request but refuses to authorize it"
}
```

_404 - Not Found_

```json
{
  "message": "Data Not Found"
}
```


## POST /createMidtransToken/:price

#### Request

- params :

  ```json
  {
  "price": integer
  }
  ```

#### Response

_201 - Created_

```json
{
    "token": String,
    "redirect_url": String
}
```

_401 - Unauthorized / JsonWebTokenError_

- Body
  ```json
  {
    "message": "Login First"
  }
  ```

_403 - Forbidden_

```json
{
  "message": "the server understands the request but refuses to authorize it"
}
```

### Global Error

#### Response

_401 - JsonWebTokenError_

- Body
  ```json
  {
    "message": "Login First"
  }
  ```

_500 - Internal Server Error_

- Body
  ```json
  {
    "message": "Internal Server Error"
  }
  ```
