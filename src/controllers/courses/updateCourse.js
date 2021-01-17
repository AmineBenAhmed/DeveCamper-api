const asyncHandler = require("../../middlewares/async");
const Course = require("../../models/Course");
const ErrorResponse = require("../../utils/errorResponse");

//@desc update course
//@route PUT /api/v1/courses/:id
//@access Private
module.exports = asyncHandler(async (req, res, next) => {

  let course = await Course.findById(req.params.id)

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`),
      404
    );
  }

  //Make sure user is owner of the bootcamp
  if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update course ${course._id}`,
        401
      )
    );
  }


  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

res.status(200).json({
    success: true,
    data: course
  })

})