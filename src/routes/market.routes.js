const express = require("express");

const { createMarket, getAllListedCoupons} = require("../controller/market.controller");

const Routes = express.Router();


Routes.post('/market/create', createMarket);
Routes.get('/market', getAllListedCoupons);

module.exports = Routes