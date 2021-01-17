const asyncHandler = require('../../middlewares/async');
const Bootcamp = require('../../models/bootcamp');
const ErrorResponse = require('../../utils/errorResponse');

//@desc update bootcamp
//@route PUT /api/v1/bootcamps/:id
//@access Private
const updateBootcamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
  }

  //Make sure user is owner of the bootcamp
  if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this bootcamp`,
        401
        )
      );
  }

  bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  res
    .status(200)
    .json({
      success: true,
      data: bootcamp
    });
})

module.exports = updateBootcamp;
