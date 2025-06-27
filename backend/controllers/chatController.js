const Chat = require('../models/chatModel');

const saveChat = async (req, res) => {
  const { userId, messages } = req.body;

  if (!userId || !messages || !Array.isArray(messages)) {
    return res.status(400).json({ message: "userId and messages are required" });
  }

  try {
    await Chat.create({ userId, messages });
    res.status(200).json({ message: "Chat saved successfully" });
  } catch (error) {
    console.error("Save chat error:", error);
    res.status(500).json({ message: "Failed to save chat" });
  }
};

module.exports = { saveChat };
