const express = require('express');
const router = express.Router();
const { saveChat } = require('../controllers/chatController');

router.post('/save-chat', saveChat);

module.exports = router;
