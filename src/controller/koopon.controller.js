const { Koopon } = require("../model/coupon.model");
const { User } = require("../model/auth.model");
const { Market } = require("../model/market.model");

async function createKoopon(req, res) {
  console.log(req.body);
  let {
    account_id,
    price,
    store_name,
    discount,
    description,
    start_date,
    expiry_date,
    quantity,
    store,
    title,
    _id,
  } = req.body;
  // if (!_id) return res.status(400).json({
  //   message: '_id cannot be blank!'
  // })
  try {
    let data = await Koopon.findOneAndUpdate({ _id }, { ...req.body });

    const allData = await Koopon.find({ _id });
    console.log(data);
    if (data) {
      res.status(200).json({
        message: "successful",
        data: allData,
      });
      return;
    }

    if (
      !title ||
      !account_id ||
      // !price ||
      // !store_name ||
      // !discount ||
      // !start_date ||
      // !expiry_date ||
      !quantity ||
      !description ||
      !store
    ) {
      res.status(400).json({
        message: `fields missing`,
      });
      return;
    }
    const coupon = new Koopon({
      ...req.body,
    });

    await coupon.save();

    res.status(201).json({
      message: "Successfully created!",
      data: allData,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: `${error.message}`,
    });
  }
}

async function getMyCoupons(req, res) {
  const id = req.params.id;

  if (!id)
    return res.status(404).json({
      message: "something went wrong!",
    });

  try {
    const myCoupons = await Koopon.find({ account_id: id });

    if (!myCoupons.length)
      return res.status(404).json({
        message: "No coupon found, create a coupon.",
      });

    return res.status(200).json({
      message: "successful!",
      data: myCoupons,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
}

async function getCouponsByCountry(req, res) {
  const id = req.params.id;

  if (!id)
    return res.status(404).json({
      message: "something went wrong!",
    });

  try {
    // get the users in the same country

    const docs = await User.find({ country: id });
    // console.log("Documents::::::::::::::::::::>", docs);

    const users = docs.map((item) => item.accountId);
    // console.log("Users::::::::::::::::::::::::>", users);

    // query to get the coupons created by these users

    const myCoupons = await Market.find({ account_id: { $in: users } });
    // console.log("Coupons:::::::::::::::::::::>", myCoupons);

    if (!myCoupons.length)
      return res.status(404).json({
        message: "No coupon found, create a coupon.",
      });

    return res.status(200).json({
      message: "successful!",
      data: myCoupons,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
}

async function updateMyCoupon(req, res) {
  const id = req.params.id;

  if (!id)
    return res.status(404).json({
      message: "something went wrong!",
    });

  console.log(req.body);

  try {
    const coupon = await Koopon.findByIdAndUpdate(
      { _id: id },
      { data: req.body.data, is_minted: req.body.is_minted },
      { upsert: false }
    );

    console.log("Updated==========> ", coupon);

    const myCoupons = await Koopon.find({ account_id: req.body.data.ownerId });

    if (!myCoupons.length)
      return res.status(404).json({
        message: "No coupon found, create a coupon.",
      });

    return res.status(200).json({
      message: "successful!",
      data: myCoupons,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
}

async function getAllCoupons(req, res) {
  try {
    const coupons = await Koopon.find();
    return res.status(200).json({
      message: "successful!",
      data: coupons,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
}

async function deleteCoupon(req, res) {
  const id = req.params.id;

  try {
    const coupon = await Koopon.findOneAndDelete({ _id: id });
    console.log("Deleted coupon ========> ", coupon);
    if (!coupon) {
      return res.status(404).json({
        message: "coupon doesn't exist!",
      });
    }
    return res.status(200).json({
      message: "successful!",
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
}

module.exports = {
  createKoopon,
  getMyCoupons,
  getAllCoupons,
  updateMyCoupon,
  deleteCoupon,
  getCouponsByCountry,
};
