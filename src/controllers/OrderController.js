const axios = require('axios');
const Opportunity = require('../models/Order');
const pipedrive = require('../services/pipedrive.api');
const bling = require('../services/bling.api');

module.exports = {
  async sync(request, response) {
    // List all opportunities with status 'won'
    const opportunities = await pipedrive.list();

    // List existing orders on Bling
    const orders = await bling.orders();

    // Return 'numeroOrdemCompra' for each order
    const orderIds = bling.ids(orders);

    // Remove duplicates
    const newOpportunities = pipedrive.removeDuplicates(opportunities, orderIds);

    if (newOpportunities.length == 0) {
      return response.status(404).json({ message: 'There are not new opportunities to insert as order' });
    }

    const create = await bling.createOrder(newOpportunities);

    if (!create) {
      return response.status(400).json({ message: 'An error was ocurred during orders creation' });
    }
    
    return response.status(200).json({ success: true });
  },
}