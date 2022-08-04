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
    _id
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

  if(!id) return res.status(404).json({
    message: 'something went wrong!'
  })

  try {
    const myCoupons = await Koopon.find({ account_id: id });

    if (!myCoupons.length) return res.status(404).json({
        message: 'No coupon found, create a coupon.'
    })


    return res.status(200).json({
        message: 'successful!',
        data: myCoupons
    })

  } catch (error) {
    res.status(400).json({
        message: 'Something went wrong!'
    })
  }

}


async function updateMyCoupon(req, res) {
  const id = req.params.id;

  if(!id) return res.status(404).json({
    message: 'something went wrong!'
  })

  try {
    await Koopon.findByIdAndUpdate({ _id: id}, { data: req.body.data});

    const myCoupons = await Koopon.find({ account_id: req.body.ownerId});

    if (!myCoupons.length) return res.status(404).json({
        message: 'No coupon found, create a coupon.'
    })


    return res.status(200).json({
        message: 'successful!',
        data: myCoupons
    })

  } catch (error) {
    res.status(400).json({
        message: 'Something went wrong!'
    })
  }

}






module.exports = { createKoopon, getMyCoupons, updateMyCoupon };
