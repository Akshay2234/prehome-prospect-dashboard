const mongoose = require("mongoose");

const userActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Property"
  },
  shortlisted: {
    type: Boolean,
    default: false
  },
  visitDate: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ["Interested", "Visit Scheduled", "Visited"],
    default: ""
  }
});

module.exports = mongoose.model("UserActivity", userActivitySchema);
