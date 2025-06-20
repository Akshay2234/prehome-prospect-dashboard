const express = require('express');
const router = express.Router();
const Session = require('../models/sessionModel');

// Save Chat Progress
router.post('/save-chat', async (req, res) => {
  try {
    const { userId, chatHistory } = req.body;

    let session = await Session.findOne({ userId });
    if (!session) {
      session = new Session({ userId, chatHistory, formData: {} }); // Set chatHistory directly
    } else {
      session.chatHistory = chatHistory;
    }

    await session.save();
    res.status(200).json({ message: 'Chat saved successfully' });
  } catch (error) {
    console.error('Error saving chat:', error);
    res.status(500).json({ error: 'Failed to save chat' });
  }
});

// Save Form Progress
router.post('/save-form', async (req, res) => {
  try {
    const { userId, formData } = req.body;

    let session = await Session.findOne({ userId });
    if (!session) {
      session = new Session({ userId, chatHistory: [], formData }); // Set formData directly
    } else {
      session.formData = formData;
    }

    await session.save();
    res.status(200).json({ message: 'Form saved successfully' });
  } catch (error) {
    console.error('Error saving form:', error);
    res.status(500).json({ error: 'Failed to save form' });
  }
});

// Get Session Progress
router.get('/get-session/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const session = await Session.findOne({ userId });

    if (session) {
      res.status(200).json(session);
    } else {
      res.status(404).json({ message: 'Session not found' });
    }
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({ error: 'Failed to fetch session' });
  }
});

module.exports = router;
