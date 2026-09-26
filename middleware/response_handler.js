import { validationResult } from "express-validator";

const response_Handler = (statusCode,message,data,res)=>{

   return res.status(statusCode).json({
    status: statusCode,
    message: message,
    data: data
  });
}

const custom_Error = (message = "internal error",statusCode = 500) => {
  
  const newError = new Error(message);
  newError.statusCode = statusCode;
  throw newError;
};

const globalError_Middleware = (error, request, response, next) => {
  const statusCode = error.statusCode || 500;
  console.log("error :", error.message, statusCode, error);
  response.status(statusCode).json({
    status: statusCode,
    message: error.message,
    error : String(error)
  });
}; 


const validate = (validations) => {

    return [
        ...validations,

        (req, res, next) => {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
              return res.status(400).json({
                status: 400,
                success: false,
                message: "Validation failed",
                errors: errors.array().map((err) => ({
                  field: err.path,
                  message: err.msg,
                })),
              });
            }

            next();
        }
    ];
};


export {
    validate,
    custom_Error,
    globalError_Middleware,
    response_Handler
};
