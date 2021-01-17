const asyncHandler = require("../../middlewares/async");
const User = require("../../models/User");
const ErrorResponse = require("../../utils/errorResponse");
const sendTokenResponse = require("../../utils/sendTokenResponse");

//@dec    Update password
//@route  PUT /api/v1/auth/updatepassword
//@access Private
const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  //check current password
  if(!(await user.matchPassword(req.body.currentPassword))){
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res)
});

module.exports = updatePassword;