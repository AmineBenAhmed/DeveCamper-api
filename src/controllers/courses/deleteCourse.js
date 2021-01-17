const asyncHandler = require("../../middlewares/async");
const Course = require("../../models/Course");
const ErrorResponse = require("../../utils/errorResponse");

//@desc delte course
//@route DELETE /api/v1/courses/:id
//@access Private
module.exports = asyncHandler(async (req, res, next) => {

  const course = await Course.findById(req.params.id)

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
        `User ${req.user.id} is not authorized to delete course ${course._id}`,
        401
      )
    );
  }

  course.remove(); 

  res.status(200).json({
    success: true,
    data: {}
  })

})