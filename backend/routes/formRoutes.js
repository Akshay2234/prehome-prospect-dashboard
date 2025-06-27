const express = require("express");
const router = express.Router();
const { saveFormProgress } = require("../controllers/formController");
const FormProgress = require('../models/formProgressModel');

router.post("/save-progress", saveFormProgress);
const mongoose = require("mongoose");

// GET route to load saved progress
router.get("/load-progress/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Convert to ObjectId if necessary
    const objectId = mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : userId;

    const data = await FormProgress.findOne({ userId: objectId });

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(200).json({ responses: [] });
    }
  } catch (err) {
    console.error("Load progress error:", err);
    res.status(500).json({ message: "Failed to load progress" });
  }
});


module.exports = router;
