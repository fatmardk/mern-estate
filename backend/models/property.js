const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter the property title"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Please enter the property description"],
    trim: true
  },
  address: {
    type: String,
    required: [true, "Please enter the address"],
    trim: true
  },
  city: {
    type: String,
    required: [true, "Please enter the city"],
    trim: true
  },
  price: {
    type: Number,
    required: [true, "Please enter the price"],
    min: [0, "Price must be a positive number"]
  },
  bedrooms: {
    type: Number,
    required: [true, "Please enter the number of bedrooms"],
    min: [0, "Number of bedrooms cannot be negative"]
  },
  bathrooms: {
    type: Number,
    required: [true, "Please enter the number of bathrooms"],
    min: [0, "Number of bathrooms cannot be negative"]
  },
  image1: {
    type: String,
    required: [true, "Please upload an image"],
    match: [/^https?:\/\/.*\.(jpeg|jpg|gif|png)$/, "Please enter a valid image URL"]
  },
  image2: {
    type: String,
    required: [true, "Please upload an image"],
    match: [/^https?:\/\/.*\.(jpeg|jpg|gif|png)$/, "Please enter a valid image URL"]
  },
  image3: {
    type: String,
    required: [true, "Please upload an image"],
    match: [/^https?:\/\/.*\.(jpeg|jpg|gif|png)$/, "Please enter a valid image URL"]
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: [true, "Please specify the location type"]
    },
    coordinates: {
      type: [Number],
      required: [true, "Please enter the location coordinates"],
      validate: {
        validator: function(value) {
          return value.length === 2 && 
                 typeof value[0] === 'number' && 
                 typeof value[1] === 'number' &&
                 value[0] >= -180 && value[0] <= 180 && // Longitude range
                 value[1] >= -90 && value[1] <= 90;    // Latitude range
        },
        message: "Coordinates must be an array with two numbers: [longitude, latitude]"
      }
    }
  },
  furnished: {
    type: Boolean,
    required: [true, "Please specify if the property is furnished"]
  },
  parking: {
    type: Boolean,
    required: [true, "Please specify if parking is available"]
  },
  security: {
    type: Boolean,
    required: [true, "Please specify if security is available"]
  }
}, {
  timestamps: true
});

const PropertyModel = mongoose.model('Property', propertySchema);

module.exports = PropertyModel;
