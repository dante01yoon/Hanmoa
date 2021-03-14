import makeValidation from "@withvoid/make-validation";
import Room from "../../models/room";
import pick from "lodash/pick";

export const onGetRoomUsers = async (ctx) => {
  const { request: { params: {id}}} = ctx;
  try {
    const join = await Room.getRoomUsers({id});
    ctx.status = 200;
    ctx.body ={
      success: true,
      data: {
        join: join ?? [],
      }
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

export const onGetRooms = async(ctx) => {
  const { request: {query: {page}, params: {category}}} = ctx;
  try {
    const rooms = await Room.getRooms({page, category});
    const refinedRooms = rooms.map((room) => {
      const refinedTopic = pick(room.topic,["category", "url"]);
      return {
        ...room.toObject(),
        topic: refinedTopic,
      }
    });

    ctx.status = 200;
    ctx.body = {
      success: true,
      data: {
        rooms: refinedRooms,
      },
    }
  } catch (error) {
    console.error("error in onGetRooms");
    console.error(error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: "500 server error",
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
      checks: {
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
      data: {
        room,
      },
    };
  } catch(error){
    console.error("error in onGetRoom");
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: "500 server error",
    }
    console.error(error);
    throw Error(error);
  }
}

export const onCreateRoom = async(ctx) => {
  const { request, response } = ctx;
  const { studentNumber, title, subTitle, imageUrl, category } = request.body;
  
  try {
    const validation = makeValidation(types => ({
      payload: request.body,
      checks: {
        studentNumber: { type: types.string },
        title: { type: types.string },
        subTitle: { type: types.string },
        category: { type: types.string },
      }
    }));

    if(!validation.success) {
      response.status = 400;
      response.body = validation;
      return;
    }
    
    const room = await Room.createRoom({
      studentNumber,
      title,
      subTitle,
      imageUrl: imageUrl ?? "",
      category,
    });

    response.status = 200;
    response.body = {
      success: true,
      data: {
        room,
      },
    };
  } catch(error){
    console.log("error in onCreateRoom");
    throw error;
  }
}