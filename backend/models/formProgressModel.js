const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  questionId: Number,
  question: String,
  answer: String,
});

const formProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  responses: [responseSchema],
}, { timestamps: true });

module.exports = mongoose.model("FormProgress", formProgressSchema);
