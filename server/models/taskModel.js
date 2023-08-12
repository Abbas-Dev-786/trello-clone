const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      trim: true,
      max: 50,
      required: [true, "Task is mandatory"],
    },
    type: {
      type: String,
      enum: {
        values: ["todo", "progress", "completed"],
        message: "type must be a todo, progress or completed",
      },
      required: [true, "task must have a type"],
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "Task must be created by a user"],
    },
  },
  { timestamps: true }
);

taskSchema.pre("findOne", function (next) {
  this.populate({ path: "createdBy", select: "firstName lastName" });

  next();
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
