import mongoose, { Schema } from "mongoose";
import createUUID from "../lib/uuid";
import User from "./user";

const Room = new Schema({
  id: {
    type: String,
    default: createUUID,
  },
  category: {
    type: String,
    default: "etc",
  },
  title: {
    type: String,
    required: true,
  },
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
    markedAt: {
      type: Date,
    }
  }],
  host: {
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
  const { studentNumber, title } = args;
  try {
    const user = await User.findByStudentNumber(studentNumber);
    const room = await this.create({
      title,
      host: user,
      join: [user]
    })
    return room;
  } catch(error){
    console.log("error in Room.statics.createRoom");
    throw error;
  }
}

Room.statics.findRoomById = async function(args) {
  const { id } = args;
  const room = await this.findOne({id});
  return room;
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
        console.log("joinedRoom: ", joinedRoom);
      });
    return joinedUser
  } catch (error) {
    console.error("error in Room.statics.loadUserChat");
    console.error("error: ", error);
  }
}

export default mongoose.model("Room", Room);