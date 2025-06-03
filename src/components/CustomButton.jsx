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
        paddingY: "10px", 
        marginBottom: "10px",
        backgroundColor: "#0086AD",
        fontWeight: "bold",
        fontSize: "16px",
        textTransform: "none",
        maxWidth: "358px",
      }}
      {...props} // Spread any additional props for customization
    >
      {text}
    </Button>
  );
};

export default CustomButton;
