import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Divider,
  Typography,
  Container,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io";
import logo from "../assets/logo.png";
import CustomTextField from "../components/CustomTextField";
import CustomButton from "../components/CustomButton";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { addUser, ContinueWithGmail } from "../apis/authApi";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleContinueClick = async () => {
    try {
      setError(null); // Clear previous errors
      if (!email) {
        setError("Please enter a valid email address.");
        return;
      }
      setLoading(true); // Set loading to true before making API call

      // Call the API to check if the user exists
      const response = await addUser(email);
      console.log(response);

      // Navigate with email as state
      if (response.status_code) {
        navigate("/verify", { state: { email,_id:response.data._id } }); // Send email to OtpVerifyScreen
      } else {
        navigate("/login", { state: { _id:response.data._id } }); // Send email to Login Password if user exists
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after the API call is done
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleContinueClick();
    }
  };

  const handleGoogleSignInSuccess = async (tokenResponse) => {
    try {
      setLoading(true);
      // Exchange the access token for user information
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenResponse.access_token}`
      );
      const user = res.data;

      // Use the user information or send it to your backend API for further processing
      console.log("User Info:", res.status);
      if(res.status==200){
        const GoogleApiResp = await ContinueWithGmail(user.email,user.name,user.verified_email);

        if(GoogleApiResp.status_code){
          localStorage.setItem('authToken', GoogleApiResp.confirmationToken);
          navigate("/");
        }
        else{
          setError(GoogleApiResp.message);
        }
      }

      // Redirect to the desired screen after successful Google sign-in
      
    } catch (error) {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSignInSuccess,
    onError: () => {
      setError("Google sign-in was unsuccessful. Please try again.");
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        flexDirection: { xs: "column", md: "row" },
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "40%" },
          height: "100%",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          backgroundColor: "#D9D9D9",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            padding: "40px 0 0 40px",
            width: "102px",
            height: "78.05px",
          }}
        />
      </Box>

      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: "100%", md: "60%" },
          padding: { md: "0px 70px" },
          marginTop: { xs: "30px", md: "0" },
          marginLeft: { xs: "0px", md: "220px" },
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <Box
            component="img"
            sx={{
              width: "102px",
              height: "78.05px",
              display: { xs: "block", md: "none" },
            }}
            alt="logo"
            src={logo}
          />
        </div>

        <Typography variant="h5" component="h4" gutterBottom>
          <Box
            fontWeight="600"
            sx={{
              fontSize: { xs: "20px", md: "32px" },
              fontFamily: "Poppins, sans-serif",
              textAlign: "center",
            }}
          >
            Log In or Sign Up With Prehome
          </Box>
        </Typography>

        <Container
          disableGutters
          sx={{
            marginTop: "20px",
            marginBottom: "32px",
            width: "100%",
            maxWidth: "358px",
          }}
        >
          <IconButton
            fullWidth
            variant="contained"
            onClick={() => googleLogin()}
            sx={{
              marginBottom: "24px",
              border: "1px solid black",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              width: "100%",
              paddingLeft: "32px",
              fontSize: "16px",
            }}
          >
            <FcGoogle />
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "16px", md: "16px" },
                fontWeight: "400",
                flexGrow: 1,
                color: "black",
                fontFamily: "Poppins, sans-serif",
                textAlign: "center",
              }}
            >
              Continue With Google
            </Typography>
          </IconButton>

          <IconButton
            fullWidth
            variant="contained"
            sx={{
              color: "black",
              border: "1px solid black",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              width: "100%",
              paddingLeft: "32px",
              fontSize: "16px",
            }}
          >
            <IoLogoApple />
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "16px", md: "16px" },
                fontWeight: "400",
                flexGrow: 1,
                color: "black",
                fontFamily: "Poppins, sans-serif",
                textAlign: "center",
              }}
            >
              Continue With Apple
            </Typography>
          </IconButton>
        </Container>

        <Divider
          sx={{
            width: "100%",
            maxWidth: "358px",
            color: "#929292",
            fontSize: "16px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            marginBottom: "32px",
            textAlign: "center",
          }}
        >
          Or
        </Divider>

        <Typography
          sx={{
            textAlign: "left",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
            fontSize: "12px",
            marginBottom: "8px",
            width: "100%",
            maxWidth: "358px",
          }}
        >
          Email
        </Typography>

        <CustomTextField
          value={email}
          onChange={handleEmailChange}
          onKeyPress={handleKeyPress}
          error={!!error}
          helperText={error}
        />

        {loading ? (
          <CircularProgress sx={{ marginTop: "16px" }} />
        ) : (
          <CustomButton text="Continue" onClick={handleContinueClick} />
        )}
      </Container>
    </Box>
  );
};

export default AuthScreen;
