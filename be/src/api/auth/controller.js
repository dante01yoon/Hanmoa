import { encode } from "../jwt";

const fetch = require("node-fetch");
const User = require("models/user"); 
const dotenv = require("dotenv");
import makeValidation from "@withvoid/make-validation";
const { decodeToken } = require("lib/token");
const { model } = require("../../models/user");

dotenv.config(); 

const signInWithGoogle = async ({request, response}, next) => {
  const request =  await fetch("https://oauth2.googleapis.com/token",{
    method: "POST",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: "postmessage"
    })
  });
}

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

/**
  * @param {string} code 
  * @return {string} access_token
  * @return {number} expires_in
  * @return {string} scope
  * @return {string} token_type
  * @return {string} id_token
*/
const fetchExchangeTokenWithCode = async (code) => {
  const request =  await fetch("https://oauth2.googleapis.com/token",{
    method: "POST",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: "postmessage"
    })
  });

  const response = await request.json();
  
  return response;
}
/**
 * @return {string} sub 
 * @return {family_name} given_name
 * @return {string} given_name  
 * @return {string} picture
 * @return {string} email 
 * @return {boolean} email_verified
 * @return {string} locale
 * @return {string} hd 
 */
const fetchProfileFromGoogle = async (access_token) => {
  const request = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`,{
    headers:{
      "Authorization": `Bearer ${access_token}`
    }
  });
  
  return await request.json();
}

exports.loginAndRegister = async (ctx) => {
  const { code } = ctx.request.body;
  // 클라이언트에서 받은 코드를 google Oauth2 의 access_token으로 교환 
  // { access_token, refresh_token, expires_in, token_type }
  const codeExchangedResponse = await fetchExchangeTokenWithCode(code);
  
  const { access_token } = codeExchangedResponse;
  
  // access_token을 사용해 유저 프로필 정보 받기 
  const data = await fetchProfileFromGoogle(access_token)
  
  const { email, name, hd, picture, sub } = data; 
  
  let user = null;
  let studentNumber;

  try{ 
    const existsResponse = exists(email);

    if(!existsResponse.isExist){
      studentNumber = email ? email.split("@")[0] : "";
      user = await User.register({id: sub, name, email, studentNumber, picture});
    }

    else {
      user = existsResponse.user; 
    }
  } catch(e) {
    ctx.throw(500,e);
  }

  let token = null; 
  
  try{
    token = await user.generateToken({name, email, studentNumber, access_token});
  } catch(e) {
    ctx.throw(500,e);
  }

  ctx.cookies.set("_hm_guit", token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7});
  ctx.body = {
    data: user.profile,
  }
}; 

exports.convert = async(ctx) => {
  try{
    const user = await User.findByEmail({
      email
    }).exec();

    ctx.body = {
      data: user,
    }
  } catch(e){

    ctx.status = 403;

    ctx.body = {
      status_code: 403,
      status_message: "user not found",
      error_message: "유저조회실패",
      success: false,
    }
  }
}

exports.logout = async(ctx) =>{
  ctx.cookies.set("_hm_guit", null, {
    maxAge: 0,
    httpOnly: true
  });

  ctx.status = 204;
}; 

exports.check = ( ctx ) => {
  const { user } = ctx.request;
  
  if(!user) {
    ctx.status = 403;
    ctx.body = {
      status_code: 403,
      status_message: "user not found",
      error_message: "유저조회실패",
      success: false,
    }
    return ;
  }
  ctx.body = {
    data: user,
  }; 
}