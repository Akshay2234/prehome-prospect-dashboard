// models/sessionModel.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  chatHistory: { type: Array, default: [] },
  formData: { type: Object, default: {} },
});

module.exports = mongoose.model('Session', sessionSchema);
