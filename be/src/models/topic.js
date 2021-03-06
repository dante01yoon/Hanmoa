import mongoose, { Schema } from "mongoose";
import createUUID from "../lib/uuid";
import Room from "./room";

// collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true)

const Topic = new Schema({
  id: {
    type: String,
    default: createUUID,
  },
  category: {
    type: String,
    default: "etc",
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

/**
 * @param {category} args 
 */
Topic.statics.findTopic = async function(args){
  const { category } = args;
  try {
    const document = await this.findOne({category});
    return document;
  } catch (error){
    console.error("error in room.statics.findTopic");
    console.error(error);
    throw Error(error);
  }
}

/**
 * @param {category} args 
 */
Topic.statics.createTopic = async function(args){
  const { category, url } = args;
  try {
    const newDocument = await this.create({
      category,
      url
    });
    return newDocument;
  } catch(error){
    console.error("error in room.statics.createTopic");
    console.error(error);
    throw Error(error);
  }
}

Topic.statics.getTopicList = async function(){
  try {
    const topics = await this.find();
    return topics;
  } catch(error){
    console.error("error in room.statics.getTopicList");
    console.error(error);
    throw Error(error);
  }
}

export default mongoose.model("Topic", Topic);