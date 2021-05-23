import jwt from "jsonwebtoken";
import User from "../models/user";
import isNil from "lodash/isNil";

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
      profile: { token: authToken },
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
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "Lax",
      // secure: true,
    });

    await next();
  } catch (error) {
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

/**
 * 
 * @param {ctx} ctx 
 * @param {next} next 
 *  accessToken이 제공되지 않아도 에러를 내지 않고 다음 미들웨어로 넘어감
 * @returns 
 */
export const decode = async (ctx, next) => {
  const { response, cookies, request } = ctx;
  console.log("request.headers in decode", request.headers);
  const accessToken = cookies.get("_hm_guit");
  console.log("cookies in decode: ", cookies);
  console.log("accessToken in decode: ", accessToken);
  if (isNil(accessToken)) {
    return next();
  } else {
    try {
      const decoded = await jwt.verify(accessToken, SECRET_KEY);
      ctx.request.studentName = decoded.name;
      ctx.request.studentEmail = decoded.email;
      ctx.request.studentNumber = decoded.studentNumber;
    } catch (error) {
      console.error("error in jwt.decode");
      console.error(error);
      response.status = 401;
      response.body = {
        success: false,
        status: 401,
        body: {
          validate: false,
        },
        message: error.message,
      };
      return;
    }
    return next();
  }
}

/**
 * 
 * @param {*} ctx 
 * @param {*} next
 *  accessToken이 제공되지 않으면 401 에러를 냄 
 * @returns 
 */
const forceGuardDecode = async (ctx, next) => {
  const { response, cookies, request } = ctx;
  const accessToken = cookies.get("_hm_guit");

  if (isNil(accessToken)) {
    response.status = 401;
    response.body = {
      statusCode: 401,
      success: false,
      message: "No session cookie provided",
    }
  } else {
    try {
      const decoded = await jwt.verify(accessToken, SECRET_KEY);
      ctx.request.studentName = decoded.name;
      ctx.request.studentEmail = decoded.email;
      ctx.request.studentNumber = decoded.studentNumber;
    } catch (error) {
      console.error("error in jwt.decode");
      console.error(error);
      response.status = 401;
      response.body = {
        success: false,
        status: 401,
        body: {
          validate: false,
        },
        message: error.message,
      };
      return;
    }
  }
  return next();
}

export default {
  encode,
  decode,
  forceGuardDecode,
}