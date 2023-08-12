const AppError = require("../utils/AppError");

const sendDevError = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    name: err.name,
    code: err.code,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log("ERROR 💥💥💥\n", err);

    return res.status(500).json({
      status: "error",
      message: "something went really wrong 😓",
    });
  }
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((e) => e.message);
  return new AppError(`Something is missing => ${errors.join(", ")}.`, 400);
};

module.exports = function (err, req, res, next) {
  err.statusCode ||= 400;
  err.status ||= "fail";

  if (process.env.NODE_ENV === "dev") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "prod") {
    let error = Object.assign(err);

    // if(err.code === 11000) error =
    if (err.name === "ValidationError") error = handleValidationError(err);
    // if(err.name === "") error =
    // if(err.name === "") error =
    // if(err.name === "") error =

    sendProdError(error, res);
  }
};
