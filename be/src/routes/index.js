const topicDicts = {
  all: "all",
  etc: "etc",
  ktx: "ktx",
  netflix: "netflix",
  watcha: "watcha",
  share: "share",
  roommate: "roommate",
  adobe: "adobe",
};
const topicLists = [
  "all",
  "etc",
  "ktx",
  "netflix",
  "watcha",
  "share",
  "roommate",
  "adobe",
];

const routes = (app) => {
  app.get("/api/all", function (req, res) {
    res.end();
  });

  app.get("/api/all/:id", function (req, res) {
    res.end();
  });

  app.get("/api/etc", function (req, res) {
    res.end();
  });

  app.get("/api/ktx", function (req, res) {
    res.end();
  });

  app.get("/api/netflix", function (req, res) {
    res.end();
  });

  app.get("/api/watcha", function (req, res) {
    res.end();
  });
  app.get("/api/share", function (req, res) {
    res.end();
  });
  app.get("/api/roommate", function (req, res) {
    res.end();
  });
  app.get("/api/adobe", function (req, res) {
    res.end();
  });
};

exports.module = routes;
