const express = require("express");

const { createKoopon, getMyCoupons, updateMyCoupon } = require("./controller");

const Routes = express.Router();


Routes.post("/koopon", createKoopon);
Routes.get("/koopon/:id", getMyCoupons);
Routes.put("/koopon/:id", updateMyCoupon);
module.exports = Routes;
