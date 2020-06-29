const express = require("express");
const router = express.Router();
const User = require('../models/user');
const Room = require('../models/room');

router.use(function timeLog(req,res,next) {
  console.log('Time: ', Date.now()); 
  next();
});

router.get('/checkValid', function(){
  // 디비에 해당 유저가 오늘 방을 만들었는지 체크
});

router.post('/create', function(){
  
} );