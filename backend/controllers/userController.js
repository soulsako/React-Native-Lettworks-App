const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const _filterObj = (reqObj, ...allowedFields) => {
  const newObj = {};
  Object.keys(reqObj).forEach(el => {
    if(allowedFields.includes(el)) newObj[el] = reqObj[el];
  });
  return newObj;
}

exports.updateMe = catchAsync( async (req, res, next) => {
  
  // 1) Create error if user posts password data
  const { password, confirmPassword, name } = req.body;
  if(password || confirmPassword) return next(new AppError('This route is not for password updates. Please use /updatepassword'));

  //Filter out unwanted fields from req.body
  const filteredObj = _filterObj(req.body, 'name', 'email');
  // 2) Update user document // We can use findOneAndUpdate since we are not dealing with passwords
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredObj, {
    new: true, 
    runValidators: true
  });
  res.status(200).json({
    status: 'success', 
    data: {
      user:updatedUser
    }
  });
});

exports.deleteMe = catchAsync( async (req, res, nect) => {

  await User.findByIdAndUpdate(req.user.id, {isActive: false});
  res.status(204).json({
    status: 'success',
    message: 'User deleted successfuly.', 
    data: null
  });
});

exports.allUsers = catchAsync(async (req, res, next) => {

  //This is where the properties are actually saved in the properties varibale
  const users = await User.find();
  res.status(201).json({
    status: 'success', 
    users,
    message: 'Fetched all users successfuly!'
  });
});

exports.user = catchAsync(async (req, res) => {
  res.json({
    message: `here is the user with id: ${req.params.id}`
  });
});

exports.updateUser = catchAsync( async (req, res) => {
  res.json({
    message: `here is the user updated with id: ${req.params.id}`
  });
});

exports.deleteUser = catchAsync( async (req, res) => {
  res.json({
    message: `here is the user deleted with id: ${req.params.id}`
  });
});