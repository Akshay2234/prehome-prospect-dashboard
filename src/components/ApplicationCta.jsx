import { useState } from "react";
import { Button } from "@mui/material";

const ApplicationCta = ({text,value}) => {
  const [selectedButton, setSelectedButton] = useState(""); // State to track the selected location

  const handleLocationSelection = (value) => {
    setSelectedButton(value); // Update the selected location
  };

  return (
    <>
      <Button
        type="button"
        className="btn-group application-btn"
        data-value=""
        onClick={() => handleLocationSelection("Option1")}
        style={{
          border:
            selectedButton === "Option1"
              ? "2px solid rgb(239, 156, 0)"
              : "1px solid #ccc",
          transition: "all 0.3s",         
        }}
      >
       {text}
      </Button>
    </>
  );
};
export default ApplicationCta;
