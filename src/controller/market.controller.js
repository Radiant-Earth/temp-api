const { Market } = require("../model/market.model");

async function createMarket(req, res) {
  
  try {

    for (let index = 0; index < req.body.length; index++) {
      
      let data = await Market.updateOne({ 
        metadata_id: req.body[index]["metadata_id"] }, 
        { ...req.body[index] }, {upsert: true});

      console.log("Does List NFT exist? ", data);
      
      if (!data) {
        const listing = new Market({
          ...req.body[index],
        });
    
        await listing.save();
      }
      
    }


    getAllListedCoupons(req, res);

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
    const myCoupons = await Market.find({ account_id: id });

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

  console.log(req.body)

  try {
    const coupon = await Market.findByIdAndUpdate({ _id: id}, { data: req.body.data, is_minted: req.body.is_minted}, { upsert: false});

    console.log('Updated==========> ', coupon)

    const myCoupons = await Market.find({ account_id: req.body.data.ownerId});

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

async function getAllListedCoupons(req, res) {


  try {
    const listedCoupons = await Market.find();
    return res.status(200).json({
        message: 'successful!',
        data: listedCoupons
    })

  } catch (error) {
    console.log(error)
    res.status(400).json({
        message: 'Something went wrong!'
    })
  }

}


async function deleteCoupon(req, res) {
  const id = req.params.id

  try {
    const coupon = await Market.findOneAndDelete({ _id: id })
    console.log('Deleted coupon ========> ', coupon);
    if (!coupon) {
      return res.status(404).json({
        message: 'coupon doesn\'t exist!'
      })
    }
    return res.status(200).json({
        message: 'successful!',
    })

  } catch (error) {
    res.status(400).json({
        message: 'Something went wrong!'
    })
  }

}






module.exports = { createMarket, getMyCoupons, getAllListedCoupons, updateMyCoupon, deleteCoupon };
