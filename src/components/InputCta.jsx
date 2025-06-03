import { Container, Box, Grid, Typography,TextField } from "@mui/material";
import "../assets/style.css";
import ApplicationCta from "./ApplicationCta";

const InputCta = ({ subHeading,subHeading2 }) => {
  return (
    <>
      <Container maxWidth="lg" className="app-card-container">
        <Box className="content-box">
          <Typography
            variant="h4"
            display="block"
            fontSize={20}
            gutterBottom
            sx={{ color: { sx: "white", md: "black" } }}
            // className="Heading"
          >
            {subHeading}
          </Typography>
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

          <Box
            sx={{
              width: "100%",

              flexDirection: { xs: "column", md: "row" },
              margin: "2% 0%",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            <Typography
              variant="h4"
              display="block"
              fontSize={20}
              gutterBottom
              sx={{ color: { sx: "white", md: "black" } }}
            >
              {subHeading2}
            </Typography>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                fullWidth
                value={""}
                sx={{
                  mb: "16px",
                  borderRadius: "15px",
                  border: "1px solid grey",
                }}
              ></TextField>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default InputCta;
