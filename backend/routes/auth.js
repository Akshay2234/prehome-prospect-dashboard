const express = require('express');
const router = express.Router();
const {
  sendOtp, verifyOtp, registerUser, loginUser,
  googleLogin, facebookLogin, setPassword,
  forgotPassword, verifyResetOtp, resetPassword
} = require('../controllers/authController');

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google-login', googleLogin);
router.post('/facebook-login', facebookLogin);
router.post('/set-password', setPassword);

router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-otp', verifyResetOtp);
router.post('/reset-password', resetPassword);

module.exports = router;
