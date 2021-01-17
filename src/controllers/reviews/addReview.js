const asyncHandler = require("../../middlewares/async");
const Review = require("../../models/Review");
const Bootcamp = require("../../models/bootcamp");
const ErrorResponse = require("../../utils/errorResponse");

// @desc      Add review
// @route     POST /api/v1/bootcamps/:bootcampId/reviews
// @access    Public
const addReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId,
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if(!bootcamp) {
    return next(
      new ErrorResponse(
        `No bootcamp with id of ${req.params.bootcampId}`,
        404
      )
    );
  };

  const review = await Review.create(req.body);

  res.status(200).json({
    success: true,
    data: review
  })
});

module.exports = addReview;