const asyncHandler = require('../../middlewares/async');
const Bootcamp = require('../../models/bootcamp')

//@desc get all bootcamps
//@route GET /api/v1/bootcamps
//@access public
const getBootcamps = asyncHandler(async (req, res, next) => {

    res
      .status(200)
      .json(res.advancedResults);
});

module.exports = getBootcamps;


