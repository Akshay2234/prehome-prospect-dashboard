const express = require("express");
const router = express.Router();
const UserActivity = require("../models/UserActivity");
const Notification = require("../models/notificationModel");

// POST: Save or update user activity (only user-allowed fields)
router.post("/save", async (req, res) => {
  const { userId, propertyId, shortlisted, visitDate, status } = req.body;

  if (!userId || !propertyId) {
    return res.status(400).json({ error: "Missing userId or propertyId" });
  }

  try {
    let activity = await UserActivity.findOne({ userId, propertyId });
    const changes = [];

    if (activity) {
      if (!activity.shortlisted && shortlisted) changes.push("Property Shortlisted");
      if (!activity.visitDate && visitDate) changes.push(`Visit Scheduled on ${new Date(visitDate).toDateString()}`);
      if (status && activity.status !== status) changes.push(`Status changed to ${status}`);

      activity.shortlisted = shortlisted ?? activity.shortlisted;
      activity.visitDate = visitDate ?? activity.visitDate;
      activity.status = status ?? activity.status;

      await activity.save();
    } else {
      activity = await UserActivity.create({
        userId,
        propertyId,
        shortlisted: shortlisted ?? false,
        visitDate: visitDate ?? null,
        status: status ?? ""
      });

      if (shortlisted) changes.push("Property Shortlisted");
      if (visitDate) changes.push(`Visit Scheduled on ${new Date(visitDate).toDateString()}`);
      if (status) changes.push(`Status: ${status}`);
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


// GET: Fetch specific user activity
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

// PATCH: Admin only – update status to 'visited'

// PATCH: Update any allowed status from admin
router.patch("/status", async (req, res) => {
  const { userId, propertyId, status } = req.body;

  const allowedStatuses = ["Interested", "Visit Scheduled", "Visited"];

  if (!userId || !propertyId) {
    return res.status(400).json({ message: "Missing userId or propertyId" });
  }

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: `Invalid status value: ${status}` });
  }

  try {
    let activity = await UserActivity.findOne({ userId, propertyId });

    if (!activity) {
      activity = await UserActivity.create({ userId, propertyId, status });
    } else {
      activity.status = status;
      await activity.save();
    }

    await Notification.create({ userId, message: `Status changed to ${status}` });

    res.status(200).json({ message: "Status updated", activity });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
