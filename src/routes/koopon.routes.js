const express = require("express");

const {
  createKoopon,
  getMyCoupons,
  getAllCoupons,
  updateMyCoupon,
  deleteCoupon,
  getCouponsByCountry,
} = require("../controller/koopon.controller");

const Routes = express.Router();

Routes.post("/koopon", createKoopon);
Routes.get("/koopon", getAllCoupons);
Routes.get("/koopon/:id", getMyCoupons);
Routes.get("/koopon/country/:id", getCouponsByCountry);
Routes.put("/koopon/:id", updateMyCoupon);
Routes.delete("/koopon/:id", deleteCoupon);

module.exports = Routes;
