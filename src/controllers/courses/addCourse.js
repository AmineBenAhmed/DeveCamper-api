const asyncHandler = require("../../middlewares/async");
const Course = require("../../models/Course");
const Bootcamp = require("../../models/bootcamp");
const ErrorResponse = require("../../utils/errorResponse");

//@desc Add course
//@route POST /api/v1/bootcamps/:bootcampId/courses
//@access Private
module.exports = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId )

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`),
      404
    );
  };

  console.log(req.user.role);

  //Make sure user is owner of the bootcamp
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a course to bootcamp ${req.params.bootcampId}`,
        401
      )
    );
  }

  const course = await Course.create(req.body)

  return res.status(201).json({
    success: true,
    data: course
  })

})