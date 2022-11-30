const express = require("express");

const { createMarket, getAllCoupons} = require("../controller/market.controller");

const Routes = express.Router();


Routes.post('/market/create', createMarket);
Routes.get('/market', getAllCoupons);

module.exports = Routes