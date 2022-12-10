const express = require("express");

const { 
  createMarket, 
  getAllListedCoupons,
  deleteCoupon
} = require("../controller/market.controller");

const Routes = express.Router();


Routes.post('/market/create', createMarket);
Routes.get('/market', getAllListedCoupons);
Routes.delete('/market/:id', deleteCoupon);

module.exports = Routes