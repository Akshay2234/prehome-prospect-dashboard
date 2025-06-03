import { Container, Box, Slider,Grid, Typography } from "@mui/material";
import "../assets/style.css";

const SliderCard = ({subHeading}) => {
  return (
    <>
      <Container
        maxWidth="lg"
        className="app-card-container"
      >
        <Box
          className="content-box"
        >
          <Typography
            variant="h4"
            display="block"
            fontSize={20}
            gutterBottom
            sx={{ color: { sx: "white", md: "black" } }}
          >
           {subHeading}
          </Typography>
         <Slider
          trackColor="#"
          thumbColor="#"
          railColor="#"
          valueLabelColor="#"
            // value={house_cost}
            // onChange={handleCostOfHouseChange}
            // onChangeCommitted={handleSliderChangeCommitted(handleRentApi)}
            min={0}
            max={100}
            // step={0.25}
            valueLabelDisplay="on"
            valueLabelFormat={(value) => `${value} `}
            style={{                marginTop:"3%",
}}
            sx={{
              "& .MuiSlider-track": {
                backgroundColor: "rgb(239, 156, 0)",
                height: 20, // Adjust track thickness
                border: "none",
                
              },
              "& .MuiSlider-rail": {
                backgroundColor: "#DEDEDE",
                height: 20, // Adjust rail thickness
                
              },
              "& .MuiSlider-thumb": {
                
                backgroundColor: "rgb(239, 156, 0)",
                border: "2px solid white",
                width: 25, // Adjust thumb size (width)
                height: 25, // Adjust thumb size (height)
                "&:hover, &:focus, &.Mui-active": {
                  boxShadow: "none", // Remove the expanded color effect
                },
              },
              "& .MuiSlider-valueLabel": {
                backgroundColor: "#DCF7FF",
                color: "black",
                fontWeight: "bold",
                top: "-2px",
                borderRadius: "20px",
                padding: "8px",
                paddingX: "16px",
                "&:before": {
                  display: "none",
                },
                "& *": {
                  transform: "none",
                },
              },
            }}
          />
          <Grid item xs={12} md={6} lg={6}>
            <Box display="flex" justifyContent="space-between">
             <Typography
            variant="h4"
            display="block"
            fontSize={20}
            gutterBottom
            sx={{ color: { sx: "white", md: "black" } }}
          >
           XXXX
          </Typography>
           <Typography
            variant="h4"
            display="block"
            fontSize={20}
            gutterBottom
            sx={{ color: { sx: "white", md: "black" } }}
          >
            XXXX
          </Typography>
            </Box>
          </Grid>
        </Box>
      </Container>
    </>
  );
};
export default SliderCard;
