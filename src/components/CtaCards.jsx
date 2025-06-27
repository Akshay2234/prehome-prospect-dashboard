import { Container, Box, Grid, Button } from "@mui/material";
import ApplicationCta from "./ApplicationCta";
import "../assets/style.css";

const CtaCards = ({ subHeading, options, handleNext, text }) => {
  return (
    <Container maxWidth="lg" className="app-card-container">
      <Box className="content-box">
        <Box className="subhead-text-cont" display="flex" justifyContent="space-between" alignItems="center">
          <p className="card-subhead">{subHeading}</p>

          <Button
            onClick={() => handleNext("Skipped")}
            variant="text"
            sx={{ color: "#0086AD", textTransform: "none", cursor: "pointer" }}
          >
            {text}
          </Button>
        </Box>

        <Grid item xs={12} md={6} lg={6}>
          <Box display="flex" justifyContent="space-between">
            {options.slice(0, 2).map((opt, i) => (
              <ApplicationCta key={i} text={opt} value={opt} handleNext={handleNext} />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Box display="flex" justifyContent="space-between">
            {options.slice(2).map((opt, i) => (
              <ApplicationCta key={i + 2} text={opt} value={opt} handleNext={handleNext} />
            ))}
          </Box>
        </Grid>
      </Box>
    </Container>
  );
};

export default CtaCards;