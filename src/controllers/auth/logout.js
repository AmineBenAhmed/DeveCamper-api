const asyncHandler = require("../../middlewares/async");
const User = require("../../models/User");

//@desc user logout / clear cookie
//route GET /api/v1/auth/logout
//@access Private
const logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 *1000),
    httpOnly: true
  })

  res.status(200).json({
    success: true,
    data: {}
  })
});

module.exports = logout;