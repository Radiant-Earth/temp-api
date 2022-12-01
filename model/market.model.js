const { Schema, model } = require("mongoose");
const Market = new Schema(
  {
    approval_id: String,
    base_uri: String,
    content_flag: String,
    created_at: String,
    currency: String,
    description:String,
    extra: String,
    kind: String,
    listed_by: String,
    market_id: String,
    media: String,
    metadata_id: String,
    minter:String,
    nft_contract_id: String,
    price: Number,
    receipt_id:String,
    reference:String,
    reference_blob: 
      {
        media: String, 
        title: String,
        coupon_id: String, 
        media_hash: String, 
        description: String,
      },
    title: String,
    token_id: String,
    __typename: String
  },
  { timestamps: true }
);

module.exports = { Market: model("market", Market) };
