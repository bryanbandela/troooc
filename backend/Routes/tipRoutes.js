const express = require('express');
const { readTips, submitTip } = require('../Controllers/tipControllers');
const protect = require('../middleware/authMiddleware.js');
const router = express.Router();

router.route('/').get(protect, readTips).post(protect, submitTip);

module.exports = router;
