import React from "react";
import { Button } from "@mui/material";
import "../App.css";


const PropertyCardButton = ({ text, ...props }) => {
  return (
    <button
      // variant="contained"
      // fullWidth
      type="button"
      className="card-peach-btn"
      // sx={{
      //   fontWeight: "600",
      //   color: "#000",
      //   padding: "10px 20px",
      //   transition: "all 0.3s",
      //   margin: "5px",
      //   cursor: "pointer",
      //   background: "#FFE6B6",
      //   textTransform: "inherit",
      //   borderRadius: { xs: "16px", md: "42px" },
      //   height: { xs: "125px", md: "50px" },
      //   fontSize: { xs: "16px", md: "14px" },
      //   width: { xs: "30%", md: "150px" },
      // }}
      {...props} // Spread any additional props for customization
    >
      {text}
    </button>
  );
};

export default PropertyCardButton;
