const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please enter email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Enter valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter password"],
    minlength: [6, "Min pass length is 6 char"],
  },
});

//fire function after document saved in database
userSchema.post("save", (doc, next) => {
  next();
});

//fire a function before a doc was saved into db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();

  //"this" refers to the "User" object in normal function. theirfore we have have access to email and password property
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await User.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
