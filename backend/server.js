const express = require('express');
const app = express();
const connect = require('./config/db.js');
const userRoutes = require('./Routes/userRoutes');
const transactionRoutes = require('./Routes/transactionRoutes');
const budgetRoutes = require('./Routes/budgetRoutes');
const tipRoutes = require('./Routes/tipRoutes');
const { notFound, errorHandle } = require('./middleware/errorMiddleware');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

connect();

app.use(express.json());

// ** MIDDLEWARE ** //
const whitelist = [
  'http://localhost:3000',
  'http://localhost:8080',
  'https://troooc.heroku.com',
];
const corsOptions = {
  origin: function (origin, callback) {
    console.log('** Origin of request ' + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log('Origin acceptable');
      callback(null, true);
    } else {
      console.log('Origin rejected');
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/tips', tipRoutes);

app.use(notFound);
app.use(errorHandle);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  console.log('The directory is', __dirname);
  console.log('The directory path is', path.join(__dirname, '/frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API running ...');
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App listening to port ${port}`);
});

// Ideally connect DB first then server
