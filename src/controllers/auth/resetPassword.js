const crypto = require('crypto');

const asyncHandler = require("../../middlewares/async");
const User = require('../../models/User');
const ErrorResponse = require('../../utils/errorResponse');
const sendTokenResponse = require('../../utils/sendTokenResponse');

// @desc     Reset password
// @route    PUT /api/v1/auth/resetpassword/:resettoken
// @access   Public
const resetPassword = asyncHandler(async (req, res, next) => {
  //Get hashed token
  const resetPasswordToken = crypto //create the hashed resettoken to find the user
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() } //check if token has expired
  });

  if(!user) {
    return next(new ErrorResponse('Invalid reset password token', 400));
  };

  //set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save(); //in this save the password is modified and that fires the password hash

sendTokenResponse(user, 200, res);
});

module.exports = resetPassword;