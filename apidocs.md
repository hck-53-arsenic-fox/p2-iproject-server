# Burgernomics - API Documentation

https://burgernomics-production.up.railway.app

## Endpoints

&nbsp;

- `GET /countries`
- `GET /countries/:countryCode`

- `GET /relative-prices/:countryCode`
- `GET /big-mac-indexes/:countryCode`

- `GET /working-times`
- `GET /working-times/:countryCode`
- `POST /midtrans-token`

## 1. GET /countries

Description:

- get country code and and country name data

Request:

_Response (200 - OK)_

```json
[
	{
		"iso_a3": "ARE",
		"country": "United Arab Emirates"
	},
	{
		"iso_a3": "ARG",
		"country": "Argentina"
	},
	{
		"iso_a3": "AUS",
		"country": "Australia"
	},
	{
		"iso_a3": "AZE",
		"country": "Azerbaijan"
	},
	{
		"iso_a3": "BHR",
		"country": "Bahrain"
	},
    ...
]

```

## 2. GET /countries/:countryCode

Description:

- get countries detail data based on ISO 3 country code

Request:

- params:

```json
{
  "countryCode": "string (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 22,
  "country": "Indonesia",
  "iso_a3": "IDN",
  "currency_code": "IDR",
  "local_price": 35000,
  "dollar_ex": 14977.5,
  "rupiah_ex": 1,
  "rupiah_ex_10000": 10000,
  "dollar_price": 2.33683859122016,
  "rupiah_price": 34999.9999999999,
  "dollar_ppp": 6796.11650485436,
  "rupiah_ppp": 1,
  "rupiah_ppp_10000": 10000,
  "GDP_bigmac": 9172.24671891286,
  "dollar_valuation": -54.624,
  "rupiah_valuation": 0,
  "createdAt": "2023-01-12T04:13:50.236Z",
  "updatedAt": "2023-01-12T04:13:50.236Z"
}
```

## 3. GET /relative-prices/:countryCode

Description:

- get a country big mac relative prices compared to other countries

Request:

- params:

```json
{
  "countryCode": "string (required)"
}
```

_Response (200 - OK)_

```json
{
	"selected": {
		"id": 22,
		"country": "Indonesia",
		"iso_a3": "IDN",
		"currency_code": "IDR",
		"local_price": 35000,
		"dollar_ex": 14977.5,
		"rupiah_ex": 1,
		"rupiah_ex_10000": 10000,
		"dollar_price": 2.33683859122016,
		"rupiah_price": 34999.9999999999,
		"dollar_ppp": 6796.11650485436,
		"rupiah_ppp": 1,
		"rupiah_ppp_10000": 10000,
		"GDP_bigmac": 9172.24671891286,
		"dollar_valuation": -54.624,
		"rupiah_valuation": 0,
		"createdAt": "2023-01-12T04:13:50.236Z",
		"updatedAt": "2023-01-12T04:13:50.236Z"
	},
	"relativePrices": [
		{
			"iso_a3": "ARE",
			"country": "United Arab Emirates",
			"relative_price_to_IDR": "110",
			"IDR_price": "73398.13"
		},
		{
			"iso_a3": "ARG",
			"country": "Argentina",
			"relative_price_to_IDR": "96",
			"IDR_price": "68440.73"
		},
		{
			"iso_a3": "AUS",
			"country": "Australia",
			"relative_price_to_IDR": "98",
			"IDR_price": "69281.12"
		},
        ...
    ],
}
```

## 4. GET /big-mac-indexes/:countryCode

Description:

- get the latest update of big mac index by country from Nasdaq 3rd party API

Request:

- params:

```json
{
  "countryCode": "string (required)"
}
```

_Response (200 - OK)_

```json
{
	"dataset": {
		"id": 9776631,
		"dataset_code": "BIGMAC_IDN",
		"database_code": "ECONOMIST",
		"name": "Big Mac Index - Indonesia",
		"description": "The Big Mac Index is an informal measure of currency exchange rates at ppp. It measures their value against a similar basket of goods and services, in this case a Big Mac. Differing prices at market exchange rates would imply that one currency is under or overvalued.",
		"refreshed_at": "2022-09-15 00:00:30 UTC",
		"newest_available_date": "2022-07-31",
		"oldest_available_date": "2000-04-30",
		"column_names": [
			"Date",
			"local_price",
			"dollar_ex",
			"dollar_price",
			"dollar_ppp",
			"dollar_valuation",
			"dollar_adj_valuation",
			"euro_adj_valuation",
			"sterling_adj_valuation",
			"yen_adj_valuation",
			"yuan_adj_valuation"
		],
		"frequency": "daily",
		"type": "Time Series",
		"premium": false,
		"limit": null,
		"transform": null,
		"column_index": null,
		"start_date": "2000-04-30",
		"end_date": "2022-07-31",
		"data": [
			[
				"2022-07-31",
				35000.0,
				14977.5,
				2.33683859122016,
				6796.116504854359,
				-54.623999999999995,
				-41.114,
				-43.472,
				-37.267,
				2.1999999999999997,
				-31.719
			],
			[
				"2022-01-31",
				34000.0,
				14382.0,
				2.36406619385343,
				5851.979345955255,
				-59.309999999999995,
				-30.284,
				-32.647,
				-29.432000000000002,
				0.164,
				-33.45
			],
			[
				"2021-07-31",
				34000.0,
				14517.5,
				2.34200103323575,
				6017.699115044247,
				-58.54899999999999,
				-26.807,
				-32.966,
				-27.547,
				-3.202,
				-26.529999999999998
			],
			[
				"2021-01-31",
				34000.0,
				14125.0,
				2.4070796460177,
				6007.067137809189,
				-57.49999999999999,
				-22.900000000000002,
				-31.6,
				-18.2,
				-4.8,
				-24.8
			],
            ...
        ]
    }
}
```

## 5. GET /working-times

Description:

- get avg monthly wages of countries and local big mac prices

_Response (200 - OK)_

```json
[
	{
		"id": 1,
		"countryCode": "ARG",
		"countryName": "Argentina",
		"bigMacPriceUsd": 4.57,
		"avgWageUsd": 544.82,
		"createdAt": "2023-01-12T04:13:50.751Z",
		"updatedAt": "2023-01-12T04:13:50.751Z",
		"minutesToBuyBigMac": 87
	},
	{
		"id": 2,
		"countryCode": "AZE",
		"countryName": "Azerbaijan",
		"bigMacPriceUsd": 2.77,
		"avgWageUsd": 430.65,
		"createdAt": "2023-01-12T04:13:50.751Z",
		"updatedAt": "2023-01-12T04:13:50.751Z",
		"minutesToBuyBigMac": 67
	},
	{
		"id": 3,
		"countryCode": "BRA",
		"countryName": "Brazil",
		"bigMacPriceUsd": 4.25,
		"avgWageUsd": 447.55,
		"createdAt": "2023-01-12T04:13:50.751Z",
		"updatedAt": "2023-01-12T04:13:50.751Z",
		"minutesToBuyBigMac": 99
	},
    ...,
]
```

## 6. GET /working-times/:countryCode

Description:

- get avg monthly wages of selected country and its local big mac price

Request:

- params:

```json
{
  "countryCode": "string (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 7,
  "countryCode": "IDN",
  "countryName": "Indonesia",
  "bigMacPriceUsd": 2.34,
  "avgWageUsd": 175.53,
  "createdAt": "2023-01-12T04:13:50.751Z",
  "updatedAt": "2023-01-12T04:13:50.751Z",
  "minutesToBuyBigMac": 139
}
```

## 7. POST /midtrans-token

Description:

- generate token for midtrans payment

_Response (200 - OK)_

```json
{
  "token": "3434818d-582a-4828-a664-532dfdasfdf675c0c9"
}
```
