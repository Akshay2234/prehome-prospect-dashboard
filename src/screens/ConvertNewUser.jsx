import { useState } from "react";
import { Container, Box, Typography, Button, MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { editRole } from "../apis/adminApi";

const ConvertNewUser = () => {
  const [userType, setUserType] = useState(""); // State to manage selected user type
  const navigate = useNavigate();
  const location = useLocation();
  const { _id } = location.state || {}; // Retrieve the user ID from state

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = async () => {
    if (!userType) {
      alert("Please select a user type!");
      return;
    }

    try {
      // Determine role based on selected user type
      const role = userType === "Prospect Buyer" ? 1 : userType === "Prospect Owner" ? 2 : null;

      if (!role) {
        alert("Invalid user type selected!");
        return;
      }

      // Call the editRole API
      const response = await editRole(_id, role);
      if (response.status_code) {
        // alert("User role updated successfully!");
        navigate("/"); // Redirect to the home page or another appropriate route
      } else {
        alert("Failed to update user role. Please try again.");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      alert("An error occurred while updating the user role.");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {/* Title */}
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        mb={2}
        sx={{ fontSize: { xs: "20px", md: "24px" } }}
      >
        Please Choose Which User You Want to Be
      </Typography>

      {/* Dropdown */}
      <FormControl
        fullWidth
        sx={{
          maxWidth: "400px",
          mb: 2,
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <InputLabel id="user-type-label">Select User Type</InputLabel>
        <Select
          labelId="user-type-label"
          value={userType}
          onChange={handleUserTypeChange}
          label="Select User Type"
        >
          <MenuItem value="Prospect Buyer">Prospect Buyer</MenuItem>
          <MenuItem value="Prospect Owner">Prospect Owner</MenuItem>
        </Select>
      </FormControl>

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          textTransform: "none",
          padding: "10px 40px",
          borderRadius: "8px",
          fontWeight: "bold",
        }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Container>
  );
};

export default ConvertNewUser;
