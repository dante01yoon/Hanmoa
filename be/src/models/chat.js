const mongoose = require("mongoose");
const User = require("./user");
const { Schema } = mongoose;
import createUUID from "../lib/uuid";

const Chat = new Schema({
  id: {
    type: String,
    default: createUUID,
  },
  message: String,
  image: {
    data: Buffer,
    contentType: String,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

export default mongoose.model("Chat", Chat);

