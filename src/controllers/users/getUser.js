const asyncHandler = require("../../middlewares/async");
const User = require("../../models/User");

// @desc     Get single user
// @route    GET /api/v1/users/:id
// @access   Private/Admin
const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

module.exports = getUser;