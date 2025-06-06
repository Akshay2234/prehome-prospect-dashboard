import { Container, Box, Grid } from "@mui/material";
import ApplicationCta from "./ApplicationCta";
import "../assets/style.css";

const CtaCards = ({subHeading,text}) => {
  return (
    <>
      <Container
        maxWidth="lg"
        className="app-card-container"
      >
        <Box
          className="content-box"
        >
          <Box className="subhead-text-cont">

          <h4
            
            className="card-subhead"
          >
           {subHeading}
          </h4>
          <h4
            
            className="skip-text"
          >
           {text}
          </h4>
          </Box>

          <Grid item xs={12} md={6} lg={6}>
            <Box display="flex" justifyContent="space-between">
              <ApplicationCta text="option 1" value="1" />
              <ApplicationCta text="option 2" value="2" />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box display="flex" justifyContent="space-between">
              <ApplicationCta text="option 3" value="3" />
              <ApplicationCta text="option 4" value="4" />
            </Box>
          </Grid>
        </Box>
      </Container>
    </>
  );
};
export default CtaCards;
