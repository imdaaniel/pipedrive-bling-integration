const express = require('express');
const Order = require('./controllers/OrderController');

const routes = express.Router();

routes.get('/', (request, response) => {
  return response.json({
    message: 'Hello World'
  });
});

routes.get('/sync', Order.sync);

module.exports = routes;