import { v4 as uuidv4 } from "uuid";
import createUUID from "../lib/uuid";
import isNil from "lodash/isNil";
import Room from "./room";

const mongoose = require("mongoose");
const { generateToken } = require("lib/token");

const { Schema } = mongoose;

const User = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true
  },
  profile: {
    id: {
      type: String,
      default: createUUID,
    },
    name: String,
    studentNumber: String,
    picture: { type: String, default: '/static/images/default_profile.png' },
    email: { type: String },
    token: String,
  },
  hostRoomNumber: Number,
  social: {
    google: {
      id: String,
      accessToken: String
    }
  },
  joinIn: [{
    type: Schema.Types.ObjectId,
    ref: "Room",
  }],
  hostIn: [{
    type: Schema.Types.ObjectId,
    ref: "Room",
  }],
  latestCreateRoom: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
}, {
  timestamps: true,
  collection: "users",
});

/**
 * @param {object} { name, studentNumber, picture, email }
 * @param {string} name
 * @param {string} studentNumber
 * @param {string} picture
 * @param {string} email
 */

User.statics.createUser = async function (args) {
  const { name, email, picture, studentNumber } = args;

  try {
    const user = await this.create({
      profile: {
        name,
        studentNumber,
        picture,
        email,
      }
    });
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * 룸을 생성, 조인할 때 topic 중 shouldBeLimited가 참인 경우 제한을 시켜야 하므로 
 * joinIn, hostIn 은 populate해서 내려준다.
 * @param {string} studentNumber 
 * @returns {User | null} user 
 */
User.statics.findByStudentNumber = async function (studentNumber, populateDeep = false,) {
  try {
    let populateQuery;

    if (populateDeep) {
      populateQuery = {
        path: "joinIn hostIn",
        populate: {
          path: "topic",
          model: "Topic",
        }
      }
    } else {
      populateQuery = "joinIn hostIn";
    }

    const user = await this.findOne({ 'profile.studentNumber': studentNumber })
      .populate(populateQuery);

    if (isNil(user)) {
      return {
        code: 422,
        message: "No Content",
      }
    }
    return user;
  } catch (error) {
    console.error("error in User.statics.findByStudentNumber");
    console.error(error);
    throw error;
  }
};

User.statics.findByToken = async function (token) {
  try {
    const user = await this.findOne({ token });
    if (!user) throw ({ error: "No user with this email found" });
    return user;
  } catch (error) {
    throw error;
  }
}

User.statics.findByEmail = async function (email) {
  try {
    const user = await this.findOne({ email });
    if (!user) throw ({ error: "No user with this email found" });
    return user;
  } catch (error) {
    throw error;
  }
};

User.statics.findByName = async function (name) {
  try {
    const user = await this.findOne({ 'profile.username': name });
    if (!user) {
      throw ({ error: "No User with this username found" });
    }
    return user;
  } catch (error) {
    throw error;
  }
};

User.statics.getUsers = async function () {
  try {
    const users = await this.find();
    return users;
  } catch (error) {
    throw error;
  }
}

User.statics.deleteById = async function (id) {
  try {
    const user = await this.remove({ _id: id });
    return user;
  } catch (error) {
    throw error;
  }
}


User.statics.register = function ({ id, name, email, studentNumber, picture }) {
  const newAccount = new this({
    profile: {
      id,
      name,
      email,
      studentNumber,
      picture,
    }
  });

  return newAccount.save();
};

User.statics.updateByStudentNumber = async function (studentNumber, params) {
  try {
    const user = await this.updateOne({ profile: { studentNumber } }, params);

    return user;
  } catch (error) {
    console.error("error in User.methods.updateByStudentNumber");
    console.error(error);
    throw error;
  }
}

User.statics.joinRoom = async function (studentNumber, roomId) {
  try {
    const user = await this.findOne({ 'profile.studentNumber': studentNumber }).populate("joinIn hostIn");
    const room = await Room.findRoomById({ id: roomId });

    if (isNil(user)) {
      return {
        code: 422,
        message: "No Content in User",
      }
    }

    if (isNil(room)) {
      return {
        code: 422,
        message: "No Content in Room",
      }
    }

    user.joinIn.push(room);
    await user.save();
    return user;
  } catch (error) {
    console.error("error in User.statics.joinRoom");
    console.error("error: ", error);
  }
}

User.statics.leaveRoom = async function (studentNumber, roomId) {
  try {
    const user = await this.findOne({ 'profile.studentNumber': studentNumber });
    const room = await this.findOne({ id: roomId });

    if (isNil(user)) {
      return {
        code: 422,
        message: "No Content in User",
      }
    }

    if (isNil(room)) {
      return {
        code: 422,
        message: "No Content in Room",
      }
    }

    user.joinIn.pull({ id: roomId });
    user.save();
    return user;
  } catch (error) {
    console.error("error in User.statics.leaveRoom");
    console.error("error: ", error);
  }
}

User.statics.findRoomChatHistory = async function (roomId) {
  try {
    const room = await this.findOne({ joinIn: { roomId } })
    return room;
  } catch (error) {
    console.error("error in User.methods.findRoomChatHistory");
    console.error(error);
  }
}

User.statics.checkHasJoinedRoomById = function (roomId, studentNumber) {
  try {
    const hasJoined = new Promise((resolve) => {
      this.findOne({ "profile.studentNumber": studentNumber }, function (err, doc) {
        return Room.findOne({ "id": roomId, join: doc._id }, function (error, joinedRoom) {
          if (error) {
            console.error("error in nested function in User.statics.checkHasJoinedRoomById");
            console.error(error);
          }
          if (!isNil(joinedRoom)) {
            resolve(true);
          }
          resolve(false);
        });
      });
    })
    return hasJoined;
  } catch (error) {
    console.error("error exists in User.statics.checkHasJoinedRoomById");
    console.error(error);
  }
}

User.methods.generateToken = async function () {
  const payload = {
    _id: this._id,
    profile: this.profile
  };

  return await generateToken(payload, 'account');
};

export default mongoose.model("User", User);