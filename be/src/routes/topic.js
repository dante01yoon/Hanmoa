const mongoose = require("mongoose");
const { Schema } = mongoose;

const topicSchema = new Schema({
  topic: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Topic", topicSchema);
