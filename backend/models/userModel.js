const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },
  password: { type: String, required: function () { return !this.isGoogleUser && !this.facebookId; } },
  isGoogleUser: { type: Boolean, default: false },
  facebookId: { type: String, unique: true, sparse: true },
  isBlocked: { type: Boolean, default: false }, // ✅ added
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
