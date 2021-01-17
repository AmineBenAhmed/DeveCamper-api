const asyncHandler = require("../../middlewares/async");
const User = require("../../models/User");

//@desc Get current user
//route GET /api/v1/auth/me
//@access Private
const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  })
});

module.exports = getMe;