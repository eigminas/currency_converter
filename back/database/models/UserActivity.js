const mongoose = require("mongoose");

const UserActivitySchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },

  fromRate: {
    type: Number,
    required: true,
  },

  to: {
    type: String,
    required: true,
  },

  toRate: {
    type: Number,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  result: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = UserActivity = mongoose.model("userActivity", UserActivitySchema);
