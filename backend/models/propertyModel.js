const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  tags: {
    type: [String], // For 3-4 tags like "Balcony View", "Option 1"
    required: false,
  },
images: [
  {
    url: String,        // Optional if using URL
    label: String,      // Descriptive text
    filename: String,   // For uploaded image file name
  }
],

  features: {
    interior: [String], // Interior features array
    exterior: [String], // Exterior features array
    basement: {
      type: String, // 'Finished' or 'Unfinished'
      enum: ["Finished", "Unfinished"],
    },
  },
  generalInfo: {
    propertyAddress: String,
    propertyType: String,
    yearBuilt: Number,
    squareFootage: String,
    numberOfBedrooms: Number,
    numberOfBathrooms: Number,
    numberOfFloors: Number,
  },
  location: String, // For location summary
radius: {
    type: Number,
    default: 1000,
  },
});

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
