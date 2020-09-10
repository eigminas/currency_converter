const cron = require("node-cron"); // needed to schedule database update
const request = require("request"); // used to consume LB api
var parseString = require("xml2js").parseString; // used to access data from xml
const CurrencyRate = require("../database/models/CurrencyRate");
const CurrencyRateHistory = require("../database/models/CurrencyRateHistory");
updateDB = () => {
  cron.schedule("* * 4 * * *", () => {
    try {
      console.log("database updated");
      const options = {
        uri: `https://www.lb.lt/webservices/FxRates/FxRates.asmx/getCurrentFxRates?tp=eu`,
        method: "GET",
        headers: { "user-agent": "node.js", "Content-Type": "text/xml" },
      };
      var data;
      request(options, (error, response, body) => {
        if (error) {
          console.error(error); // if there is an error database will not be updated.
          // however, web app will still allow currency conversion and will use data from database
        }

        parseString(body, async (err, result) => {
          data = result.FxRates.FxRate;

          for (var i = 0; i < data.length; i++) {
            let name = data[i].CcyAmt[1].Ccy[0];
            let exrate = parseFloat(data[i].CcyAmt[1].Amt[0]);
            //console.dir(name + " " + exrate);
            const fields = {};
            fields.currency = name;
            fields.rate = exrate;
            let rate = await CurrencyRate.findOne({ currency: name });
            let history = CurrencyRateHistory(fields);
            await history.save(); // save history
            if (rate) {
              // update
              rate = await CurrencyRate.findOneAndUpdate({ currency: name }, { $set: fields }, { new: true });
            }
            // create
            else {
              rate = new CurrencyRate(fields);
              await rate.save();
            }
          }
        });
      });
    } catch (error) {
      console.error(error.message);
    }
  });
};
module.exports = updateDB;
