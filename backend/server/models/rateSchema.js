const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
  metal: {
    type: String,
    required: true,
    enum: ['Gold', 'Silver', 'Platinum'],
  },
  purity: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  rateDate: {
    type: Date,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Rate', rateSchema);
