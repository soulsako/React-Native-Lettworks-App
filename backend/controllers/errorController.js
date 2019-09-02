const AppError = require('./../utils/appError');

const sendErrorProd = (err, res) => {
  //Operational, trusted error: send message to client
  if(err.isOperational){
    res.status(err.statusCode).json({
      status: err.status, 
      message: err.message, 
    });
  //Programming or other unknown error: i,e third party package error
  }else {
    //Log the error
    console.error('Error ', err);

    //Send generic message
    res.status(500).json({
      status: 'error', 
      message: 'We Apologise. Server is currently down. Please try again later.'
    });
  }
}

const sendErrorDev = (err, res) => {

  res.status(err.statusCode).json({
    status: err.status, 
    message: err.message,
    error: err,
    stack: err.stack, 
  });
}

const handleCastErrorDB = err => {
  const message = `Cast error. Invalid path: ${err.path} with value: ${err.value[err.path]}.`
  return new AppError(message, 400);
}

const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `The field with value: ${value} already exists. Please try a different value`;
  return new AppError(message, 400);
}

const handleValidationErrorDB = err => {
  
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
}

const handleJWTError = () => new AppError('Invalid token. Please try logging in again', 401);
const handleTokenExpired = () => new AppError('Login time out. Please login in again', 401);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if(process.env.NODE_ENV === 'development'){
    sendErrorDev(err, res);
  }else if(process.env.NODE_ENV === 'production'){
    let error = {...err};
    if(error.name === 'CastError') error = handleCastErrorDB(error);
    if(error.code === 11000) error = handleDuplicateFieldsDB(error);
    if(error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if(error.name === 'JsonWebTokenError') error = handleJWTError();
    if(error.name === 'TokenExpiredError') error = handleTokenExpired();
    sendErrorProd(error, res);
  }
}