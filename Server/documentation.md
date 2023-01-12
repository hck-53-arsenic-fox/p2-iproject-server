Railway UP => genshin-wikia-production.up.railway.app

List of Available Endpoints: 

- `POST /register`
- `PATCH /verify`
- `POST /login`
- `POST /google-login`
- `GET /characters`
- `GET /characters/:id`
- `GET /weapons`
- `GET /weapons/:name`
- `GET /account`


### POST /register

#### Description

- Create a new User, hashes their password before being inserted into the database.

#### Request:

- Headers

  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```

- Body
  ```json
  {
      "email" : string (required),
      "password" : string (required),
      "createdAt" : date,
      "updatedAt" : date
  }
  ```

#### Response:

_201 - Created_

- Body
  ```json
  {
      "msg" : "New User Created",
      "data" :
      {
      "email" : string (required),
      "password" : string (required),
      "status": "Inactive", => (default hook)
      "createdAt" : date,
      "updatedAt" : date
      }
  }
  ```
  THEN ;
  Nodemailer -- Sends link to verify email( Update status to Active )

_400 - Bad Request_

- Body
  ```json
  { "showErr":
      {
      "msg" : "Email is already registered. Please use another email"
      }
      OR
      {
          "msg" : "Email cannot be empty"
      }
      OR
      {
          "msg" : "This field can only accept email address"
      }
      OR
      {
          "msg" : "Password cannot be empty"
      }
      OR
      {
          "msg" : "Password length needs to be more than 5"
      }
  }
  ```

===
### PATCH /verify

#### Description
Registered User clicks on link sent via email, after link is clicked, status will be updated to 'Active'

#### Request
```json
{
    "req.query" : "{id}"
}
```

#### Response

_200 - Data Updated_

- Body
```json
{
    "message" : "Account is now Active"
}
```

_404 - Data Not Found_

- Body
```json
{
    "message" : "Data not Found"
}
```

===
### POST /login

#### Description

- Logs in a User, creating an `access_token` to be used for Authentication and Authorization

#### Request

- Body
```json
{
    "email": string,
    "password": string
}
```

#### Response

_200 - OK_

- Body
```json
{
    "access_token": string
}
```

_400 - Bad Request_

- Body
```json
{
    "messsage" : "Email and Password Required"
}
```

_401 - Unauthorized_

- Body
```json
{
    "message": "Invalid email or password"
}
```

_404 - Data no Found_

- Body
```json
{
    "message" : "Data not found"
}
```

===
### POST /google-login 

#### Description

- Logs in User with Google. Automatically sets their status to `Active` to give them access to the website

#### Request

- Headers
```json
{
    "idToken": "req.headers.google_token",
    "audience": "CLIENT_ID",  
}
```

#### Response
_200 - OK_

- Body
```json
{
    "access_token": string
}
```

===

### GET /characters         

#### Description

- Fetch all Character's ID, Name, Element, and Icons

#### Response

_200 - OK_

- Body
```json
{
    "id": integer,
    "name": string,
    "element": string,
    "icons": string
}
```

===
### GET /characters/:id     

#### Description

- Fetch a single Character's Name, Description, Abilities, and Splash Art

#### Request

`{id} = req.params`

#### Response

_200 - OK_

- Body
```json
{
    "name": string,
    "description": string,
    "passive-skills": 
    [
        {
            "name": string,
            "description": string,
            "icon": string
        }, . . .
    ],
    "active-skills": 
    [
        {
            "name": string,
            "description": string,
            "icon": string
        }, . . . .
    ]
}
```

_404 - Data Not Found_

- Body
```json
{
    "message" : "Data not Found"
}
```

===
### GET /weapons            

#### Description

- Fetch all Weapon data. Showing only the weapon name

#### Response

- Body 
```json
[
    {
        "name" : string
    }
]
```

===
### GET /weapons/:name      

#### Description

- Fetch a single Weapon's data. Includes Name, Description, and the Weapon's stats such as ATK, Rarity, etc. 

#### Request

`{name} = req.params`

#### Response

- Body
```json
{
    "name" : string,
    "description" : string,
    "rarity" : string,
    "atk" : string,
    "passive": string,
    "from" : string
}
```

===
### GET /account            

#### Description

- Fetch a Player Account's data by inputting their unique ingame User ID. Returns their; Profile Card, Profile 
Picture, Character showcase, Nickname, Level, World Level, and Total Achievements.

#### Request

- Headers

`Authentication`
```json
{
    "access_token" : string
}
```

`Authorization`
```json
{
    "req.user.status" : `Activated`
}
```

`Query`

` {uid} = integer `

#### Response

_200 - OK_

```json
{
    "Nickname": string,
    "Level": integer,
    "WL" : integer,
    "Achievements" : integer,
    "PP" : string,
    "Namecard" : string, 
    "chara.splash" : string
}
```


_404 - Data not Found_

```json
{
    "message" : "Data not Found"
}
```

===
### GLOBAL ERROR

#### Response:

```json
{
    "message": "Internal server error"
}
```