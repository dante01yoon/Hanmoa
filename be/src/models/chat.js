const mongoose = require("mongoose");
const { Schema } = mongoose;
import createUUID from "../lib/uuid";
import Room from "./room";
import User from "./user";

const Chat = new Schema({
  id: {
    type: String,
    default: createUUID,
  },
  message: String,
  room: {
    type: String,
    // type: Schema.Types.ObjectId,
    // ref: "Room",
  },
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

Chat.statics.createChat = async function(args){
  const { writer: writerStudentId, message, image, roomId, } = args;
  try {
    const user = await User.findByStudentNumber(writerStudentId);
    const room = await Room.findRoomById({id: roomId});
    const chat = await this.create({
      writer: user,
      message,
      image,
      room: room.id,
    })
    room.messages.push(chat);
    console.log("room: ", room);
    await room.save();
    return chat;
  } catch(error){
    console.error("error in Chat.statics.createChat");
    console.error("error: ", error);
  }
}

Chat.statics.findChatById = async function(args){
  const { id: chatId } = args; 
  try{
    const chat = await this.findOne({ id: chatId }) ?? null;
    return chat;
  } catch(error){
    console.error("error in Chat.statics.findChatById");
    console.error("error:", error);
  }
}

Chat.statics.deleteChatById = async function(args){
  const { id: chatId } = args;
  try {
    const chat = await this.findOne({ id: chatId });
    if(!chat){
      return null;
    }
    const deletedChat = await this.deleteOne({ id: chat.id });
    return deletedChat;
  } catch (error) {
    console.error("error: ",error);
    console.error("error in Chat.statics.deleteChatId");
  }
}

export default mongoose.model("Chat", Chat);


