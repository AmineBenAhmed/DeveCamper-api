const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middlewares/async');
const User = require('../../models/User');

//@desc Register user
//route POST /api/v1/auth/register
//@access Public

const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //create user
  const user = await User.create({
    name,
    email,
    password,
    role
  });

  //Create token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

module.exports = register;