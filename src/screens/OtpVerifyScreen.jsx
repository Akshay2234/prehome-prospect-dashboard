import React, { useState, useEffect } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom"; // Import useLocation and Navigate
import { Typography, Container, Box, CircularProgress } from "@mui/material";
import logo from "../assets/logo.png";
import CustomTextField from "../components/CustomTextField";
import CustomButton from "../components/CustomButton";
import { otpVerify } from "../apis/authApi";

const OtpVerifyScreen = () => {
  const location = useLocation();
  const { email,_id } = location.state || {}; // Retrieve the email from state

  const [otp, setOtp] = useState(""); // State to store the entered OTP
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(false); // State to handle loading
  const [timer, setTimer] = useState(60); // 60-second timer state
  const navigate = useNavigate(); // For navigation

  // If email is not provided, redirect to AuthScreen
  if (!email) {
    return <Navigate to="/auth" />;
  }

  // Handle OTP Verification API call
  const handleOtpVerification = async () => {
    try {
      // Ensure OTP is entered
      if (!otp) {
        setError("Please enter the OTP.");
        return;
      }

      setLoading(true); // Start loading
      setError(null); // Clear previous errors

      const result = await otpVerify(email, otp); // Call the API with email and OTP
      console.log("OTP Verification Result:", result);

      if (result.status_code) {
        navigate("/signup", { state: { email,_id } });
      } else {
        setError(result.message || "Invalid OTP. Please try again."); // Set error if verification fails
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleOtpVerification();
    }
  };

  // Handle timer countdown
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown); // Clear interval on component unmount
    }
  }, [timer]);

  // Function to handle resend OTP click
  const handleResendOtp = () => {
    setTimer(60); // Reset the timer to 60 seconds
    // TODO: Add function to resend OTP via API here
    console.log("Resending OTP...");
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        flexDirection: { xs: "column", md: "row" },
        margin: "0px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Left Side for Desktop */}
      <Box
        sx={{
          width: { xs: "100%", md: "40%" },
          height: { xs: "100%", md: "100%" },
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding: "20px",
          backgroundColor: "#D9D9D9",
        }}
      >
        <img src={logo} alt="Logo" style={{ height: "70px" }} />
      </Box>

      {/* Right Side for Mobile/Desktop */}
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: "100%", md: "70%" },
          padding: { md: "70px" },
          marginTop: "30px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <Box
            component="img"
            sx={{
              height: "70px",
              display: { xs: "block", md: "none" },
            }}
            alt="logo"
            src={logo}
          />
        </div>

        <Typography
          variant="h5"
          component="h4"
          gutterBottom
          sx={{
            display: "flex",
            fontFamily: "Poppins, sans-serif",
            marginBottom: { xs: "32px" },
          }}
        >
          <Box fontWeight="600" sx={{ fontSize: { xs: "16px", md: "25px" } }}>
            Enter OTP
          </Box>
        </Typography>

        {/* OTP Input */}
        <Typography
          sx={{
            textAlign: "left",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
            fontSize: "12px",
            marginBottom: "8px",
            width: "100%",
          }}
        >
          OTP
        </Typography>

        {/* CustomTextField with OTP input */}
        <CustomTextField
          value={otp}
          onChange={(e) => setOtp(e.target.value)} // Update OTP state
          onKeyPress={handleKeyPress} // Trigger verification on Enter key
          error={!!error}
          helperText={error}
        />

        <Container
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "16px",
          }}
        >
          {timer > 0 ? (
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "400",
                fontSize: { xs: "12px", md: "12px" },
                textDecoration: "underline",
              }}
            >
              Didn’t receive OTP? Resend in {timer}s
            </Typography>
          ) : (
            <Typography
              onClick={handleResendOtp}
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "400",
                fontSize: { xs: "12px", md: "12px" },
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Resend OTP
            </Typography>
          )}
        </Container>

        {/* Show loader when API is in progress */}
        {loading ? (
          <CircularProgress sx={{ marginTop: "16px" }} />
        ) : (
          <CustomButton text="Verify" onClick={handleOtpVerification} />
        )}
      </Container>
    </Box>
  );
};

export default OtpVerifyScreen;
