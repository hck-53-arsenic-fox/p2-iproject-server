const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://astronomy.p.rapidapi.com/api/v2/bodies/positions',
  params: {
    latitude: '33.775867',
    longitude: '-84.39733',
    from_date: '2017-12-20',
    to_date: '2017-12-21',
    elevation: '166',
    time: '12:00:00'
  },
  headers: {
    'X-RapidAPI-Key': '133cca9a9bmshc269ee122d24beep1cf46ejsn49efdf89a6c7',
    'X-RapidAPI-Host': 'astronomy.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});