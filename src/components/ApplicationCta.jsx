import { useState } from "react";
import { Button } from "@mui/material";

const ApplicationCta = ({ text, value, handleNext }) => {
  const [selectedButton, setSelectedButton] = useState("");

  const handleLocationSelection = (value) => {
    setSelectedButton(value);
    handleNext(); // Go to the next question
  };

  return (
    <Button
      type="button"
      className="application-btn"
      data-value=""
      onClick={() => handleLocationSelection(value)}
      style={{
        border: selectedButton === `${value}` ? "2px solid rgb(239, 156, 0)" : "1px solid #ccc",
        transition: "all 0.3s",
      }}
    >
      {text}
    </Button>
  );
};

export default ApplicationCta;
