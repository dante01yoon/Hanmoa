const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

// 한 방에서 이뤄지는 채팅의 그룹을 의미하는 대화(conversation), 한 채팅에는 여러 명의 유저 , 하나의 방, 여러 채팅으로 이루어져 있다. 
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

// 한번의 채팅인 말풍선. 한 말풍선에는 글을 쓴 사람, 내용, 그리고 적은 내용들이 적혀져있다.
const chatSchema = new mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    deafult: "",
  }
},{ timestamps: true}); 

exports.module = {
  Conversation = mongoose.model('Conversation', conversationSchema),
  Chat = mongoose.model('Chat', chatSchema),
} 

