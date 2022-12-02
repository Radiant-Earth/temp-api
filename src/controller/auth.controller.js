const { User } = require('../model/auth.model');
const bcrypt = require('bcryptjs');

async function httpCreateNewUser(req, res) {
  const { fullName, email, phone, password } = req.body;
 
  if (!fullName || !email || !phone || !password) {
    return res.status(400).json({
      message: `Field(s) missing. ${(!fullName && 'fullName ') || (!email && 'email ') || (!phone && 'phone ')|| (!password && 'password')}`,
      success: false
    })
  }
  try {

    bcrypt.hash(password, 8, async function(err, hash) {
      const user = new User({
        fullName,
        email,
        phone,
        password: hash
    });

    await user.save();
    return res.status(201).json({
      message: 'User successfully created!',
      success: true
    });

  })
    
  } catch (error) {
    console.log(error.message);

    return res.status(400).json({
      message: 'Unsuccessful!',
      success: false
    })

  }
}

async function httpLoginUser(req, res) {
  const {  email, password } = req.body;
 
  if ( !email || !password) {
    return res.status(400).json({
      message: `Field(s) missing. ${(!email && 'email ') || (!password && 'password')}`,
      success: false
    })
  }
  try {
    
    const findUser = await User.findOne({ email });
    
    if (!findUser) {
      return res.status(404).json({
        message: `Unable to login, create an account.`,
        success: false
      });
    }

    bcrypt.compare(password, findUser.password, function(err, response) {
      if (err) {
        return res.status(400).json({
          message: 'Unsuccessful!',
          success: false
        });
      }

      return res.status(200).json({
        data: findUser,
        message: 'Login successful!',
        success: response
      })
    });

    
    // return res.status(201).json({
    //   message: 'User successfully created!',
    //   success: true
    // });

    
  } catch (error) {
    console.log(error.message);

    return res.status(400).json({
      message: 'Unsuccessful!',
      success: false
    })

  }
}


module.exports = { httpCreateNewUser, httpLoginUser }



// async function deleteCoupon(req, res) {
//   const id = req.params.id

//   try {
//     const coupon = await Koopon.findOneAndDelete({ _id: id })
//     console.log('Deleted coupon ========> ', coupon);
//     if (!coupon) {
//       return res.status(404).json({
//         message: 'coupon doesn\'t exist!'
//       })
//     }
//     return res.status(200).json({
//         message: 'successful!',
//     })

//   } catch (error) {
//     res.status(400).json({
//         message: 'Something went wrong!'
//     })
//   }

// }