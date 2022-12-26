const express = require("express");

const {
  httpCreateNewUser,
  httpLoginUser,
  httpUpdateUser,
} = require("../controller/auth.controller");

const Routes = express.Router();

Routes.post("/signup", httpCreateNewUser);
Routes.post("/signin", httpLoginUser);
Routes.post("/update-user", httpUpdateUser);

module.exports = Routes;
