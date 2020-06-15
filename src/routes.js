const express = require('express');
const Order = require('./controllers/OrderController');

const routes = express.Router();

routes.get('/sync', Order.sync);
routes.get('/orders', Order.orders);

module.exports = routes;