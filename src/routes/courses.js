const express = require('express');

const {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courses');

const Course = require('../models/Course');
const advancedResults = require('../middlewares/advancedResults');
const { protect } = require('../middlewares/auth');
const { authorize } = require('../middlewares/authorize');
const { PUBLISHER, ADMIN } = require('../enums/roles');

const router =  express.Router({ mergeParams: true }); //merge parent route params with childs parmas

router
  .route('/')
  .get(advancedResults(Course, {
    path: 'bootcamp',
    select: 'name description'
  }), getAllCourses)
  .post(protect, authorize(PUBLISHER, ADMIN), addCourse)

router
  .route('/:id')
  .get(getCourse)
  .put(protect, authorize(PUBLISHER, ADMIN), updateCourse)
  .delete(protect, authorize(PUBLISHER, ADMIN), deleteCourse)

module.exports = router;
