const mongoose = require("mongoose");
const { deflate } = require("zlib");
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    studentNumber: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    modifiedAt: {
      type: Date,
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
