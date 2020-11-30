const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

class HanmoaMongoDB {
  mongoose;
  constructor(){
    this.mongoose = require("mongoose");
  }

  run(){
    this.mongoose.Promise = global.Promise;
    
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    mongoose.connection.on("connected", () => {
      console.log("MongoDB has connected successfully");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB has reconnected");
    });

    mongoose.connection.on("error", error => {
      console.log("MongoDB connection has an error", error);
      mongoose.disconnect();
    }); 

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB connection has disconnected");
    });
  }
}

module.exports = HanmoaMongoDB;