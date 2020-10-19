const User = require("models/user"); 

const exists = async(ctx) => {
  let existing = null; 

  try{
    existing = await User.findByEmail(ctx.request.body.email);
  } catch (e) {
    ctx.throw(500, e);
  };

  if(existing){
    // 중복되는 아이디/이메일이 있을 경우 
    return true;
  }
  
  // 신규 유저일 경우 
  try{
    const newUser = await User.register(ctx.request.body)
  }catch (e){
    ctx.throw(500,e);
  }
};

const login = (studentNumber) => {
  let account = null; 
  try{

  }catch(e) {
    
  }
}

exports.loginAndRegister = async (ctx) => {
  const { email, userName, studentNumber } = ctx.request.body;

  // try{ 
    const isExist = await exists(ctx);

    if(isExist) {
      
    }
    else {
      await User.register({userName, email, studentNumber});
    }
  // } catch(e) {
    // ctx.throw(500,e);
  // }
}; 


exports.logout = async(ctx) =>{
  
}