const express = require("express");

const { createKoopon, getMyCoupons, getAllCoupons, updateMyCoupon, deleteCoupon } = require("./controller");

const Routes = express.Router();


Routes.post("/koopon", createKoopon);
Routes.get("/koopon", getAllCoupons);
Routes.get("/koopon/:id", getMyCoupons);
Routes.put("/koopon/:id", updateMyCoupon);
Routes.delete("/koopon/:id", deleteCoupon);
module.exports = Routes;
