const { Schema, model } = require("mongoose");
const koopon = new Schema(
  {
    is_minted: {
        type: Boolean,
        default: false
    },
    description: {
        type: String
    },
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
    },
    data: {}
  },
  { timestamps: true }
);

module.exports = { Koopon: model("koopon", koopon) };
