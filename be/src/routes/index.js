let express = require("express");
let models = require("../models");
let router = express.Router(); 

let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");

router.get("/login", function(req,res,next){
  // default : HMAC SHA258
  let token = jwt.sign({
    email: ""
  },
  secretObj.secret ,
  {
    expiresin: '1d'
  });

  models.user.find({
    where: {
      email: ""
    }
  })
  .then( user => {
    if(user.pwd === "1234"){
      res.cookie("user", token);
      res.json({
        token
      })
    }
  })
})

module.exports = router;