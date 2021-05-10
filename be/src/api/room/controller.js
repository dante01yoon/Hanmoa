import makeValidation from "@withvoid/make-validation";
import Room from "../../models/room";
import pick from "lodash/pick";
import cloneDeep from "lodash/cloneDeep";

export const onGetRoomUsers = async (ctx) => {
  const { request: { params: { id } } } = ctx;
  try {
    const join = await Room.getRoomUsers({ id });
    ctx.status = 200;
    ctx.body = {
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

export const onGetRooms = async (ctx) => {
  const { request: { query: { page }, params: { category } } } = ctx;
  try {
    const rooms = await Room.getRooms({ page, category });
    const refinedRooms = rooms.map((room) => {
      const copiedRoom = cloneDeep(room.toObject());
      const refinedTopic = pick(room.topic, ["category", "url"]);
      return {
        ...copiedRoom,
        topic: refinedTopic,
        current: copiedRoom.join.length,
        joinPossible: copiedRoom.join.length < copiedRoom.capability,
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
    const messages = await Room.getLatestChat({ page, id });
    response.status = 200;
    response.body = {
      success: true,
      body: messages,
    };
  } catch (error) {
    console.log("error in onGetLatestMessages");
    throw error;
  }
}

export const onGetRoom = async (ctx, next) => {
  const { request: { params: { id }, query: { only } } } = ctx;
  if (only) {
    switch (only) {
      case "join":
        await onGetRoomUsers(ctx);
        return next();
        break;
      default:
        return next();
    }
  }
  try {
    const validation = makeValidation(types => ({
      payload: id,
      checks: {
        id: { type: types.string }
      }
    }))

    if (!validation) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: "validation error",
        validation
      }
    }

    const room = await Room.findRoomById({ id });
    ctx.status = 200;
    ctx.body = {
      success: true,
      data: {
        room,
      },
    };
  } catch (error) {
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

export const onPostLeaveRoom = async (ctx) => {
  const { request, response } = ctx;
  const { roomId, studentNumber } = request.body;

  try {
    const joinedUsers = Room.leaveUser(roomId, studentNumber);
    response.status = 200;
    response.body = {
      success: true,
      join: joinedUsers,
    }
  } catch (error) {
    response.status = 500;
    response.body = {
      success: false,
    }
    console.error("error exist in onPostLeaveRoom")
    throw (error);
  }
}

export const onCreateRoom = async (ctx) => {
  const { request, response } = ctx;
  const { studentNumber, title, subTitle, imageUrl, category, capability } = request.body;

  try {
    if (["watcha", "netflix"].includes(category)) {
      if (capability !== 4) {
        throw Error("category watcha or netflix capabilitycan't be any number except 4");
      }
    }
    const validation = makeValidation(types => ({
      payload: request.body,
      checks: {
        studentNumber: { type: types.string },
        title: { type: types.string },
        subTitle: { type: types.string },
        category: { type: types.string },
      }
    }));

    if (!validation.success) {
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
      capability,
    });

    response.status = 200;
    response.body = {
      success: true,
      data: {
        room,
      },
    };
  } catch (error) {
    console.log("error in onCreateRoom");
    response.body = {
      success: false,
    }
    throw error;
  }
}

export const onPostRoomPasswordCheck = async (ctx) => {
  const { request, response } = ctx;
  const { roomId, password } = request.body;

  try {
    const room = await Room.findRoomById({
      id: roomId,
      password,
    });

    response.status = 200;
    response.body = {
      success: true,
      data: room,
    }
  } catch (error) {
    console.log("error in onPostRoomPasswordCheck");
    response.body = {
      success: false,
    }
    throw Error(error);
  }
}

export const onPutJoinRoom = async (ctx) => {
  const { request, response } = ctx;
  const { roomId, studentNumber } = request.body;

  try {
    const room = await Room.joinUser(roomId, studentNumber);

    // 데이터베이스에 데이터가 없을 때
    if (room && room.code === 422) {
      response.status = 422;
      response.body = {
        success: false,
        data: room,
      }
      return;
    }

    response.status = 200;
    response.body = {
      success: true,
      data: room,
    };
  } catch (error) {
    response.status = 500;
    response.body = {
      success: false,
    }
    console.error("error in onPutJoinRoom");
    throw Error(error);
  }
}

export const onPutLeaveRoom = async (ctx) => {
  const { request, response } = ctx;
  const { roomId, studentNumber } = request.body;

  try {
    const room = await Room.leaveUser(roomId, studentNumber);

    response.status = 200;
    response.body = {
      success: true,
      data: room,
    }
  } catch (error) {
    console.error("error in onPutLeaveRoom");
    response.status = 500;
    response.body = {
      success: false,
    }
  }
}