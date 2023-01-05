const express = require("express");

const {
  createMarket,
  getAllListedCoupons,
  deleteCoupon,
  updateListedCoupon,
  getCouponsByCountry,
} = require("../controller/market.controller");

const Routes = express.Router();

Routes.post("/market/create", createMarket);
Routes.post("/market/update/:id", updateListedCoupon);
Routes.get("/market", getAllListedCoupons);
Routes.get("/market/country/:id", getCouponsByCountry);
Routes.delete("/market/:id", deleteCoupon);

module.exports = Routes;
