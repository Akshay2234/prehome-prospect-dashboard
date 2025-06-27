const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true }, // optional now
  password: { type: String, required: function () { return !this.isGoogleUser && !this.facebookId; } },
  isGoogleUser: { type: Boolean, default: false },
  facebookId: { type: String, unique: true, sparse: true }, // new field for Facebook users
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
