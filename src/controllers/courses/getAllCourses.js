const asyncHandler = require('../../middlewares/async');
const Course = require('../../models/Course');

//@desc Get all courses
//@route GET /api/v1/courses
//@route GET /api/v1/:bootcampId/courses
//@access Public

const getAllCourses = asyncHandler(async (req, res, next) => {

  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    })
  } else {
    res.status(200).json(res.advancedResults);
  }
});

module.exports = getAllCourses;
