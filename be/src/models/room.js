import { string } from "@withvoid/make-validation/lib/validationTypes";
import mongoose, { Schema } from "mongoose";
import createUUID from "../lib/uuid";
import User from "./user";
import Topic from "./topic";

const Room = new Schema({
  id: {
    type: String,
    default: createUUID,
  },
  topic: {
    type: Schema.Types.ObjectId,
    ref: "Topic",
    default: "etc",
  },
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  time: {
    type: Date,
    default: Date.now,
  },
  join: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  capability:{
    type: Number,
    required: true,
  },
  host: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: "Chat",
  }],
});

/**
 * @param {studentNumber: string} args 
 */
Room.statics.createRoom = async function(args){
  const { studentNumber, title, subTitle, imageUrl, category, capability } = args;
  try {
    const topic = await Topic.findTopic({category})
    const user = await User.findByStudentNumber(studentNumber);
    const room = await this.create({
      title,
      subTitle,
      host: user,
      join: [user],
      imageUrl,
      topic,
      createdBy: user,
      capability,
    })
    
    return room;
  } catch(error){
    console.log("error in Room.statics.createRoom");
    throw error;
  }
}

Room.statics.getRooms = async function(args) {
  const { page = 0 , category } = args;
  let topic;
  if(category){
    topic = await Topic.findTopic({category});
  }
  const findArgs = topic ? {topic: topic._id} : {};
  const rooms = await this.find(findArgs)
    .populate("topic")
    .populate("join")
    .populate("host")
    .sort({"time": -1})
    .skip(page * 10)
    .limit(12);
  return rooms;
}

Room.statics.findRoomById = async function(args) {
  const { id } = args;
  try {
    const room = await this
      .findOne({id})
      .populate("messages")
      .populate("join")
      
    return room;
  } catch(error) {
    console.error("error in Room.statics.findRoomById");
    console.error(error);
    throw Error(error);
  }
}

Room.statics.getRoomUsers = async function(args) {
  const { id } = args;
  try { 
    const {join} = await this.findOne({id});
    return join;
  } catch (error) {
    console.log("error in Room.statics.getRoomUsers");
    console.error(error);
  }
}

Room.statics.getLatestChat = async function(args) {
  const { page, id } = args;
  try {
    const chats = await this.findOne({id})
      .messages
      .sort({createdAt: -1})
      .skip(page * 200)
      .limit(200);
    return chats;
  } catch (error) {
    console.log("error in Room.statics.getLatestChat");
    throw error;
  }
}

/**
 * @param {string} roomId 
 * @param {string} studentNumber 
 */
Room.statics.loadUserChat = async function(roomId, studentNumber){
  try{
    const joinedUser = await this.findOne({id: roomId})
      .populate("join", "joinIn")
      .exec((err, doc) => {
        const joinedRoom = doc.findOne({roomId});
      });
    return joinedUser
  } catch (error) {
    console.error("error in Room.statics.loadUserChat");
    console.error("error: ", error);
  }
}

export default mongoose.model("Room", Room);