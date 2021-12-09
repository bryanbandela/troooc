const jwt = require('jsonwebtoken');
const User = require('../Models/userModels.js');

const protect = async (req, res, next) => {
  console.log('About to auth User');
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; //Bearer Token
  console.log('token from frontend', token);
  if (!token) {
    throw new Error('Unauthorized, no token');
    return res.status(401).json({ message: 'Access denied. Please log in!' }); //unauthorized
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded);
    req.user = decoded.id;
    // req.user = await User.findById(decoded.id).select('-password'); //except the password
    next();
  } catch (error) {
    console.log('Error in backend auth process', error);
    throw new Error('Not authorized, token failed');
    res.status(401).json({ accessToken: null });
  }
};

module.exports = protect;
// When I add bracket the app crashes
