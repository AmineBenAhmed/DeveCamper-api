const asyncHandler = require("../../middlewares/async");
const User = require("../../models/User");

// @desc     Delete user
// @route    DELETE /api/v1/users/:id 
// @access   Private/Admin
const deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});

module.exports = deleteUser;