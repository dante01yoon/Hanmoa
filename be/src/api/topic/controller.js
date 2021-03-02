import makeValidation from "@withvoid/make-validation";
import Topic from "../../models/topic";

export const onGetTopic = async(ctx, next) => {
  const { request: {query: {category}}} = ctx;
  const validation = makeValidation(types => ({
    payload: category,
    checks: {
      topic: {
        type: types.string,
      },
    },
  }));

  if(!validation){
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: "validation error",
      validation,
    };
  }

  try {
    const topic = await Topic.findTopic({category});
    ctx.status = 200;
    ctx.body = {
      topic,
      success: true,
    }
  } catch(error){
    console.error("error in onGetTopic");
    console.error(error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: error,
    }
  }
  return await next();
}

export const onGetTopicList = async(ctx, next) => {
  try {
    const topicList = await Topic.getTopicList();
    const refinedTopicList = topicList.map(topic => topic.category);
    
    ctx.status = 200;
    ctx.body = {
      success: true,
      topicList: refinedTopicList,
    }
  } catch(error) {
    console.error("error in onGetTopicList");
    console.error(error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: error,
    }
  }
  return await next();
}

export const onPostTopic = async(ctx, next) => {
  const { request: {body: {category}}} = ctx;
  const validation = makeValidation(types => ({
    payloads: category,
    checks: {
      category: {
        types: types.string,
      },
    },
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
    const topic = await Topic.createTopic({category});
    ctx.status = 200;
    ctx.body = {
      success: true,
      topic,
    }
  } catch(error) {
    console.error("error in onPostTopic");
    console.error(error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: error,
    }
  }
  return await next();
}