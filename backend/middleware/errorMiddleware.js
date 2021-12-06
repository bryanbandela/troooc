
const errorValidator = (err) => {
  console.log(err.message, err.code);
  let errors = {email: "", password: "", username: ""};

  if (err.code === 11000) {
    errors.email = "This email/username already exits";
    return errors;
  }

  // validation
  if (err._message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    }); // We want the values(not the keys) and turn them into arrays
  }

  return errors;
};

const notFound = (req, res, next) => {
 const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandle = (err, req, res) => {
const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
}

module.exports = { errorValidator, notFound, errorHandle };
