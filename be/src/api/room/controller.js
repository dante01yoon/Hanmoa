import makeValidation from "@withvoid/make-validation";
import Room from "../../models/room";

export const onGetRoomUsers = async (ctx) => {
  const { request: { params: {id}}} = ctx;
  try {
    const join = await Room.getRoomUsers({id});
    ctx.status = 200;
    ctx.body ={
      success: true,
      join: join ?? [],
    }
  } catch (error) {
    console.log("error in onGetRoomUsers");
    console.error(error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: error,
    }
  }
}

export const onGetLatestMessages = async (ctx) => {
  const { request, response } = ctx;
  const { id } = request.params;
  const { page } = request.query;

  try {
    const messages = Room.getLatestChat({page,id});
    response.status = 200;
    response.body = messages;
    return;
  } catch(error){
    console.log("error in onGetLatestMessages");
    throw error;
  }
 }

export const onGetRoom = async (ctx, next) => {
  const {request: {params: {id}, query: {only}}} = ctx;
  if(only){
    switch(only){
      case "join":
        await onGetRoomUsers(ctx);
        return next();
        break;
      default:
        return next();
    }  
  }
  try{
    const validation = makeValidation(types =>  ({
      payload: id,
      checkes: {
        id: { type: types.string}
      }
    }))

    if(!validation){
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: "validation error",
        validation
      }
    }

    const room = await Room.findRoomById({id});
    ctx.status = 200;
    ctx.body = {
      success: true,
      room,
    };
  } catch(error){
    console.log("room controller onGetRoom emits error");
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: "error occurred in room model",
    }
    console.error(error);
  }
}

export const onCreateRoom = async(ctx) => {
  const { request, response } = ctx;
  const { studentNumber, title } = request.body;
  try {
    const validation = makeValidation(types => ({
      payload: request.body,
      checks: {
        studentNumber: { type: types.string },
      }
    }));

    if(!validation.success) {
      response.status = 400;
      response.body = validation;
      return;
    }
    
    const room = await Room.createRoom({
      studentNumber,
      title
    });

    response.status = 200;
    response.body = {
      success: true,
      room
    };
  } catch(error){
    console.log("error in onCreateRoom");
    throw error;
  }
}