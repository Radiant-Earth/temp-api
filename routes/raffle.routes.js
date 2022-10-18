const express = require("express");

const {
  httpCreateNewRaffle,
  httpGetRaffles,
  httpGetSingleRaffle,
  httpDeleteRaffle
} = require("../controller/raffle.controller");

const Routes = express.Router();


Routes.post('/create-raffle', httpCreateNewRaffle);
Routes.get('/raffles', httpGetRaffles);
Routes.get('/raffle/:id', httpGetSingleRaffle);

module.exports = Routes