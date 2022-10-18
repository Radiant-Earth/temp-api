const { Schema, model } = require("mongoose");
const Raffle = new Schema(
  {
    author: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
      unique: true
    },
    bids: {
      default: [],
      type: [
        {
          account_id: {
            type: String,
            required: true
          },
          amount: {
            type: Number,
            required: true
          }
        }
      ],
    },
    start_date: {
      type: String,
      required: true
    },
    end_date: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("raffle", Raffle); 
