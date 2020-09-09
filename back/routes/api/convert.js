const express = require("express");
const router = express.Router();
const CurrencyRate = require("../../database/models/CurrencyRate");

// @route GET api/convert/:from/:to
// @desc get data from external api
// @access Public
router.get("/convert/:from/:to/:amount", async (req, res) => {
  const from = await CurrencyRate.findOne({ currency: req.params.from });
  const to = await CurrencyRate.findOne({ currency: req.params.to });

  let result = (from.rate / to.rate) * req.params.amount;

  res.json(result);
});

module.exports = router;
