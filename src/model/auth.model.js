const { Schema, model } = require("mongoose");
const User = new Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String
    },
    phone: {
      type: Number,
      unique: true,
      required: true
    },
    password: {
      type: String,
    },
    country: {
      type: String
    },
    emoji: {
      type: String
    },
    accountId: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = { User: model("user", User) };
