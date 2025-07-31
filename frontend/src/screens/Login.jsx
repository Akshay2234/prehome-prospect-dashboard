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
import { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import icon from "../assets/logo.png";
import ViewPropButton from "../components/ViewPropButton";

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

  const apiBase = "https://prehome-prospect-dashboard.onrender.com/api/auth";

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiBase}/login`, { email, password });
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
      const response = await axios.post(`${apiBase}/google-login`, {
        email: decoded.email,
      });
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
      const fbResponse = await axios.post(`${apiBase}/facebook-login`, {
        userID: data.id,
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
      const res = await axios.post(`${apiBase}/forgot-password`, {
        email: forgotEmail,
      });
      setForgotMessage(res.data.message || "OTP sent to email");
      setForgotStep(2);
    } catch {
      setForgotMessage("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(`${apiBase}/verify-reset-otp`, {
        email: forgotEmail,
        otp,
      });
      setForgotMessage(res.data.message || "OTP verified");
      setForgotStep(3);
    } catch {
      setForgotMessage("Invalid OTP");
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await axios.post(`${apiBase}/reset-password`, {
        email: forgotEmail,
        password: newPassword,
      });
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
    <Box className="main-box-login" sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Container maxWidth="xs" className="login-container" sx={{ padding: 4, backgroundColor: "white", borderRadius: "16px", boxShadow: 3 }}>
        <div className="img-container" style={{ textAlign: "center" }}>
          <img src={icon} alt="logo" style={{ height: "100px", margin: "5% 0" }} />
        </div>
        <Typography variant="h5" gutterBottom textAlign="center">
          {showForgot ? "Forgot Password" : "Log In or Sign Up With Prehome"}
        </Typography>

        {!showForgot ? (
          <>
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => alert("Google login failed")}
              />

              <LoginSocialFacebook
                appId="997130395950749"
                onResolve={handleFacebookResponse}
                onReject={() => alert("Facebook Login Failed")}
              >
                <FacebookLoginButton text="Continue With Facebook" />
              </LoginSocialFacebook>
            </Box>

            <Divider sx={{ my: 3 }}>Or</Divider>

            <Typography className="login-mail-text">Email</Typography>
            <TextField
              fullWidth
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Typography className="login-mail-text">Password</Typography>
            <TextField
              fullWidth
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 1 }}
            />

            <Box textAlign="right">
              <Link onClick={() => setShowForgot(true)} className="login-link">
                Forgot Password?
              </Link>
            </Box>

            <ViewPropButton text="Continue" onClick={handleLogin} style={{ width: "100%" }} />

            <Typography textAlign="center" mt={2}>
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="signup-link">
                Sign Up
              </Link>
            </Typography>
          </>
        ) : (
          <>
            {forgotStep === 1 && (
              <>
                <Typography className="login-mail-text">Enter your email</Typography>
                <TextField
                  fullWidth
                  type="email"
                  placeholder="Email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <ViewPropButton text="Send OTP" onClick={handleForgotSubmit} style={{ width: "100%" }} />
              </>
            )}
            {forgotStep === 2 && (
              <>
                <Typography className="login-mail-text">Enter OTP</Typography>
                <TextField
                  fullWidth
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <ViewPropButton text="Verify OTP" onClick={handleVerifyOtp} style={{ width: "100%" }} />
              </>
            )}
            {forgotStep === 3 && (
              <>
                <Typography className="login-mail-text">Enter New Password</Typography>
                <TextField
                  fullWidth
                  type="password"
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <ViewPropButton text="Reset Password" onClick={handleResetPassword} style={{ width: "100%" }} />
              </>
            )}

            <Typography textAlign="center" mt={2} color="primary">{forgotMessage}</Typography>

            <Typography textAlign="center" mt={2}>
              <span
                onClick={() => {
                  setShowForgot(false);
                  setForgotStep(1);
                  setForgotEmail("");
                  setOtp("");
                  setNewPassword("");
                  setForgotMessage("");
                }}
                style={{ color: "#1976d2", cursor: "pointer", textDecoration: "underline" }}
              >
                Back to Login
              </span>
            </Typography>
          </>
        )}
      </Container>
    </Box>
  );
};

export default LoginSignup;
