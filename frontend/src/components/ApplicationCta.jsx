import { Button } from "@mui/material";

const ApplicationCta = ({ text, value, handleNext, isSelected }) => {
  return (
    <Button
      type="button"
      className="application-btn"
      onClick={() => handleNext(value)}
      style={{
        border: isSelected ? "2px solid rgb(239, 156, 0)" : "1px solid #ccc", // yellow border
        color: isSelected ? "rgb(239, 156, 0)" : "#222",                      // yellow text
        background: "#fff",                                                   // always white
        fontWeight: 600,
        transition: "all 0.3s",
        padding: "12px 24px",
        borderRadius: "16px",
        width: "100%",
      }}
    >
      {text}
    </Button>
  );
};

export default ApplicationCta;
