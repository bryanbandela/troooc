const mongoose = require('mongoose');
const express = require('express');
const app = express();

const connect = async () => {
  try {
    const connectDB = await mongoose.connect(process.env.MONGO_URI);
    if (connectDB) {
      console.log('DB connected');
    }
  } catch (error) {
    console.log('DB failed to connect', error);
    process.exit(1);
  }
};

module.exports = connect;
