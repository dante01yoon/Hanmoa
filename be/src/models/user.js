const mongoose = require("mongoose");
const {generateToken} = require("lib/token");

const { Schema } = mongoose; 

const User = new Schema({
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
}

module.exports = mongoose.model("User", User);
