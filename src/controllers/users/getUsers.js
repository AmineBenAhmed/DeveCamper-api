const asyncHandler = require("../../middlewares/async");

// @desc     Get all users
// @route    GET /api/v1/users
// @access   Private/Admin
const getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

module.exports = getUsers;