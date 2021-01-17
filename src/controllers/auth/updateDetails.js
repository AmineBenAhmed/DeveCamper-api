const asyncHandler = require("../../middlewares/async");
const User = require("../../models/User");

// @desc   Update user details
// @route  PUT /api/v1/auth/updatedetails
// @access Private
const updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate , {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  })
});

module.exports = updateDetails;