const express = require("express");

const { 
  createIssuedToken,
  updateIssuedToken,
  getMyIssuedToken
} = require("../controller/issued.controller");

const Routes = express.Router();


Routes.post('/issued/create', createIssuedToken);
Routes.get('/issued/:id', getMyIssuedToken);
Routes.put('/issued/update/:id', updateIssuedToken);

module.exports = Routes