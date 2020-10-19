const User = require("models/user");
const user = require("../../models/user");

exports.list = async(ctx) => {
  try{
    const userList = await user.find().exec(); 
    ctx.body = userList;
  } catch(e){
    return ctx.throw(500,e);
  }
}

exports.create = async (ctx) => {
  console.log("ctx.request.body: ",ctx.request.body);
  const{ studentNumber, name } = ctx.request.body; 
  console.log(studentNumber, name);
  const user = new User({
    name,
    studentNumber,
  });

  try {
    await user.save();
  } catch(e) {
    return ctx.throw(500,e);
  };

  ctx.body = user;
}

exports.remove = (ctx) => {
  
}

exports.replace = (ctx) => {
  
}

exports.update = (ctx) => {
  
}
