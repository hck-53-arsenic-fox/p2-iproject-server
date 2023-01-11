const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

const Controller = require('./controllers/controller');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/countries', Controller.countryList);
app.get('/countries/:countryCode', Controller.selectedCountryData);
app.get('/relative-prices/:countryCode', Controller.relativePrices);
app.get('/big-mac-indexes/:countryCode', Controller.dataByCountry);

app.get('/working-times', Controller.workingTimes);
app.get('/working-times/:countryCode', Controller.workingTimeByCountry);

app.listen(port, () => console.log(`listening on ${port}`));
