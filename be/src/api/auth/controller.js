const fetch = require("node-fetch");
const User = require("models/user"); 
const dotenv = require("dotenv");

const exists = async(email) => {
  let user = null; 

  user = await User.findByEmail(email);

  if(user){
    // 중복되는 아이디/이메일이 있을 경우 
  console.log('has been sinedIn: ', user);
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

const fetchExchangeTokenWithCode = (code) => {
  return fetch("https://oauth2.googleapis.com/token",{
    method: "POST",
    headers:{
      "Content-Type": "application/x-www-form-urlencoded",
    },
    client_id: dotenv.CLIENT_ID,
    client_secret: dotenv.CLIENT_SECRET,
    grant_type: "authorization_code",
    code 
  });
}

const fetchProfileFromGoogle = (access_token) => {
  return fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={${access_token}}`)  
}

exports.loginAndRegister = async (ctx) => {
  const { code } = ctx.request.body;
  // 클라이언트에서 받은 코드를 google Oauth2 의 access_token으로 교환 
  // { access_token, refresh_token, expires_in, token_type }
  const codeExchangedData = await fetchExchangeTokenWithCode(code);
  console.log(codeExchangedData);
  const {access_token } = codeExchangedData;
  // access_token을 사용해 유저 프로필 정보 받기 
  const data = await fetchProfileFromGoogle(access_token)
  const { email, name, given_name, family_name, picture } = data; 

  let user = null;
  
  try{ 
    const existsResponse = exists(email);

    if(!existsResponse.isExist){

      user = await User.register({name, email, studentNumber: 0});
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

  ctx.cookies.set('hm_s_guit', token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7});
  ctx.body = user.profile;
}; 


exports.logout = async(ctx) =>{
  ctx.cookies.set('hm_s_guit', null, {
    maxAge: 0,
    httpOnly: true
  });
  ctx.status = 204;
}; 

exports.check = ( ctx ) => {
  const { user } = ctx.request;

  if(!user) {
    ctx.status = 403;
    return ;
  }
  ctx.body = user.profile; 
}
