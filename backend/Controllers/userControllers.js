const User = require('../Models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken.js');
const { errorValidator } = require('../middleware/errorMiddleware.js');

//@description  Register a new user
//@route        POST /api/users/register
//@access       Public
const registerUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const doesUserExist = await User.findOne({ email });
    if (doesUserExist) {
      res.status(400);
      throw new Error('User already exists');
    }
    const createUser = await User.create({
      username: username,
      email: email,
      password: password, //hash method in userModels
    });
    if (createUser) {
      res.status(201).json({
        id: createUser._id,
        email: createUser.email,
        username: createUser.username,
        token: generateToken(createUser._id),
      });
    }
  } catch (error) {
    console.log(error);
    const err = errorValidator(error);
    res.status(400).json({ err });
  }
};

//@description  Login a new user
//@route        POST /api/users/login
//@access       Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      res.status(400).json({ message: 'User does not exist' });
      throw new Error('User does not exist');
    }
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (passwordMatch) {
      res.status(201).json({
        id: foundUser._id,
        email: foundUser.email,
        username: foundUser.username,
        accessToken: generateToken(foundUser._id),
      });
    } else {
      res.status(401).json({ message: 'Wrong password!' });
    }
  } catch (error) {
    console.log(error);
    const err = errorValidator(error);
    res.status(400).json({ err });
  }
};

//@description  Update profile
//@route        PUT /api/users/profile
//@access       Private
const updateUser = async (req, res) => {
  console.log('About to update user', req.user);
  const user = await User.findById(req.user);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

//@description  Delete profile
//@route        DELETE /api/users/profile
//@access       Private
const deleteUser = async (req, res) => {
  const reqUser = await User.findById(req.user);
  if (reqUser) {
    const user = await User.findById(req.body.username);
    if (user) {
      await user.remove();
      res.json({ message: 'User removed' });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  }
};

module.exports = { registerUser, loginUser, updateUser, deleteUser };
