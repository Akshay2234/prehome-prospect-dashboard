const UserSession = require('../models/sessionModel');

// Save chat messages
exports.saveChat = async (req, res) => {
  const { userId, message, sender } = req.body;

  let session = await UserSession.findOne({ userId });
  if (!session) {
    session = await UserSession.create({ userId });
  }

  session.chats.push({ message, sender });
  await session.save();

  res.json({ success: true, session });
};

// Save form progress
exports.saveFormProgress = async (req, res) => {
  const { userId, step, formData } = req.body;

  let session = await UserSession.findOne({ userId });
  if (!session) {
    session = await UserSession.create({ userId });
  }

  session.formProgress = { step, formData };
  await session.save();

  res.json({ success: true, session });
};

// Get current session
exports.getSession = async (req, res) => {
  const { userId } = req.params;

  const session = await UserSession.findOne({ userId });
  if (!session) return res.json({ success: true, session: null });

  res.json({ success: true, session });
};
