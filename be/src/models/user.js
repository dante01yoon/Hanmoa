const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    studentId: { 
      type: Number, 
      required: true, 
      unique: true
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
    }]
},
{
  timestamps: true
},
); 

module.exports = monggoose.model('User', userSchema);