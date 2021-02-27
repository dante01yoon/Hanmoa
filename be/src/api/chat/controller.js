import makeValidation from "@withvoid/make-validation";
import Chat from "../../models/chat";

export const onGetChat = async (ctx, next) => {
  const {request: {query: {id}}} = ctx;
  try {
    const validation = makeValidation(types => ({
      payload: id,
      checkes: {
        id: { type: types.string}
      }
    }));
    
    if(!validation) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: "validation error",
        validation
      };
    }

    const chat = await Chat.findChatById({id});
    console.log("chat: ", chat);
    ctx.status = 200;
    ctx.body = {
      success: true,
      chat, 
    }
    return await next();
  } catch (error) {
    console.error("error in onGetChat");
    console.error(error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: error,
    }
  }
}

export const onPostCreateChat = async (ctx, next) => {
  const { request: {body: { writer, message, image, roomId}}} = ctx;

  const validation = makeValidation(types => ({
    payload: {
      writer,
      message, 
      roomId,
    },
    checks: {
      writer: { type: types.string },
      message: { type: types.string },
      roomId: { type: types.string },
    }
  }));
  
  if(!validation){
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: "validation error",
      validation, 
    }
  }
  try {
    const chat = Chat.createChat({ writer, message, image, roomId});
    ctx.status = 200;
    ctx.body = {
      success: true,
      chat,
    }
    return await next();
  } catch(error) {
    console.error("error in onPostCreateChat");
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: "500 server error",
    }
  }
}

export const onDeleteChat = async (ctx, next) => {
  const { request: {params: {id}}} = ctx;
  try {
    const validation = makeValidation(types => ({
      payload: id,
      checkes: {
        id: { type: types.string}
      },
    }));

    if(!validation){
      ctx.status = 400;
      ctx.body = {
        success: false,
        error: "validation error",
        validation,
      }
    }
    const chat = Chat.deleteChatById({id});
    ctx.status = 200;
    ctx.body = {
      success: true,
      chat,
    }
    return await next();
  } catch(error) {
    console.error("error in onGetDeleteChat");
    console.error("error: ", error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: "500 server error",
    }
  }
}