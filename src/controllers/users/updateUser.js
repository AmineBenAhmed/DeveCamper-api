const asyncHandler = require("../../middlewares/async");
const User = require("../../models/User");

// @desc     Update user
// @route    PUT /api/v1/users/:id 
// @access   Private/Admin
const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

module.exports = updateUser;