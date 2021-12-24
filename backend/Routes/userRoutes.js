const express = require('express');
const protect = require('../middleware/authMiddleware.js');
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  logoutUser,
} = require('../Controllers/userControllers');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router
  .route('/profile')
  .get(protect, logoutUser)
  .patch(protect, updateUser)
  .delete(protect, deleteUser);

module.exports = router;
