const asyncHandler = require("../../middlewares/async");
const Course = require("../../models/Course");
const ErrorResponse = require("../../utils/errorResponse");

//@desc Get a single course
//@route GET /api/v1/courses/:id
//@access Public
module.exports = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description'
  });

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`),
      404
    );
  }

  return res.status(200).json({
    success: true,
    data: course
  })

})