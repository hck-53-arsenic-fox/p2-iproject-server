# Hari Istimewa API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-sign-in`
- `GET /invitation/:id`
- `GET /invitation`
- `GET /musics`
- `GET /greets`
- `POST /invitation`
- `POST /invitation/:id`
- `POST /musics`
- `Delete /musics/:id`


&nbsp;


## 1. POST /register

Description:

- add new user into database

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
    "id": 37,
    "email": "annisa@mail.com",
    "password": "$2b$10$SmT9dJS5VQigplp2xrRNRulcdaDC1zHM3Ja5mamwuuvgMiBaEUQNS",
    "role": "customer",
    "link_invitation": "-",
    "updatedAt": "2023-01-12T04:28:26.651Z",
    "createdAt": "2023-01-12T04:28:26.651Z",
    "status": "silver"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email Required!"
}
OR
{
  "message": "Email format invalid"
}
OR
{
  "message": "email must be unique"
}
OR
{
  "message": "Username Required!"
}
OR
{
  "message": "Password Required!"
}
OR
{
  "message": "Password min. 5 characters"
}
```

&nbsp;

## 2. POST /login

Description:

- login 

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
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzcsImlhdCI6MTY3MzQ5Nzc5NX0.pWJO_P2vodUcwRxNvdecHcSGOqASKUgUbHnXvNENJ58",
    "email": "annisa@mail.com",
    "role": "customer"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Email atau Password Mohon diisi"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Email atau Password Salah"
}
```

&nbsp;


## 3. POST /google-sign-in

Description:

- login by google

&nbsp;

## 4. GET /invitation/:id

Description:

- Get invitation by id

Request:

- headers:

```json
{
  "id": "integer"
}
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "id": 2,
    "quote": "“Bila dalam perjalanan hidupmu, engkau menemukan seorang teman yang bijaksana dan cocok untuk hidup denganmu, hendaklah engkau berjalan bersamanya, dengan gembira dan penuh kesadaran mengatasi segala bahaya”.",
    "quote_src": "(DHAMMAPADA XXIII – 328)",
    "bride": "Aurora Virginia Casey",
    "bride_img": "https://storage.wedew.id/uploads/public/638/480/952/thumb_1976537_240_240_0_0_crop.jpg",
    "bride_nick": "Casey",
    "bride_mother": "Mrs. Zheng Xiao Yen",
    "bride_father": "Mr. Yandy",
    "groom": "Alvin Wijaya S.Kom",
    "groom_img": "https://storage.wedew.id/uploads/public/638/480/997/thumb_1976538_240_240_0_0_crop.jpg",
    "groom_nick": "Alvin",
    "groom_mother": "Mrs. Jusnita",
    "groom_father": "Mr. Johanis Lo (Tan Ui Yong)",
    "matrimony_name": "Wedding Ceremony",
    "matrimony_date": "2023-02-02T00:00:00.000Z",
    "matrimony_time_start": 1,
    "matrimony_time_end": 10,
    "ceremonial_name": "Wedding Party",
    "ceremonial_date": "2023-02-02T00:00:00.000Z",
    "ceremonial_time_start": 2,
    "ceremonial_time_end": 20,
    "map_location": "location",
    "photo": "https://storage.wedew.id/uploads/public/639/751/84a/thumb_1993825_0_600_0_0_auto.jpg",
    "story": "story",
    "story_img": "https://storage.wedew.id/uploads/public/638/ac8/0a7/thumb_1983064_0_600_0_0_auto.jpg",
    "wallet_bank": "BRI",
    "wallet_no": 12345678,
    "wallet_owner": "Aurora Virginia Casey",
    "MusicId": 2,
    "UserId": 3,
    "Music": {
        "id": 2,
        "band": "Depapepe",
        "song": "one",
        "song_src": "https://hariistimewa.com/ericfransiscawedding/images/one.mp3"
    },
    "User": {
        "id": 3,
        "email": "nazwa@mail.com",
        "status": "silver",
        "link_invitation": "-",
        "Greets": [
            {
                "id": 2,
                "guest": "Fauzi Nurahman",
                "presence": "Tidak hadir",
                "greeting": "semoga pernikahannya lancar, dan SaMaWa pernikahannya sampai akhir hayatt aminnn..",
                "date": "2023-01-11T09:03:49.110Z",
                "UserId": 3
            },
            {
                "id": 10,
                "guest": "Davy",
                "presence": "hadir",
                "greeting": "Sekian lama ga ketemu fadel eh ketemu lagi udh gitu plotwist ketemunya dibali wkwkw,",
                "date": "2023-01-11T09:05:16.204Z",
                "UserId": 3
            },
            {
                "id": 11,
                "guest": "Cindy Nabila",
                "presence": "hadir",
                "greeting": "Congratsss ambonn deviiii,",
                "date": "2023-01-11T08:51:47.154Z",
                "UserId": 3
            },
            {
                "id": 13,
                "guest": "Mrs. Ita",
                "presence": "hadir",
                "greeting": "The real life Vicenzo Couple",
                "date": "2023-01-11T09:05:16.204Z",
                "UserId": 3
            },
            {
                "id": 22,
                "guest": "Fauzi Nurahman",
                "presence": "Tidak hadir",
                "greeting": "semoga pernikahannya lancar, dan SaMaWa pernikahannya sampai akhir hayatt aminnn..",
                "date": "2023-01-11T09:03:49.110Z",
                "UserId": 3
            },
            {
                "id": 24,
                "guest": "Mrs. Hari Hidayati",
                "presence": "Tidak hadir",
                "greeting": "LOVE YOUUU VIIIII",
                "date": "2023-01-11T09:05:16.204Z",
                "UserId": 3
            },
            {
                "id": 33,
                "guest": "Mrs. Ita",
                "presence": "hadir",
                "greeting": "The real life Vicenzo Couple",
                "date": "2023-01-11T09:05:16.204Z",
                "UserId": 3
            },
            {
                "id": 35,
                "guest": "Hidayati",
                "presence": "hadir",
                "greeting": "Selamat ya Henny, semoga acara proses pernikahan dan pestanya berjalan dengan lancar.",
                "date": "2023-01-11T09:05:16.204Z",
                "UserId": 3
            },
            {
                "id": 44,
                "guest": "Mrs. Hari Hidayati",
                "presence": "Tidak hadir",
                "greeting": "LOVE YOUUU VIIIII",
                "date": "2023-01-11T09:05:16.204Z",
                "UserId": 3
            },
            {
                "id": 46,
                "guest": "Trisaputra",
                "presence": "Tidak hadir",
                "greeting": "selamat kepada kedua mempelai semoga menjadi keluarga SAMAWA. aamiin...",
                "date": "2023-01-11T09:05:16.204Z",
                "UserId": 3
            }
        ]
    }
}
```
_Response (404 - Not Found)_

```json
{
    "message": "Data tidak ditemukan"
}
```

_Response (401 - Unauthenticated)_ 

```json
{
    "message": "Unauthenticated"
}
```

_Response (500 - Internal Server Error)_

&nbsp;

## 5. GET /invitation

Description:

- Get all invitation

Request:

- params:

```json
{
  "id": "integer"
}
```

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
        "id": 1,
        "quote": "We really wish you’d come and be the witness of our once in a lifetime experience. Kindly help us to prepare the warmest welcome in our celebration",
        "quote_src": "-",
        "bride": "Ruth Elysia",
        "bride_img": "https://storage.wedew.id/uploads/public/638/764/8a0/thumb_1979204_240_240_0_0_crop.jpeg",
        "bride_nick": "Ruth",
        "bride_mother": "Mrs. Sri Redjeki Susilorini",
        "bride_father": "Mr. Eko Handojo",
        "groom": "Irwandi",
        "groom_img": "https://storage.wedew.id/uploads/public/638/84f/99a/thumb_1980254_240_240_0_0_crop.jpeg",
        "groom_nick": "Irwandi",
        "groom_mother": "Mrs. Herawaty",
        "groom_father": "Mr. Lie A Tjui",
        "matrimony_name": "Holy Matrimony",
        "matrimony_date": "2023-01-01T00:00:00.000Z",
        "matrimony_time_start": 1,
        "matrimony_time_end": 10,
        "ceremonial_name": "Wedding Reception",
        "ceremonial_date": "2023-01-01T00:00:00.000Z",
        "ceremonial_time_start": 2,
        "ceremonial_time_end": 20,
        "map_location": "location",
        "photo": "https://storage.wedew.id/uploads/public/638/763/fa5/thumb_1979197_0_600_0_0_auto.jpeg",
        "story": "story",
        "story_img": "https://storage.wedew.id/uploads/public/639/03d/24c/thumb_1987950_0_600_0_0_auto.jpeg",
        "wallet_bank": "Mandiri",
        "wallet_no": 12345678,
        "wallet_owner": "Ruth Elysia",
        "MusicId": 1,
        "UserId": 2,
        "Music": {
            "id": 1,
            "band": "Stephen Sanchez",
            "song": "Until I Found You",
            "song_src": "https://hariistimewa.com/virafahri/images/Sanchez.mp3"
        },
        "User": {
            "id": 2,
            "email": "nabila@mail.com",
            "status": "silver",
            "link_invitation": "-",
            "Greets": [
                {
                    "id": 1,
                    "guest": "Cindy Nabila",
                    "presence": "hadir",
                    "greeting": "Congratsss ambonn deviiii,",
                    "date": "2023-01-11T08:51:47.154Z",
                    "UserId": 2
                },
                {
                    "id": 12,
                    "guest": "Fauzi Nurahman",
                    "presence": "Tidak hadir",
                    "greeting": "semoga pernikahannya lancar, dan SaMaWa pernikahannya sampai akhir hayatt aminnn..",
                    "date": "2023-01-11T09:03:49.110Z",
                    "UserId": 2
                },
                {
                    "id": 23,
                    "guest": "Mrs. Ita",
                    "presence": "hadir",
                    "greeting": "The real life Vicenzo Couple",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 2
                },
                {
                    "id": 34,
                    "guest": "Mrs. Hari Hidayati",
                    "presence": "Tidak hadir",
                    "greeting": "LOVE YOUUU VIIIII",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 2
                },
                {
                    "id": 45,
                    "guest": "Hidayati",
                    "presence": "hadir",
                    "greeting": "Selamat ya Henny, semoga acara proses pernikahan dan pestanya berjalan dengan lancar.",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 2
                }
            ]
        }
    },
    {
        "id": 2,
        "quote": "“Bila dalam perjalanan hidupmu, engkau menemukan seorang teman yang bijaksana dan cocok untuk hidup denganmu, hendaklah engkau berjalan bersamanya, dengan gembira dan penuh kesadaran mengatasi segala bahaya”.",
        "quote_src": "(DHAMMAPADA XXIII – 328)",
        "bride": "Aurora Virginia Casey",
        "bride_img": "https://storage.wedew.id/uploads/public/638/480/952/thumb_1976537_240_240_0_0_crop.jpg",
        "bride_nick": "Casey",
        "bride_mother": "Mrs. Zheng Xiao Yen",
        "bride_father": "Mr. Yandy",
        "groom": "Alvin Wijaya S.Kom",
        "groom_img": "https://storage.wedew.id/uploads/public/638/480/997/thumb_1976538_240_240_0_0_crop.jpg",
        "groom_nick": "Alvin",
        "groom_mother": "Mrs. Jusnita",
        "groom_father": "Mr. Johanis Lo (Tan Ui Yong)",
        "matrimony_name": "Wedding Ceremony",
        "matrimony_date": "2023-02-02T00:00:00.000Z",
        "matrimony_time_start": 1,
        "matrimony_time_end": 10,
        "ceremonial_name": "Wedding Party",
        "ceremonial_date": "2023-02-02T00:00:00.000Z",
        "ceremonial_time_start": 2,
        "ceremonial_time_end": 20,
        "map_location": "location",
        "photo": "https://storage.wedew.id/uploads/public/639/751/84a/thumb_1993825_0_600_0_0_auto.jpg",
        "story": "story",
        "story_img": "https://storage.wedew.id/uploads/public/638/ac8/0a7/thumb_1983064_0_600_0_0_auto.jpg",
        "wallet_bank": "BRI",
        "wallet_no": 12345678,
        "wallet_owner": "Aurora Virginia Casey",
        "MusicId": 2,
        "UserId": 3,
        "Music": {
            "id": 2,
            "band": "Depapepe",
            "song": "one",
            "song_src": "https://hariistimewa.com/ericfransiscawedding/images/one.mp3"
        },
        "User": {
            "id": 3,
            "email": "nazwa@mail.com",
            "status": "silver",
            "link_invitation": "-",
            "Greets": [
                {
                    "id": 2,
                    "guest": "Fauzi Nurahman",
                    "presence": "Tidak hadir",
                    "greeting": "semoga pernikahannya lancar, dan SaMaWa pernikahannya sampai akhir hayatt aminnn..",
                    "date": "2023-01-11T09:03:49.110Z",
                    "UserId": 3
                },
                {
                    "id": 10,
                    "guest": "Davy",
                    "presence": "hadir",
                    "greeting": "Sekian lama ga ketemu fadel eh ketemu lagi udh gitu plotwist ketemunya dibali wkwkw,",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 3
                },
                {
                    "id": 11,
                    "guest": "Cindy Nabila",
                    "presence": "hadir",
                    "greeting": "Congratsss ambonn deviiii,",
                    "date": "2023-01-11T08:51:47.154Z",
                    "UserId": 3
                },
                {
                    "id": 13,
                    "guest": "Mrs. Ita",
                    "presence": "hadir",
                    "greeting": "The real life Vicenzo Couple",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 3
                },
                {
                    "id": 22,
                    "guest": "Fauzi Nurahman",
                    "presence": "Tidak hadir",
                    "greeting": "semoga pernikahannya lancar, dan SaMaWa pernikahannya sampai akhir hayatt aminnn..",
                    "date": "2023-01-11T09:03:49.110Z",
                    "UserId": 3
                },
                {
                    "id": 24,
                    "guest": "Mrs. Hari Hidayati",
                    "presence": "Tidak hadir",
                    "greeting": "LOVE YOUUU VIIIII",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 3
                },
                {
                    "id": 33,
                    "guest": "Mrs. Ita",
                    "presence": "hadir",
                    "greeting": "The real life Vicenzo Couple",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 3
                },
                {
                    "id": 35,
                    "guest": "Hidayati",
                    "presence": "hadir",
                    "greeting": "Selamat ya Henny, semoga acara proses pernikahan dan pestanya berjalan dengan lancar.",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 3
                },
                {
                    "id": 44,
                    "guest": "Mrs. Hari Hidayati",
                    "presence": "Tidak hadir",
                    "greeting": "LOVE YOUUU VIIIII",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 3
                },
                {
                    "id": 46,
                    "guest": "Trisaputra",
                    "presence": "Tidak hadir",
                    "greeting": "selamat kepada kedua mempelai semoga menjadi keluarga SAMAWA. aamiin...",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 3
                }
            ]
        }
    },
    {
        "id": 3,
        "quote": "In gratitude to God who brought us together, and with the blessings of our beloved parents. We joyously invite you to witness as we exchange marriage vows.",
        "quote_src": "-",
        "bride": "Catherine Indri Hapsari",
        "bride_img": "https://storage.wedew.id/uploads/public/639/6ab/bd2/thumb_1992850_240_240_0_0_crop.jpg",
        "bride_nick": "Catherine",
        "bride_mother": "Ibu Lucia Christyanti",
        "bride_father": "Bapak. Daniel Martono",
        "groom": "Agustinus Bondan Ario Wibowo",
        "groom_img": "https://storage.wedew.id/uploads/public/639/6ab/c6c/thumb_1992851_240_240_0_0_crop.jpg",
        "groom_nick": "Bondan",
        "groom_mother": "Ibu Anastasia Warti Mihardjo",
        "groom_father": "Bapak Yosep Untung Prasakti",
        "matrimony_name": "Holy Matrimony",
        "matrimony_date": "2023-03-03T00:00:00.000Z",
        "matrimony_time_start": 1,
        "matrimony_time_end": 10,
        "ceremonial_name": "Wedding Reception",
        "ceremonial_date": "2023-03-03T00:00:00.000Z",
        "ceremonial_time_start": 2,
        "ceremonial_time_end": 20,
        "map_location": "location",
        "photo": "https://storage.wedew.id/uploads/public/639/751/71e/thumb_1993822_0_600_0_0_auto.jpg",
        "story": "story",
        "story_img": "https://storage.wedew.id/uploads/public/639/751/c87/thumb_1993833_0_600_0_0_auto.jpg",
        "wallet_bank": "BCA",
        "wallet_no": 12345678,
        "wallet_owner": "Catherine Indri Hapsari",
        "MusicId": 3,
        "UserId": 4,
        "Music": {
            "id": 3,
            "band": "Christian bautista",
            "song": "Since I Found You",
            "song_src": "https://hariistimewa.com/dennisemellisa/Since-I-Found-You-Christian-Bautista.mp3"
        },
        "User": {
            "id": 4,
            "email": "rizqi@mail.com",
            "status": "silver",
            "link_invitation": "-",
            "Greets": [
                {
                    "id": 3,
                    "guest": "Mrs. Ita",
                    "presence": "hadir",
                    "greeting": "The real life Vicenzo Couple",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 4
                },
                {
                    "id": 14,
                    "guest": "Mrs. Hari Hidayati",
                    "presence": "Tidak hadir",
                    "greeting": "LOVE YOUUU VIIIII",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 4
                },
                {
                    "id": 25,
                    "guest": "Hidayati",
                    "presence": "hadir",
                    "greeting": "Selamat ya Henny, semoga acara proses pernikahan dan pestanya berjalan dengan lancar.",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 4
                },
                {
                    "id": 36,
                    "guest": "Trisaputra",
                    "presence": "Tidak hadir",
                    "greeting": "selamat kepada kedua mempelai semoga menjadi keluarga SAMAWA. aamiin...",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 4
                },
                {
                    "id": 47,
                    "guest": "Ramadhan",
                    "presence": "hadir",
                    "greeting": "Alhamdulillah, Bu Ernawati semoga acara lancar dan sukses .",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 4
                }
            ]
        }
    },
    {
        "id": 4,
        "quote": "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir",
        "quote_src": "(AR-RUM : 21)",
        "bride": "Irmawati",
        "bride_img": "https://storage.wedew.id/uploads/public/634/2bd/ca0/thumb_1909109_0_600_0_0_auto.jpg",
        "bride_nick": "Irma",
        "bride_mother": "Ibu Asmonah",
        "bride_father": "Bapak Liswanto",
        "groom": "M. A. Malik",
        "groom_img": "https://storage.wedew.id/uploads/public/634/2b1/a1e/thumb_1908978_0_600_0_0_auto.jpg",
        "groom_nick": "Malik",
        "groom_mother": "Ibu Sukecih",
        "groom_father": "Bapak Tata Rukmana (Alm)",
        "matrimony_name": "Wedding Ceremony",
        "matrimony_date": "2023-04-04T00:00:00.000Z",
        "matrimony_time_start": 1,
        "matrimony_time_end": 10,
        "ceremonial_name": "Wedding Party",
        "ceremonial_date": "2023-04-04T00:00:00.000Z",
        "ceremonial_time_start": 2,
        "ceremonial_time_end": 20,
        "map_location": "location",
        "photo": "https://storage.wedew.id/uploads/public/639/fd1/519/thumb_2000961_0_600_0_0_auto.jpg",
        "story": "story",
        "story_img": "https://storage.wedew.id/uploads/public/639/fce/7f8/thumb_2000939_0_600_0_0_auto.jpg",
        "wallet_bank": "GOPAY",
        "wallet_no": 12345678,
        "wallet_owner": "Irma",
        "MusicId": 4,
        "UserId": 5,
        "Music": {
            "id": 4,
            "band": "Ardhito Pramono",
            "song": "I Just Couldn’t save you",
            "song_src": "https://hariistimewa.com/dikardijourney/Ardhito-Pramono-I-Just-Couldnt-Save-You.mp3"
        },
        "User": {
            "id": 5,
            "email": "naira@mail.com",
            "status": "silver",
            "link_invitation": "-",
            "Greets": [
                {
                    "id": 4,
                    "guest": "Mrs. Hari Hidayati",
                    "presence": "Tidak hadir",
                    "greeting": "LOVE YOUUU VIIIII",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 5
                },
                {
                    "id": 15,
                    "guest": "Hidayati",
                    "presence": "hadir",
                    "greeting": "Selamat ya Henny, semoga acara proses pernikahan dan pestanya berjalan dengan lancar.",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 5
                },
                {
                    "id": 26,
                    "guest": "Trisaputra",
                    "presence": "Tidak hadir",
                    "greeting": "selamat kepada kedua mempelai semoga menjadi keluarga SAMAWA. aamiin...",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 5
                },
                {
                    "id": 37,
                    "guest": "Ramadhan",
                    "presence": "hadir",
                    "greeting": "Alhamdulillah, Bu Ernawati semoga acara lancar dan sukses .",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 5
                },
                {
                    "id": 48,
                    "guest": "Rahmat",
                    "presence": "Tidak hadir",
                    "greeting": "selamat berbahagia dalam membina Rumah Tangga. Aamiin YRA",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 5
                }
            ]
        }
    },
    {
        "id": 5,
        "quote": "Maha suci Allah yang telah menciptakan mahluk-Nya berpasang-pasangan. Ya Allah, perkenankanlah kami merangkaikan kasih sayang yang kau ciptakan diantara kami untuk mengikuti Sunnah Rasul-Mu dalam rangka membentuk keluarga yang sakinah, mawaddah, warahmah.",
        "quote_src": "(AR-RUM : 21)",
        "bride": "Wardah Aprilia Tifany, S.Kom",
        "bride_img": "https://storage.wedew.id/uploads/public/639/fd0/9cb/thumb_2000956_240_240_0_0_crop.jpeg",
        "bride_nick": "Wardah",
        "bride_mother": "Ibu Siti Chairani Harahap",
        "bride_father": "Bapak (Alm) Abdul Latif",
        "groom": "Fazli Nugraha Tambunan",
        "groom_img": "https://storage.wedew.id/uploads/public/634/acc/987/thumb_1917066_240_240_0_0_crop.jpg",
        "groom_nick": "Fazli",
        "groom_mother": "Ibu Mariani",
        "groom_father": "Bapak Zulkifli Tambunan",
        "matrimony_name": "Akad Nikah",
        "matrimony_date": "2023-05-05T00:00:00.000Z",
        "matrimony_time_start": 1,
        "matrimony_time_end": 10,
        "ceremonial_name": "Resepsi",
        "ceremonial_date": "2023-05-05T00:00:00.000Z",
        "ceremonial_time_start": 2,
        "ceremonial_time_end": 20,
        "map_location": "location",
        "photo": "https://storage.wedew.id/uploads/public/639/fce/ac6/thumb_2000941_0_600_0_0_auto.jpg",
        "story": "story",
        "story_img": "https://storage.wedew.id/uploads/public/639/fce/3d6/thumb_2000935_0_600_0_0_auto.jpg",
        "wallet_bank": "Mandiri",
        "wallet_no": 12345678,
        "wallet_owner": "Wardah Aprilia Tifany, S.Kom",
        "MusicId": 5,
        "UserId": 6,
        "Music": {
            "id": 5,
            "band": "Kahitna",
            "song": "Menikahimu",
            "song_src": "https://hariistimewa.com/andrevena/images/Menikahimu.mp3"
        },
        "User": {
            "id": 6,
            "email": "aulia@mail.com",
            "status": "silver",
            "link_invitation": "-",
            "Greets": [
                {
                    "id": 5,
                    "guest": "Hidayati",
                    "presence": "hadir",
                    "greeting": "Selamat ya Henny, semoga acara proses pernikahan dan pestanya berjalan dengan lancar.",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 6
                },
                {
                    "id": 16,
                    "guest": "Trisaputra",
                    "presence": "Tidak hadir",
                    "greeting": "selamat kepada kedua mempelai semoga menjadi keluarga SAMAWA. aamiin...",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 6
                },
                {
                    "id": 27,
                    "guest": "Ramadhan",
                    "presence": "hadir",
                    "greeting": "Alhamdulillah, Bu Ernawati semoga acara lancar dan sukses .",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 6
                },
                {
                    "id": 38,
                    "guest": "Rahmat",
                    "presence": "Tidak hadir",
                    "greeting": "selamat berbahagia dalam membina Rumah Tangga. Aamiin YRA",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 6
                },
                {
                    "id": 49,
                    "guest": "Bartolomeus Yoganiswara",
                    "presence": "hadir",
                    "greeting": "Selamat adik semoga lancar dan dapat berkembang biak dengan baik",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 6
                }
            ]
        }
    },
    {
        "id": 6,
        "quote": "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir",
        "quote_src": "(AR-RUM : 21)",
        "bride": "Resti Rahmilia",
        "bride_img": "https://storage.wedew.id/uploads/public/635/d52/d8a/thumb_1934709_240_240_0_0_crop.jpg",
        "bride_nick": "Resti",
        "bride_mother": "Ibu Rosni Chaniago",
        "bride_father": "Bpk Saipul Anwar (Alm.)",
        "groom": "Syahrial Koespratama",
        "groom_img": "https://storage.wedew.id/uploads/public/635/d52/ebe/thumb_1934710_240_240_0_0_crop.jpg",
        "groom_nick": "Resti",
        "groom_mother": "Ibu Anisyahwati",
        "groom_father": "Bpk Koes Darminto",
        "matrimony_name": "Akad Nikah",
        "matrimony_date": "2023-06-06T00:00:00.000Z",
        "matrimony_time_start": 1,
        "matrimony_time_end": 10,
        "ceremonial_name": "Resepsi",
        "ceremonial_date": "2023-06-06T00:00:00.000Z",
        "ceremonial_time_start": 2,
        "ceremonial_time_end": 20,
        "map_location": "location",
        "photo": "https://storage.wedew.id/uploads/public/635/def/f68/thumb_1935274_1400_1400_0_0_auto.jpg",
        "story": "story",
        "story_img": "https://storage.wedew.id/uploads/public/635/d53/aae/635d53aaecea0055999883.jpg",
        "wallet_bank": "BRI",
        "wallet_no": 12345678,
        "wallet_owner": "Resti Rahmilia",
        "MusicId": 6,
        "UserId": 7,
        "Music": {
            "id": 6,
            "band": "Jasmine Thompson",
            "song": "You Are my sunsine",
            "song_src": "https://hariistimewa.com/astrikhairul/images/You-Are-My-Sunshine.mp3"
        },
        "User": {
            "id": 7,
            "email": "aisyah@mail.com",
            "status": "diamond",
            "link_invitation": "-",
            "Greets": [
                {
                    "id": 6,
                    "guest": "Trisaputra",
                    "presence": "Tidak hadir",
                    "greeting": "selamat kepada kedua mempelai semoga menjadi keluarga SAMAWA. aamiin...",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 7
                },
                {
                    "id": 17,
                    "guest": "Ramadhan",
                    "presence": "hadir",
                    "greeting": "Alhamdulillah, Bu Ernawati semoga acara lancar dan sukses .",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 7
                },
                {
                    "id": 28,
                    "guest": "Rahmat",
                    "presence": "Tidak hadir",
                    "greeting": "selamat berbahagia dalam membina Rumah Tangga. Aamiin YRA",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 7
                },
                {
                    "id": 39,
                    "guest": "Bartolomeus Yoganiswara",
                    "presence": "hadir",
                    "greeting": "Selamat adik semoga lancar dan dapat berkembang biak dengan baik",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 7
                },
                {
                    "id": 50,
                    "guest": "Davy",
                    "presence": "hadir",
                    "greeting": "Sekian lama ga ketemu fadel eh ketemu lagi udh gitu plotwist ketemunya dibali wkwkw,",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 7
                }
            ]
        }
    },
    {
        "id": 7,
        "quote": "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
        "quote_src": "( Ar Rum - 21 )",
        "bride": "drg. Zalki Fatmah Azzahari",
        "bride_img": "https://storage.wedew.id/uploads/public/634/2ae/bcc/thumb_1908941_240_240_0_0_crop.jpg",
        "bride_nick": "Alfian",
        "bride_mother": "Ibu Yuliani S.E. M.Pd",
        "bride_father": "Bapak Azzahari, S.Pd. M.M",
        "groom": "Alfian Darmawan",
        "groom_img": "https://storage.wedew.id/uploads/public/634/2c1/988/thumb_1909155_240_240_0_0_crop.jpg",
        "groom_nick": "Zalki",
        "groom_mother": "Ibu Munifah",
        "groom_father": "Bapak Muhli, S.Pd.",
        "matrimony_name": "Holy Matrimony",
        "matrimony_date": "2023-07-07T00:00:00.000Z",
        "matrimony_time_start": 1,
        "matrimony_time_end": 10,
        "ceremonial_name": "Wedding Reception",
        "ceremonial_date": "2023-07-07T00:00:00.000Z",
        "ceremonial_time_start": 2,
        "ceremonial_time_end": 20,
        "map_location": "location",
        "photo": "https://storage.wedew.id/uploads/public/634/2b1/e95/thumb_1908982_0_600_0_0_auto.jpg",
        "story": "story",
        "story_img": "https://storage.wedew.id/uploads/public/634/2ba/f52/thumb_1909073_0_600_0_0_auto.jpg",
        "wallet_bank": "BCA",
        "wallet_no": 12345678,
        "wallet_owner": "drg. Zalki Fatmah Azzahari",
        "MusicId": 2,
        "UserId": 8,
        "Music": {
            "id": 2,
            "band": "Depapepe",
            "song": "one",
            "song_src": "https://hariistimewa.com/ericfransiscawedding/images/one.mp3"
        },
        "User": {
            "id": 8,
            "email": "alya@mail.com",
            "status": "diamond",
            "link_invitation": "-",
            "Greets": [
                {
                    "id": 7,
                    "guest": "Ramadhan",
                    "presence": "hadir",
                    "greeting": "Alhamdulillah, Bu Ernawati semoga acara lancar dan sukses .",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 8
                },
                {
                    "id": 18,
                    "guest": "Rahmat",
                    "presence": "Tidak hadir",
                    "greeting": "selamat berbahagia dalam membina Rumah Tangga. Aamiin YRA",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 8
                },
                {
                    "id": 29,
                    "guest": "Bartolomeus Yoganiswara",
                    "presence": "hadir",
                    "greeting": "Selamat adik semoga lancar dan dapat berkembang biak dengan baik",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 8
                },
                {
                    "id": 40,
                    "guest": "Davy",
                    "presence": "hadir",
                    "greeting": "Sekian lama ga ketemu fadel eh ketemu lagi udh gitu plotwist ketemunya dibali wkwkw,",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 8
                },
                {
                    "id": 41,
                    "guest": "Cindy Nabila",
                    "presence": "hadir",
                    "greeting": "Congratsss ambonn deviiii,",
                    "date": "2023-01-11T08:51:47.154Z",
                    "UserId": 8
                }
            ]
        }
    },
    {
        "id": 8,
        "quote": "In gratitude to God who brought us together, and with the blessings of our beloved parents. We joyously invite you to witness as we exchange marriage vows.",
        "quote_src": "-",
        "bride": "Catherine Indri Hapsari",
        "bride_img": "https://storage.wedew.id/uploads/public/639/6ab/bd2/thumb_1992850_240_240_0_0_crop.jpg",
        "bride_nick": "Catherine",
        "bride_mother": "Ibu Lucia Christyanti",
        "bride_father": "Bapak. Daniel Martono",
        "groom": "Agustinus Bondan Ario Wibowo",
        "groom_img": "https://storage.wedew.id/uploads/public/639/6ab/c6c/thumb_1992851_240_240_0_0_crop.jpg",
        "groom_nick": "Bondan",
        "groom_mother": "Ibu Anastasia Warti Mihardjo",
        "groom_father": "Bapak Yosep Untung Prasakti",
        "matrimony_name": "Holy Matrimony",
        "matrimony_date": "2023-03-03T00:00:00.000Z",
        "matrimony_time_start": 1,
        "matrimony_time_end": 10,
        "ceremonial_name": "Wedding Reception",
        "ceremonial_date": "2023-03-03T00:00:00.000Z",
        "ceremonial_time_start": 2,
        "ceremonial_time_end": 20,
        "map_location": "location",
        "photo": "https://storage.wedew.id/uploads/public/639/751/71e/thumb_1993822_0_600_0_0_auto.jpg",
        "story": "story",
        "story_img": "https://storage.wedew.id/uploads/public/639/751/c87/thumb_1993833_0_600_0_0_auto.jpg",
        "wallet_bank": "BCA",
        "wallet_no": 12345678,
        "wallet_owner": "Catherine Indri Hapsari",
        "MusicId": 6,
        "UserId": 9,
        "Music": {
            "id": 6,
            "band": "Jasmine Thompson",
            "song": "You Are my sunsine",
            "song_src": "https://hariistimewa.com/astrikhairul/images/You-Are-My-Sunshine.mp3"
        },
        "User": {
            "id": 9,
            "email": "alesha@mail.com",
            "status": "diamond",
            "link_invitation": "-",
            "Greets": [
                {
                    "id": 8,
                    "guest": "Rahmat",
                    "presence": "Tidak hadir",
                    "greeting": "selamat berbahagia dalam membina Rumah Tangga. Aamiin YRA",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 9
                },
                {
                    "id": 19,
                    "guest": "Bartolomeus Yoganiswara",
                    "presence": "hadir",
                    "greeting": "Selamat adik semoga lancar dan dapat berkembang biak dengan baik",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 9
                },
                {
                    "id": 30,
                    "guest": "Davy",
                    "presence": "hadir",
                    "greeting": "Sekian lama ga ketemu fadel eh ketemu lagi udh gitu plotwist ketemunya dibali wkwkw,",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 9
                },
                {
                    "id": 31,
                    "guest": "Cindy Nabila",
                    "presence": "hadir",
                    "greeting": "Congratsss ambonn deviiii,",
                    "date": "2023-01-11T08:51:47.154Z",
                    "UserId": 9
                },
                {
                    "id": 42,
                    "guest": "Fauzi Nurahman",
                    "presence": "Tidak hadir",
                    "greeting": "semoga pernikahannya lancar, dan SaMaWa pernikahannya sampai akhir hayatt aminnn..",
                    "date": "2023-01-11T09:03:49.110Z",
                    "UserId": 9
                }
            ]
        }
    },
    {
        "id": 9,
        "quote": "“Dan segala sesuatu Kami ciptakan berpasang-pasangan agar kamu mengingat (kebesaran Allah).”",
        "quote_src": "(QS. Az Zariyat: 49)",
        "bride": "Larashati Puspa Fajriani",
        "bride_img": "https://storage.wedew.id/uploads/public/636/fb4/62a/thumb_1953581_240_240_0_0_crop.jpg",
        "bride_nick": "Laras",
        "bride_mother": "Ibu Tri Narsasi Utami",
        "bride_father": "Bapak Sakimin",
        "groom": "David Beni Pribadi",
        "groom_img": "https://storage.wedew.id/uploads/public/636/fb4/6ae/thumb_1953583_240_240_0_0_crop.jpg",
        "groom_nick": "David",
        "groom_mother": "Ibu Muslimah",
        "groom_father": "Bapak R. Tedjomartojo (Alm)",
        "matrimony_name": "Holy Matrimony",
        "matrimony_date": "2023-09-09T00:00:00.000Z",
        "matrimony_time_start": 1,
        "matrimony_time_end": 10,
        "ceremonial_name": "Wedding Reception",
        "ceremonial_date": "2023-09-09T00:00:00.000Z",
        "ceremonial_time_start": 2,
        "ceremonial_time_end": 20,
        "map_location": "location",
        "photo": "https://storage.wedew.id/uploads/public/639/fd1/519/thumb_2000961_0_600_0_0_auto.jpg",
        "story": "story",
        "story_img": "https://storage.wedew.id/uploads/public/639/fce/7f8/thumb_2000939_0_600_0_0_auto.jpg",
        "wallet_bank": "Mandiri",
        "wallet_no": 12345678,
        "wallet_owner": "Larashati Puspa Fajriani",
        "MusicId": 5,
        "UserId": 10,
        "Music": {
            "id": 5,
            "band": "Kahitna",
            "song": "Menikahimu",
            "song_src": "https://hariistimewa.com/andrevena/images/Menikahimu.mp3"
        },
        "User": {
            "id": 10,
            "email": "nadhira@mail.com",
            "status": "diamond",
            "link_invitation": "-",
            "Greets": [
                {
                    "id": 9,
                    "guest": "Bartolomeus Yoganiswara",
                    "presence": "hadir",
                    "greeting": "Selamat adik semoga lancar dan dapat berkembang biak dengan baik",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 10
                },
                {
                    "id": 20,
                    "guest": "Davy",
                    "presence": "hadir",
                    "greeting": "Sekian lama ga ketemu fadel eh ketemu lagi udh gitu plotwist ketemunya dibali wkwkw,",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 10
                },
                {
                    "id": 21,
                    "guest": "Cindy Nabila",
                    "presence": "hadir",
                    "greeting": "Congratsss ambonn deviiii,",
                    "date": "2023-01-11T08:51:47.154Z",
                    "UserId": 10
                },
                {
                    "id": 32,
                    "guest": "Fauzi Nurahman",
                    "presence": "Tidak hadir",
                    "greeting": "semoga pernikahannya lancar, dan SaMaWa pernikahannya sampai akhir hayatt aminnn..",
                    "date": "2023-01-11T09:03:49.110Z",
                    "UserId": 10
                },
                {
                    "id": 43,
                    "guest": "Mrs. Ita",
                    "presence": "hadir",
                    "greeting": "The real life Vicenzo Couple",
                    "date": "2023-01-11T09:05:16.204Z",
                    "UserId": 10
                }
            ]
        }
    },
    {
        "id": 10,
        "quote": "“Bila dalam perjalanan hidupmu, engkau menemukan seorang teman yang bijaksana dan cocok untuk hidup denganmu, hendaklah engkau berjalan bersamanya, dengan gembira dan penuh kesadaran mengatasi segala bahaya”.",
        "quote_src": "(DHAMMAPADA XXIII – 328)",
        "bride": "Aurora Virginia Casey",
        "bride_img": "https://storage.wedew.id/uploads/public/638/480/952/thumb_1976537_240_240_0_0_crop.jpg",
        "bride_nick": "Casey",
        "bride_mother": "Mrs. Zheng Xiao Yen",
        "bride_father": "Mr. Yandy",
        "groom": "Alvin Wijaya S.Kom",
        "groom_img": "https://storage.wedew.id/uploads/public/638/480/997/thumb_1976538_240_240_0_0_crop.jpg",
        "groom_nick": "Alvin",
        "groom_mother": "Mrs. Jusnita",
        "groom_father": "Mr. Johanis Lo (Tan Ui Yong)",
        "matrimony_name": "Wedding Ceremony",
        "matrimony_date": "2023-02-02T00:00:00.000Z",
        "matrimony_time_start": 1,
        "matrimony_time_end": 10,
        "ceremonial_name": "Wedding Party",
        "ceremonial_date": "2023-02-02T00:00:00.000Z",
        "ceremonial_time_start": 2,
        "ceremonial_time_end": 20,
        "map_location": "location",
        "photo": "https://storage.wedew.id/uploads/public/639/751/84a/thumb_1993825_0_600_0_0_auto.jpg",
        "story": "story",
        "story_img": "https://storage.wedew.id/uploads/public/638/ac8/0a7/thumb_1983064_0_600_0_0_auto.jpg",
        "wallet_bank": "BRI",
        "wallet_no": 12345678,
        "wallet_owner": "Aurora Virginia Casey",
        "MusicId": 2,
        "UserId": 11,
        "Music": {
            "id": 2,
            "band": "Depapepe",
            "song": "one",
            "song_src": "https://hariistimewa.com/ericfransiscawedding/images/one.mp3"
        },
        "User": {
            "id": 11,
            "email": "intan@mail.com",
            "status": "diamond",
            "link_invitation": "-",
            "Greets": []
        }
    },
    {
        "id": 11,
        "quote": "a",
        "quote_src": "a",
        "bride": "a",
        "bride_img": "a",
        "bride_nick": "a",
        "bride_mother": "al",
        "bride_father": "am",
        "groom": "a",
        "groom_img": "at",
        "groom_nick": "a",
        "groom_mother": "ai",
        "groom_father": "al",
        "matrimony_name": "as",
        "matrimony_date": "2023-01-13T00:00:00.000Z",
        "matrimony_time_start": 1,
        "matrimony_time_end": 1,
        "ceremonial_name": "a",
        "ceremonial_date": "2023-01-13T00:00:00.000Z",
        "ceremonial_time_start": 1,
        "ceremonial_time_end": 1,
        "map_location": "am",
        "photo": "aj",
        "story": "ay",
        "story_img": "ar",
        "wallet_bank": "ae",
        "wallet_no": 1,
        "wallet_owner": "ac",
        "MusicId": 2,
        "UserId": 36,
        "Music": {
            "id": 2,
            "band": "Depapepe",
            "song": "one",
            "song_src": "https://hariistimewa.com/ericfransiscawedding/images/one.mp3"
        },
        "User": {
            "id": 36,
            "email": "userbaru@mail.com",
            "status": "silver",
            "link_invitation": "-",
            "Greets": []
        }
    }
]
```

&nbsp;

## 6. GET /musics

Description:

- get all music



_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "band": "Stephen Sanchez",
        "song": "Until I Found You",
        "song_src": "https://hariistimewa.com/virafahri/images/Sanchez.mp3",
        "createdAt": "2023-01-11T15:58:21.439Z",
        "updatedAt": "2023-01-11T15:58:21.439Z"
    },
    {
        "id": 2,
        "band": "Depapepe",
        "song": "one",
        "song_src": "https://hariistimewa.com/ericfransiscawedding/images/one.mp3",
        "createdAt": "2023-01-11T15:58:21.439Z",
        "updatedAt": "2023-01-11T15:58:21.439Z"
    },
    {
        "id": 3,
        "band": "Christian bautista",
        "song": "Since I Found You",
        "song_src": "https://hariistimewa.com/dennisemellisa/Since-I-Found-You-Christian-Bautista.mp3",
        "createdAt": "2023-01-11T15:58:21.439Z",
        "updatedAt": "2023-01-11T15:58:21.439Z"
    },
    {
        "id": 4,
        "band": "Ardhito Pramono",
        "song": "I Just Couldn’t save you",
        "song_src": "https://hariistimewa.com/dikardijourney/Ardhito-Pramono-I-Just-Couldnt-Save-You.mp3",
        "createdAt": "2023-01-11T15:58:21.439Z",
        "updatedAt": "2023-01-11T15:58:21.439Z"
    },
    {
        "id": 5,
        "band": "Kahitna",
        "song": "Menikahimu",
        "song_src": "https://hariistimewa.com/andrevena/images/Menikahimu.mp3",
        "createdAt": "2023-01-11T15:58:21.439Z",
        "updatedAt": "2023-01-11T15:58:21.439Z"
    },
    {
        "id": 6,
        "band": "Jasmine Thompson",
        "song": "You Are my sunsine",
        "song_src": "https://hariistimewa.com/astrikhairul/images/You-Are-My-Sunshine.mp3",
        "createdAt": "2023-01-11T15:58:21.439Z",
        "updatedAt": "2023-01-11T15:58:21.439Z"
    }
]
```

_Response (400 - Bad Request)_


&nbsp;

## 7. GET /greets

Description:

- get all greets


_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "guest": "Cindy Nabila",
        "presence": "hadir",
        "greeting": "Congratsss ambonn deviiii,",
        "date": "2023-01-11T08:51:47.154Z",
        "UserId": 2,
        "createdAt": "2023-01-11T15:58:21.444Z",
        "updatedAt": "2023-01-11T15:58:21.444Z"
    },
    {
        "id": 2,
        "guest": "Fauzi Nurahman",
        "presence": "Tidak hadir",
        "greeting": "semoga pernikahannya lancar, dan SaMaWa pernikahannya sampai akhir hayatt aminnn..",
        "date": "2023-01-11T09:03:49.110Z",
        "UserId": 3,
        "createdAt": "2023-01-11T15:58:21.444Z",
        "updatedAt": "2023-01-11T15:58:21.444Z"
    },
    {
        "id": 3,
        "guest": "Mrs. Ita",
        "presence": "hadir",
        "greeting": "The real life Vicenzo Couple",
        "date": "2023-01-11T09:05:16.204Z",
        "UserId": 4,
        "createdAt": "2023-01-11T15:58:21.444Z",
        "updatedAt": "2023-01-11T15:58:21.444Z"
    },
    {
        "id": 4,
        "guest": "Mrs. Hari Hidayati",
        "presence": "Tidak hadir",
        "greeting": "LOVE YOUUU VIIIII",
        "date": "2023-01-11T09:05:16.204Z",
        "UserId": 5,
        "createdAt": "2023-01-11T15:58:21.444Z",
        "updatedAt": "2023-01-11T15:58:21.444Z"
    },
    {
        "id": 5,
        "guest": "Hidayati",
        "presence": "hadir",
        "greeting": "Selamat ya Henny, semoga acara proses pernikahan dan pestanya berjalan dengan lancar.",
        "date": "2023-01-11T09:05:16.204Z",
        "UserId": 6,
        "createdAt": "2023-01-11T15:58:21.444Z",
        "updatedAt": "2023-01-11T15:58:21.444Z"
    }
]
```


## 8. POST /invitation

Description:

- add new invitation

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
    "message": "Undangan Putra & Putri Berhasil dibuat"
}
```


_Response (401 - Not Found)_

```json
{
    "message": "Unauthenticated"
}
```

_Response (40 - Bad  Request)_

```json
{
    "message": [
        "Quote Mohon diisi",
        "Sumber Quote Mohon diisi",
        "Nama Lengkap Mohon diisi",
        "Foto Mohon diupload",
        "Nama Panggilan Mohon diisi",
        "Nama Ibu Mohon diisi",
        "Nama Ayah Mohon diisi",
        "Nama Lengkap Mohon diisi",
        "Foto Mohon diupload",
        "Nama Panggilan Mohon diisi",
        "Nama Ibu Mohon diisi",
        "Nama Ayah Mohon diisi",
        "Tanggal Acara Mohon diisi",
        "jam Mulai Mohon diisi",
        "Jam Selesai Mohon diisi",
        "Tanggal Acara Mohon diisi",
        "jam Mulai Mohon diisi",
        "Jam Selesai Mohon diisi",
        "Foto Mohon diupload",
        "Story Mohon diisi",
        "Foto Mohon diupload",
        "Nama Bank Mohon diisi",
        "Nomor Rekening Mohon diisi",
        "Nama Pemilik Rekening Mohon diisi",
        "Mohon Pilih Lagu Terlebih Dahulu"
    ]
}
```



## 9. POST /invitation/:id

Description:

- edit invitation by id

Request:

- params:

```json
{
  "id": "string"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "message": "Undangan Sudah Terupdate"
}
```

_Response (401 - Unauthenticated)_

```json
{
    "message": "Unauthenticated"
}
```

_Response (40 - Bad  Request)_

```json
{
    "message": [
        "Quote Mohon diisi",
        "Sumber Quote Mohon diisi",
        "Nama Lengkap Mohon diisi",
        "Foto Mohon diupload",
        "Nama Panggilan Mohon diisi",
        "Nama Ibu Mohon diisi",
        "Nama Ayah Mohon diisi",
        "Nama Lengkap Mohon diisi",
        "Foto Mohon diupload",
        "Nama Panggilan Mohon diisi",
        "Nama Ibu Mohon diisi",
        "Nama Ayah Mohon diisi",
        "Tanggal Acara Mohon diisi",
        "jam Mulai Mohon diisi",
        "Jam Selesai Mohon diisi",
        "Tanggal Acara Mohon diisi",
        "jam Mulai Mohon diisi",
        "Jam Selesai Mohon diisi",
        "Foto Mohon diupload",
        "Story Mohon diisi",
        "Foto Mohon diupload",
        "Nama Bank Mohon diisi",
        "Nomor Rekening Mohon diisi",
        "Nama Pemilik Rekening Mohon diisi",
        "Mohon Pilih Lagu Terlebih Dahulu"
    ]
}
```




## 10. POST /music

Description:

- add new Music

Request:

- body:

```json
{
  "band": "string",
  "song": "string",  
  "song_src": "string"
}
```

_Response (201 - Created)_

```json
    {
        "id": 3,
        "band": "Christian bautista",
        "song": "Since I Found You",
        "song_src": "https://hariistimewa.com/dennisemellisa/Since-I-Found-You-Christian-Bautista.mp3",
        "createdAt": "2023-01-11T15:58:21.439Z",
        "updatedAt": "2023-01-11T15:58:21.439Z"
    },
```

_Response (400 - Bad Request)_

```json
{
    "message": [
        "Nama Band Mohon diisi",
        "Judul Lagu Mohon diisi",
        "Source Url Lagu Mohon diisi"
    ]
}
```

&nbsp;



## 11. DELETE /music/:id

Description:

- delete Music by id

Request:


_Response (201 - Created)_

```json
    {
      "message": "Lagu berhasil dihapus"
    }
```

_Response (404 - Not Found)_

```json
{
    "message":  "Data tidak ditemukan"
}
```

&nbsp;