const express = require('express');

const {
  getUser,
  getUsers,
  updateUser,
  createUser,
  deleteUser
} = require('../controllers/users');

const User = require('../models/User');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middlewares/advancedResults');
const { protect } = require('../middlewares/auth');
const { authorize } = require('../middlewares/authorize');

const { ADMIN } = require('../enums/roles')

//all routes below these two lines will use 'protect' and 'authorize' middlewares
router.use(protect);
router.use(authorize(ADMIN));

router
  .route('/')
  .get(advancedResults(User), getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
