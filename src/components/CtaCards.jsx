import { Container, Box, Grid } from "@mui/material";
import ApplicationCta from "./ApplicationCta";
import "../assets/style.css";

const CtaCards = ({ subHeading, text, handleNext }) => {
  return (
    <>
      <Container maxWidth="lg" className="app-card-container">
        <Box className="content-box">
          <Box className="subhead-text-cont">
            <p className="card-subhead">{subHeading}</p>
            <h4 className="skip-text">{text}</h4>
          </Box>

          <Grid item xs={12} md={6} lg={6}>
            <Box display="flex" justifyContent="space-between">
              <ApplicationCta text="option 1" value="1" handleNext={handleNext} />
              <ApplicationCta text="option 2" value="2" handleNext={handleNext} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box display="flex" justifyContent="space-between">
              <ApplicationCta text="option 3" value="3" handleNext={handleNext} />
              <ApplicationCta text="option 4" value="4" handleNext={handleNext} />
            </Box>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default CtaCards;
