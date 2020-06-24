const mongoose = require('mongoose');

// 한 방에서 이뤄지는 채팅을 의미하는 conversatoin, 한 채팅에는 여러 명의 유저 , 하나의 방, 여러 채팅으로 이루어져 있다. 
const conversationSchema = new mongoose.Schema({
  participants: [{ 
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
  },
  chats: [{
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  }]
},
);


// 위의 채팅 
const chatSchema = new mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    default: "",
  }
},{ timestamps: true}); 

exports.module = {
  Conversation = mongoose.model('Conversation', conversationSchema),
  Mesage = mongoose.model('Chat', 'chatSchema'),
} 