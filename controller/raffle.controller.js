const Raffle = require("../model/raffle.model");



async function httpCreateNewRaffle(req, res) {
  const { author, title, description, start_date, end_date } = req.body;
 
  if (!author || !title || !description || !start_date || !end_date ) {
    return res.status(400).json({
      message: `All fields are required`,
      success: false
    })
  }


  try {
    const newRaffle = new Raffle(
      ...req.body
    )

    await newRaffle.save();

    res.status(201).json({
      data: newRaffle,
      message: 'created successfully!',
      success: true
    })
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: 'unable to create raffle',
      success: false,
      error: error.message
    })
  }

}
function httpGetRaffles(req, res) {
  
}
function httpGetSingleRaffle(req, res) {
  
}
function httpDeleteRaffle(req, res) {
  
}


module.exports = {
  httpCreateNewRaffle,
  httpGetRaffles,
  httpGetSingleRaffle,
  httpDeleteRaffle
}