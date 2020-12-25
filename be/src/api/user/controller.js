import makeValidation from "@withvoid/make-validation";
import User from "../../models/user";

export const onGetUserByToken = async(ctx) => {
  const { request, response } = ctx;

  try {
    const user = await User.findByToken(request.body.token);
    response.status = 200;
    response.body = {
      success:true,
      user,
    };
  } catch (error) {
    response.status = 400;
    response.body = {
      success: false,
      error,
    }
  }
}

export const onCreateUser = async (ctx) => {
  const { request : req, response: res } = ctx;

  try {
    const validation = makeValidation(types => ({
      payload: req.body,
      checks: {
        name: { type: types.string },
        studentNumber: { type: types.string },
        email: { type: types.string }, 
      }
    }));
    
    if(!validation.success) {
      res.status = 400;
      res.body = validation;
      return;
    }

    const { name, email, picture, studentNumber  } = req.body;    
    
    const user = await User.createUser({
      name,
      email,
      picture,
      studentNumber,
    });

    res.status = 200;
    res.body = {
      success: true,
      ...user,
    }
    return;
  } catch (error){
    console.error("in onCreateUser:")
    res.status = 500;
    res.body = {
      success: false,
      error,
    }
  }
  return;
}

const onGetUserByEmail = async (ctx) => {
  const { request : req, response: res } = ctx;
  try {
    const user = await User.findByEmail(req.param.email);
    res.status = 200;
    res.body = user;
    return;
  } catch(error){
    res.status = 500;
    res.body = error;
    return;
  }
};

const onGetUserByStudentNumber = async (ctx) => {
  const { request : req, response: res } = ctx;
  if(!req.query){
    res.status = 400;
    res.body = {
      error: "올바른 req.query를 넣어주세요",
      status: 400,
    }
    return;
  }
  try {
    const user = await User.findByStudentNumber(req.query.studentNumber);
    res.status = 200;
    res.body = user;
    return;
  } catch (error) {
    console.error("in onGetUserByStudentNumber:")
    res.status = 500;
    res.body = error;
    return;
  }
}

const onGetAllUsers = async function({request: req, response: res}){
  
  const { query } = req;
  if(!query){
    res.status = 400;
    res.body = {
      error: "파라메터 없음",
      status: 400
    }
  }

  try {
    const users = await User.getUsers();
    res.status = 200;
    res.body = {
      ...users,
      success: true,
    };
    return;
  }catch (error) {
    console.error("in onGetAllUsers:")
    res.status = 500;
    res.body = {
      ...error,
      success: false,
    };
  }
}

const onDeleteUserById = async ({request, response}) => {
  try {
    const user = await User.deleteById(request.params.id);
    if(!user){
      response.status = 400;
      response.body = {
        success: false,
      }
      return;
    }
    response.status = 200;
    response.body = {
      success: true,
      ...user,
    }
    return;
  } catch (error){
    console.error("in onDeleteUserById:")
    response.status = 500;
    response.body = {
      error,
      success: false
    }
  }
}

const postLogin = async(ctx) => {
  const {state, cookies} = ctx;
  
  ctx.body = {
    success: true,
    authorization: state.authToken,
  };
};

export default {
  onGetUserByToken,
  onCreateUser,
  onGetUserByEmail,
  onGetUserByStudentNumber,
  onGetAllUsers,
  onDeleteUserById,
  postLogin,
}