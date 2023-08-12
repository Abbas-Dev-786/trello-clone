const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const Task = require("../models/taskModel");

module.exports.createTask = catchAsync(async (req, res, next) => {
  const task = await Task.create(req.body);

  res.status(201).json({ status: "success", data: task });
});

module.exports.getAllTasks = catchAsync(async (req, res, next) => {
  // const tasks = await Task.aggregate([
  //   {
  //     $group: {
  //       _id: "$type",
  //       tasks: { $push: "$$ROOT" },
  //     },
  //   },
  //   { $sort: { _id: -1 } },
  // ]);

  // tasks.reduce((acc, cur) => cur.tasks.length + acc, 0);
  const tasks = await Task.find({}).sort({ createdAt: 1 });

  res.status(200).json({ status: "success", results: tasks.length, tasks });
});

module.exports.getTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) return next(new AppError("task does not exists", 404));

  res.status(200).json({ status: "success", data: task });
});

module.exports.updateTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true, runValidators: true }
  );

  if (!task) return next(new AppError("task does not exists", 404));

  res.status(200).json({ status: "success", data: task });
});

module.exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) return next(new AppError("task does not exists", 404));

  res.status(204).json({ status: "success" });
});
