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
      url: String, // Image URL
      label: String, // For image description like "Balcony View", "Option 1", etc. (These labels appear on the second page)
    },
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
  mapUrl: String, // Property map image
});

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
