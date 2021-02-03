import { v4 as uuidv4 } from "uuid";
const mongoose = require("mongoose");
const {generateToken} = require("lib/token");

const { Schema } = mongoose; 

const User = new Schema({
  _id: {
    type: String,
    default: () => uuidv4().replace(/\-/g, ""),
  },
  profile: {
    id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    }, 
    name: String,
    studentNumber: String,
    picture: {type: String, default: '/static/images/default_profile.png'},
    email: { type: String},
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
    ref: "Chat",
    markedAt: {
      type: Date,
    }
  }],
  hostIn: [{
    type: Schema.Types.ObjectId,
    ref: "Chat",
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
},{
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

User.statics.createUser = async function(args){
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

User.statics.findByStudentNumber = async function(studentNumber) {
  try {
    const user = await this.findOne({'profile.studentNumber' : studentNumber});
    if(!user){
      return null;
    } 
    return user;
  } catch(error){
    throw error;
  }
};

User.statics.findByToken = async function(token){
  try {
    const user = await this.findOne({token});
    if(!user) throw ({ error: "No user with this email found"});
    return user; 
  } catch(error) {
    throw error;
  }
}

User.statics.findByEmail = async function(email){
  try {
    const user = await this.findOne({email});
    if(!user) throw ({ error: "No user with this email found"});
    return user; 
  } catch(error) {
    throw error;
  }
};

User.statics.findByName = async function(name) {
  try {
    const user = await this.findOne({'profile.username': name});
    if(!user){
      throw ({error: "No User with this username found"});
    }
    return user;
  } catch (error) {
    throw error;
  }
};

User.statics.getUsers = async function(){
  try{
    const users = await this.find();
    return users;
  } catch(error) {
    throw error;
  }
}

User.statics.deleteById = async function(id){
  try {
    const user = await this.remove({ _id: id });
    return user;
  } catch (error){
    throw error;
  }
}


User.statics.register = function({ id,name, email, studentNumber, picture}) {
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

User.statics.updateByStudentNumber = async function(studentNumber,params) {
  try {
    const user = await this.updateOne({profile: {studentNumber}},params);
    
    return user;
  }catch(error){
    console.log("error in User.methods.update");
    throw error;
  }
}

User.methods.generateToken = async function() {
  const payload = {
    _id: this._id,
    profile: this.profile
  };

  return await generateToken(payload, 'account');
};

module.exports = mongoose.model("User", User);
