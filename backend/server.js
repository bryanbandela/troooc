const express = require('express');
const app = express();
const connect = require('./config/db.js');
const userRoutes = require('./Routes/userRoutes');
const transactionRoutes = require('./Routes/transactionRoutes');
const budgetRoutes = require('./Routes/budgetRoutes');
const tipRoutes = require('./Routes/tipRoutes');
const { notFound, errorHandle } = require('./middleware/errorMiddleware');
const cors = require('cors');

require('dotenv').config();

connect();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/tips', tipRoutes);

app.use(notFound);
app.use(errorHandle);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App listening to port ${port}`);
});

// Ideally connect DB first then server
