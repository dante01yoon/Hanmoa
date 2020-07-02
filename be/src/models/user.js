const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const userSchema = new mongoose.Schema({
    studentId: { 
      type: Number, 
      required: true, 
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    image: { 
      type: Buffer, 
      required: false, 
    }, 
    joinedRooms: [{
      type: Schema.Types.ObjectId,
      ref: 'Room',
    }], 
    conversations: [{
      type: Schema.Types.ObjectId,
      ref: 'conversation'
    }],
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'Room',
    }],
    lastHosting: {
      room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
      },
      date: Date, 
      default: null,
    }
},
{ timestamps: true },
); 
userSchema.statics.checkUserExists = function( payload ){
  
}
userSchema.statics.create = function( payload ){
  
  const user = new this(payload);

  return user.save();
}

const User = mongoose.model('User', userSchema);
module.exports = User;