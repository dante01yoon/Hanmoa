// 홈 화면에서 보여주는 카드 데이터 스키마
const mongoose = require("mongoose");
const { Schema } = mongoose;
// Define Schemes
const topicCardSchema = new Schema(
  {
    topic: { type: Schema.Types.ObjectId, ref: "Topic" },
    data: {
      id: { type: Number, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      host: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      createdAt: {
        type: Date,
        required: true,
      },
      modifiedAt: {
        type: Date,
        required: true,
      },
      members: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      full: {
        type: Number,
        required: true,
      },
      current: {
        type: Number,
        required: true,
      },
      category: {
        type: Schema.Types.ObjectId,
        ref: "Topic",
      },
      imgUrl: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        required: true,
      },
      block: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create Model & Export
module.exports = mongoose.model("TopicCard", topicCardSchema);
