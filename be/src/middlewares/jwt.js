import jwt from "jsonwebtoken";
import User from "../models/user";

const SECRET_KEY = "_g_suit";

export const encode = async (ctx, next) => {
  const { request, response } = ctx;

  try {
    const { studentNumber } = request.body;
    const user = await User.findByStudentNumber(studentNumber);
    const payload = {
      studentNumber: user.profile.studentNumber,
      name: user.profile.name,
      email: user.profile.email,
    }
    const authToken = jwt.sign(payload, SECRET_KEY);
    console.log("Auth", authToken);
    request.authToken = authToken;
    next();
  } catch(error){
    response.status = 400;
    response.body = {
      success: false,
      message: error.error,
    };
  }
}

export const decode = async( ctx, next ) => {
  const { request , response } = ctx;
  if(!ctx.cookies.get("_hm_guit")){
    response.status = 401;
    response.body = {
      success: false,
      validate: true,
      message: "No session cookie provided",
    }
  }
  if(!request.headers["authorization"]){
    response.status = 400;
    response.body = {
      success: false, 
      message: "No access token provided",
    };
  }
  const accessToken = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(accessToken, SECRET_KEY);
    req.studentName = decoded.name;
    req.studentEmail = decoded.email;
    req.studentNumber = decoded.studentNumber;
    return next();
  } catch (error) {
    response.status = 401; 
    response.body = {
      success: false, 
      message: error.message,
    };
    return;
  }
}

export default {
  encode,
  decode,
}