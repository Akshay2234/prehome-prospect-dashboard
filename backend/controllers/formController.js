const FormProgress = require("../models/formProgressModel");

const saveFormProgress = async (req, res) => {
  const { userId, responses } = req.body;

  if (!userId || !Array.isArray(responses)) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    await FormProgress.findOneAndUpdate(
      { userId },
      { $set: { responses } },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Form progress saved" });
  } catch (err) {
    console.error("Error saving form progress:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { saveFormProgress };
