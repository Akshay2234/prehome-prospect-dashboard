import React, { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom"; // For navigation and receiving email from previous screen
import { Typography, Container, Box, CircularProgress } from "@mui/material";
import logo from "../assets/logo.png";
import CustomTextField from "../components/CustomTextField";
import CustomButton from "../components/CustomButton";
import { passwordVerified } from "../apis/authApi"; // Import the API method

const LoginWithPasswordScreen = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation
  const { _id } = location.state || {}; // Retrieve the email from state
  const [password, setPassword] = useState(''); // Store password
  const [error, setError] = useState(null); // For error handling
  const [loading, setLoading] = useState(false); // For showing loading state

  if (!_id) {
    return <Navigate to="/auth" />; // Redirect to auth if no email is passed
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    // Clear previous errors
    setError(null);

    // Check if password is provided
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    // Proceed with API call if validation is successful
    try {
      setLoading(true); // Start loading
      const response = await passwordVerified(_id, password);

      // Handle response based on the API's response
      if (response.status_code && (response.data.converted==null && response.data.role==1)) {
        // Save JWT token from response in localStorage
        localStorage.setItem('authToken', response.confirmationToken);
        localStorage.setItem('user_id', response.data._id);

        // Navigate to the homepage
        navigate('/');
      } else {
        setError("You are not a Prospect Buyer or Prospect Owner. Please sign up first.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
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
            fontFamily: "Poppins, sans-serif",
            marginBottom: { xs: '32px' }
          }}
        >
          <Box fontWeight="600" sx={{ fontSize: { xs: "16px", md: "25px" } }}>
            Log In With Prehome
          </Box>
        </Typography>

        {/* Password Input */}
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
            onKeyPress={handleKeyPress} // Trigger button click on "Enter" key press
            type="password" // Password input type
          />
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
          <CustomButton text="Log In" onClick={handleLogin} />
        )}

        {/* Forgot Password */}
        <Container
          disableGutters
          sx={{
            marginTop: "24px",
            border: "none",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
              fontSize: { xs: "12px", md: "12px" },
              textDecoration: "underline",
            }}
          >
            Forgot Password
          </Typography>
        </Container>
      </Container>
    </Box>
  );
};

export default LoginWithPasswordScreen;
