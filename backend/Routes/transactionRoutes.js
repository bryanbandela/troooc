const express = require('express');
const { getTransactions, getTransaction, createTransaction, updateTransaction, deleteTransaction } = require('../Controllers/transactionControllers');
const protect = require("../middleware/authMiddleware.js");
const router = express.Router();

router.route('/').get(protect, getTransactions).post(protect, createTransaction);
router.route('/:id').get(protect, getTransaction).patch(protect, updateTransaction).delete(protect, deleteTransaction);

module.exports = router;