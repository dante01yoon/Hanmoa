const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// [ LOAD PRE-DEFINED  MONGODB CONFIG ]
const mongoConnect = require("./config/mongoConfig");
// [ MONGOOSE INITIALIZATION]
mongoConnect();

// [ ROUTES CONFIG ]
const routes = require("./routes");

//routes controller require
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");
const userRoutes = require("./routes/user");
const roomRoutes = require("./routes/room");

app.use(express.static("public"));
// [ CONFIGURE body-parser for DATA PROCESSING ]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// [ SET CORS  ]
app.use(cors());
// [ SET PORT ]
const port = processn.env.PORT || 5001;

app.use("/api", apiRoutes);

app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);
app.use("/user", userRoutes);
app.use("/room", roomRoutes);
app.use(function (err, req, res, next) {
  console.err(err.stack);
  res.status(500).send("Something broke!");
});

// [ START SERVER ON PORT NUMBER ]
app.listen(port, () => console.log("Server listening on port 5001"));
