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
    id: String, 
    name: String,
    studentNumber: String,
    picture: {type: String, default: '/static/images/default_profile.png'},
    email: { type: String},
  },
  hostRoomNumber: Number,
  social: {
    google: {
      id: String,
      accessToken: String 
    }
  },
  joinIn: [Number],
  hostIn: [Number],
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
        email
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
      throw ({error: "No user with this studentNumber"});
    } 
    return user;
  } catch(error){
    throw error;
  }
};

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


User.methods.generateToken = async function() {
  const payload = {
    _id: this._id,
    profile: this.profile
  };

  return await generateToken(payload, 'account');
};

module.exports = mongoose.model("User", User);
