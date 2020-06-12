const { Schema, model } = require('mongoose');

const OpportunitySchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  amount:  {
    type: Number,
    required: true
  },
}, {
  timestamps: true
});

module.exports = model('Opportunity', OpportunitySchema);