// src/components/CustomTextField.js
import { TextField, Container } from "@mui/material";

const CustomTextField = ({ label, ...props }) => {
  return (
    <Container
      disableGutters
      sx={{
        marginBottom: "20px",
        border: "none",
        width: "100%",
        maxWidth: "358px", // Set width based on Figma dimensions
      }}
    >
      <TextField
        fullWidth
        label={label}
        inputProps={{
          style: {
            padding: 12, // Set padding for input
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px", // Add 8px border-radius
            border: "1px solid black", // Add 1px solid black border
            "& fieldset": {
              border: "none", // Remove the default border from the fieldset
            },
          },
        }}
        {...props} // Pass down all other props
      />
    </Container>
  );
};

export default CustomTextField;
