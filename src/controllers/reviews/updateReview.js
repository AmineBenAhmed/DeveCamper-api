const { ADMIN } = require("../../enums/roles");
const asyncHandler = require("../../middlewares/async");
const Review = require("../../models/Review");
const ErrorResponse = require("../../utils/errorResponse");

// @desc      Update review
// @route     PUT /api/v1/reviews/:id
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id)

  if (!review) {
    return next(new ErrorResponse(`No review found with the id of ${req.params.id}`,
      404));
  }

  //Manage permissions
  //Make sure review belongs to user or user is admin
  if(review.user.toString() !== req.user.id && req.user.role !== ADMIN){
    return next(
      new ErrorResponse(
        'Not authorized to update review',
        404
      )
    )
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: review
  })
});
