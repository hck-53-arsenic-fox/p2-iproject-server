#  API Documentation

## Endpoints :

List of available endpoints:

- `POST /pub/register`
- `POST /pub/login`
- `POST /doctor/login`


### POST /pub/register
#### Description
- register a new user

### Request
- Body
    ```json
    {
      "username": String,
      "email": String,
      "password": String,
      "phoneNumber": String
    }
    ```
#### Response
_201 - Created_
- Body
  ```json
    {
      "id": Integer,
      "email": String,
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
        "message": String
    }
    ```

### POST /pub/login
#### Description
- post login patient

#### Request
- Body
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

#### Response
_Response (200 - OK)_

```json
{
  "access_token": "string", 
}
```

### POST /doctor/login
#### Description
- post login doctor

#### Request
- Body
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

#### Response
_Response (200 - OK)_

```json
{
  "access_token": "string",
}
```
