import {
  Divider,
  Typography,
  Container,
  IconButton,
  Box,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import icon from "./logo.png";
import ViewPropButton from "../components/ViewPropButton";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { useState } from "react";
import axios from "axios";

const LoginSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotMessage, setForgotMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_id", response.data.userId);
      navigate("/application-screen");
    } catch (error) {
      alert(error?.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const response = await axios.post("http://localhost:5000/api/auth/google-login", { email: decoded.email });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_id", response.data.userId);
      localStorage.setItem("user_email", decoded.email);
      if (response.data.isGoogleAccount) {
        navigate("/set-password");
      } else {
        navigate("/application-screen");
      }
    } catch {
      alert("Google Login failed");
    }
  };

  const handleFacebookResponse = async ({ data }) => {
    try {
      const fbResponse = await axios.post("http://localhost:5000/api/auth/facebook-login", {
        userID: data.id
      });
      localStorage.setItem("token", fbResponse.data.token);
      localStorage.setItem("user_id", fbResponse.data.userId);
      navigate("/application-screen");
    } catch {
      alert("Facebook Login Failed");
    }
  };

  const handleForgotSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email: forgotEmail });
      setForgotMessage(res.data.message || "OTP sent to email");
      setForgotStep(2);
    } catch {
      setForgotMessage("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-reset-otp", { email: forgotEmail, otp });
      setForgotMessage(res.data.message || "OTP verified");
      setForgotStep(3);
    } catch {
      setForgotMessage("Invalid OTP");
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/reset-password", { email: forgotEmail, password: newPassword });
      setForgotMessage(res.data.message || "Password reset successfully");
      setTimeout(() => {
        setShowForgot(false);
        setForgotStep(1);
        setForgotMessage("");
        setForgotEmail("");
        setOtp("");
        setNewPassword("");
      }, 2000);
    } catch {
      setForgotMessage("Failed to reset password");
    }
  };

  return (
    <Box className="main-box-login">
      {!showForgot ? (
        <Container maxWidth="xs" className="login-container">
          <div className="img-container">
            <img src={icon} alt="logo" style={{ height: "100px", margin: "5% 0" }} />
          </div>

          <Typography variant="h5" gutterBottom>
            <Box className="login-heading">Log In or Sign Up With Prehome</Box>
          </Typography>

          <Box className="login-btn-cotainer">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => alert("Google login failed")}
              width="330"
            />

            <Box mt={2}>
              <LoginSocialFacebook
                appId="997130395950749"
                onResolve={handleFacebookResponse}
                onReject={() => alert("Facebook Login Failed")}
              >
                <FacebookLoginButton text="Continue With Facebook" />
              </LoginSocialFacebook>
            </Box>
          </Box>

          <Divider className="login-divider" sx={{ my: 3 }}>Or</Divider>

          <p className="login-mail-text">Email Id</p>
          <TextField
            className="login-textfield"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />

          <p className="login-mail-text">Password</p>
          <TextField
            className="login-textfield"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          <Link onClick={() => setShowForgot(true)} className="login-link">
            Forgot Password
          </Link>

          <ViewPropButton
            style={{ width: "358px" }}
            text="Continue"
            onClick={handleLogin}
          />

          <p>
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="signup-link">Sign Up</Link>
          </p>
        </Container>
      ) : (
        <Container maxWidth="xs" className="login-container">
          <Typography variant="h5" gutterBottom>
            Forgot Password
          </Typography>

          {forgotStep === 1 && (
            <>
              <TextField
                className="login-textfield"
                type="email"
                placeholder="Enter Email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                fullWidth
              />
              <ViewPropButton
                style={{ width: "358px" }}
                text="Send OTP"
                onClick={handleForgotSubmit}
              />
            </>
          )}

          {forgotStep === 2 && (
            <>
              <TextField
                className="login-textfield"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                fullWidth
              />
              <ViewPropButton
                style={{ width: "358px" }}
                text="Verify OTP"
                onClick={handleVerifyOtp}
              />
            </>
          )}

          {forgotStep === 3 && (
            <>
              <TextField
                className="login-textfield"
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
              />
              <ViewPropButton
                style={{ width: "358px" }}
                text="Reset Password"
                onClick={handleResetPassword}
              />
            </>
          )}

          <Typography sx={{ mt: 2, color: "blue", textAlign: "center" }}>
            {forgotMessage}
          </Typography>

          <p style={{ textAlign: "center" }}>
            <span
              onClick={() => {
                setShowForgot(false);
                setForgotStep(1);
                setForgotEmail("");
                setOtp("");
                setNewPassword("");
                setForgotMessage("");
              }}
              style={{ cursor: "pointer", color: "#1976d2", textDecoration: "underline" }}
            >
              Back to Login
            </span>
          </p>
        </Container>
      )}
    </Box>
  );
};

export default LoginSignup;
