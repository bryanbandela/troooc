const express = require('express');
const app = express();
const connect = require('./config/db.js');
const userRoutes = require('./Routes/userRoutes');
const transactionRoutes = require('./Routes/transactionRoutes');
const protect = require('./middleware/authMiddleware');

require('dotenv').config();

connect();

app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

const port = process.env.PORT;

app.listen(port, () => {
console.log(`App listening to port ${port}`);
});

// Ideally connect DB first then server
