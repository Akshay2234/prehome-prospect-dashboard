// src/pages/Signup.jsx
import { useState } from "react";
import axios from "axios";
import AuthInput from "../../components/Auth/AuthInput";
import AuthButton from "../../components/Auth/AuthButton";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Step 1: Send OTP
  const sendOtp = async () => {
    try {
      await axios.post('https://prehome-prospect-dashboard.onrender.com/api/auth/send-otp', { email });
      alert('OTP sent to your email');
      setStep(2);
    } catch (error) {
      console.error(error);
      alert('Error sending OTP');
    }
  };

  // Step 2: Verify OTP
  const verifyOtp = async () => {
    try {
      await axios.post('https://prehome-prospect-dashboard.onrender.com/api/auth/verify-otp', { email, otp });
      alert('OTP Verified! Set your password.');
      setStep(3);
    } catch (error) {
      console.error(error);
      alert(error.response.data.message || 'Error verifying OTP');
    }
  };

  // Step 3: Set Password
  const setNewPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      await axios.post('https://prehome-prospect-dashboard.onrender.com/api/auth/register', { email, password });
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert(error.response.data.message || 'Error creating account');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>

      {/* Step 1: Email Entry */}
      {step === 1 && (
        <>
          <AuthInput type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <AuthButton text="Send OTP" onClick={sendOtp} type="button" />
        </>
      )}

      {/* Step 2: OTP Verification */}
      {step === 2 && (
        <>
          <AuthInput type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <AuthButton text="Verify OTP" onClick={verifyOtp} type="button" />
        </>
      )}

      {/* Step 3: Set Password */}
      {step === 3 && (
        <form onSubmit={setNewPassword}>
          <AuthInput type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <AuthInput type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <AuthButton text="Create Account" />
        </form>
      )}
    </div>
  );
};

export default Signup;
