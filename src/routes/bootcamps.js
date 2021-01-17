const express = require('express');
const router = express.Router();

const getBootcamps = require('../controllers/bootcamps/getBootcamps')
const getBootcamp = require('../controllers/bootcamps/getBootcamp')
const createBootcamp = require('../controllers/bootcamps/createBootcamp')
const updateBootcamp = require('../controllers/bootcamps/updateBootcamp');
const deleteBootcamp = require('../controllers/bootcamps/deleteBootcamp');
const getBootcampsInRadius = require('../controllers/bootcamps/getBootcampsInRadius');
const bootcampPhotoUpload  = require('../controllers/bootcamps/bootcampPhotoUpload');

const advancedResults = require('../middlewares/advancedResults');
const Bootcamp = require('../models/bootcamp');

//Include other resources router
const courseRouter = require('./courses');
const reviewRouter = require('./review');
const { protect } = require('../middlewares/auth');
const { authorize } = require('../middlewares/authorize');

//Import roles
const { PUBLISHER, ADMIN } = require('../enums/roles');

//Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter); //any route contains the form of '/:bootcampId/courses' will be redirected to course routes
router.use('/:bootcampId/reviews', reviewRouter);//any route contains the form of '/:bootcampId/reviews' will be redirected to review routes

//bootcamp routes
router
  .route('/radius/:zipcode/:distance/:unit?')
  .get(getBootcampsInRadius);

//upload photo
router
  .route('/:id/photo')
  .put(protect, authorize(PUBLISHER, ADMIN), bootcampPhotoUpload)

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize(PUBLISHER, ADMIN), createBootcamp)

router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize(PUBLISHER, ADMIN), updateBootcamp)
  .delete(protect, authorize(PUBLISHER, ADMIN), deleteBootcamp)

// router.get('/', getBootcamps);

// router.get('/:id', getBootcamp);

// router.post('/', createBootcamp);

// router.put('/:id', updateBootcamp);

// router.delete('/:id', deleteBootcamp);

module.exports = router;

