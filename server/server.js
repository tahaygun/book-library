const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const router = require("./controller");
app.use(bodyparser.json());
require("dotenv").config();
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
app.use(express.static(path.join(__dirname, "build")));

mongoose.connect("mongodb://root:root@ds117960.mlab.com:17960/hebooks");
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:8080",
      "https://pirlantaara.firebaseapp.com",
      "https://pirlanta.tk"
    ],
    methods: ["GET", "HEAD", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    credentials: true //allow setting of cookies
  })
);

app.use(
  session({
    secret: "supersecretstring12345!",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 30 },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use("/api", router);

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen( 8000, () => {
  console.log("Listening...");
});
