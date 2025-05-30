import React from "react";
import { Button } from "@mui/material";
import "../App.css";


const ViewPropButton = ({ text, ...props }) => {
  return (
    <button
      type="button"
                className="view-prop-btn"
                // sx={{
                //   display: "flex",
                //   alignSelf: "center",
                //   fontWeight: "bold",
                //   color: "#fff",
                //   fontSize: { xs: "12px", md: "16px" },
                //   width: { xs: "181", md: "261px" },
                //   height: { xs: "44", md: "52px" },
                //   background: "#0086AD",
                //   borderRadius: "42px",
                //   padding: "10px 20px",
                //   transition: "all 0.3s",
                //   margin: "5px",
                //   cursor: "pointer",
                //   textTransform: "inherit",
                // }}
      {...props} // Spread any additional props for customization
    >
      {text}
    </button>
  );
};

export default ViewPropButton;
