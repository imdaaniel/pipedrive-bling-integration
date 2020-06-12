const axios = require('axios');
const Opportunity = require('../models/Order');
const pipedrive = require('../services/pipedrive.api');
const bling = require('../services/bling.api');

module.exports = {
  async sync(request, response) {
    // const opportunities = await pipedrive.list();

    // const ids = await pipedrive.ids(opportunities);

    const orders = await bling.orders();

    response.json(orders);
  },
}