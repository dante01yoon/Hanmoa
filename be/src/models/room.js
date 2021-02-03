import mongoose, { Schema } from "mongoose";
import createUUID from "../lib/uuid";

const Room = new Schema({
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
  join: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  host: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: "Chat",
  }],
});

export default mongoose.model("Room", Room);