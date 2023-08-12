const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const User = require("../models/userModel");

module.exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res
    .status(200)
    .json({ status: "success", results: users.length, date: users });
});

module.exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError("No user exists", 404));

  res.status(200).json({ status: "success", date: user });
});

module.exports.updateUser = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      firstName,
      lastName,
      email,
    },
    { new: true, runValidators: true }
  );

  if (!user) return next(new AppError("No user exists", 404));

  res.status(200).json({ status: "success", date: user });
});

module.exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) return next(new AppError("No user exists", 404));

  res.status(204).json({ status: "success" });
});
