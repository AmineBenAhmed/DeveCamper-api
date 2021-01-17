const asyncHandler = require("../../middlewares/async");
const User = require("../../models/User");
const ErrorResponse = require("../../utils/errorResponse");
const sendTokenResponse = require("../../utils/sendTokenResponse");

//@desc Login user
//route POST /api/v1/auth/login
//@access Public
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //Validate email & password
  if(!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400))
  }

  //Check for user
  const user = await User.findOne({ email }).select('+password'); //because we put in the schema 'select: false' when user returned it will be without password but here we need it to be returned in the document to be used to match passwords therefore we add 'select('+password')' to be selected

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  //Check if password matches
  const isMatch = await user.matchPassword(password);

  if(!isMatch) {
    return next(new ErrorResponse('Invalid creedentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

module.exports = login;