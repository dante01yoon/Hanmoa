const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer, 
    required: false,
  },
  full: {
    type: Number, 
    required: true,
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  modifiedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
  host: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  url: {
    type: String,
    unique: true, 
  }
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;