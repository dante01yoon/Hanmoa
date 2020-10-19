const User = require("models/user"); 

const exists = async(ctx) => {
  let user = null; 

  try{
    user = await User.findByEmail(ctx.request.body.email);
  } catch (e) {
    ctx.throw(500, e);
  };

  if(user){
    // 중복되는 아이디/이메일이 있을 경우 
  console.log('has been signedIn: ', user);
    return {
      isExist: true,
      user
    };
  }
  // 신규 회원가입 
  return {
    isExist: false,
    user: {} 
  }
};

exports.loginAndRegister = async (ctx) => {
  const { email, userName, studentNumber } = ctx.request.body;

  let user = null;
  
  try{ 
    const existsResponse = exists(ctx);

    if(!existsResponse.isExist){

      user = await User.register({userName, email, studentNumber});
    }
    else {
      user = existsResponse.user; 
    }
  } catch(e) {
    ctx.throw(500,e);
  }

  let token = null; 
  
  try{
    token = await user.generateToken();
  } catch(e) {
    ctx.throw(500,e);
  }

  ctx.cookies.set('access_token', token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7});
  ctx.body = user.profile;
}; 


exports.logout = async(ctx) =>{
  ctx.cookies.set('access_token', null, {
    maxAge: 0,
    httpOnly: true
  });
  ctx.status = 204;
}; 