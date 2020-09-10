const express = require("express");
const router = express.Router();

// @route GET api/data/currencies
// @desc get all currencies
// @access Public
router.get("/currencies", async (req, res) => {
  try {
    let currencies = await CurrencyRate.find().select("currency").select("-_id");
    currencies = currencies.map(currency => currency.currency);
    res.json(currencies);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
