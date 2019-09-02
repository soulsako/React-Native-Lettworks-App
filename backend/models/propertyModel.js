const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({

  rent: {
    type: Number, 
    required: [true, 'Property rent is required']
  },
  bedrooms: {
    type: Number, 
    required: [true, 'Number of bedrooms required'], 
  },
  propertyType: {
    type: String,
    required: [true, 'Property type in required'],
  },
  address: {
    type: String, 
    required: [true, 'Property address is required'], 
    unique: true
  },
  bathrooms: {
    type: Number, 
    required: [true, 'Property bathroom is required']
  },
  furnished: {
    type: Boolean, 
    required: [true, 'Please sepecify property is furnished or unfurnished']
  },
  lettingDuration: {
    type: Number,
    default: 365
  }, 
  secretProperty: {
    type: Boolean, 
    default: false
  }, 
  rentDiscount: {
    type: Number,
    validate: {
      //PLEASE NOTE: validation function will not run when the doc is UPDATED 
      validator: function(val){
        return val < this.rent;
      }, 
      message: 'Rent discount must be less than rent'
    }
  }
  // lettingType: {
  //   type: String,
  // }, 
  // dateAvailable: {
  //   type: String, 
  //   default: 'TBC'
  // },
  // deposit: {
  //   type: Number, 
  //   required: true
  // },
  // keyFeatures: {
  //   type: Array
  // },
  // description: {
  //   type: String
  // },
  // energyCertificate: {
  //   type: Boolean, 
  //   default: true
  // },
  // rating: {
  //   type: Number, 
  //   default: 0
  // }, 

}, {
  toJSON: {virtuals: true}, 
  toObject: {virtuals: true}
});

// //Virtual properties -- Not saved in the database -- created on the fly when getting docs from collection
// propertySchema.virtual('lettingDurationWeeks').get(function(){
//   return Math.floor(this.lettingDuration / 7);
// });

//DOCUMENT MIDDLEWARE - runs before a save() and create() but not insertMany() is saved in the collection 
// propertySchema.pre('save', function(next){
//   //this -- refers to the current document 
//   //We can addd property like this
//   // this.someProp = value
//   next();
// });

// //Document middleware - runs after a document is saved in the collection
// propertySchema.post('save', function(doc, next) {
//   // console.log(doc);
//   next();
// });

//QUERY middleware
// propertySchema.pre('find', function(next){
//   //this referes to the query object, hence we can chain methods to it
//   this.find({secretProperty: {$ne: true}});
//   next();
// });

//Query middleware - runs after the query has finsihed - we have access to all the docs
// propertySchema.post('find', function(docs, next){
//   console.log(docs);
//   next();
// });

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;