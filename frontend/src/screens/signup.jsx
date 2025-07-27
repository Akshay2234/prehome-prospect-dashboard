import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const steps = ["Enter Email", "Verify OTP", "Set Password"];

const Signup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendOtp = async () => {
    setLoading(true);
    try {
      await axios.post("/api/auth/send-otp", { email });
      setActiveStep(1);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      await axios.post("/api/auth/verify-otp", { email, otp });
      setActiveStep(2);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const setNewPassword = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/auth/set-password", { email, password });
      setError("");
      alert("Signup successful!");
      setActiveStep(0);
      setEmail("");
      setOtp("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={sendOtp}
              disabled={loading || !email}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : "Send OTP"}
            </Button>
          </>
        );
      case 1:
        return (
          <>
            <TextField
              fullWidth
              label="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={verifyOtp}
              disabled={loading || !otp}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : "Verify OTP"}
            </Button>
          </>
        );
      case 2:
        return (
          <>
            <TextField
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={setNewPassword}
              disabled={loading || !password || !confirmPassword}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : "Set Password"}
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          Signup
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 3 }}>{renderStepContent()}</Box>
        {error && (
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Signup;
