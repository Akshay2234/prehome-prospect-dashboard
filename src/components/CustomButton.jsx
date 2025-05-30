// src/components/CustomButton.js
import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({ text, ...props }) => {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{
        borderRadius: "20px",
        paddingY: "10px", // Match Figma button padding
        marginBottom: "10px",
        backgroundColor: "#0086AD",
        fontWeight: "bold",
        fontSize: "16px",
        textTransform: "none", // Prevent uppercase transformation
        maxWidth: "358px", // Set button width according to Figma dimensions
      }}
      {...props} // Spread any additional props for customization
    >
      {text}
    </Button>
  );
};

export default CustomButton;
