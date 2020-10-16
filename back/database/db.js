const mongoose = require("mongoose");

const connectDB = async () => {
  const db = "mongodb+srv://eigminas:<>@currencies.v9xx6.mongodb.net/currencies?retryWrites=true&w=majority";
  //const db = "mongodb://mongo:27017/currencies";
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
