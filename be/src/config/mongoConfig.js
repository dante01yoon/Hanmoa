const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connect to mongodb server
const getMongoConnect = () =>
  mongoose
    .connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("Successfully connected to mongodb"))
    .catch((e) => console.error(e));

module.exports = getMongoConnect;
