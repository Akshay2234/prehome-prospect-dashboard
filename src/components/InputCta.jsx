import { useState } from "react";
import { Container, Box, TextField, Button } from "@mui/material";
import "../assets/style.css";

const InputCta = ({ id, handleNext, subHeading, subHeading2 }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      handleNext(inputValue);
    } else {
      alert("Please enter a value before submitting.");
    }
  };

  return (
    <Container maxWidth="lg" className="app-card-container">
      <Box className="content-box">
        <p className="card-subhead">{subHeading}</p>

        <TextField
          fullWidth
          variant="outlined"
          placeholder={subHeading2 || "Type here..."}
          value={inputValue}
          onChange={handleInputChange}
          sx={{ mt: 2, borderRadius: "15px", border: "1px solid grey" }}
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ mt: 3, backgroundColor: "#0086AD", "&:hover": { backgroundColor: "#005f7a" } }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default InputCta;