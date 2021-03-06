const asyncHandler = require("../../middlewares/async");
const Review = require("../../models/Review");

// @dec        Get reviews
// @route      GET /api/v1/bootcamps/:bootcampId/reviews
// @access     Public
const getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    })
  } else {
    res.status(200).json(res.advancedResults);
  }
});

module.exports = getReviews;