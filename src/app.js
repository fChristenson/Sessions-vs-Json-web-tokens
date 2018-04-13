const express = require("express");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const app = express();

app.use(
  session({
    secret: "very secret", // never save the production secret in your repo
    resave: false,
    saveUninitialized: true
  })
);

app.get("/", (req, res) => {
  const token = req.get("authorization");
  const decodedToken = jwt.decode(token) || {};
  res.json({
    id: process.env.APP_ID,
    sessionUserId: req.session.userId,
    jwtUserId: decodedToken.userId
  });
});

app.get("/session", (req, res) => {
  req.session.userId = "session user id";
  res.json({
    id: process.env.APP_ID,
    message: "you are logged in with a session"
  });
});

app.get("/jwt", (req, res) => {
  const token = jwt.sign({ userId: "jwt user id" }, "my secret");
  res.header("authorization", token);
  res.json({
    id: process.env.APP_ID,
    message: "you are logged in with a jwt"
  });
});

module.exports = app;
