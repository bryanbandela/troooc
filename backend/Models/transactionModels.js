const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId,
        required: true, ref: 'User'},
  type: {type: String, required: true},
  category: {type: String, required: true},
  name: {type: String, required: true},
  amount: {type: Number, required: true},
  
}, {
    timestamps: true,
  });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;