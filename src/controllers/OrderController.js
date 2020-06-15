const axios = require('axios');
const Order = require('../models/Order');
const pipedrive = require('../services/pipedrive.api');
const bling = require('../services/bling.api');
const { orders } = require('../services/bling.api');

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
      return response.status(404).json({
        message: 'There are no new opportunities to insert as order'
      });
    }

    // Insert new opportunities on Bling and return the amount of values
    const newAmount = await bling.createOrders(newOpportunities);

    if (!newAmount) {
      return response.status(500).json({
        message: 'An error ocurred while creating the orders'
      });
    }

    const today = new Date().toISOString().slice(0, 10);
    const todayOrdersId = await Order.findOne({ date: today });

    if (todayOrdersId) {
      await Order.updateOne({ _id: todayOrdersId._id }, { $set: { amount: todayOrdersId.amount + newAmount }} );
    } else {
      await Order.create({ date: today, amount: newAmount });
    }
    
    return response.status(200).json({
      message: 'Success'
    });
  },

  async orders(request, response) {
    const orders = await Order.find();

    if (!orders) {
      return response.status(404).json();
    }

    return response.status(200).json(orders);
  }
}