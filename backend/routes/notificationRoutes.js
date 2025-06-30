const express = require("express");
const router = express.Router();
const Notification = require("../models/notificationModel");

// GET /api/notifications/:userId
router.get("/:userId", async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
