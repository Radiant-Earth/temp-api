const express = require("express");

const { httpCreateNewUser, httpLoginUser } = require("../controller/auth.controller");

const Routes = express.Router();


Routes.post('/signup', httpCreateNewUser);
Routes.post('/signin', httpLoginUser);

module.exports = Routes