import { Container, Box, Grid, Button } from "@mui/material";
import ApplicationCta from "./ApplicationCta";
import "../assets/style.css";

const CtaCards = ({ subHeading, options, handleNext, text }) => {
  return (
    <Container maxWidth="lg" className="app-card-container">
      <Box className="content-box">
        <Box className="subhead-text-cont" display="flex" justifyContent="space-between" alignItems="center">
          <p className="card-subhead">{subHeading}</p>

          {/* ✅ Skip button functional */}
          <Button
            onClick={handleNext}
            variant="text"
            sx={{ color: "#0086AD", textTransform: "none", cursor: "pointer" }}
          >
            {text}
          </Button>
        </Box>

        <Grid item xs={12} md={6} lg={6}>
          <Box display="flex" justifyContent="space-between">
            <ApplicationCta text="Option 1" value="1" handleNext={handleNext} />
            <ApplicationCta text="Option 2" value="2" handleNext={handleNext} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Box display="flex" justifyContent="space-between">
            <ApplicationCta text="Option 3" value="3" handleNext={handleNext} />
            <ApplicationCta text="Option 4" value="4" handleNext={handleNext} />
          </Box>
        </Grid>
      </Box>
    </Container>
  );
};

export default CtaCards;
