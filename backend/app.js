const express = require('express');
const morgan = require('morgan');
const app = express();
const propertyRouter = require('./routes/propertyRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const errorController = require('./controllers/errorController');
//Third-party middlewares
app.use(express.json());
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}
//Middleware to serve static files
//app.use(express.static(pass directory path where the static files live))

//Test middleware 
app.use((req, res, next) => {
  
  next();
});

//Application middlewares
app.use('/api/v1/properties', propertyRouter);
app.use('/api/v1/users', userRouter);

//If a request is not consumed by any route, all verbs will result in a response with error
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find endpoint: ${req.originalUrl}`, 404));
});

app.use(errorController);

module.exports = app;