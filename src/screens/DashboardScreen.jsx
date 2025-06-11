import  {  useEffect } from "react";
import {
  Typography,
  Container,
  Box,
  Slider,
} from "@mui/material";
// import logo from "../assets/logo.png";
// import CustomTextField from "../components/CustomTextField";
// import CustomButton from "../components/CustomButton";
// import zIndex from "@mui/material/styles/zIndex";
import "../assets/style.css";
import CtaCards from "../components/CtaCards";
import SliderCard from "../components/SliderCard";
import InputCta from "../components/InputCta";

const DashboardScreen = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{background: { md: "#ECECEC", xs: "#fff" }}}>
        <Container className="heading-container">
          <Box className="fixed-card">
            <h4 className="Heading">Start your home ownership journey</h4>
            <Box display="flex" justifyContent="space-between">
              <p className="sub-heading">
                Personal Information
              </p>
              <p className="precent-text">25% Complete</p>
            </Box>
            <Box display="flex">
              <Slider
                trackColor="#"
                thumbColor="#"
                railColor="#"
                valueLabelColor="#"
                min={0}
                max={100}
                valueLabelDisplay="off"
                valueLabelFormat={(value) => `${value} `}
                sx={{
                  "& .MuiSlider-track": {
                    backgroundColor: "#0086AD",
                    height: 20, // Adjust track thickness
                    border: "none",
                  },
                  "& .MuiSlider-rail": {
                    backgroundColor: "#DEDEDE",
                    height: 20, // Adjust rail thickness
                  },
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#0086AD",
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
            </Box>
          </Box>
        </Container>

        <Container sx={{ height: "260px",background: "#ECECEC",
    position: "fixed",
    zIndex: "99",
    }}></Container>

        <CtaCards subHeading=" What inspired you to start looking for a new home?" text="skip"></CtaCards> {/* just for spacing*/}
        <CtaCards subHeading=" What inspired you to start looking for a new home?" text="skip" ></CtaCards>

        <SliderCard subHeading=" What inspired you to start looking for a new home? 2"></SliderCard>

        <CtaCards subHeading=" What inspired you to start looking for a new home? 3 "></CtaCards>

        <CtaCards subHeading=" What inspired you to start looking for a new home? 3 "></CtaCards>

        <InputCta
          subHeading="What inspired you to start looking for a new home?"
          subHeading2="What inspired you to start looking for a new home?"
        ></InputCta>
        <InputCta
          subHeading="What inspired you to start looking for a new home2?"
          subHeading2="What inspired you to start looking for a new home2?"
        ></InputCta>
      </Container>
    </>
  );
};

export default DashboardScreen;