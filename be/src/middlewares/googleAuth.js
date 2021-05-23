const fetch = require("node-fetch");
const dotenv = require("dotenv");
import User from "models/user";

dotenv.config();

const signInWithGoogle = async ({ req, response }, next) => {
  const request = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
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

const exists = async (studentNumber) => {
  let user = await User.findByStudentNumber(studentNumber);

  if (user) {
    // 중복되는 학번이 있을 경우 
    return {
      isExist: true,
      user
    };
  }
  // 신규 회원가입 
  return {
    isExist: false,
    user,
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
  const request = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
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
  return await request.json();
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
  const request = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  });

  return await request.json();
}

export const getProfileFromGoogle = async (ctx, next) => {
  const { code } = ctx.request.body;
  // 클라이언트에서 받은 코드를 google Oauth2 의 access_token으로 교환 
  // { access_token, refresh_token, expires_in, token_type }
  const { access_token } = await fetchExchangeTokenWithCode(code);

  // access_token을 사용해 유저 프로필 정보 받기 
  let user = await fetchProfileFromGoogle(access_token)
  const { email, name, picture, sub, hd } = user;

  let studentNumber = (email && email.split("@")[0]) ?? "";

  ctx.state.studentNumber = studentNumber;
  // 도메인이 유효한지 체크
  if (!email || hd !== "handong.edu") {
    ctx.status = 400;
    ctx.body = {
      success: false,
      reason: "domain is not valid"
    }
  }

  if (!studentNumber.length) {
    throw new Error("studentNumber is empty");
  }

  // 디비에 없으면 유저 데이터 생성
  try {
    const existsResponse = await exists(studentNumber);

    if (!existsResponse.isExist) {
      user = await User.createUser({
        name,
        email,
        picture,
        studentNumber,
      });
    }
    await next();
  } catch (e) {
    ctx.response.status = 500;
    console.log("error in getProfileFromGoogle");
    console.log(e);
    ctx.response.body = {
      success: false,
      message: e.error,
    };
  }
};

exports.convert = async (ctx) => {
  try {
    const user = await User.findByEmail({
      email
    }).exec();

    ctx.body = {
      data: user,
    }
  } catch (e) {

    ctx.status = 403;

    ctx.body = {
      status_code: 403,
      status_message: "user not found",
      error_message: "유저조회실패",
      success: false,
    }
  }
}

exports.logout = async (ctx) => {
  ctx.cookies.set("_hm_guit", null, {
    maxAge: 0,
    httpOnly: true
  });

  ctx.status = 204;
};

exports.check = (ctx) => {
  const { user } = ctx.request;

  if (!user) {
    ctx.status = 403;
    ctx.body = {
      status_code: 403,
      status_message: "user not found",
      error_message: "유저조회실패",
      success: false,
    }
    return;
  }
  ctx.body = {
    data: user,
  };
}