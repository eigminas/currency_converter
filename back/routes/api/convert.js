const express = require("express");
const router = express.Router();
const CurrencyRate = require("../../database/models/CurrencyRate");
const UserActivity = require("../../database/models/UserActivity");

// @route GET api/convert/:from/:to
// @desc get data from external api
// @access Public
router.get("/convert/:from/:to/:amount", async (req, res) => {
  try {
    const from = await CurrencyRate.findOne({ currency: req.params.from });
    const to = await CurrencyRate.findOne({ currency: req.params.to });

    let result = (from.rate / to.rate) * req.params.amount;

    const fields = {};
    fields.from = from.currency;
    fields.fromRate = from.rate;
    fields.to = to.currency;
    fields.toRate = to.rate;
    fields.amount = req.params.amount;
    fields.result = result;

    let userActivity = new UserActivity(fields);
    await userActivity.save();
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
