const asyncHandler = require('../../middlewares/async');
const Bootcamp = require('../../models/bootcamp');
const ErrorResponse = require('../../utils/errorResponse');

//@desc create new bootcamp
//@route POST /api/v1/bootcamps
//@access Private
const createBootcamp = asyncHandler(async (req, res, next) =>   {
  //Add user to req.body
  req.body.user = req.user.id;

  //Check for published bootcamp
  const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });

  //If the user is not admin, they can only add one boocamp
  if(publishedBootcamp && req.user.role !== 'admin') {
    return next(new ErrorResponse(`The user with ID ${req.user.id} has already publisjed a bootcamp`, 400));
  }

  const data = await Bootcamp.create(req.body)

  res
    .status(201)
    .json({
      success: true,
      data
    });
})

module.exports = createBootcamp;
