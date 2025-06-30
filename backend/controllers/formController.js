const FormProgress = require("../models/formProgressModel");
const Notification = require("../models/notificationModel");

const saveFormProgress = async (req, res) => {
  const { userId, responses } = req.body;

  if (!userId || !Array.isArray(responses)) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    const existing = await FormProgress.findOne({ userId });

    let shouldNotify = false;
    let newPercentage = 0;

    if (existing) {
      const prevCount = existing.responses.length;
      const newCount = responses.length;
      if (newCount > prevCount) {
        shouldNotify = true;
        newPercentage = Math.round((newCount / 7) * 100); // adjust if questions change
      }
    } else {
      shouldNotify = true;
      newPercentage = Math.round((responses.length / 7) * 100);
    }

    await FormProgress.findOneAndUpdate(
      { userId },
      { $set: { responses } },
      { upsert: true, new: true }
    );

    if (shouldNotify && newPercentage > 0) {
      await Notification.create({
        userId,
        message: `Dashboard progress updated to ${newPercentage}%`,
      });
    }

    res.status(200).json({ message: "Form progress saved" });
  } catch (err) {
    console.error("Error saving form progress:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { saveFormProgress };
