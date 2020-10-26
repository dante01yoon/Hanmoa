require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET_KEY

/**
 * @param {object} payload
 * @returns {string} token 
 */
 function generateToken(payload){
   return new Promise(
     (resolve, reject) => {
       jwt.sign(
         payload,
         jwtSecret,
         {
           issuer: "hanmoa.com",
           expiresIn: '7d',
         }, (error, token) => {
           if(error) reject(error);
           resolve(token);
         }
       )
     }
   )
 };

 function decodeToken(token) {
  return new Promise(
    (resolve, reject) => {
      jwt.verify(token, jwtSecret, (error, decoded) => {
        if(error) reject(error);
        resolve(decoded); 
      })
    }
  )
 }

exports.jwtMiddleware = async( ctx, next) => {
  const token = ctx.cookies.get('hm_s_guit');
  if(!token) return next(); // 토큰이 없으면 다음 작업을 진행함 
  
  try {
    const decoded = await decodeToken(token);
    // 토큰 만료일이 하루밖에 안남으면 토큰을 재발급한다. 
    if(Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
      // 하루가 지나면 갱신해준다. 
      const { _id, profile } = decoded;
      const freshToken = await generateToken({ _id, profile}, "account");
      ctx.cookies.set("hm_s_guit", freshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7, 
        httpOnly: true
      });
    }

    // ctx.request.user에 디코드된 값을 넣어줌 
    ctx.request.user = decoded;
  } catch (e) {
    ctx.status= 401; 
    ctx.body= {
      status_code: 401, 
      status_message: "token_decode_fail",
      error_message: "유효한 토큰 값이 아닙니다",
      success: false
    }
    // token validate 실패 
    ctx.request.user = null;
  }

  return next();
 }

 exports.generateToken = generateToken; 
 exports.decodeToken = decodeToken;