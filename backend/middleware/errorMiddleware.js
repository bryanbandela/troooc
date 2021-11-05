
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

module.exports = { errorValidator };
