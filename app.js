if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');

const Controller = require('./controllers/controller');
const PaymentController = require('./controllers/paymentController');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/countries', Controller.countryList);
app.get('/countries/:countryCode', Controller.selectedCountryData);
app.get('/relative-prices/:countryCode', Controller.relativePrices);
app.get('/big-mac-indexes/:countryCode', Controller.dataByCountry);

app.get('/working-times', Controller.workingTimes);
app.get('/working-times/:countryCode', Controller.workingTimeByCountry);

app.post('/midtrans-token', PaymentController.generateToken);

app.listen(port, () => console.log(`listening on ${port}`));
