const express = require('express');

const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview
} = require('../controllers/reviews');

const Review = require('../models/Review');
const advancedResults = require('../middlewares/advancedResults');
const { protect } = require('../middlewares/auth');
const { authorize } = require('../middlewares/authorize');
const { ADMIN, USER } = require('../enums/roles');

const router = express.Router({ mergeParams: true }); //merge parent route params with childs parmas

router
  .route('/')
  .get(advancedResults(Review, {
    path: 'bootcamp',
    select: 'name description'
  }), getReviews)
  .post(protect, authorize(ADMIN, USER), addReview)

router
  .route('/:id')
  .get(getReview)
  .put(protect, authorize(USER, ADMIN), updateReview)
  .delete(protect, authorize(USER, ADMIN), deleteReview)

module.exports = router;
