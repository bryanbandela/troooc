const express = require('express');
const { getBudgets, getBudget, createBudget, updateBudget, deleteBudget } = require('../Controllers/budgetControllers');
const protect = require("../middleware/authMiddleware.js");
const router = express.Router();

router.route('/').get(protect, getBudgets).post(protect, createBudget);
router.route('/:id').get(protect, getBudget).patch(protect, updateBudget).delete(protect, deleteBudget);

module.exports = router;