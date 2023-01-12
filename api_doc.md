# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /user/register`
- `POST /user/login`
- `POST /movie/favorite/:id`
- `GET /movie/allmovie`
- `GET /movie/detail/:id`
- `GET /movie/favorite/allfavorite`
- `DELETE /movies/favorite/:id`

&nbsp;

## 1. POST /user/register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string",
  "username": "string"
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
  "message": "Password is required"
}
OR
{
  "message": "Username is required"
}
```

&nbsp;

## 2. POST /user/login

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

## 3. GET /movie/allmovie

Description:
- Get all movie from database

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
    "movies":[
        {
            "id": 1,
            "title": "The Shawshank Redemption",
            "thumbnail": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UY67_CR0,0,45,67_AL_.jpg",
            "rating": "9.3",
            "image": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL75_UX380_CR0,1,380,562_.jpg",
            "year": 1994,
            "writers": "[\"Stephen King (based on the short novel \\\"Rita Hayworth and the Shawshank Redemption\\\" by)\",\"Frank Darabont (screenplay by)\"]",
            "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            "trailer": "https://www.youtube.com/embed/NmzuHjWmXOc",
            "genre": "[\"Drama\"]",
            "director": "[\"Frank Darabont\"]",
            "createdAt": "2023-01-10T08:46:15.964Z",
            "updatedAt": "2023-01-10T08:46:15.964Z"
        },
        {
            "id": 2,
            "title": "The Godfather",
            "thumbnail": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY67_CR1,0,45,67_AL_.jpg",
            "rating": "9.2",
            "image": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_QL75_UY562_CR8,0,380,562_.jpg",
            "year": 1972,
            "writers": "[\"Mario Puzo (screenplay by)\",\"Francis Ford Coppola (screenplay by)\"]",
            "description": "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
            "trailer": "https://www.youtube.com/embed/rqGJyUB1Q3s",
            "genre": "[\"Crime\",\"Drama\"]",
            "director": "[\"Francis Ford Coppola\"]",
            "createdAt": "2023-01-10T08:46:15.964Z",
            "updatedAt": "2023-01-10T08:46:15.964Z"
        }
        ...,
        }
    ],
    "totalMovies": 100,
    "totalPage": 7,
    "rowsPerPage": 15,
    "currentPage": 1
}
```

&nbsp;

## 4. GET /movie/detail/:id

Description:
- Get all movie from database by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "title": "The Shawshank Redemption",
    "thumbnail": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UY67_CR0,0,45,67_AL_.jpg",
    "rating": "9.3",
    "image": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL75_UX380_CR0,1,380,562_.jpg",
    "year": 1994,
    "writers": [
        "Stephen King (based on the short novel \"Rita Hayworth and the Shawshank Redemption\" by)",
        "Frank Darabont (screenplay by)"
    ],
    "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    "trailer": "https://www.youtube.com/embed/NmzuHjWmXOc",
    "genre": [
        "Drama"
    ],
    "director": [
        "Frank Darabont"
    ],
    "createdAt": "2023-01-10T08:46:15.964Z",
    "updatedAt": "2023-01-10T08:46:15.964Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "not found"
}
```
_Response (400 - Bad Request)_

```json
{
  "message": "Your Status Not Premium"
}
```

&nbsp;

## 5. Get /movie/favorite/allfavorite

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (201 - Created)_

```json
[
    {
        "id": 7,
        "UserId": 6,
        "MovieId": 1,
        "Movie": {
            "id": 1,
            "title": "The Shawshank Redemption",
            "thumbnail": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UY67_CR0,0,45,67_AL_.jpg",
            "rating": "9.3",
            "image": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL75_UX380_CR0,1,380,562_.jpg",
            "year": 1994,
            "writers": "[\"Stephen King (based on the short novel \\\"Rita Hayworth and the Shawshank Redemption\\\" by)\",\"Frank Darabont (screenplay by)\"]",
            "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            "trailer": "https://www.youtube.com/embed/NmzuHjWmXOc",
            "genre": "[\"Drama\"]",
            "director": "[\"Frank Darabont\"]"
        }
    },
    {
        "id": 9,
        "UserId": 6,
        "MovieId": 3,
        "Movie": {
            "id": 3,
            "title": "The Dark Knight",
            "thumbnail": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX67_CR0,0,67,98_AL_.jpg",
            "rating": "9.0",
            "image": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg",
            "year": 2008,
            "writers": "[\"Jonathan Nolan (screenplay)\",\"Christopher Nolan (screenplay)\",\"David S. Goyer (story)\"]",
            "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            "trailer": "https://www.youtube.com/embed/EXeTwQWrcwY",
            "genre": "[\"Action\",\"Crime\",\"Drama\"]",
            "director": "[\"Christopher Nolan\"]"
        }
    }
]
...,
```

_Response (400 - Bad Request)_

```json
{
  "message": "Movie Already Added"
}

```

&nbsp;

## 6. POST /movie/favorite/:id
Decription : Add movie to favorite by id

Request:

- body:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "berhasil"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Movie Already Added"
}
```

&nbsp;

## 7. DELETE /movies/favorite/:id
Description:
- Delete favorite by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Succes Delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Movie not found"
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