import jwt from "jsonwebtoken";
import User from "../models/user";

const SECRET_KEY = "_g_suit";

export const encode = async (ctx, next) => {
  const { request, response, cookies } = ctx;

  try {
    const { studentNumber } = ctx.state;
    const user = await User.findByStudentNumber(studentNumber);
    const payload = {
      studentNumber: user.profile.studentNumber,
      name: user.profile.name,
      email: user.profile.email,
    }
    const authToken = jwt.sign(payload, SECRET_KEY);
    
    await User.updateByStudentNumber(studentNumber, {
      profile: {token: authToken},
    });

    ctx.state = {
      authToken,
      user: {
        id: user.profile.id,
        studentName: user.profile.studentName,
        email: user.profile.email,
        name: user.profile.name,
        picture: user.profile.picture,
      },
    };

    cookies.set("_hm_guit", ctx.state.authToken, {
      httpOnly: true, 
      maxAge: 1000 * 60 * 60 * 24 * 7
    });

    await next();
  } catch(error){
    console.log(error);
    console.log("error in jwt.encode");
    response.status = 400;
    response.body = {
      success: false,
      message: error.error,
      user,
    };
  }
}

export const decode = async( ctx, next ) => {
  const { req, request , response } = ctx;
  try {
  const accessTokenObject = JSON.parse(ctx.headers.cookie);
  const accessToken = accessTokenObject["_hm_guit"];
  
  if(!accessToken){
    response.status = 401;
    response.body = {
      success: false,
      message: "No sessoin cookie provided",
    }
  }
  }
  catch (error){
    console.log("error in jwt decode");
    console.error(error);
    response.body = {
      success: false,
      message: "cannot parse JSON.parse(ctx.headers.cookie)"
    }
  }
  try {
    const decoded = await jwt.verify(accessToken, SECRET_KEY);
    ctx.request.studentName = decoded.name;
    ctx.request.studentEmail = decoded.email;
    ctx.request.studentNumber = decoded.studentNumber;
    return next();
  } catch (error) {
    console.log("error in jwt.decode");
    console.error(error);
    response.status = 401; 
    response.body = {
      success: false,
      status: 401, 
      error: error.message,
    };
    return;
  }
}

export default {
  encode,
  decode,
}