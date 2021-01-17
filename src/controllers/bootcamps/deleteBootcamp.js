const asyncHandler = require('../../middlewares/async');
const Bootcamp = require('../../models/bootcamp');
const ErrorResponse = require('../../utils/errorResponse');

//@desc delete bootcamp
//@route DELETE /api/v1/bootcamps/:id
//@access Private
const deleteBootcamp = asyncHandler(async (req, res, next) => {
  // try { replaced by asyncHandler
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }

      //Make sure user is owner of the bootcamp
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this bootcamp`,
        401
      )
    );
  }

    bootcamp.remove();

    res
      .status(200)
      .json({
        success: true,
        data: {}
      });
  // } catch (err) {
  //   // res
  //   //   .status(400)
  //   //   .json({ success: false });
  //   next(err);
  // }
})

module.exports = deleteBootcamp;
