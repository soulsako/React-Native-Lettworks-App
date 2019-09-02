const Property = require('../models/propertyModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.bestProperties = (req, res, next) => {

  req.query = { 
    bedrooms: {gte: 2},
    rent: {lte: 1000}
  }
  next();
}

exports.allProperties = catchAsync(async (req, res, next) => {

    const features = new APIFeatures(Property.find(), req.query)
      .filter()
      .sort()
      .fields()
      .pagination();
    //This is where the properties are actually saved in the properties varibale
    const properties = await features.query;
    res.status(201).json({
      status: 'success', 
      properties,
      message: 'Fetched all properties successfuly!'
    });
});

exports.newProperty = catchAsync(async (req, res, next) => {
 
    const newProperty = await Property.create(req.body);
    res.status(200).json({
      status: 'success', 
      property: newProperty,
      message: 'Your property is now live!'
  });
});

exports.property = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    const property = await Property.findById(id);

    //Mongoose will return null if no docs are found, hence we create our own error message
    //PLEASE NOTE: We do not handle general mongoose errors like duplication or validation errors with the AppError class
    if(!property){
      return next(new AppError('Error. Please check ID and try again', 404));
    }
    res.status(201).json({
      status: 'success', 
      property,
      message: 'Single property available'
  });
});

exports.updateProperty = catchAsync(async (req, res, next) => {
  
  const id = req.params.id;
  
  const property = await Property.findByIdAndUpdate(id, req.body, {
    new: true, 
    runValidators: true
  });

  if(!property){
    return next(new AppError('Error. Please check ID and try again', 404));
  }
  res.status(201).json({
    status: 'success', 
    property,
    message: 'Property updated successfuly!'
  });
  
});

exports.deleteProperty = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  
  const property = await Property.findByIdAndDelete(id);

  if(!property){
    return next(new AppError('Error. Please check ID and try again', 404));
  }
  res.status(204).json({
    status: 'success', 
    message: 'Property deleted successfuly!'
  });
});


