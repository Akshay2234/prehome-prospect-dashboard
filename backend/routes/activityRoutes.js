const express = require("express");
const router = express.Router();
const UserActivity = require("../models/UserActivity");
const Notification = require("../models/notificationModel");

router.post("/save", async (req, res) => {
  const { userId, propertyId, shortlisted, visitDate } = req.body;

  try {
    let activity = await UserActivity.findOne({ userId, propertyId });
    const changes = [];

    if (activity) {
      if (!activity.shortlisted && shortlisted) changes.push("Property Shortlisted");
      if (!activity.visitDate && visitDate) {
        changes.push(`Visit Scheduled on ${new Date(visitDate).toDateString()}`);
      }

      activity.shortlisted = shortlisted ?? activity.shortlisted;
      activity.visitDate = visitDate ?? activity.visitDate;
      await activity.save();
    } else {
      changes.push("Property Shortlisted");
      if (visitDate) changes.push(`Visit Scheduled on ${new Date(visitDate).toDateString()}`);
      activity = await UserActivity.create({ userId, propertyId, shortlisted, visitDate });
    }

    for (const change of changes) {
      await Notification.create({ userId, message: change });
    }

    res.status(200).json(activity);
  } catch (error) {
    console.error("Error saving user activity:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:userId/:propertyId", async (req, res) => {
  const { userId, propertyId } = req.params;

  try {
    const activity = await UserActivity.findOne({ userId, propertyId });
    res.status(200).json(activity || {});
  } catch (error) {
    console.error("Error fetching user activity:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
