import Router from "koa-router";
import {
  onGetTopic,
  onGetTopicList,
  onPostTopic,
} from "./controller";

const topicRouter = new Router();

topicRouter.get("/",
  onGetTopic,
)

topicRouter.get("/list",
  onGetTopicList,
)

topicRouter.post("/create",
  onPostTopic,
)

export default topicRouter;