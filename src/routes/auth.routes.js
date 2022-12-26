const express = require("express");

const {
  httpCreateNewUser,
  httpLoginUser,
  httpUpdateUser,
  httpGetUserDetails,
} = require("../controller/auth.controller");

const Routes = express.Router();

Routes.post("/signup", httpCreateNewUser);
Routes.post("/signin", httpLoginUser);
Routes.put("/update-user", httpUpdateUser);
Routes.get("/user/:id", httpGetUserDetails);

module.exports = Routes;
