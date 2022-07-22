const express = require("express");

const { createKoopon } = require("./controller");

const Routes = express.Router();


Routes.post("/koopon", createKoopon);
module.exports = Routes;
