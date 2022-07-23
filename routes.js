const express = require("express");

const { createKoopon, getMyCoupons } = require("./controller");

const Routes = express.Router();


Routes.post("/koopon", createKoopon);
Routes.get("/koopon/:id", getMyCoupons);
module.exports = Routes;
