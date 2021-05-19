import mongoose, { Schema } from "mongoose";
import createUUID from "../lib/uuid";
import User from "./user";
import Topic from "./topic";
import { GradientFilter } from "../lib";
import { isNil } from "lodash";

const Gradient = new GradientFilter();

const Room = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true
  },
  id: {
    type: String,
    default: createUUID,
  },
  topic: {
    type: Schema.Types.ObjectId,
    ref: "Topic",
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
  capability: {
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
  gradient: {
    type: String,
    required: true,
  },
  hasPassword: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
  },
});

/**
 * @param {studentNumber: string} args 
 */
Room.statics.createRoom = async function (args) {
  const { studentNumber, title, subTitle, imageUrl, category, capability, hasPassword = false, password } = args;

  try {
    const topic = await Topic.findTopic({ category })
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
      hasPassword,
      password,
      gradient: Gradient.setSingleGradient(category).getGradientSingleColor(category)
    })

    return room;
  } catch (error) {
    console.log("error in Room.statics.createRoom");
    throw error;
  }
}

const roomsCache = new Map();

Room.statics.getRooms = async function (args) {
  const { page = 0, category } = args;
  let topic;
  if (category) {
    topic = await Topic.findTopic({ category });
  }
  const findArgs = topic ? { topic: topic._id } : {};
  let rooms = await this.find(findArgs)
    .populate("topic")
    .populate("join")
    .populate("host")
    .sort({ "time": -1 })
    .skip(page * 10)
    .limit(12);
  if (!rooms.length) {
    roomsCache.set(page, rooms);
  } else {
    rooms = page > 0 ? roomsCache.get(page - 1) : rooms;
  }
  console.log("rooms: ", rooms);
  return rooms;
}

Room.statics.findRoomById = async function (args) {
  const { id, password } = args;
  try {
    const room = await this
      .findOne({ id })
      .populate("join")

    if (isNil(room)) {
      return null;
    }

    return room;
  } catch (error) {
    console.error("error in Room.statics.findRoomById");
    console.error(error);
    throw Error(error);
  }
}

Room.statics.getRoomUsers = async function (args) {
  const { id } = args;
  try {
    const { join } = await this.findOne({ id });
    return join;
  } catch (error) {
    console.log("error in Room.statics.getRoomUsers");
    console.error(error);
  }
}

Room.statics.getLatestChat = async function (args) {
  const { page, id } = args;
  try {
    const chats = await this.findOne({ id }, "messages")
      .populate({
        path: "messages",
        populate: {
          path: "writer",
        },
        options: {
          limit: 200,
          skip: page * 200,
          sort: { "createdAt": -1 }
        }
      })
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
Room.statics.loadUserChat = async function (roomId, studentNumber) {
  try {
    const joinedUser = await this.findOne({ id: roomId })
      .populate("join", "joinIn")
      .exec((err, doc) => {
        const joinedRoom = doc.findOne({ roomId });
      });
    return joinedUser
  } catch (error) {
    console.error("error in Room.statics.loadUserChat");
    console.error("error: ", error);
  }
}

/**
 * @param { roomId } string
 * @param { studentNumber } string
 * // TODO
 *  await 문을 쓰는 줄을 좀 더 세부적으로 나누어 에러 처리를 해야
 * 나중에 User, Room 테이블 중 한가지 테이블 수정에서만 에러가 나도 
 * 나머지 테이블의 수정또한 방지할 수 있다. 추후 개선해야 함.
 */
Room.statics.leaveUser = async function (roomId, studentNumber) {
  try {
    const room = await this.findOne({ id: roomId });
    const student = await User.findByStudentNumber(studentNumber);

    if (isNil(student) || isNil(room)) {
      return {
        code: 422,
        message: "No Content",
      }
    }

    room.join.pull({ _id: student._id });
    await room.save();
    await User.leaveRoom(studentNumber, roomId);
    return room;
  } catch (error) {
    console.error("error in Room.statics.leaveUser");
    console.error("error: ", error);
  }
}

/**
 * @param { studentNumber } string
 * // TODO
 * await 문을 쓰는 줄을 좀 더 세부적으로 나누어 에러 처리를 해야
 * 나중에 User, Room 테이블 중 한가지 테이블 수정에서만 에러가 나도 
 * 나머지 테이블의 수정또한 방지할 수 있다. 추후 개선해야 함.
 */
Room.statics.joinUser = async function (roomId, studentNumber) {
  try {
    const room = await this.findOne({ id: roomId });
    const student = await User.findByStudentNumber(studentNumber);

    if (isNil(student) || isNil(room)) {
      return {
        code: 422,
        message: "No Content"
      }
    }

    if (room.capability > room.join.length) {
      if (!room.join.includes(student._id)) {
        room.join.push(student);
        await User.joinRoom(studentNumber, roomId);
        await room.save();
      }
      // 이미 방에 유저가 있을 때
      return room;
    }
    return null;
  } catch (error) {
    console.error("error in Room.statics.joinUser");
    console.error("error: ", error);
  }
}

export default mongoose.model("Room", Room);