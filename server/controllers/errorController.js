const sendDevError = (err, res) => {
  return res.status(err.status).json({
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
    return res.status(err.status).json({
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

module.exports = function (err, req, res, next) {
  err.statusCode ||= 400;
  err.status ||= "fail";

  if (process.env.NODE_ENV === "dev") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "prod") {
    let error = Object.assign(err);

    sendProdError(error, res);
  }
};
