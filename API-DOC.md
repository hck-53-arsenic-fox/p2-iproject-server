# Post API Documentation

## Endpoints :

List of available endpoints:

- `POST /users/register`
- `POST /users/login`
- `GET /users/user`
- `GET /users/quotes`
- `GET /home`
- `GET /home/:id`
- `PATCH /subscription`
- `POST /generate-mitrans-token`

  &nbsp;

## 1. POST/users/register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string",
  "status": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": 3,
  "email": "liansu2@gmail.com"
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

## 2. POST/users/login

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
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjczNDI5OTIyfQ.P-56QhSb2IBT06msQyzqO34r7Ypbe0pmr8AYgX-7yKU",
  "email": "liansu2@gmail.com"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email or Password Required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Unaunthenticated"
}
```

&nbsp;




## 3. POST/users/quotes


_Response (200 - OK)_

```json
{
"Make the most of yourself, for that is all there is of you."
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Unaunthenticated"
}
```

## 3. POST/users/user


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
    "id": 3,
    "username": "liansu2",
    "email": "liansu2@gmail.com",
    "status": "Reguler"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Unaunthenticated"
}
```

&nbsp;



## 4. GET/home

Description:

- Get all movie from TMDB

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
    "movie": {
        "page": 1,
        "results": [
            {
                "adult": false,
                "backdrop_path": "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
                "genre_ids": [
                    18,
                    80
                ],
                "id": 238,
                "original_language": "en",
                "original_title": "The Godfather",
                "overview": "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
                "popularity": 111.41,
                "poster_path": "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
                "release_date": "1972-03-14",
                "title": "The Godfather",
                "video": false,
                "vote_average": 8.7,
                "vote_count": 17253
            },
            {
                "adult": false,
                "backdrop_path": "/wPU78OPN4BYEgWYdXyg0phMee64.jpg",
                "genre_ids": [
                    18,
                    80
                ],
                "id": 278,
                "original_language": "en",
                "original_title": "The Shawshank Redemption",
                "overview": "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
                "popularity": 86.44,
                "poster_path": "/hBcY0fE9pfXzvVaY4GKarweriG2.jpg",
                "release_date": "1994-09-23",
                "title": "The Shawshank Redemption",
                "video": false,
                "vote_average": 8.7,
                "vote_count": 23048
            }
        ]
    }   
}
```

&nbsp;


## 5. GET/home/:id

Description:

- Get detail Movie by id

Request:

- Headers

```json
{
  "access_token": "string"
}
```

Response (200 - OK)

```json
{
    "movie": {
        "adult": false,
        "backdrop_path": "/bQ8fRUaitJvi54O2lUT6Ta7FVHK.jpg",
        "belongs_to_collection": {
            "id": 285564,
            "name": "Jarhead Collection",
            "poster_path": "/aRFpBjCseFD6UmahAuLdqS7Or5q.jpg",
            "backdrop_path": "/ifSnip5tvaHvxLPAyjkiihE6T2I.jpg"
        },
        "budget": 72000000,
        "genres": [
            {
                "id": 18,
                "name": "Drama"
            },
            {
                "id": 10752,
                "name": "War"
            }
        ],
        "homepage": "",
        "id": 25,
        "imdb_id": "tt0418763",
        "original_language": "en",
        "original_title": "Jarhead",
        "overview": "Jarhead is a film about a US Marine Anthony Swofford’s experience in the Gulf War. After putting up with an arduous boot camp, Swofford and his unit are sent to the Persian Gulf where they are eager to fight, but are forced to stay back from the action. Swofford struggles with the possibility of his girlfriend cheating on him, and as his mental state deteriorates, his desire to kill increases.",
        "popularity": 60.292,
        "poster_path": "/55WJCdayHwoXJwRv3prpqscHt2q.jpg",
        "production_companies": [
            {
                "id": 1522,
                "logo_path": "/8uaoEVgNxFH0R94O53gUiByahVr.png",
                "name": "Neal Street Productions",
                "origin_country": "GB"
            },
            {
                "id": 14440,
                "logo_path": null,
                "name": "Red Wagon Entertainment",
                "origin_country": "US"
            }
        ],
        "production_countries": [
            {
                "iso_3166_1": "GB",
                "name": "United Kingdom"
            },
            {
                "iso_3166_1": "US",
                "name": "United States of America"
            }
        ],
        "release_date": "2005-11-04",
        "revenue": 97076152,
        "runtime": 123,
        "spoken_languages": [
            {
                "english_name": "English",
                "iso_639_1": "en",
                "name": "English"
            },
            {
                "english_name": "Spanish",
                "iso_639_1": "es",
                "name": "Español"
            },
            {
                "english_name": "Arabic",
                "iso_639_1": "ar",
                "name": "العربية"
            },
            {
                "english_name": "Latin",
                "iso_639_1": "la",
                "name": "Latin"
            }
        ],
        "status": "Released",
        "tagline": "Welcome to the suck.",
        "title": "Jarhead",
        "video": false,
        "vote_average": 6.599,
        "vote_count": 2445
    }
}


Response (404 - not found)

```json
{
  "message": "Data Not Found"
}

```


## 6. PATCH/subscription

Description:

- Patch modify status from database users

Request:

- Body

```json
{
  "access_token": "string"
}
```

Response (200 - OK)

```json
{
    "id": 3,
    "username": "liansu2",
    "email": "liansu2@gmail.com",
    "status": "Reguler"
}


Response (400 - Bad Request)

```json
{
  "message": "Forbidden"
}
```

Response (404 - not found)

```json
{
  "message": "Data Not Found"
}

```

&nbsp;


## 7. POST/generate-mitrans-token

Description:

- Post access token mitrans

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
  
    "token": "144d86d6-897e-4781-ab81-58b34ebd692c",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/144d86d6-897e-4781-ab81-58b34ebd692c"

}
```

Response (404 - not found)

```json
{
  "message": "Data Not Found"
}

```

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Unaunthenticated"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```