const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
  date: {
    type: String,
    required: true
  },
  amount:  {
    type: Number,
    required: true
  },
}, {
  timestamps: true
});

module.exports = model('Orders', OrderSchema, 'Orders');