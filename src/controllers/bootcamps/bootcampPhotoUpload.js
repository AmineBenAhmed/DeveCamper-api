const path = require('path');

const asyncHandler = require("../../middlewares/async");
const Bootcamp = require("../../models/bootcamp");
const ErrorResponse = require("../../utils/errorResponse");

const bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(
      new ErrorResponse(`Please upload a file`, 400)
    );
  }

  const file = req.files.file;

  //Make sure the uploaded file is image
  if(!file.mimetype.startsWith('image')) { // in the mimetype if the uploaded file is image it starts with image/...
    return next(
      new ErrorResponse(`Please upload an image`, 400)
    );
  }

  //Check filesize
  if(file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400)
    );
  }

  //create custom filename
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`; //the 'path.parse(file.name).ext' return the file extension  

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => { //the 'mv()' function will move the file to a specified path
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500))
    }

    //Make sure user is owner of the bootcamp
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.params.id} is not authorized to update this bootcamp`,
          401
        )
      );
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
  })
  res.status(200).json({
    success: true,
    data: file.name
  })

});

module.exports = bootcampPhotoUpload;