const mongoose = require("mongoose");

const CurrencyRateSchema = new mongoose.Schema({
  currency: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = CurrencyRate = mongoose.model("rates", CurrencyRateSchema);
