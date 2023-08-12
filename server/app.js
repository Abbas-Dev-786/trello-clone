const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
const BASE = "/api/v1";

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(`${BASE}/auth`, authRouter);
app.use(`${BASE}/users`, userRouter);
app.use(`${BASE}/tasks`, taskRouter);

app.all("*", (req, _, next) => {
  next(new AppError(`Route ${req.originalUrl} does not exists`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
