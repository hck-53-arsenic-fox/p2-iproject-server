# Chat App documentation

### Deployed server

### Deployed database

-   Atlas URL
    mongodb+srv://{usename}:{password}@cluster0.yiyonqy.mongodb.net/?retryWrites=true&w=majority

&nbsp;

## Models :

_User_

```
- email : string, required, unique
- name : string, required
- password : string, required
- pic : string (url)
```

_Message_

```
- sender : integer (reference User)
- content : string
- chat : integer (reference Chat)
```

_Chat_

```
- chatName : integer
- isGroupChat : boolean, (default: false)
- users : array, (integer, reference User)
- latestMessage: integer, reference Message
- groupAdmin: integer, reference User
```

## Endpoints :

List of available endpoints:

-   `POST /api/user`
-   `POST /api/user/login`

Routes below need authentication:

-   `GET /api/user/`

-   `POST /api/chat/`
-   `GET /api/chat/`

-   `POST /api/chat/group`
-   `PUT /api/chat/group`
-   `PUT /api/chat/groupremove`
-   `PUT /api/chat/groupadd`

&nbsp;

## 1. POST /api/user (Register)

Request:

-   body:

```json
{
	"email": "string",
	"name": "string",
	"password": "string",
	"pic": "string"
}
```

_Response (201 - Created)_

```json
{
	"_id": "integer",
	"name": "string",
	"email": "string",
	"pic": "string",
	"token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Please Enter all the Fields"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "User already exists"
}
OR
{
  "message": "Failed to create the User"
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

_Response (500 - Internal Server Error)_

```json
{
	"message": "Internal server error"
}
```
