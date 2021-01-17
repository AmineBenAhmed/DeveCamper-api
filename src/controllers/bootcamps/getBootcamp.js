const asyncHandler = require('../../middlewares/async');
const Bootcamp = require('../../models/bootcamp');
const ErrorResponse = require('../../utils/errorResponse');

//@desc get single bootcamp
//@route GET /api/v1/bootcamps/:id
//@access public
const getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await (await Bootcamp.findById(req.params.id))
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
  }

  return res
    .status(200)
    .json({
      success: true,
      data: bootcamp
    });
});

module.exports = getBootcamp;
