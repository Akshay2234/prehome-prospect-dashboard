import React, { useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { Typography, Container, Box, Checkbox, CircularProgress } from "@mui/material";
import logo from "../assets/logo.png";
import CustomTextField from "../components/CustomTextField";
import CustomButton from "../components/CustomButton";
import { passwordVerified } from "../apis/authApi"; // Import the API method

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const SignUpPasswordScreen = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation
  const { _id } = location.state || {}; // Retrieve the email from state
  const [password, setPassword] = useState(''); // Store password
  const [confirmPassword, setConfirmPassword] = useState(''); // Store re-entered password
  const [checkboxChecked, setCheckboxChecked] = useState(false); // Checkbox state
  const [error, setError] = useState(null); // For error handling
  const [loading, setLoading] = useState(false); // For showing loading state

  if (!_id) {
    return <Navigate to="/auth" />;
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setCheckboxChecked(e.target.checked);
  };

  const handleSignUp = async () => {
    // Clear previous errors
    setError(null);

    // Validate checkbox
    if (!checkboxChecked) {
      setError("Please accept Terms and Conditions to continue.");
      return;
    }

    // Validate password
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check password length (at least 8 characters)
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    // Proceed with API call if validation is successful
    try {
      setLoading(true); // Start loading
      const response = await passwordVerified(_id, password);

      // Handle response based on the API's response
      if (response.status_code) {
        // Save JWT token from response in localStorage
        localStorage.setItem('authToken', response.confirmationToken);
        localStorage.setItem('user_id', response.data._id);
        
        // Navigate to the homepage
        navigate("/convert-new-user", { state: { _id: response.data._id } });
      } else {
        setError(response.message || "An error occurred during sign-up.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        flexDirection: { xs: "column", md: "row" },
        margin: "0px",
        fontFamily: "Poppins, sans-serif", // Apply Poppins font globally
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
          padding: "40px 0 0 40px",
          backgroundColor: "#D9D9D9",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ width: "102px", height: "78.05px" }}
        />
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
        {/* Title */}
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
            fontFamily: "Poppins, sans-serif", // Apply Poppins font
            marginBottom: { xs: '32px' }
          }}
        >
          <Box fontWeight="600" sx={{ fontSize: { xs: "16px", md: "25px" } }}>
            Sign Up With Prehome
          </Box>
        </Typography>

        {/* Password Input */}
        <Typography
          sx={{
            textAlign: "left", // Align to left
            fontFamily: "Poppins, sans-serif", // Apply Poppins font
            fontWeight: "bold", // Bold
            fontSize: "12px", // 12px font size
            marginBottom: "8px", // Margin bottom of 8px
            width: "100%", // To ensure full width
          }}
        >
          Password
        </Typography>
        <Container
          disableGutters
          sx={{
            marginBottom: "24px",
            border: "none",
          }}
        >
          <CustomTextField
            value={password}
            onChange={handlePasswordChange}
            type="password" // Password input type
          />
          <Typography sx={{ marginTop: "8px" }}>
            <Box fontWeight="400" sx={{ fontSize: { xs: "10px", md: "12px" } }}>
              Password must be at least 8 characters long and must contain a mix
              of uppercase and lowercase letters, numbers, and symbols.
            </Box>
          </Typography>
        </Container>

        {/* Re Enter Password */}
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
          Re-Enter Password
        </Typography>
        <Container
          disableGutters
          sx={{
            border: "none",
          }}
        >
          <CustomTextField
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            type="password" // Password input type
          />
        </Container>

        {/* Checkbox */}
        <Container
          disableGutters
          sx={{
            marginBottom: "24px",
            border: "none",
            display: "flex",
            gap: "12px",
            alignItems: "flex-start", // Align items at the top
          }}
        >
          <Checkbox
            {...label}
            sx={{ paddingTop: '0px', paddingLeft: '0px' }}
            checked={checkboxChecked}
            onChange={handleCheckboxChange}
          />
          <Typography>
            <Box fontWeight="400" sx={{ fontSize: { xs: "14px", md: "14px" } }}>
              I agree with Prehome's <Typography sx={{ fontSize: { xs: "14px", md: "14px" }, textDecoration: 'underline' }} display="inline">Terms of Service, Privacy Policy,</Typography> and
              default <Typography sx={{ fontSize: { xs: "14px", md: "14px" }, textDecoration: 'underline' }} display="inline">Notification Settings.</Typography>
            </Box>
          </Typography>
        </Container>

        {/* Error Message */}
        {error && (
          <Typography color="error" sx={{ marginBottom: "16px" }}>
            {error}
          </Typography>
        )}

        {/* Continue Button */}
        {loading ? (
          <CircularProgress />
        ) : (
          <CustomButton text="Sign Up" onClick={handleSignUp} />
        )}
      </Container>
    </Box>
  );
};

export default SignUpPasswordScreen;
