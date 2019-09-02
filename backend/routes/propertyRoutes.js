const express = require('express');
const propertyController = require('../controllers/propertyController');
const authController = require('./../controllers/authController');
 
const router = express.Router();

//Middleware only runs if param id exists // val contains the param value
// router.param('id', checkID);

router
  //Alias route i.e a route that is very often used and therefore the queries can be hardcoded
  .route('/top-properties')
  .get(propertyController.bestProperties, propertyController.allProperties);

router
  .route('/')
  .get(authController.isAuthenticated, propertyController.allProperties)
  .post(propertyController.newProperty);

router
  .route('/:id')
  .get(propertyController.property)
  .patch(propertyController.updateProperty)
  .delete(authController.isAuthenticated, 
          authController.restrictTo('admin'), 
          propertyController.deleteProperty);

module.exports = router;