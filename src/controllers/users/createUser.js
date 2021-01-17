const asyncHandler = require("../../middlewares/async");
const User = require("../../models/User");

// @desc     Create user
// @route    POST /api/v1/users
// @access   Private/Admin
const createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
});

module.exports = createUser;