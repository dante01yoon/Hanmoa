import makeValidation from "@withvoid/make-validation";
import Room from "../../models/room";

export const onGetLatestMessages = async(ctx) => {
  const { request, response } = ctx;
  const { id } = request.params;
  const { page } = request.query;

  try {
    const messages = Room.getLatestChat({page,id});
    res.status = 200;
    res.body = messages;
    return;
  } catch(error){
    console.log("error in onGetLatestMessages");
    throw error;
  }
 }

export const onCreateRoom = async(ctx) => {
  const { request, response } = ctx;
  const { studentNumber } = request.body;
  console.log("studentNumber: ", studentNumber);
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
      studentNumber
    });

    response.status = 200;
    response.body = {
      success: true,
      ...room
    };
  } catch(error){
    console.log("error in onCreateRoom");
    throw error;
  }
}