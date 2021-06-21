import makeValidation from "@withvoid/make-validation";
import Room from "../../models/room";
import User from "../../models/user";
import pick from "lodash/pick";
import cloneDeep from "lodash/cloneDeep";
import omit from "lodash/omit";
import isNil from "lodash/isNil";

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
      statusCode: 500,
      success: false,
      message: error,
    }
  }
}

export const onGetRooms = async (ctx) => {
  const { request: { query: { page }, params: { category }, studentNumber } } = ctx;

  try {
    const rooms = await Room.getRooms({ page, category, studentNumber });
    const refinedRooms = rooms.map((room) => {
      const copiedRoom = cloneDeep(room.toObject());

      if (room.join.some(joinedUser => joinedUser.profile.studentNumber === studentNumber)) {
        copiedRoom.hasJoinedRoom = true;
      } else {
        copiedRoom.hasJoinedRoom = false;
      }

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
  const { page = 0 } = request.query;
  try {
    const messages = await Room.getLatestChat({ page, id });
    response.status = 200;
    response.body = {
      success: true,
      data: messages,
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

    let hasJoinedRoom = null;

    console.log("ctx.request.studentNumber: ", ctx.request.studentNumber);

    if (ctx.request.studentNumber) {
      hasJoinedRoom = await User.checkHasJoinedRoomById(id, ctx.request.studentNumber);
    }

    let room = await Room.findRoomById({ id });

    if (!isNil(hasJoinedRoom)) {
      const refinedRoom = cloneDeep(room.toObject());
      refinedRoom.hasJoinedRoom = hasJoinedRoom;
      room = refinedRoom;
    }

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
  const { studentNumber, title, subTitle, imageUrl, category, capability, hasPassword, password, member } = request.body;
  console.log("category: ", category);
  try {
    // 최대 참가 수가 정해져있는 카테고리
    if (["watcha", "netflix"].includes(category)) {
      if (capability > 4) {
        response.status = 400;
        response.body = {
          success: false,
          data: {
            statusCode: 400,
            message: "category watcha or netflix capability can't be any number except 4",
            reason: "number",
          }
        }
        return;
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
      response.body = {
        statusCode: 400,
        reason: "validate",
        message: "validate error",
        success: false,
        data: {
          room: null,
          message: validation.errors,
          reason: validation.message,
        }
      };
      return;
    }

    const room = await Room.createRoom({
      studentNumber,
      title,
      subTitle,
      imageUrl: imageUrl ?? "",
      category,
      capability,
      hasPassword: hasPassword ?? false,
      password: hasPassword ? password : "",
    });

    if (room && room.code === 403) {
      response.status = 403;
      response.body = {
        statusCode: 403,
        data: {
          room: null,
          reason: "should be limited",
          message: "user already exist in same category, but another room",
        }
      }
      return;
    }

    response.status = 200;
    response.body = {
      success: true,
      data: {
        statusCode: 200,
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
  const { password } = request.body;
  const { id } = request.params;

  try {
    const room = await Room.findRoomById({
      id,
    });

    if (room.hasPassword && (room.password !== password)) {
      response.status = 401;
      response.body = {
        success: false,
        data: {
          validate: false,
        }
      }
    }
    else {
      response.status = 200;
      response.body = {
        success: true,
        data: {
          ...omit(room.toObject(), ["password"]),
          validate: true,
        },
      }
    }
  } catch (error) {
    console.log("error in onPostRoomPasswordCheck");
    response.status = 500;
    response.body = {
      success: false,
      statusCode: 500,
    };
    throw Error(error);
  }
}

export const onPutJoinRoomCheck = async (ctx) => {
  const { request, response } = ctx;
  const { roomId, studentNumber } = request.body;

}

export const onPutJoinRoom = async (ctx) => {
  const { request, response } = ctx;
  const { roomId, studentNumber } = request.body;

  try {
    const room = await Room.joinUser(roomId, studentNumber);
    const user = await User.findByStudentNumber(studentNumber);

    if (user && user.code === 422) {
      response.status = 422;
      response.body = {
        success: false,
        data: {
          statusCode: 422,
          message: "user is not exist in User",
        }
      }
      return;
    }
    // 데이터베이스에 데이터가 없을 때
    if (room && room.code === 422) {
      response.status = 422;
      response.body = {
        success: false,
        data: {
          statusCode: 422,
          message: "room or user is not exist in Room",
          room,
        },
      }
      return;
    }

    if (!isNil(room)) {
      response.status = 200;
      response.body = {
        success: true,
        data: room,
      };
      return;
    }

    // 룸이 꽉 찼을 때
    response.status = 409;
    response.body = {
      success: true,
      data: {
        statusCode: 409,
        message: "room is full",
      }
    }
  } catch (error) {
    response.status = 500;
    response.body = {
      statusCode: 500,
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
    if (room && room.code === 422) {
      response.status = 422;
      response.body = {
        success: false,
        data: {
          statusCode: 422,
          message: "room or user is not exist",
          room,
        }
      }
      return;
    }

    response.status = 200;
    response.body = {
      success: true,
      data: room,
    }
  } catch (error) {
    response.status = 500;
    response.body = {
      success: false,
    }
    console.error("error in onPutLeaveRoom");
  }
}