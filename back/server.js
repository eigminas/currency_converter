const express = require("express");
const xmlparser = require("express-xml-bodyparser");
const connectDB = require("./database/db");

const app = express();

// connect database
connectDB();

// init middleware
app.use(express.json({ extended: false }));
app.use(xmlparser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => res.send("API Running"));

// define routes
app.use("/api/data", require("./routes/api/data"));
app.use("/api/operations", require("./routes/api/convert"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
