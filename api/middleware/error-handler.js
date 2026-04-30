const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("../errors");

// const errorHandlerMiddleware = (err, req, res, next) => {
//   let customError = {
//     //default
//     statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
//     message: "Something went wrong, try again later",
//   };
//   if (err instanceof CustomAPIError) {
//     return res.status(err.statusCode).json({ msg: err.message });
//   } else {
//     return res
//       .status(customError.statusCode)
//       .json({ msg: customError.message });
//   }
// };

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong, try again later",
  };
  res.status(customError.statusCode).json({ msg: customError.message });
};
module.exports = errorHandlerMiddleware;
