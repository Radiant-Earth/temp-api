const { Koopon } = require("./model");
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
  } = req.body;
  if (
    !account_id ||
    !price ||
    !store_name ||
    !discount ||
    !start_date ||
    !expiry_date ||
    !quantity ||
    !description
  ) {
    res.status(400).json({
      message: `fields missing`,
    });
    return;
  }
  try {
    let data = await Koopon.findOneAndUpdate({ account_id }, { ...req.body });
    const allData = await Koopon.find({ account_id });
    console.log(data);
    if (data) {
      res.status(200).json({
        message: "successful",
        data: allData,
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

module.exports = { createKoopon };
