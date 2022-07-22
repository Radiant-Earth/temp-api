const { Schema, model } = require("mongoose");
const koopon = new Schema(
  {
    account_id: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    store_name: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
      required: true,
    },
    start_date: {
      type: String,
      required: true,
    },
    expiry_date: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    issued_token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = { Koopon: model("koopon", koopon) };
