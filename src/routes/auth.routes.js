const express = require("express");

const {
  httpCreateNewUser,
  httpLoginUser,
} = require("../controller/auth.controller");

const Routes = express.Router();

Routes.post("/signup", httpCreateNewUser);
Routes.post("/signin", httpLoginUser);
Routes.post("/update-user", httpLoginUser);

module.exports = Routes;
