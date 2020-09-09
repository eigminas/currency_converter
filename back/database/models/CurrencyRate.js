const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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

module.exports = User = mongoose.model("rates", UserSchema);
