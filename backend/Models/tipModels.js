const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Tip = mongoose.model('tip', tipSchema);

module.exports = Tip;
