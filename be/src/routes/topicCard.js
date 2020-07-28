const app = require("express").express();
const TopicCardModel = require("../models/topicCard");
const model = new TopicCardModel();

const topicRoutes = (app, model) => {
  // build db model with pre-defined schema ;
};

app.post("/api/topicCard", function (req, res) {});
