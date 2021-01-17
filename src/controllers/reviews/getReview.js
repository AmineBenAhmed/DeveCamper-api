const asyncHandler = require("../../middlewares/async");
const Review = require("../../models/Review");
const ErrorResponse = require("../../utils/errorResponse");

// @desc      Get single review
// @route     GET /api/v1/reviews/:id
// @access    Public
const getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description'
  });

  if(!review) {
    return next(new ErrorResponse(`No review found with the id of ${req.params.id}`,
    404));
  }

  res.status(200).json({
    success: true,
    data: review
  })
});

module.exports = getReview;