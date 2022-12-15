const { Schema, model } = require("mongoose");

const Issued = new Schema(
  {
    issuerId: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    accountId: {
      type: String
    },
    tokenId: {
      type: String,
      required: true
    },
    expiryDate: {
      type: {
        type: String
      }
    },
    redeemed: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: false
    },
    metadata_id: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = { Issued: model("issued", Issued) };
