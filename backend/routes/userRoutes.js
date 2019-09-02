const express = require('express');
const userController = require('../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotpassword', authController.forgotPassword);
router.patch('/resetpassword/:token', authController.resetPassword);
router.patch('/updatepassword', authController.isAuthenticated, authController.updatePassword);

router.patch('/updateme', authController.isAuthenticated, userController.updateMe);
router.delete('/deleteme', authController.isAuthenticated, userController.deleteMe);
  
//Will be used by admins
router
  .route('/')
  .get(userController.allUsers);

router
  .route('/:id')
  .get(userController.user)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;