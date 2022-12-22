const { Issued } = require("../model/issued.model");
const { httpSendEmail } = require("../utils/utils");

async function createIssuedToken(req, res) {
  try {
    let data = await Issued.findOneAndUpdate(
      { _id: req.body._id },
      { ...req.body }
    );

    const allData = await Issued.find({ issuerId: req.body.issuerId });
    console.log(data);
    if (data) {
      res.status(200).json({
        message: "successful",
        data: allData,
      });
      return;
    }

    // validation will be here

    const issuedToken = new Issued({
      ...req.body,
    });

    await issuedToken.save();

    const emailResponse = await httpSendEmail({
      fullName: req.body.fullName,
      metadata_id: req.body.metadata_id,
      link: `${req.body.link}?is_new=true&fullName=${req.body.fullName}&email=${req.body.email}&phone=${req.body.phone}&_id=${issuedToken._id}`,
      email: req.body.email,
    });

    console.log("Email response: ", emailResponse);

    res.status(201).json({
      message: "Email sent successfully!",
      data: allData,
    });
  } catch (error) {
    console.log("Error controller: ", error);
    res.status(400).json({
      message: "Something went wrong, unable to send email",
      error,
    });
  }
}

async function updateIssuedToken(req, res) {
  try {
    if (req.body.email) {
      const data = await Issued.findByIdAndUpdate(
        { _id: req.body._id },
        { ...req.body },
        { upsert: true }
      );
      res.status(200).json({
        message: "Issue account updated successfully!",
        data,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong, unable to issue account",
      error,
    });
  }
}

async function getMyIssuedToken(req, res) {
  try {
    const allIssuedTokens = await Issued.find({ issuerId: req.params.id})
    res.status(200).json({
      message: "successful",
      data: allIssuedTokens,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong, unable to get issued tokens",
      error,
    });
  }
}

module.exports = {
  createIssuedToken,
  updateIssuedToken,
  getMyIssuedToken,
};

// {
//   "issuerId":"mbiplang.testnet",
//   "fullName": "Mbiplang Ardel",
//   "title": "Flash sale on all bags",
//   "email": "jothamardel@gmail.com",
//   "phone": "",
//   "accountId": "",
//   "tokenId":"1",
//   "expiryDate": "",
//   "metadata_id": "mynewstore.mintspace2.testnet:fc1f8793da7c9e7431c433b0524c06f2",
//   "link": "http://localhost:3000/coupon-details/mynewstore.mintspace2.testnet:fc1f8793da7c9e7431c433b0524c06f2"
// }
