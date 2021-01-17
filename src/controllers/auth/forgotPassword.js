const asyncHandler = require("../../middlewares/async");
const User = require('../../models/User');
const ErrorResponse = require("../../utils/errorResponse");
const sendEmail = require("../../utils/sendEmail");

// @desc     Forgot password
// @route    POST /api/v1/auth/forgotpasswored
// @access   Public
const forgotPassword = asyncHandler(async (req ,res ,next) => {
  const user = await User.findOne({ email: req.body.email });

  if(!user) {
    return next(
      new ErrorResponse('There is no user with that email', 404)
    );
  }

  //Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  //Create reset url
  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;  //url from which user reset password

  const message = `You are receiving this email because you (or someone else) has requested
  the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: req.body.email,
      subject: 'Password reset token',
      message
    });


    res.status(200).json({
      success: true,
      data: 'Email sent'
    })
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

module.exports = forgotPassword;