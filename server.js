const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.urlencoded({ extended: false }));

server.get('/api/archiveData', (req, res) => {
  const date = req.query.date || '01.01.2015';
  const BASE_EXCHANGE_RATES_ARCHIVE_URL = "https://api.privatbank.ua/p24api/exchange_rates?json&date=" + date;

  fetch(BASE_EXCHANGE_RATES_ARCHIVE_URL)
    .then(res => res.json())
    .then(data => res.send(JSON.stringify(data)))
});

server.listen(3000, () =>
  console.log('Express server is running on localhost:3000')
);
