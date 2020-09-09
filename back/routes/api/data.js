const express = require("express");
const router = express.Router();
const request = require("request"); // used to consume LB api
var parseString = require("xml2js").parseString; // used to access data from xml
const CurrencyRate = require("../../database/models/CurrencyRate");

// @route GET api/data
// @desc get data from external api
// @access Public
router.get("/", async (req, res) => {
  try {
    const options = {
      uri: `https://www.lb.lt/webservices/FxRates/FxRates.asmx/getCurrentFxRates?tp=eu`,
      method: "GET",
      headers: { "user-agent": "node.js", "Content-Type": "text/xml" },
    };
    var data;
    request(options, (error, response, body) => {
      if (error) console.error(error);

      parseString(body, async (err, result) => {
        //console.dir(result.FxRates.FxRate[1].CcyAmt);
        data = result.FxRates.FxRate;
        //console.dir(data[0].CcyAmt[1].Ccy[0]);

        for (var i = 0; i < data.length; i++) {
          let name = data[i].CcyAmt[1].Ccy[0];
          let exrate = parseFloat(data[i].CcyAmt[1].Amt[0]);
          console.dir(name + " " + exrate);
          const fields = {};
          fields.currency = name;
          fields.rate = exrate;

          let rate = await CurrencyRate.findOne({ currency: name });
          if (rate) {
            // update
            rate = await CurrencyRate.findOneAndUpdate({ currency: name }, { $set: fields }, { new: true });
          }
          // create
          rate = new CurrencyRate(fields);
          await rate.save();
        }
      });

      res.json(body);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
