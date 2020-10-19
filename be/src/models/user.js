const mongoose = require("mongoose");
const { Schema } = mongoose; 

const User = new Schema({
  profile: {
    userName: String,
    studentNumber: Number,
    thumbnail: {type: String, default: '/static/images/default_profile.png'},
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
}); 

User.statics.findByStudentNumber = function(studentNumber) {
  return this.findOne({'profile.studentNumber' : studentNumber}).exec();
}

User.statics.findByEmail = function(email){
  return this.findOne({email}).exec();
}

User.statics.findByName = function(name) {
  return this.findOne({'profile.username': name}).exec();
}

User.statics.register = function({ userName, email, studentNumber}) {
  const newAccount = new this({
    profile: {
      userName,
      email,
      studentNumber
    }
  }); 

  return newAccount.save();
};

module.exports = mongoose.model("User", User);
