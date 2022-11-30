const { Schema, model } = require("mongoose");
const Market = new Schema(
  {},
  { timestamps: true }
);

module.exports = { Market: model("market", Market) };
