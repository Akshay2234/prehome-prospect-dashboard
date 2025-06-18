import { useState } from "react";
import { Typography, Container, Box, Slider } from "@mui/material";

import "../assets/style.css";
import CtaCards from "../components/CtaCards";
import SliderCard from "../components/SliderCard";
import InputCta from "../components/InputCta";

const DashboardScreen = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState(1); // Start with Question 1

  const handleNext = () => {
    setCurrentQuestionId((prevId) => prevId + 1); // Move to next question
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ background: { md: "#ECECEC", xs: "#fff" } }}>
        <Container className="heading-container">
          <Box className="fixed-card">
            <h4 className="Heading">Start your home ownership journey</h4>
            <Box display="flex" justifyContent="space-between">
              <p className="sub-heading">Personal Information</p>
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
                  "& .MuiSlider-track": { backgroundColor: "#0086AD", height: 20, border: "none" },
                  "& .MuiSlider-rail": { backgroundColor: "#DEDEDE", height: 20 },
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#0086AD",
                    border: "2px solid white",
                    width: 25,
                    height: 25,
                    "&:hover, &:focus, &.Mui-active": { boxShadow: "none" },
                  },
                  "& .MuiSlider-valueLabel": {
                    backgroundColor: "#DCF7FF",
                    color: "black",
                    fontWeight: "bold",
                    top: "-2px",
                    borderRadius: "20px",
                    padding: "8px",
                    paddingX: "16px",
                    "&:before": { display: "none" },
                    "& *": { transform: "none" },
                  },
                }}
              />
            </Box>
          </Box>
        </Container>

        <Container sx={{ height: "260px", background: "#ECECEC", position: "fixed", zIndex: "99" }}></Container>

        {/* Question ID 1 */}
        {currentQuestionId === 1 && (
          <CtaCards
            id={1}
            currentQuestionId={currentQuestionId}
            handleNext={handleNext}
            subHeading="What inspired you to start looking for a new home?"
            text="skip"
          />
        )}

        {/* Question ID 2 */}
        {currentQuestionId === 2 && (
          <CtaCards
            id={2}
            currentQuestionId={currentQuestionId}
            handleNext={handleNext}
            subHeading="What inspired you to start looking for a new home?"
            text="skip"
          />
        )}

        {/* Question ID 3 */}
        {currentQuestionId === 3 && (
          <SliderCard
            id={3}
            currentQuestionId={currentQuestionId}
            handleNext={handleNext}
            subHeading="What inspired you to start looking for a new home? 2"
          />
        )}

        {/* Question ID 4 */}
        {currentQuestionId === 4 && (
          <CtaCards
            id={4}
            currentQuestionId={currentQuestionId}
            handleNext={handleNext}
            subHeading="What inspired you to start looking for a new home? 3"
          />
        )}

        {/* Question ID 5 */}
        {currentQuestionId === 5 && (
          <CtaCards
            id={5}
            currentQuestionId={currentQuestionId}
            handleNext={handleNext}
            subHeading="What inspired you to start looking for a new home? 3"
          />
        )}

        {/* Question ID 6 */}
        {currentQuestionId === 6 && (
          <InputCta
            id={6}
            currentQuestionId={currentQuestionId}
            handleNext={handleNext}
            subHeading="What inspired you to start looking for a new home?"
            subHeading2="What inspired you to start looking for a new home?"
          />
        )}

        {/* Question ID 7 */}
        {currentQuestionId === 7 && (
          <InputCta
            id={7}
            currentQuestionId={currentQuestionId}
            handleNext={handleNext}
            subHeading="What inspired you to start looking for a new home 2?"
            subHeading2="What inspired you to start looking for a new home 2?"
          />
        )}
      </Container>
    </>
  );
};

export default DashboardScreen;
