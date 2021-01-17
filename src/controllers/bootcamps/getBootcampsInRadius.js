const asyncHandler = require('../../middlewares/async');
const Bootcamp = require('../../models/bootcamp');
const geocoder = require('../../utils/geocoder');

//@desc get bootcamps within a radius
//@route GET /api/v1/bootcamps/radius/:zipcode/:distance/:unit
//@access Private


const getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  const unit = req.params.unit || 'kilometers';

  //Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  //calc radius using radius
  //Divide dist by radius of earth
  //Earth Radius = 3,963 mi / 6,378 km
  let radius;
  if(unit === 'miles') {
    radius = distance / 3963.2
  } else {
    radius = distance / 6378;
  }

  const bootcamps = await Bootcamp.find({
    location: { //must contain type 'Point', 'Polygon'... and coordinates [lng, lat]
      $geoWithin: {
        $centerSphere: [[lng, lat], radius]
      }
    }
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  })

});

module.exports = getBootcampsInRadius;


