const mongoose = require("mongoose");

const CurrencyHistorySchema = new mongoose.Schema({
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

module.exports = CurrencyRateHistory = mongoose.model("ratesHistory", CurrencyHistorySchema);
