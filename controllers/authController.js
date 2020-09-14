const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  let error = { email: "", password: "" };

  //duplicate email found
  if (err.code === 11000) {
    error.email = "that email is already in use";
    return error;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
    //console.log(err);
  }

  if (err.message.includes("incorrect password")) {
    error.password = "That Password is incorrect";
  }

  if (err.message.includes("incorrect email")) {
    error.email = "That Email is not registered";
  }
  return error;
};
const maxAge = 3 * 24 * 60 * 60; //in seconds
const createToken = (id) => {
  return jwt.sign({ id }, "Rehan secret", {
    expiresIn: maxAge,
  });
};
//sign up get method
module.exports.signUp_get = (req, res) => {
  res.render("signup");
};
//sign up post method
module.exports.signUp_post = (req, res) => {
  const { email, password } = req.body;

  User.create({ email, password })
    .then((user) => {
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).send({ user: user._id });
    })
    .catch((error) => {
      const errors = handleErrors(error);
      res.status(400).send(errors);
    });
};
//login get method
module.exports.login_get = (req, res) => {
  res.render("login");
};
//----------------------login post method----------------------------
module.exports.login_post = (req, res) => {
  const { email, password } = req.body;
  User.login(email, password)
    .then((user) => {
      console.log(user);
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).send({ user: user._id });
    })
    .catch((err) => {
      console.log(err.message);
      const errors = handleErrors(err);
      res.status(400).send(errors);
    });
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
