const express = require("express");

const {
  httpCreateNewUser,
  httpLoginUser,
  httpUpdateUser,
  httpGetUserDetails,
  httpGetAllUsers,
} = require("../controller/auth.controller");

const Routes = express.Router();

Routes.post("/signup", httpCreateNewUser);
Routes.post("/signin", httpLoginUser);
Routes.put("/update-user", httpUpdateUser);
Routes.post("/user/:id", httpGetUserDetails);
Routes.get("/users", httpGetAllUsers);

module.exports = Routes;
