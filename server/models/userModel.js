const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      min: 3,
      max: 15,
      required: [true, "User must have first name"],
    },
    lastName: {
      type: String,
      trim: true,
      min: 3,
      max: 15,
      required: [true, "User must have last name"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      max: 30,
      validate: [isEmail, "Email must be valid"],
      required: [true, "User must have email"],
    },
    password: {
      type: String,
      trim: true,
      min: 8,
      max: 15,
      select: false,
      required: [true, "User must have password"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePasswords = async function (
  enteredPassword,
  storedPassword
) {
  return await bcrypt.compare(enteredPassword, storedPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
